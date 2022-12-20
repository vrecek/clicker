import React from 'react'

type ButtonOptions = {
    text: string
    additional?: JSX.Element | string | number
    cname?: string
    action?: React.MouseEventHandler
}

const Button = ({text, additional, action, cname}: ButtonOptions) => {
    const defStyle: React.CSSProperties = {pointerEvents: 'none'}


    return (
        <button onClick={action} className={cname ?? ''}>

            <label style={defStyle}>

                {text}

            </label>

            {
                additional
                    && <span style={defStyle}>

                            {additional}

                        </span>
            }

        </button>
    )
}

export default Button