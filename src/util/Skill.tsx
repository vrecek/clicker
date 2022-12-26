import React from "react";
import Player from "./Player";
import { ClickAction, OnHoverInfo } from "./Types/SkillTypes";



export default class Skill {
    private className: string

    private imageReady: string
    private imageOnCooldown: string

    private levelRequirement: number

    private cooldown: number
    private originalCooldown: number
    private isOnCooldown: boolean

    private remainingTime: number
    private currentInterval: number | null
    private currentTimeout: number | null

    private clickAction: ClickAction

    private hoverDetails: OnHoverInfo


    public constructor(
        cname: string, 
        imageReady: string, 
        imageOnCooldown: string, 
        cooldown: number, 
        levelRequirement: number, 
        clickAction: ClickAction,
        hoverDetails: OnHoverInfo
    ) {
        this.className = cname

        this.imageReady = imageReady
        this.imageOnCooldown = imageOnCooldown

        this.levelRequirement = levelRequirement

        this.cooldown = cooldown
        this.originalCooldown = cooldown
        this.isOnCooldown = false

        this.remainingTime = 0
        this.currentInterval = null
        this.currentTimeout = null

        this.clickAction = clickAction

        this.hoverDetails = hoverDetails
    }


    private _cooldownHandler(element: Element, plr: Player, initialTime?: number): void {
        const div = document.createElement('div')
        div.textContent = initialTime?.toString() ?? this.cooldown.toString()


        this.currentInterval = setInterval(() => {
            const newTime: number = parseInt(div.textContent!) - 1 
            div.textContent = newTime.toString()

            this.remainingTime = newTime

            plr.updateState()
        }, 1000)


        this.currentTimeout = setTimeout(() => {
            if(this.currentInterval)
                clearInterval(this.currentInterval)


            this.isOnCooldown = false

            div.remove()

            plr.updateState()

        }, 
            initialTime 
                ? initialTime * 1000 
                : 1000 * this.cooldown
        )
        

        element.appendChild(div)
    }

    private _isOnCooldown(player: Player, element: Element): boolean {
        if (this.isOnCooldown) 
            return true


        this.isOnCooldown = true

        this._cooldownHandler(element, player)


        return false
    }

    private _reAttachCooldown(plr: Player): void {
        const skill = document.querySelector(`.${this.className}`)

        if (!skill || !this.isOnCooldown)
            return


        const isAttached: boolean = [...skill.children].some(x => x.tagName === 'DIV')

        if (isAttached)
            return


        clearTimeout(this.currentTimeout!)
        clearInterval(this.currentInterval!)

        this._cooldownHandler(skill, plr, this.remainingTime)
    }

    private _calculateCooldown(cooldownReduce: number): void {
        this.cooldown = this.originalCooldown - Math.trunc((this.originalCooldown / 100) * cooldownReduce)
    }

    private _hoverDisplay(e: React.MouseEvent) {
        const t: HTMLElement = e.currentTarget! as HTMLElement

        const article = document.createElement('article'),
              header = document.createElement('p'),
              description = document.createElement('p'),
              box = document.createElement('div'),
              whatMsg = document.createElement('p'),
              cd = document.createElement('div')


        const {desc, name, what} = this.hoverDetails

        header.className = 'header'
        header.textContent = name

        description.className = 'description'
        description.innerHTML = desc

        whatMsg.innerHTML = what.replaceAll('[[', '<span>')
                                  .replaceAll(']]', '</span>')


        box.className = 'hover-box'
        box.appendChild(whatMsg)

        cd.className = 'hover-cooldown'
        cd.textContent = `${this.cooldown}s`

        article.appendChild(header)
        article.appendChild(description)
        article.appendChild(box)
        article.appendChild(cd)

        t.parentElement!.appendChild(article)
    }

    private _hoverRemove(e: React.MouseEvent) {
        const t: HTMLElement = e.currentTarget! as HTMLElement

        for (const element of [...t.parentElement!.children]) 
            if (element.tagName === 'ARTICLE')
                element.remove()
    }


    public createResultBox(text: string, removeAfterMs: number): void {
        const article = document.createElement('article'),
              p = document.createElement('p'),
              pInfo = document.createElement('p')

        
        p.className = 'p-text'
        p.innerHTML = text.replaceAll('[[', '<span>')
                          .replaceAll(']]', '</span>')

            
        pInfo.className = 'p-info'
        pInfo.textContent = 'i'

        article.className = 'skill-article-result'
        article.appendChild(p)
        article.appendChild(pInfo)

        document.body.appendChild(article)

        setTimeout(() => {
            article.remove()
        }, removeAfterMs);
    }

    public returnSkillComponent = (player: Player, iKey: number): JSX.Element | null => {
        if (player.getInformation('level') < this.levelRequirement)
            return null


        this._calculateCooldown(player.getInformation('skillCooldown'))


        const skillAction = (e: React.MouseEvent): void => {
            if (this._isOnCooldown(player, e.currentTarget!)) 
                return


            this.clickAction(player, this)

            player.updateState()
        }


        this._reAttachCooldown(player)


        return (
            <figure 
            onMouseLeave={this._hoverRemove} 
            onMouseEnter={(e) => this._hoverDisplay(e)} 
            onClick={skillAction} 
            className={this.className} 
            key={iKey}
            >
                <img 
                    src={
                        this.isOnCooldown
                            ? this.imageOnCooldown
                            : this.imageReady
                    } 
                    loading='lazy' 
                />

            </figure>
        )
    }
}