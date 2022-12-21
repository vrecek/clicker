import Player from "../Player";
import Upgrade from "../Upgrade";

const randomPower = (owned: number, clickPower: number): number => {
    const div1: number = (owned + clickPower) / 1.25,
          sqrt: number = Math.sqrt(owned + clickPower),
          div2: number = Math.floor(owned / 5)


    return (Math.ceil(div1) - clickPower) 
                            + 1 
                            - Math.floor(sqrt - 1) 
                            + Math.floor(Math.random() * div2)
}

const buyFunction = (upg: Upgrade, player: Player): void => {
    player.updateClickPower(upg.buffer ?? randomPower(upg.getOwned, player.getClickPower))

    upg.buffer = randomPower(upg.getOwned, player.getClickPower)

    upg.updateWhatValue(upg.buffer)
}

const costIncrementFunction = (owned: number, price: number): number => {
    return (owned * price) / (Math.floor(Math.random() * owned) || 1) - Math.random() * price + price
}


const PrimaryWeapon: Upgrade = new Upgrade(
    'https://wallpaperaccess.com/full/13189.jpg',
    'Primary weapon',
    'Your basic weapon to help you fight against monsters encountered in your journey',
    'Increases [[click power]] by {{}}',
    0,
    10,
    buyFunction,
    costIncrementFunction,
    1
)


export default PrimaryWeapon