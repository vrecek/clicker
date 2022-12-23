import React from 'react'
import Exp from './Exp'
import Gold from './Gold'
import Stats from './Stats'

const Progress = () => {
    return (
        <section className="progress">

            <Gold />
            <Exp />
            <Stats />

        </section>
    )
}

export default Progress