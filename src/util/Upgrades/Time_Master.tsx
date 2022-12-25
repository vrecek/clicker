import Upgrade from "../Upgrade";
import u7 from '../../images/upgrades/u7.jpg'
import Player from '../Player'


const buyFunction = (_: Upgrade, plr: Player): void => {
    plr.updateField('skillCooldown', 1)
}

const costIncrementFunction = (owned: number, cost: number): number => {
    const ownedVal: number = owned || 1

    return (cost / 1.5) + (100 - ownedVal) * ownedVal
} 


const TimeMaster: Upgrade = new Upgrade(
    u7,
    'Time master',
    'Get your special watch from the future which has the ability to control time',
    'Reduces [[skill cooldown]] by [[1%]]',
    95,
    150000,
    buyFunction,
    costIncrementFunction
)


export default TimeMaster