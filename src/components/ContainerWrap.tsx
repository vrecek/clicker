import React from 'react'
import { Aliases } from '../functions/Client'

const ContainerWrap = ({children}: Aliases.Text<JSX.Element[]>) => {
    return (
        <div className="App">

            <main className="main-container-wrap">

                {children}

            </main>

        </div>
    )
}

export default ContainerWrap