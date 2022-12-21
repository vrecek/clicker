import { Aliases } from "../functions/Client";

export type StateUpdate = React.Dispatch<React.SetStateAction<boolean>>

export type WrapOptions = Aliases.Text<JSX.Element[]> & {
    updater: StateUpdate
}