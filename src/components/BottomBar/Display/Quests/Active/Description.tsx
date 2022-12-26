import React from 'react'
import { QuestDescription } from '../../../../../interfaces/BottomInterfaces'

const Description = ({name, desc}: QuestDescription) => {
    return (
        <section className="description">

            <p className="quest-header">{name}</p>
            <p className="desc">{desc}</p>

        </section>
    )
}

export default Description