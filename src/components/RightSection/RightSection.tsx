import React from 'react'
import '../../css/RightSection.css'
import Game from '../../util/Game'
import { GameContext } from '../ContainerWrap'
import RightToggler from './RightToggler'

const RightSection = () => {
    const GAME: Game = React.useContext(GameContext)


    return (
        <section className="right-section">

            <section className="container">
                {
                    GAME.drawUpgrades()
                }
            </section>

            <RightToggler />

        </section>
    )
}

export default RightSection