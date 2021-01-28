import React from 'react'

import style from './shadow.module.scss'
import Shadow from '../../assets/svg/Shadow_thingy.svg'
import BigShadow from '../../assets/svg/Big_shadow_thingy.svg'

export default ({ className, big, ...rest }) => {

    const ShadowElement = big ? BigShadow : Shadow

    return (
        <ShadowElement className={style.shadow + ' ' + className} {...rest} />
    )
}
