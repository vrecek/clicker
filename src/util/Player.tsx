import { StateUpdate } from "../interfaces/CommonInterfaces"
import Game from "./Game"
import { InfoField, UpdateField } from "./Types/PlayerTypes"


export default class Player {
    private totalGold: number
    private gold: number

    private clickPower: number

    private critChance: number
    private critPower: number

    private dps: number
    private originalDps: number
    
    private level: number
    private exp: number
    private expRequired: number
    
    private update: StateUpdate

    private dpsMultiplier: number
    private expMultiplier: number

    private skillCooldown: number


    public constructor(updater?: StateUpdate) {
        this.totalGold = 0
        this.gold = 10000000

        this.clickPower = 1

        this.critChance = 0
        this.critPower = 2

        this.dps = 0
        this.originalDps = 0
        
        this.level = 1
        
        this.exp = 0
        this.expRequired = 1250

        this.dpsMultiplier = 1
        this.expMultiplier = 1

        this.skillCooldown = 0
        
        this.update = updater!
    }


    private _updateValue(field: UpdateField, value: number, multiplier?: number): void {
        this[field] = multiplier
            ? Game.fixedValue((this[field] + value) * multiplier)
            : Game.fixedValue(this[field] + value)
    }

    private _checkExpUpdate(field: UpdateField, value: number): boolean {
        if (field !== 'exp') 
            return false


        const multipliedExp: number = value * this.expMultiplier

        if (this.exp + multipliedExp >= this.expRequired ) {

            this.exp = 0

            this.expRequired *= (Math.ceil(this.level / 2.5) * 1.5)

            this.level++

            return true
        }

        this._updateValue(field, multipliedExp)

        return true
    }

    private _checkGoldUpdate(field: UpdateField, value: number): boolean {
        if(field !== 'gold')
            return false


        if (value > 0)
            this._updateValue('totalGold', value)

        
        this._updateValue('gold', value)

        return true
    }

    private _checkDpsUpdate(field: UpdateField, value: number): boolean {
        if(field !== 'dpsMultiplier' && field !== 'dps')
            return false


        const dps = this.getInformation<number>('dps'),
              odps = this.getInformation<number>('originalDps')


        // If -dpsMultiplier- is upgraded
        if(field === 'dpsMultiplier') {
            this._updateValue('dpsMultiplier', value)
            this._updateValue(
                'dps', 
                -dps + odps, 
                this.dpsMultiplier
            )

            return true
        }

        // If -dps- is upgraded
        this._updateValue('originalDps', value)
        this._updateValue(
            'dps', 
            -dps + odps + value, 
            this.dpsMultiplier
        )

        return true
    }


    // Calculate if critical hit would happen
    public isCritical(): boolean {
        if(this.critChance === 0) return false

        return ~~(Math.random() * 100) + 1 <= this.critChance
    }


    // Calculate critical damage
    public calculateCriticalDamage(): number {
        return Game.fixedValue(this.clickPower * this.critPower)
    }


    // Start Damage Per Second interval
    public initializeDPS(): void {
        setInterval(() => {
            this.updateField('gold', this.dps)
            this.updateField('exp', this.dps * 1.5)

            this.updateState()
        }, 1000)
    }


    // Updates 'fill' progress bar
    public handleLevelProgress(): void {
        const bar: HTMLElement | null = document.querySelector('.fill-exp-bar')

        if (!bar) return

        const fillValue: number = (100 * this.exp) / this.expRequired
        
        bar.style.width = `${fillValue === Infinity ? 0 : fillValue }%`
    }


    // Update player's field
    public updateField(field: UpdateField, value: number): void {
        if (this._checkGoldUpdate(field, value))
            return
   

        if (this._checkExpUpdate(field, value))
            return


        if(this._checkDpsUpdate(field, value))
            return


        this._updateValue(field, value)
    }


    // Get information about player's field
    public getInformation<T extends number | string>(field: InfoField, format?: boolean): T {
        return format
            ? Game.numberFormat(this[field]) as T
            : Game.fixedValue(this[field]) as T
    }

    
    // Re-renders page
    public updateState(): void {
        this.update(curr => !curr)
    }
}