import React from 'react'
import { BsBook } from 'react-icons/bs'
import Icon from '../../Common/Icon'
import { PlayerContext } from '../../ContainerWrap'

const Exp = () => {
    const level: number = React.useContext(PlayerContext).getLevel
    
    return (
        <div className="exp">

            <Icon><BsBook /></Icon>
            <p>Lv. {level}</p>

            <span className="fill"></span>

        </div>
    )
}

export default Exp