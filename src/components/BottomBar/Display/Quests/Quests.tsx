import React from 'react'
import '../../../../css/Quests.css'
import ActiveQuest from './Active/ActiveQuest'
import AllQuests from './All/AllQuests'
import QuestsSection from './QuestsSection'

const Quests = () => {
    return (
        <section className="display quests">

            <QuestsSection header='Active quest' element={<ActiveQuest />} />
            <QuestsSection header='Available quests' element={<AllQuests />} />

        </section>
    )
}

export default Quests