import React from 'react'
import FigureImage from '../Common/Image'
import Description from './Description'
import Functionality from './Functionality'

const Upgrade = () => {
    return (
        <article className="upgrade">

            <FigureImage source='https://wallpaperaccess.com/full/13189.jpg' altTxt='Upgrade' />

            <section className="right">

                <Description />
                <Functionality />

            </section>

        </article>
    )
}

export default Upgrade