import FigureImage from "../components/Common/Image"
import Description from "../components/RightSection/Description"
import Functionality from "../components/RightSection/Functionality"
import Game from "./Game"
import Player from "./Player"

export type BuyAction = (currentUpgrade: Upgrade, player: Player) => void
type CostIncrement = (totalOwned: number, currentPrice: number) => number


export default class Upgrade {
    public buffer: number | null

    private image: string
    
    private name: string
    private desc: string

    private whatDesc: string
    private whatDescNum: number

    private owned: number
    private maximum: number

    private cost: number

    private buyFunc: BuyAction
    private costIncrementFunc: CostIncrement


    public constructor(
        image: string, 
        name: string, 
        desc: string, 
        what: string, 
        maximum: number, 
        initialCost: number, 
        buyFunc: BuyAction, 
        costIncrementFunc: CostIncrement,
        initialWhatNum?: number,
    ) {
        this.buffer = null

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
    }


    // Returns upgrade component
    public returnUpgradeComponent(player: Player): JSX.Element {
        const buyAction = () => {
            if(
                this.maximum !== 0 && (this.owned + 1 >= this.maximum)
                || player.getGold < this.cost
            ) return


            // Execute buyFunc passed in constructor
            // And decerase player's gold
            this.buyFunc(this, player)
            player.updateGold(-this.cost)

            // Update current upgrade cost
            this.cost += this.costIncrementFunc(this.owned, this.cost)

            // Increment owned upgrades
            this.owned++

            player.updateState()
        }


        // Replace [[]] and {{}} then pass value to the component
        const whatText: string = this.whatDesc.replace('[[', '<span>')
                                              .replace(']]', '</span>')
                                              .replace('{{}}', `<span>${this.whatDescNum!.toString()}</span>`)


        return (
            <article key={2} className="upgrade">

                <FigureImage source={this.image} altTxt='Upgrade' />

                <section className="right">

                    <Description desc={this.desc} header={this.name} />
                    <Functionality cost={Game.fixedValue(this.cost)} owned={this.owned} buyFunc={buyAction} what={whatText} />

                </section>

            </article>
        )
    }


    // Returns owned upgrades
    public get getOwned(): number {
        return this.owned
    }


    // Updates "whatDescNum" value
    public updateWhatValue(value: number) {
        this.whatDescNum = value
    }
}