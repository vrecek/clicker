import Player from "../Player"
import Upgrade from "../Upgrade"

export type BuyAction<T> = (currentUpgrade: Upgrade<T>, player: Player) => void
export type CostIncrement = (totalOwned: number, currentPrice: number) => number
export type RefreshFunc = (upgrade: Upgrade, player: Player) => void
export type PossibleGen<T> = T | null