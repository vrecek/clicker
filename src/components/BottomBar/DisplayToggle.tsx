import React from 'react'
import { DisplayOption, ToggleOptions } from '../../interfaces/BottomInterfaces'
import Icon from '../Common/Icon'
import {BiTime} from 'react-icons/bi'
import {FaScroll} from 'react-icons/fa'
import {AiFillSave, AiOutlineInfoCircle} from 'react-icons/ai'

const DisplayToggle = ({changeFunc, containerRef}: ToggleOptions) => {
    return (
        <section ref={containerRef} className="display-toggle">

            <Icon cname='active' action={(e) => changeFunc(e.currentTarget! as HTMLElement, DisplayOption.SKILLS)}>
                <BiTime />
            </Icon>

            <Icon action={(e: React.MouseEvent) => changeFunc(e.currentTarget! as HTMLElement, DisplayOption.QUESTS)}>
                <FaScroll />
            </Icon>

            <Icon action={(e) => changeFunc(e.currentTarget! as HTMLElement, DisplayOption.INFORMATIONS)}>
                <AiOutlineInfoCircle />
            </Icon>

            <Icon action={(e) => changeFunc(e.currentTarget! as HTMLElement, DisplayOption.PROGRESS)}>
                <AiFillSave />
            </Icon>

        </section>
    )
}

export default DisplayToggle