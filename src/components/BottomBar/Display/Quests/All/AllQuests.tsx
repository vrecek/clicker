import React from 'react'
import Game from '../../../../../util/Game'
import { GameContext } from '../../../../ContainerWrap'

const AllQuests = () => {
    const GAME: Game = React.useContext(GameContext)


    return (
        <section className="all-quests">

            { 
                GAME.drawQuests() 
            }

        </section>
    )
}

export default AllQuests