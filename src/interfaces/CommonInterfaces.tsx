import { Aliases } from "../util/Client";

export type StateUpdate = React.Dispatch<React.SetStateAction<boolean>>

export type WrapOptions = Aliases.Text<JSX.Element[]> & {
    updater: StateUpdate
}