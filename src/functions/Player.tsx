import { StateUpdate } from "../interfaces/CommonInterfaces"

export default class Player {
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
        this.gold = 0

        this.clickPower = 1

        this.critChance = 0
        this.critPower = 2

        this.dps = 0

        this.level = 1
        this.exp = 0
        this.expRequired = 500
        
        this.update = updater!
    }



    public isCritical(): boolean {
        if(this.critChance === 0) return false

        return ~~(Math.random() * 100) + 1 <= this.critChance
    }

    public calculateCriticalDamage(): number {
        return parseFloat(
            (this.clickPower * this.critPower).toFixed(2)
        )
    }



    public initializeDPS(): void {
        setInterval(() => {
            this.gold += this.getDps

            this.updateState()
        }, 1000)
    }



    public updateGold(money: number): void {
        this.gold += money
    }

    public updateState(): void {
        this.update(curr => !curr)
    }



    public get getClickPower(): number {
        return this.clickPower
    }

    public get getLevel(): number {
        return this.level
    }

    public get getDps(): number {
        return this.dps
    }

    public get getGold(): number {
        return this.gold
    }
}