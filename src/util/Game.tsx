import React from "react"
import { StateUpdate } from "../interfaces/CommonInterfaces"
import Player from "./Player"
import Upgrade from "./Upgrade"


export default class Game {
    private secondsPlayed: number
    private animateState: boolean
    private upgrades: Upgrade[]
    private update: StateUpdate


    public constructor(upgrades: Upgrade[], updater?: StateUpdate) {
        this.secondsPlayed = 0
        this.animateState = true
        this.upgrades = upgrades
        this.update = updater!
    }


    // Returns float toFixed(2) value
    public static fixedValue(num: number): number {
        return parseFloat( (num).toFixed(2) )
    }

    public static numberFormat(num: number): string {
        return new Intl.NumberFormat('en', {
            notation: 'compact'
        }).format(this.fixedValue(num))
    }


    private randomNumber(num: number): number {
        return Math.floor(Math.random() * num) + 1
    }


    // Initialize loading when opening a page
    public entryLoading(): void {
        const s = document.createElement('section')

        s.textContent = 'LOADING'

        Object.assign(s.style, {
            position: 'fixed',
            left: '0',
            top: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(30, 30, 30, .95)',
            zIndex: '999',
            color: 'rgb(245, 245, 245)',
            fontWeight: '800',
            fontSize: '1.5rem',
            letterSpacing: '2px'
        } as React.CSSProperties)

        document.body.appendChild(s)

        setTimeout(() => {
            s.remove()
        }, 1000);
    }

    // Start play timer
    public initializeTimer(): void {
        setInterval(() => this.secondsPlayed++, 1000)
    }

    // Get playtime <hh:mm:ss>
    public calculatePlayTime(): string {
        const sp: number = this.secondsPlayed

        const h: string = `0${Math.floor(sp / 3600 || 0)}`.slice(-2),
              m: string = `0${Math.floor(sp / 60 || 0) % 60}`.slice(-2),
              s: string = `0${sp % 60}`.slice(-2)


        return `${h}:${m}:${s}`
    }

    // Draw all upgrades and return array of JSX Elements
    public drawUpgrades(player: Player): JSX.Element[] {
        return this.upgrades.map((x, i) => x.returnUpgradeComponent(player, i))
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


        span.textContent = Game.numberFormat(clickPower)

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