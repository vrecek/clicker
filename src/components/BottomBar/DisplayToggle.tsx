import React from 'react'
import { DisplayFunc, DisplayOption, ToggleOptions } from '../../interfaces/BottomInterfaces'
import Icon from '../Common/Icon'
import {BiTime} from 'react-icons/bi'
import {FaScroll} from 'react-icons/fa'
import {AiOutlineInfoCircle} from 'react-icons/ai'

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

        </section>
    )
}

export default DisplayToggle