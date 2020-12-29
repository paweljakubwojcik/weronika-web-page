import React from 'react'
import style from './button.module.scss'
import Shadow from '../../assets/svg/Shadow.svg'

export default function Button({ children, className, ...rest }) {


    return (
        <div className={style.button__container}>
            <button className={style.button + ' ' + className} {...rest}>
                {children}
            </button>
            <Shadow className={style.button__shadow} />
        </div>

    )
}
