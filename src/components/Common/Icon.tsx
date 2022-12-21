import React from 'react'
import { Aliases } from '../../util/Client'

type IconOptions = Aliases.Text<JSX.Element> & {
    cname?: string,
    reference?: any
    action?: React.MouseEventHandler
}

const Icon = ({children, cname, action, reference}: IconOptions) => {
    return (
        <span ref={reference} onClick={action} className={cname ?? ''}>

            {children}

        </span>
    )
}

export default Icon