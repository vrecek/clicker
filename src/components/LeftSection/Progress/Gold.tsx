import React from 'react'
import { AiFillGold } from 'react-icons/ai'
import Icon from '../../Common/Icon'
import { PlayerContext } from '../../ContainerWrap'

const Gold = () => {
    const currentGold: number = React.useContext(PlayerContext).getGold

    return (
        <div className="gold">

            <Icon><AiFillGold /></Icon>
            <p>{currentGold}</p>

        </div>
    )
}

export default Gold