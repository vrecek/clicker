import Player from "../Player";
import Upgrade from "../Upgrade";
import u5 from '../../images/upgrades/u5.jpg'

type CPaDPS = [number, number]

const getDPSValue = (dps: number, cp: number): number => dps + Math.sqrt(cp) * .8

const buyFunction = (upg: Upgrade<CPaDPS>, plr: Player): void => {
    const [cp, dps] = upg.getBuffer!

    plr.updateField('clickPower', cp)
    plr.updateField('dps', dps)

    const newValues: CPaDPS = [
        cp + Math.sqrt(dps) * .25,
        getDPSValue(dps, cp)
    ]

    upg.setBuffer = newValues

    upg.setWhatValue = newValues
}

const costIncrementFunction = (owned: number, price: number): number => {
    return owned * (price / 4) / (owned || 1)
}

const refreshFunc = (upg: Upgrade<CPaDPS>, plr: Player): void => {
    const [cp, dps] = upg.getBuffer!

    upg.setWhatValue = [
        cp,
        dps * plr.getInformation<number>('dpsMultiplier')
    ]
}


const Mercenaries: Upgrade<CPaDPS> = new Upgrade<CPaDPS>(
    u5,
    'Mercenaries',
    'Hire a bunch of mercenaries, greatly increasing your overall power',
    'Increases [[click power]] by {{}} and [[DPS]] by {{}}',
    0,
    5000,
    buyFunction,
    costIncrementFunction,
    [1, 2],
    [1, 2],
    refreshFunc
)


export default Mercenaries