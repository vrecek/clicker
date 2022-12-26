import React from 'react'
import { QuestTracking } from '../../../../../interfaces/BottomInterfaces'

const QuestProgress = ({target, trackerMax, trackerCurrent}: QuestTracking) => {
    return (
        <section className="quest-progress">

            <p className="progress">Progress</p>

            <p className="mission">{target}</p>

            <div>

                {trackerCurrent} / {trackerMax}

            </div>

        </section>
    )
}

export default QuestProgress