import React from "react"
import { StateUpdate } from "../interfaces/CommonInterfaces"
import Player from "./Player"
import Upgrade from "./Upgrade"


export default class Game {
    private animateState: boolean
    private upgrades: Upgrade[]
    private update: StateUpdate


    public constructor(upgrades: Upgrade[], updater?: StateUpdate) {
        this.animateState = true
        this.upgrades = upgrades
        this.update = updater!
    }


    // Returns float toFixed(2) value
    public static fixedValue(num: number): number {
        return parseFloat( (num).toFixed(2) )
    }



    private randomNumber(num: number): number {
        return Math.floor(Math.random() * num) + 1
    }


    // Draw all upgrades and return array of JSX Elements
    public drawUpgrades(player: Player): JSX.Element[] {
        return this.upgrades.map(x => x.returnUpgradeComponent(player))
    }

    // Animate sword image click
    public animateImage(element: HTMLElement, ms: number): void {
        if(!this.animateState) return

        this.animateState = !this.animateState
        
        element.classList.toggle('anim')
        element.style.rotate = element.classList.contains('anim')
            ? `${Math.min(
                    this.randomNumber(360),
                    this.randomNumber(360)
                )}deg`

            : '0deg'


        setTimeout(() => this.animateState = !this.animateState, ms)
    }

    // Show damage animation after click
    public animateText(element: HTMLElement, clickPower: number, isCritical: boolean, ms: number): void {
        const span = document.createElement('span'),
              CONT_WIDTH: number = element.clientWidth,
              CONT_HEIGHT: number = element.clientHeight


        span.textContent = clickPower.toString()

        Object.assign(span.style, {
            position: 'absolute',
            fontWeight: '700',
            fontSize: isCritical ? '1.5rem' : '1.1rem',
            color: isCritical ? 'red' : 'gold',
            left: `${this.randomNumber(CONT_WIDTH)}px`
        } as React.CSSProperties)

        span.animate(
            [
                { bottom: '0' },
                { bottom: `${this.randomNumber(CONT_HEIGHT)}px` }
            ], 

            {
                duration: ms,
                iterations: 1
            }
        )

        element.appendChild(span)

        setTimeout(() => span.remove(), ms);
    }

    public updateState(): void {
        this.update(curr => !curr)
    }
}