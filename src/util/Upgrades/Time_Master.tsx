import Upgrade from "../Upgrade";
import u7 from '../../images/upgrades/u7.jpg'
import Player from '../Player'


const buyFunction = (_: Upgrade, plr: Player): void => {
    plr.updateField('skillCooldown', 1)
}

const costIncrementFunction = (): number => {
    return 1
} 


const TimeMaster: Upgrade = new Upgrade(
    u7,
    'Time master',
    'desc',
    'Reduces [[skill cooldown]] by [[1%]]',
    95,
    150000,
    buyFunction,
    costIncrementFunction
)


export default TimeMaster