import React from 'react'
import { Link } from 'gatsby'
import style from './button.module.scss'
import Shadow from '../../assets/svg/Shadow.svg'

export default function Button({ children, className, ...rest }) {


    return (
        <div className={style.button__container + ' ' + className}>
            <Link className={style.button} {...rest}>
                {children}
            </Link>
            <Shadow className={style.button__shadow} />
        </div>

    )
}
