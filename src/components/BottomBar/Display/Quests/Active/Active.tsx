import React from 'react'
import Button from '../../../../Common/Button'
import Description from './Description'
import Rewards from '../Rewards'
import QuestProgress from './QuestProgress'

const Active = () => {
    return (
        <article className="active">

            <Description />

            <QuestProgress />

            <Rewards />

            <Button cname='cancel' text='Cancel' />

        </article>
    )
}

export default Active