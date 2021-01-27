import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import style from './button.module.scss'
import Shadow from '../../assets/svg/Shadow.svg'

export default function Button({ children, className, as = 'link', ...rest }) {
    return (
        <div className={style.button__container + ' ' + className}>
            {
                as === 'button' ?
                    (
                        <button className={style.button} {...rest}>
                            {children}
                        </button>
                    ) : (
                        <Link className={style.button} {...rest}>
                            {children}
                        </Link>
                    )
            }
            <Shadow className={style.button__shadow} />
        </div >

    )
}

Button.propTypes = {
    as: PropTypes.oneOf(['link', 'button'])
}
