import React from 'react'
import { QuestsContainer } from '../../../../interfaces/BottomInterfaces'

const QuestsSection = ({header, element}: QuestsContainer) => {
    return (
        <section className='quest-section'>

            <p className="header">{header}</p>

            {element}

        </section>
    )
}

export default QuestsSection