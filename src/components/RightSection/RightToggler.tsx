import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Icon from '../Common/Icon'

const RightToggler = () => {
    const toggleUpgrades = (e: React.MouseEvent): void => {
        const arrow: HTMLElement = e.currentTarget! as HTMLElement,
              container: HTMLElement = arrow.parentElement! as HTMLElement



        if(container.classList.toggle('visible')) {
            container.style.translate = '0 0'
            arrow.style.translate = '0 -50%'
            arrow.style.rotate = '180deg'

            return
        }

        container.style.translate = '-100% 0'
        arrow.style.translate = '100vw -50%'
        arrow.style.rotate = '0deg'
    }


    return (
        <Icon action={toggleUpgrades} cname='upgrades-toggler'>
            <AiOutlineArrowLeft />
        </Icon>
    )
}

export default RightToggler