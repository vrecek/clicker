import Player from "../Player";
import Upgrade from "../Upgrade";
import u3 from '../../images/upgrades/u3.jpg'


const buyFunction = (_: Upgrade, plr: Player): void => {
    plr.updateField('critChance', 1)
}

const costIncrementFunction = (owned: number): number => {
    return owned * (15000 - owned * 2) + 4000
}


const Blacksmith: Upgrade = new Upgrade(
    u3,
    'Blacksmith',
    "Modify your sword's edges, making it more dependant on luck",
    'Increases [[crit chance]] by [[1%]]',
    100,
    2000,
    buyFunction,
    costIncrementFunction
)


export default Blacksmith