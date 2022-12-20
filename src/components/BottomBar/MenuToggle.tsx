import React from 'react'
import Icon from '../Common/Icon'
import {HiOutlineMenu} from 'react-icons/hi'
import { ToggleArrayOptions } from '../../interfaces/BottomInterfaces'

const MenuToggle = () => {
    const toggleMenu = (e: React.MouseEvent): void => {
        const t: HTMLElement = e.currentTarget as HTMLElement,
              menu: HTMLElement = t.parentElement!,
              displayOption: HTMLElement = menu.children[2] as HTMLElement


        menu.classList.toggle('active')

        const styleValues: ToggleArrayOptions = menu.classList.contains('active')
            ? ['0 100%', '0 calc(-100% - .5em)', '0 0']
            : ['0 0', '0 -50%', '0 -50%']


        menu.style.translate = styleValues[0]
        t.style.translate = styleValues[1]
        displayOption.style.translate = styleValues[2]
    }


    return (
        <Icon cname='toggle-bottom-bar' action={toggleMenu}>
            <HiOutlineMenu />
        </Icon>
    )
}

export default MenuToggle