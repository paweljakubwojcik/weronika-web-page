import React from 'react'
import style from './accent.module.scss'

export default function akcent({ children, className, ...rest }) {
    return (
        <div className={style.akcent + ' ' + className} {...rest}>
            {children}
        </div>
    )
}
