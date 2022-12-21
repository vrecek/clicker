import React from 'react'
import { AiFillGold } from 'react-icons/ai'
import { UpgradeFunctionality } from '../../interfaces/RightInterfaces'
import Button from '../Common/Button'

const Functionality = ({cost, owned, what, buyFunc}: UpgradeFunctionality) => {
    const iconBuy: JSX.Element = <>{cost} <AiFillGold /></>


    return (
        <section className="functionality">

            <div className='left'>

                <p dangerouslySetInnerHTML={{__html: what}} className="what"></p>
                
                <p className="quantity">x{owned}</p>

            </div>

            <Button action={buyFunc} text='Buy' additional={iconBuy} />

        </section>
    )
}

export default Functionality