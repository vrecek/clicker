import React from 'react'

type ImageOptions = {
    source: string
    altTxt?: string
    cname?: string
    action?: (e: React.MouseEvent, src: string) => void
} 

const FigureImage = ({cname, source, altTxt, action}: ImageOptions) => {
    const actionFunc = action
        ? (e: React.MouseEvent) => action(e, source)
        : () => {}


    return (
        <figure onClick={actionFunc} className={cname ?? ''}>

            <img draggable='false' src={source} alt={altTxt ?? 'Image'} loading='lazy' />

        </figure>
    )
}

export default FigureImage