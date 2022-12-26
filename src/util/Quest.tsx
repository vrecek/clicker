import Button from "../components/Common/Button"
import Player from "./Player"
import { RewardRange, RewardValues, TrackerFunction } from "./Types/QuestTypes"
import Rewards from '../components/BottomBar/Display/Quests/Rewards'
import Description from "../components/BottomBar/Display/Quests/Active/Description"
import QuestProgress from "../components/BottomBar/Display/Quests/Active/QuestProgress"
import Game from "./Game"



export default class Quest<T = any> {
    private expRange: RewardRange
    private goldRange: RewardRange

    private rewardValues: RewardValues | null

    private levelRequired: number

    private name: string
    private desc: string
    private target: string

    private trackerMaxValue: number
    private trackerProgressValue: number
    private trackerFunc: TrackerFunction

    private buffer: T | null


    public constructor(
        expRange: RewardRange, 
        goldRange: RewardRange, 
        levelRequired: number, 
        name: string, 
        desc: string, 
        target: string, 
        trackerFunc: TrackerFunction,
        trackerMaxValue: number,
    ) {
        this.expRange = expRange
        this.goldRange = goldRange

        this.rewardValues = null

        this.levelRequired = levelRequired

        this.name = name
        this.desc = desc
        this.target = target

        this.trackerFunc = trackerFunc
        this.trackerMaxValue = trackerMaxValue
        this.trackerProgressValue = 0

        this.buffer = null
    }



    // Get random value from range
    private getRandomRewardValue(range: RewardRange): number {
        return ~~(Math.random() * (range.max - range.min) + range.min)
    }

    // Check for rewardValues and add if necessary
    private checkForRewardValues(): void {
        if (this.rewardValues)
            return


        this.rewardValues = {
            gold: this.getRandomRewardValue(this.goldRange),
            exp: this.getRandomRewardValue(this.expRange)
        }
    }

    // Delete rewardValues
    private deleteActiveQuestSettings(): void {
        this.rewardValues = null
        this.trackerProgressValue = 0
        this.buffer = null
    }



    // Returns true if quest should be added
    public static shouldAddNewQuest(): boolean {
        const num: number = ~~(Math.random() * 100) + 1

        return num <= 5
            ? true
            : false
    }

    // Finishes quest --> Add gold, exp | reset active quest settings | remove from active
    public finishQuest(player: Player, game: Game): void {
        const {gold, exp} = this.rewardValues!

        player.updateField('gold', gold)
        player.updateField('exp', exp)
        
        game.removeActiveQuest()

        this.deleteActiveQuestSettings()
    }

    // Returns active quest component
    public returnActiveQuestComponent(game: Game): JSX.Element {
        const {gold, exp} = this.rewardValues!

        const cancelQuest = (): void => {
            this.deleteActiveQuestSettings()
            game.removeActiveQuest()
        }

        return (
            <article className="active">

                <Description name={this.name} desc={this.desc} />

                <QuestProgress 
                    trackerCurrent={this.trackerProgressValue} 
                    trackerMax={this.trackerMaxValue}
                    target={this.target} 
                />

                <Rewards gold={gold} exp={exp} />

                <Button action={cancelQuest} cname='cancel' text='Cancel' />

            </article>
        )
    }

    // Returns pending quest component
    public returnQuestComponent(game: Game, iKey: number): JSX.Element {
        this.checkForRewardValues()

        const {gold, exp} = this.rewardValues!

        const trashQuest = (): void => {
            this.deleteActiveQuestSettings()
            game.removeVisibleQuest(this.name)
        }
        const acceptQuest = (): void => game.addActiveQuest(this)
        

        return (
            <article key={iKey} className="available">

                <p className="available-header">{this.name}</p>
                <p className="mission">{this.target}</p>

                <Rewards exp={exp} gold={gold} />

                <section className="options">

                    <Button action={acceptQuest} cname='accept' text='Accept' />
                    <Button action={trashQuest} cname='trash' text='Trash' />

                </section>

            </article>
        )
    }

    // Set tracker actual value
    public setTrackerProgressValue(num: number, replace?: boolean) {
        replace
            ? this.trackerProgressValue = num
            : this.trackerProgressValue += num
    }



    // Set buffer value
    public set setBuffer(value: T) {
        this.buffer = value
    }



    // Get tracker function to listen
    public get getTrackerFunction(): TrackerFunction {
        return this.trackerFunc
    }

    // Get buffer value
    public get getBuffer(): T | null {
        return this.buffer
    }

    // Get tracker acutal value
    public get getTrackerProgressValue(): number {
        return this.trackerProgressValue
    }

    // Get tracker maximum value
    public get getTrackerMaxValue(): number {
        return this.trackerMaxValue
    }

    // Get quest name to check if visible quests are repeated
    public get getQuestName(): string {
        return this.name
    }

    // Get quest's required level to check if visible quests are should be available
    public get getQuestRequiredLevel(): number {
        return this.levelRequired
    }
}