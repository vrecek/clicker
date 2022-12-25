import Player from "../Player"

export type OnHoverInfo = {
    name: string
    desc: string
    what: string
}

export type ClickAction = (player: Player) => void
