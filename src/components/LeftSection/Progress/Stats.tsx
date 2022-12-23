import React from 'react'
import Icon from '../../Common/Icon'
import {GiBroadsword} from 'react-icons/gi'
import Player from '../../../util/Player'
import { PlayerContext } from '../../ContainerWrap'
import {MdTimelapse} from 'react-icons/md'

const Stats = () => {
    const plr: Player = React.useContext(PlayerContext)
    
    return (
        <div className="stats">

            <p>
                <Icon><GiBroadsword /></Icon>
                {plr.getInformation<string>('clickPower', true)}
            </p>

            <p>
                {plr.getInformation<string>('dps', true)}
                <Icon><MdTimelapse /></Icon>
            </p>

        </div>
    )
}

export default Stats