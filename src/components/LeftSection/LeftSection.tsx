import React from 'react'
import '../../css/LeftSection.css'
import Click from './Click'
import Progress from './Progress/Progress'

const LeftSection = () => {
    return (
        <section className="left-section">

            <Progress />

            <Click />

        </section>
    )
}

export default LeftSection