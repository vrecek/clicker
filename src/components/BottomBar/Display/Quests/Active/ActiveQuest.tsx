import React from 'react'
import Game from '../../../../../util/Game'
import { GameContext } from '../../../../ContainerWrap'

const ActiveQuest = () => {
    const GAME: Game = React.useContext(GameContext)


    return (
        <section className="active-quest">

            { GAME.drawActiveQuest() }

        </section>
    )
}

export default ActiveQuest