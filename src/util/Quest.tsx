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

    private trackerMaxValue: number | null
    private trackerProgressValue: number | null
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
        trackerMaxValue?: number,
        trackerProgressValue?: number
    ) {
        this.expRange = expRange
        this.goldRange = goldRange

        this.rewardValues = null

        this.levelRequired = levelRequired

        this.name = name
        this.desc = desc
        this.target = target

        this.trackerFunc = trackerFunc
        this.trackerMaxValue = trackerMaxValue ?? null
        this.trackerProgressValue = trackerProgressValue ?? null

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
    public deleteRewardValues(): void {
        this.rewardValues = null
    }

    // Returns true if quest should be added
    public static shouldAddNewQuest(): boolean {
        const num: number = ~~(Math.random() * 100) + 1

        return num !== 1
            ? true
            : false
    }

    // Returns active quest component
    public returnActiveQuestComponent(player: Player): JSX.Element {
        return (
            <article className="active">

                <Description />

                <QuestProgress />

                <Rewards gold={5} exp={5} />

                <Button cname='cancel' text='Cancel' />

            </article>
        )
    }

    // Returns pending quest component
    public returnQuestComponent(player: Player, game: Game, iKey: number): JSX.Element {
        this.checkForRewardValues()

        const {gold, exp} = this.rewardValues!

        // action -> accept / cancel
        return (
            <article key={iKey} className="available">

                <p className="available-header">{this.name}</p>
                <p className="mission">{this.target}</p>

                <Rewards exp={exp} gold={gold} />

                <section className="options">

                    <Button cname='accept' text='Accept' />
                    <Button cname='trash' text='Trash' />

                </section>

            </article>
        )
    }



    // Set tracker actual value
    public set setTrackerProgressValue(num: number) {
        this.trackerProgressValue = num
    }



    // Get buffer value
    public get getBuffer(): T | null {
        return this.buffer
    }

    // Get tracker acutal value
    public get getTrackerProgressValue(): number | null {
        return this.trackerProgressValue
    }

    // Get tracker maximum value
    public get getTrackerMaxValue(): number | null {
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