import React, { useCallback, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'

import style from './projects-navigation.module.scss'

import ExpandableButton from './ExpandableButton'
import Info from './Info'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes, faInfo, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ state, next, prev, info, visible = true, children }) {

    const modal = state?.modal

    return (
        <div className={style.container + ' ' + (visible ? "" : style.hidden)}>
            {modal && prev && <Arrow to={prev} dir='left' state={state} />}
            {modal && next && <Arrow to={next} dir='right' state={state} />}
            <Navigation.ButtonsContainer >
                {children}
                {info &&
                    <ExpandableButton icon={faInfo}>
                        <Info info={info} />
                    </ExpandableButton>}
                {modal ?
                    <button onClick={() => window.history.back()} className={style.button}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    :
                    <Link to='/projekty' className={style.button}>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                }
            </Navigation.ButtonsContainer>
        </div>
    )
}

Navigation.ButtonsContainer = ({ children }) => {
    return (
        <div className={style.buttonContainer} style={{ right: 0, bottom: 0 }} >
            {children}
        </div>
    )
}

export const Arrow = ({ dir = 'right', to, state, ...rest }) => {

    const styles = dir === 'left' ? { left: 0 } : { right: 0 }
    const icon = dir === 'left' ? faArrowLeft : faArrowRight
    const keyCode = dir === 'left' ? 37 : 39

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === keyCode) {
            navigate(to, { state, replace: true })
        }
    }, [to, state, keyCode])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    return (
        <Link
            to={to}
            replace
            className={style.button}
            style={styles}
            state={state}
            {...rest}
        >
            <FontAwesomeIcon icon={icon} />
        </Link>
    )
}

Navigation.ExpandableButton = ExpandableButton
