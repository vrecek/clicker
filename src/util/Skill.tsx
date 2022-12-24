import Player from "./Player";

type ClickAction = (player: Player) => void

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


    public constructor(cname: string, imageReady: string, imageOnCooldown: string, cooldown: number, levelRequirement: number, clickAction: ClickAction) {
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



    public returnSkillComponent = (player: Player, iKey: number): JSX.Element | null => {
        if (player.getInformation('level') < this.levelRequirement)
            return null


        this._calculateCooldown(player.getInformation('skillCooldown'))


        const skillAction = (e: React.MouseEvent): void => {
            if (this._isOnCooldown(player, e.currentTarget!)) 
                return


            this.clickAction(player)

            player.updateState()
        }

        this._reAttachCooldown(player)


        return (
            <figure className={this.className} key={iKey} onClick={skillAction}>

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