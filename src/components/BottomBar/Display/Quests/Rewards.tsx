import React from 'react'
import { AiFillGold } from 'react-icons/ai'
import {BsBook} from 'react-icons/bs'
import { RewardValues } from '../../../../interfaces/BottomInterfaces'
import Icon from '../../../Common/Icon'

const Rewards = ({gold, exp}: RewardValues) => {
    return (
        <section className="rewards">

            <p className="rewards">Rewards</p>

            <section>

                <div>
                    <Icon cname='gold'><AiFillGold /></Icon>
                    {gold} 
                </div>

                <div>
                    <Icon cname='exp'><BsBook /></Icon>
                    {exp}
                </div>

            </section>

        </section>
    )  
}

export default Rewards