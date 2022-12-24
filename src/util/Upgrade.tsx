import FigureImage from "../components/Common/Image"
import Description from "../components/RightSection/Description"
import Functionality from "../components/RightSection/Functionality"
import Game from "./Game"
import Player from "./Player"

export type BuyAction<T> = (currentUpgrade: Upgrade<T>, player: Player) => void
type CostIncrement = (totalOwned: number, currentPrice: number) => number
type RefreshFunc = (upgrade: Upgrade, player: Player) => void

export default class Upgrade<T = any> {
    private buffer: T | null

    private image: string
    
    private name: string
    private desc: string

    private whatDesc: string
    private whatDescNum: number | number[]

    private owned: number
    private maximum: number

    private cost: number

    private buyFunc: BuyAction<T>
    private costIncrementFunc: CostIncrement
    private refreshFunc: RefreshFunc | null


    public constructor(
        image: string, 
        name: string, 
        desc: string, 
        what: string, 
        maximum: number, 
        initialCost: number, 
        buyFunc: BuyAction<T>, 
        costIncrementFunc: CostIncrement,
        initialWhatNum?: number | number[],
        buffer?: T,
        refreshFunc?: RefreshFunc
    ) {
        this.buffer = buffer ?? null

        this.image = image

        this.name = name
        this.desc = desc

        this.whatDesc = what
        this.whatDescNum = initialWhatNum ?? 0

        this.maximum = maximum
        this.owned = 0
        
        this.cost = initialCost

        this.buyFunc = buyFunc
        this.costIncrementFunc = costIncrementFunc
        this.refreshFunc = refreshFunc ?? null
    }


    private replaceInnerHTML(): string {
        let whatText: string = this.whatDesc
            .replaceAll('[[', '<span>')
            .replaceAll(']]', '</span>')
   

        if(this.whatDescNum) {
            if(typeof this.whatDescNum === 'number') 
                return whatText.replaceAll('{{}}', `<span>${Game.numberFormat(this.whatDescNum)}</span>`)
            

            let i: number = 0
            const whatNumbers: number[] = [...this.whatDescNum]
            
            whatText = whatText.replaceAll('{{}}', () => `<span>${Game.numberFormat(whatNumbers[i++] ?? 'EMPTY')}</span>`)
        }
                 
        
        return whatText
    }


    // Returns upgrade component
    public returnUpgradeComponent(player: Player, iKey: number): JSX.Element {
        const buyAction = () => {
            if(
                this.maximum !== 0 && (this.owned + 1 > this.maximum)
                || player.getInformation<number>('gold') < this.cost
            ) return


            // Execute buyFunc that was passed in the constructor
            // And decerase player's gold
            this.buyFunc(this, player)
            player.updateField('gold', -this.cost)

            // Update current upgrade cost
            this.cost += this.costIncrementFunc(this.owned, this.cost)

            // Increment owned upgrades
            this.owned++

            player.updateState()
        }
        

        // Execute every render
        if(this.refreshFunc)
            this.refreshFunc(this, player)


        // Replace [[]] and {{}} then pass value to the component
        const whatText: string = this.replaceInnerHTML()


        return (
            <article key={iKey} className="upgrade">

                <FigureImage source={this.image} altTxt='Upgrade' />

                <section className="right">

                    <Description desc={this.desc} header={this.name} />
                    <Functionality cost={Game.numberFormat(this.cost)} owned={this.owned} buyFunc={buyAction} what={whatText} />

                </section>

            </article>
        )
    }


    // Returns owned upgrades
    public get getOwned(): number {
        return this.owned
    }

    // Returns upgrade's price
    public get getPrice(): number {
        return this.cost
    }

    // Returns upgrade's price
    public get getBuffer(): T | null {
        return this.buffer
    }

    public get getWhatDescValue() {
        return this.whatDescNum
    }

    // Sets buffer value
    public set setBuffer(value: T) {
        this.buffer = value
    }

    // Sets "whatDescNum" value
    public set setWhatValue(value: number | number[]) {
        this.whatDescNum = value
    }
}