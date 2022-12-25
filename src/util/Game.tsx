import React from "react"
import Button from "../components/Common/Button"
import { StateUpdate } from "../interfaces/CommonInterfaces"
import Player from "./Player"
import Quest from "./Quest"
import Skill from "./Skill"
import Upgrade from "./Upgrade"


type MainInterval = () => void


export default class Game {
    private secondsPlayed: number
    private animateState: boolean

    private upgrades: Upgrade[]
    private skills: Skill[]
    private quests: Quest[]

    private visibleQuests: Quest[]
    private activeQuest: Quest | null

    private player: Player

    private update: StateUpdate


    public constructor(upgrades: Upgrade[], skills: Skill[], quests: Quest[], player?: Player, updater?: StateUpdate) {
        this.secondsPlayed = 0
        this.animateState = true

        this.upgrades = upgrades
        this.skills = skills
        this.quests = quests

        this.visibleQuests = []
        this.activeQuest = null

        this.player = player!

        this.update = updater!
    }


    // Returns float toFixed(2) value
    public static fixedValue(num: number): number {
        return parseFloat( (num).toFixed(2) )
    }

    // Formats number to string (1K 1M 1B etc...)
    public static numberFormat(num: number): string {
        return new Intl.NumberFormat('en', {
            notation: 'compact',
            maximumFractionDigits: 2
        }).format(this.fixedValue(num))
    }

    private randomNumber(num: number): number {
        return Math.floor(Math.random() * num) + 1
    }



    // Main interval
    public mainInterval(cb: MainInterval): void {
        setInterval(() => {

            cb()

            this.updateState()

        }, 1000)
    }

    // Searches for quests and sets them visible
    public determineNewQuests(): void {
        if (!Quest.shouldAddNewQuest())
            return


        const randomIndex: number = ~~(Math.random() * this.quests.length),
              randomQuest = this.quests[randomIndex]


        if (
            this.visibleQuests.some(x => 
                x.getQuestName === randomQuest.getQuestName 
                || this.player.getInformation<number>('level') < x.getQuestRequiredLevel 
            )
        ) return


        const MAX_QUESTS: number = 3

        if (this.visibleQuests.length === MAX_QUESTS) {
            this.visibleQuests[MAX_QUESTS - 1].deleteRewardValues()
        }


        this.visibleQuests = [randomQuest, ...this.visibleQuests].slice(0, MAX_QUESTS)
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

        setTimeout(() => s.remove(), 1000);
    }

    // Start play timer; Pass to main interval
    public initializeTimer(): void {
        this.secondsPlayed++
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
    public drawUpgrades(): JSX.Element[] {
        return this.upgrades.map((x, i) => x.returnUpgradeComponent(this.player, i))
    }

    // Draw all skills and return array of JSX Elements
    public drawSkills(): JSX.Element[] {
        return this.skills
                .map((x, i) => x.returnSkillComponent(this.player, i))
                .filter(x => x) as JSX.Element[]
    }

    // Draw all quests and return array of JSX Elements
    public drawQuests(): JSX.Element[] {
        return this.visibleQuests.map((x, i) => x.returnQuestComponent(this.player, this, i))
    }

    // Draw active quest
    public drawActiveQuest(): JSX.Element {
        if(!this.activeQuest)
            return <></>


        return this.activeQuest.returnActiveQuestComponent(this.player)
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

    // Re-renders the page
    public updateState(): void {
        this.update(curr => !curr)
    }
}