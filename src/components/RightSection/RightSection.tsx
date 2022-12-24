import React from 'react'
import '../../css/RightSection.css'
import Game from '../../util/Game'
import { GameContext, PlayerContext } from '../ContainerWrap'

const RightSection = () => {
    const GAME: Game = React.useContext(GameContext)


    return (
        <section className="right-section">

            {
                GAME.drawUpgrades()
            }

        </section>
    )
}

export default RightSection