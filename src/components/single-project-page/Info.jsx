import React, { useEffect, useState } from 'react'
import style from './projects-navigation.module.scss'

export default ({ info }) => {
    const [descriptionDOM, setDescriptionDOM] = useState(false)

    useEffect(() => {
        if (descriptionDOM) {
            const info = descriptionDOM.innerHTML
            const formatedInfo = info.replace(/\*{2}.+\*{2}/g, '<strong>$&</strong>')
                .replace(/\*{2}/g, '')
                .replace(/\*{1}.+\*{1}/g, '<i>$&</i>')
                .replace(/\*{1}/g, '')
            descriptionDOM.innerHTML = formatedInfo
        }
    }, [descriptionDOM])

    return (
        <p className={style.info} ref={setDescriptionDOM}>
            {info}
        </p>
    )
}
