import React from 'react'
import '../../../../css/Skills.css'
import Game from '../../../../util/Game'
import { GameContext } from '../../../ContainerWrap'

const Skills = () => {
    const GAME: Game = React.useContext(GameContext)


    return (
        <section className="display skills">

            { GAME.drawSkills() }

        </section>
    )
}

export default Skills