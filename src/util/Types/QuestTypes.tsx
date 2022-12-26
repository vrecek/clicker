import Game from "../Game"
import Player from "../Player"
import Quest from "../Quest"

export type TrackerFunction = (player: Player, game: Game, quest: Quest) => void

export type RewardRange = {
    min: number
    max: number
}

export type RewardValues = {
    gold: number
    exp: number
}