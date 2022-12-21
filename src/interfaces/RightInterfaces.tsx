import { BuyAction } from "../util/Upgrade"

export type UpgradeDescription = {
    header: string
    desc: string
}

export type UpgradeFunctionality = {
    owned: number
    cost: number
    what: string
    buyFunc: () => void
}