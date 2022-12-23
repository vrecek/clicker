export type UpgradeDescription = {
    header: string
    desc: string
}

export type UpgradeFunctionality = {
    owned: number
    cost: string
    what: string
    buyFunc: () => void
}