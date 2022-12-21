import React from 'react'
import { AiFillGold } from 'react-icons/ai'
import Button from '../Common/Button'

const Functionality = () => {
    const iconBuy: JSX.Element = <>999 <AiFillGold /></>

    return (
        <section className="functionality">

            <div>

                <p className="what">Increases <span>click power</span> by <span>5</span></p>
                <p className="quantity">x999</p>

            </div>

            <Button text='Buy' additional={iconBuy} />

        </section>
    )
}

export default Functionality