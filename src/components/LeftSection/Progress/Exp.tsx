import React from 'react'
import { BsBook } from 'react-icons/bs'
import Player from '../../../util/Player'
import Icon from '../../Common/Icon'
import { PlayerContext } from '../../ContainerWrap'

const Exp = () => {
    const PLAYER: Player = React.useContext(PlayerContext), 
          level: number = PLAYER.getInformation('level')


    PLAYER.handleLevelProgress()
    

    return (
        <div className="exp">

            <Icon><BsBook /></Icon>
            <p>Lv. {level}</p>

            <span className="fill-exp-bar"></span>

        </div>
    )
}

export default Exp