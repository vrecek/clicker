import Player from "../Player";
import Upgrade from "../Upgrade";
import u1 from '../../images/upgrades/u1.jpg'


const buyFunction = (upg: Upgrade<number>, player: Player): void => {
    player.updateField('clickPower', upg.getBuffer!)

    const newValue: number = ( Math.cbrt(upg.getOwned) * Math.sqrt(upg.getOwned) ) || 1 

    upg.setBuffer = newValue

    upg.setWhatValue = newValue
}

const costIncrementFunction = (owned: number, price: number): number => {
    return Math.sqrt(owned * 1.25 * price) 
           + Math.sqrt( price / (owned || 1) )
}


const PrimaryWeapon: Upgrade<number> = new Upgrade<number>(
    u1,
    'Primary weapon',
    'Your basic weapon to help you fight against monsters encountered in your journey',
    'Increases [[click power]] by {{}}',
    0,
    20,
    buyFunction,
    costIncrementFunction,
    1,
    1
)


export default PrimaryWeapon