export enum DisplayOption {
    SKILLS = '0',
    QUESTS = '1',
    INFORMATIONS = '2',
    PROGRESS = '3'
}

export type DisplayFunc = {
    changeFunc: (e: HTMLElement, section: DisplayOption) => void
}

export type ToggleOptions = DisplayFunc & {
    containerRef: React.RefObject<HTMLDivElement>
}

export type ToggleArrayOptions = [string, string, string]

export type QuestsContainer = {
    element: JSX.Element
    header: string
}

export type BottomInformation = {
    header: string
    list: BottomList[]
}

export type BottomList = {
    what: string
    value: string | number
}

export type RewardValues = {
    gold: number
    exp: number
}

export type QuestDescription = {
    name: string
    desc: string
}

export type QuestTracking = {
    trackerMax: number
    trackerCurrent: number
    target: string
}