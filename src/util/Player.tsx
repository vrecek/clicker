import { StateUpdate } from "../interfaces/CommonInterfaces"
import Game from "./Game"

type InfoField = 'dps' | 'gold' | 'totalGold' | 'clickPower' | 'critPower' | 'critChance' | 'exp' | 'level' | 'expRequired'
type UpdateField = 'clickPower' | 'dps' | 'critChance' | 'critPower' | 'gold' | 'exp'

export default class Player {
    private totalGold: number
    private gold: number

    private clickPower: number

    private critChance: number
    private critPower: number

    private dps: number

    private level: number
    private exp: number
    private expRequired: number

    private update: StateUpdate


    public constructor(updater?: StateUpdate) {
        this.totalGold = 0
        this.gold = 1000000000

        this.clickPower = 1

        this.critChance = 0
        this.critPower = 2

        this.dps = 0

        this.level = 1
        this.exp = 0
        this.expRequired = 1000
        
        this.update = updater!
    }


    private _checkExpUpdate(field: UpdateField, value: number): boolean {
        if (field === 'exp' && (this.exp + value) >= this.expRequired) {
            this.exp = 0

            this.expRequired *= (Math.ceil(this.level / 2.5) * 1.5)

            this.level++

            return true
        }

        return false
    }

    private _checkGoldUpdate(field: UpdateField, value: number): void {
        if (field === 'gold' && value > 0)
            this.totalGold = Game.fixedValue(this.totalGold + value)
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
            this.updateField('gold', this.getInformation<number>('dps'))
            this.updateField('exp', this.dps * 2)

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
        this._checkGoldUpdate(field, value)

        if (this._checkExpUpdate(field, value))
            return


        this[field] = Game.fixedValue(this[field] + value)
    }


    // Get information about player's field
    public getInformation<T extends number | string>(field: InfoField, format?: boolean) {
        return format
            ? Game.numberFormat(this[field]) as T
            : Game.fixedValue(this[field]) as T
    }

    
    // Re-renders page
    public updateState(): void {
        this.update(curr => !curr)
    }
}