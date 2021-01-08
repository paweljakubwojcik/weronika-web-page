import React from 'react'

import SVG from '../../assets/svg/background_thing.svg'
import style from './background-thing.module.scss'

export default function BackgroundThing({ ...rest }) {
    return (
        <SVG className={style.thing} {...rest} />
    )
}
