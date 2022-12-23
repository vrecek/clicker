// Aliases to export
namespace Aliases {
    export type Possible<T> = T | null | undefined



    export type Text<T = string> = {
        children: T
    } 

    export type Form = HTMLFormElement
    export type Input = HTMLInputElement
    export type Elem = HTMLElement

    export type Coll<T extends Element> = HTMLCollectionOf<T> 
    export type Inputs = HTMLCollectionOf<Input>
}


export type {
    Aliases
}