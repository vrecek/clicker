import Player from "../Player"
import Upgrade from "../Upgrade"
import u6 from '../../images/upgrades/u6.jpg'


const buyFunction = (_: Upgrade, plr: Player): void => {
    plr.updateField('dpsMultiplier', .02)
}

const costIncrementFunction = (owned: number, cost: number): number => {
    const ownedVal: number = owned || 1

    return ownedVal * ((cost * .5) / ownedVal) 
}


const GearUpgrade: Upgrade = new Upgrade(
    u6,
    'Gear upgrade',
    "Get new upgrades for your crew's equipment, permanently increasing its outcome",
    'Multiplies all [[DPS]] by [[0.2%]]',
    0,
    50000,
    buyFunction,
    costIncrementFunction,
)


export default GearUpgrade