import React from 'react'
import { DisplayFunc, DisplayOption } from '../../interfaces/BottomInterfaces'
import Icon from '../Common/Icon'
import {BiTime} from 'react-icons/bi'
import {FaScroll} from 'react-icons/fa'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const DisplayToggle = ({changeFunc}: DisplayFunc) => {
    return (
        <section className="display-toggle">

            <Icon cname='active' action={(e) => changeFunc(e, DisplayOption.SKILLS)}>
                <BiTime />
            </Icon>

            <Icon action={(e) => changeFunc(e, DisplayOption.QUESTS)}>
                <FaScroll />
            </Icon>

            <Icon action={(e) => changeFunc(e, DisplayOption.INFORMATIONS)}>
                <AiOutlineInfoCircle />
            </Icon>

        </section>
    )
}

export default DisplayToggle