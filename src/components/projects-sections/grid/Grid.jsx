import React from 'react'
import style from './grid.module.scss'

export default function Grid({ children, ...rest }) {
    return (
        <div className={style.container}>
            {children}
        </div>
    )
}