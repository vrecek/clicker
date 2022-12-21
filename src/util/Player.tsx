import { StateUpdate } from "../interfaces/CommonInterfaces"
import Game from "./Game"

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



    // Calculate if critical hit would happen
    public isCritical(): boolean {
        if(this.critChance === 0) return false

        return ~~(Math.random() * 100) + 1 <= this.critChance
    }

    // Calculate critical damage
    public calculateCriticalDamage(): number {
        return parseFloat(
            (this.clickPower * this.critPower).toFixed(2)
        )
    }


    // Start Damage Per Second interval
    public initializeDPS(): void {
        setInterval(() => {
            this.gold += this.getDps

            this.updateState()
        }, 1000)
    }


    // Add to current player's gold
    public updateGold(money: number): void {
        this.gold += Game.fixedValue(money)
    }

    // Add to current player's click power
    public updateClickPower(value: number): void {
        this.clickPower += Game.fixedValue(value)
    }


    public updateState(): void {
        this.update(curr => !curr)
    }

    

    public get getClickPower(): number {
        return Game.fixedValue(this.clickPower)
    }

    public get getLevel(): number {
        return this.level
    }

    public get getDps(): number {
        return Game.fixedValue(this.dps)
    }

    public get getGold(): number {
        return Game.fixedValue(this.gold)
    }
}