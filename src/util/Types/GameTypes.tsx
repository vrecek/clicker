import Quest from "../Quest"
import Upgrade from "../Upgrade"

export type MainInterval = () => void
export type Totals = 'totalClicks' | 'totalUpgrades' | 'totalSkillsUsed' | 'totalSecondsPlayed'

export type GameObjectData = {
    totalSecondsPlayed: number
    totalClicks: number
    totalUpgrades: number
    totalSkillsUsed: number
    upgrades: Upgrade[]
    visibleQuests: Quest[]
    activeQuest: Quest | null
}

export type PlayerObjectData = {
    totalGold: number
    gold: number

    clickPower: number

    critChance: number
    critPower: number

    dps: number
    originalDps: number

    level: number
    exp: number
    expRequired: number

    dpsMultiplier: number
    expMultiplier: number

    skillCooldown: number
}

export type keys = keyof PlayerObjectData