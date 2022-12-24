import Upgrade from "../Upgrade";
import u2 from '../../images/upgrades/u2.jpg'
import Player from "../Player";


const buyFunction = (upg: Upgrade<number>, player: Player): void => {
    player.updateField('dps', upg.getBuffer!)

    const newValue: number = upg.getOwned * Math.cbrt(upg.getOwned / 2) || 1 
    
    upg.setBuffer = newValue

    upg.setWhatValue = newValue
}

const costIncrementFunction = (owned: number, price: number): number => Math.sqrt(price * owned)

const refreshFunc = (upg: Upgrade, plr: Player): void => {
    // console.log('xd')
    
}


const Henchman: Upgrade<number> = new Upgrade<number>(
    u2,
    'Henchman',
    "Let your henchman help you, by joining to your team",
    'Increases [[DPS]] by {{}}',
    0,
    200,
    buyFunction,
    costIncrementFunction,
    1,
    1,
    refreshFunc
)


export default Henchman