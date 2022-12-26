import Player from "../Player"
import Skill from "../Skill"

export type OnHoverInfo = {
    name: string
    desc: string
    what: string
}

export type ClickAction = (player: Player, skill: Skill) => void
