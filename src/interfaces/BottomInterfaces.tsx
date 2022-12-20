export enum DisplayOption {
    SKILLS = 'SKILLS',
    QUESTS = 'QUESTS',
    INFORMATIONS = 'INFORMATIONS'
}

export type DisplayFunc = {
    changeFunc: (e: React.MouseEvent, section: DisplayOption) => void
}

export type ToggleArrayOptions = [string, string, string]

export type QuestsContainer = {
    element: JSX.Element
    header: string
}