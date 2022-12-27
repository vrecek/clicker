import React from "react"
import { StateUpdate } from "../interfaces/CommonInterfaces"
import Player from "./Player"
import Quest from "./Quest"
import Skill from "./Skill"
import { GameObjectData, MainInterval, Totals } from "./Types/GameTypes"
import Upgrade from "./Upgrade"



export default class Game {
    private totalSecondsPlayed: number
    private totalClicks: number
    private totalUpgrades: number
    private totalSkillsUsed: number

    private animateState: boolean

    private upgrades: Upgrade[]
    private skills: Skill[]
    private quests: Quest[]

    private visibleQuests: Quest[]
    private activeQuest: Quest | null

    private player: Player

    private update: StateUpdate



    public constructor(upgrades: Upgrade[], skills: Skill[], quests: Quest[], player?: Player, updater?: StateUpdate) {
        const gameObject: GameObjectData | null = JSON.parse(window.localStorage.getItem('gameObject') ?? 'null')

        // Load progress if game was saved
        // Else default values
        if(gameObject) {
            const {totalSecondsPlayed, totalClicks, totalSkillsUsed, totalUpgrades, visibleQuests, activeQuest} = gameObject
            const savedUpgrades: Upgrade[] = gameObject.upgrades

            this.totalSecondsPlayed = totalSecondsPlayed

            this.totalClicks = totalClicks
            this.totalUpgrades = totalUpgrades
            this.totalSkillsUsed = totalSkillsUsed


            this.visibleQuests = Quest.deserializeQuests(visibleQuests, quests)

            this.activeQuest = activeQuest
                ? Quest.deserializeQuests([activeQuest], quests)?.[0]
                : null


            this.upgrades = Upgrade.deserializeUpgrades(savedUpgrades, upgrades) 

        }else {
            this.totalSecondsPlayed = 0

            this.totalClicks = 0
            this.totalUpgrades = 0
            this.totalSkillsUsed = 0

            this.upgrades = upgrades

            this.visibleQuests = []
            this.activeQuest = null 
        }

        this.animateState = true

        this.skills = skills
        this.quests = quests

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
        const MAX_QUESTS: number = 3

        if (this.visibleQuests.length === MAX_QUESTS || !Quest.shouldAddNewQuest())
            return


        const randomIndex: number = ~~(Math.random() * this.quests.length),
              randomQuest = this.quests[randomIndex]

              
        if (
            this.player.getInformation('level') < randomQuest.getQuestRequiredLevel
            ||
            (this.activeQuest && this.activeQuest.getQuestName === randomQuest.getQuestName)
            || 
            this.visibleQuests.some(x => x.getQuestName === randomQuest.getQuestName)
        ) return
        

        this.visibleQuests = [randomQuest, ...this.visibleQuests].slice(0, MAX_QUESTS)
    }

    // Initialize loading when opening a page
    public entryLoading(text?: string): void {
        const s = document.createElement('section')

        s.textContent = text ?? 'LOADING'

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
        this.totalSecondsPlayed++
    }

    // Get playtime <hh:mm:ss>
    public calculatePlayTime(): string {
        const sp: number = this.totalSecondsPlayed

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
        return this.visibleQuests.map((x, i) => x.returnQuestComponent(this, i))
    }

    // Draw active quest
    public drawActiveQuest(): JSX.Element {
        if(!this.activeQuest)
            return <></>


        return this.activeQuest.returnActiveQuestComponent(this)
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

    // Removes quest from visibleQuests (trash)
    public removeVisibleQuest(questName: string, dontUpdateState?: boolean): void {
        this.visibleQuests = this.visibleQuests.filter(x => x.getQuestName !== questName)


        if (dontUpdateState)
            return


        this.updateState()
    }

    // Removes current active quest
    public removeActiveQuest(): void {
        this.activeQuest = null
    }

    // Removes quest from visibleQuests (accept)
    public addActiveQuest(quest: Quest): void {
        if (this.activeQuest)
            return


        this.removeVisibleQuest(quest.getQuestName, true)

        this.activeQuest = quest

        this.updateState()
    }

    // Listen for current active quest tracker function
    public listenQuestEvent(): void {
        if (!this.activeQuest)
            return


        this.activeQuest.getTrackerFunction(this.player, this, this.activeQuest)
    }

    // Get total field
    public getTotals(field: Totals): number {
        return this[field]
    }

    // Set total field
    public updateTotals(field: Totals, value: number, replace?: boolean): void {
        replace
            ? this[field] = value
            : this[field] += value
    }

    // Deletes whole progress
    public deleteProgress(): void {
        this.entryLoading('DELETING')

        window.localStorage.removeItem('gameObject')
        window.localStorage.removeItem('playerObject')

        window.location.reload()
    }

    // Saves progress
    public saveProgress(): void {
        this.entryLoading('SAVING')

        const gameObject: GameObjectData = {
            totalSecondsPlayed: this.totalSecondsPlayed,

            totalClicks: this.totalClicks,
            totalUpgrades: this.totalUpgrades,
            totalSkillsUsed: this.totalSkillsUsed,

            upgrades: this.upgrades,

            visibleQuests: this.visibleQuests,
            activeQuest: this.activeQuest
        }

        window.localStorage.setItem('gameObject', JSON.stringify(gameObject))
        window.localStorage.setItem('playerObject', JSON.stringify(this.player))
    }


    // Get visible quests
    public get getVisibleQuests(): Quest[] {
        return this.visibleQuests
    }
}