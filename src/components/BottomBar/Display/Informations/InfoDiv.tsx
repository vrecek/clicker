import React from 'react'
import { BottomInformation } from '../../../../interfaces/BottomInterfaces'

const InfoDiv = ({header, list}: BottomInformation) => {
    return (
        <div className="information">

            <p className="header">{header}</p>

            <ul>

                {
                    list.map((x, i) => (
                        <li key={i}>

                            <p className="what">{x.what}</p>
                            <p className="value">{x.value}</p>

                        </li>
                    ))
                }

            </ul>

        </div>
    )
}

export default InfoDiv