import React from 'react'
import Button from '../../../../Common/Button'
import Description from './Description'
import Rewards from '../Rewards'

const Active = () => {
    return (
        <article className="active">

            <Description />

            <Rewards />

            <Button cname='cancel' text='Cancel' />

        </article>
    )
}

export default Active