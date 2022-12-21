import React from 'react'
import { UpgradeDescription } from '../../interfaces/RightInterfaces'

const Description = ({desc, header}: UpgradeDescription) => {
    return (
        <section className="description">

            <p className="header">{header}</p>
            <p className="text">{desc}</p>

        </section>
    )
}

export default Description