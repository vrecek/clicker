import React from "react"
import { StateUpdate } from "../interfaces/CommonInterfaces"


export default class Game {
    private animateState: boolean
    private update: StateUpdate


    public constructor(updater?: StateUpdate) {
        this.animateState = true
        this.update = updater!
    }



    private randomNumber(num: number): number {
        return Math.floor(Math.random() * num) + 1
    }



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