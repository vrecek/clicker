import Player from "../Player";
import Upgrade from "../Upgrade";
import u4 from '../../images/upgrades/u4.jpg'


const buyFunction = (_: Upgrade, plr: Player): void => {
    plr.updateField('critPower', .01)
}

const costIncrementFunction = (owned: number, price: number): number => {
    const ownedVal: number = owned || 2

    return ownedVal * (price * .05) / Math.cbrt(ownedVal)
}


const MagicFurnace: Upgrade = new Upgrade(
    u4,
    'Magic furnace',
    'Improve your weapon power by enchanting it in a magic furnace',
    'Boost [[crit power]] by [[1%]]',
    0,
    20000,
    buyFunction,
    costIncrementFunction
)


export default MagicFurnace