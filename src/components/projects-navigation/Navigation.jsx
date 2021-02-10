import React, { useCallback, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'

import style from './projects-navigation.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes, faInfo, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ state, next, prev, info, visible }) {

    const modal = state?.modal


    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 37) {
            /* Left arrow. */
            navigate(prev, { state, replace: true })
        } else if (event.keyCode === 39) {
            /* Right arrow. */
            navigate(next, { state, replace: true })
        }
    }, [prev, next, state])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])


    return (
        <div className={style.container + ' ' + (visible ? "" : style.hidden)}>
            {modal && prev &&
                <Link
                    to={prev}
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
                {info && <InfoButton info={info} />}
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


const InfoButton = ({ info }) => {
    const [isOpen, setOpen] = useState(false)
    const [descriptionDOM, setDescriptionDOM] = useState(false)

    const handleClick = (e) => {
        e.target.blur()
        setOpen(prev => !prev)
    }

    const closeInfo = useCallback((e) => {
        if (e.target !== descriptionDOM && isOpen === true)
            setOpen(false)
    }, [descriptionDOM, isOpen])

    useEffect(() => {
        if (descriptionDOM) {
            const info = descriptionDOM.innerHTML
            const formatedInfo = info.replace(/\*{2}.+\*{2}/g, '<strong>$&</strong>')
                .replace(/\*{2}/g, '')
                .replace(/\*{1}.+\*{1}/g, '<i>$&</i>')
                .replace(/\*{1}/g, '')
            descriptionDOM.innerHTML = formatedInfo
            window.addEventListener('click', closeInfo)
        }
        return () => {
            window.removeEventListener('click', closeInfo)
        }

    }, [descriptionDOM, closeInfo])

    return (
        <div className={style.infoContainer + ' ' + (isOpen ? style.open : style.closed)}>
            <button className={style.button} onClick={handleClick}>
                <FontAwesomeIcon icon={faInfo} />
            </button>

            <div className={style.info} ref={setDescriptionDOM}>
                {info}
            </div>
        </div >)
}
