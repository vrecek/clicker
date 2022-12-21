import React from 'react'
import '../../css/RightSection.css'
import Game from '../../util/Game'
import Player from '../../util/Player'
import { GameContext, PlayerContext } from '../ContainerWrap'

const RightSection = () => {
    const GAME: Game = React.useContext(GameContext),
          PLAYER: Player = React.useContext(PlayerContext)


    return (
        <section className="right-section">

            {
                GAME.drawUpgrades(PLAYER)
            }

        </section>
    )
}

export default RightSection