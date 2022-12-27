import React from 'react'
import { AiFillSave } from 'react-icons/ai'
import '../../../../css/Progress.css'
import Game from '../../../../util/Game'
import Button from '../../../Common/Button'
import Icon from '../../../Common/Icon'
import { GameContext } from '../../../ContainerWrap'
import ProgressInformation from './ProgressInformation'
import {RiDeleteBin6Fill} from 'react-icons/ri'

const Progress = () => {
    const GAME: Game = React.useContext(GameContext)


    return (
        <section className="display progress">

            <ProgressInformation />

            <div>
                <Icon><AiFillSave /></Icon>
                <Button action={() => GAME.saveProgress()} text='Save progress' cname='save' />
            </div>

            <div>
                <Icon><RiDeleteBin6Fill /></Icon>
                <Button action={() => GAME.deleteProgress()} text='Delete progress' cname='delete' />
            </div>

        </section>
    )
}

export default Progress