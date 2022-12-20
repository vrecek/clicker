import React from 'react'
import { AiFillGold } from 'react-icons/ai'
import {BsBook} from 'react-icons/bs'
import Icon from '../../../Common/Icon'

const Rewards = () => {
    return (
        <section className="rewards">

            <p className="rewards">Rewards</p>

            <section>

                <div>
                    <Icon cname='gold'><AiFillGold /></Icon>
                    8678 
                </div>

                <div>
                    <Icon cname='exp'><BsBook /></Icon>
                    1231
                </div>

            </section>

        </section>
    )  
}

export default Rewards