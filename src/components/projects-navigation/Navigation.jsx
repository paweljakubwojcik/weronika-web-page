import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'

import style from './projects-navigation.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes, faInfo, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ state, next, previous, info, visible }) {

    const modal = state?.modal

    const handleKeyDown = (event) => {
        if (event.keyCode === 37) {
            /* Left arrow. */
            navigate(previous, { state, replace: true })
        } else if (event.keyCode === 39) {
            /* Right arrow. */
            navigate(next, { state, replace: true })
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])


    return (
        <div className={style.container + ' ' + (visible ? "" : style.hidden)} onKeyDown={() => console.log('key')}>
            {modal && previous &&
                <Link
                    to={previous}
                    state={state}
                    replace
                    className={style.button}
                    style={{ left: 0 }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>}
            {modal && next &&
                <Link to={next}
                    replace
                    state={state}
                    className={style.button}
                    style={{ right: 0 }}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>}

            <div className={style.buttonContainer} style={{ right: 0, bottom: 0 }} >
                <button className={style.button}>
                    <FontAwesomeIcon icon={faInfo} />
                </button>
                {modal ?
                    <button onClick={() => window.history.back()} className={style.button}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    :
                    <Link to='/projects' className={style.button}>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                }
            </div>

        </div>
    )
}
