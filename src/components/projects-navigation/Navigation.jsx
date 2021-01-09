import React from 'react'

import style from './projects-navigation.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ next, previous, info, back, visible }) {
    return (
        <div className={style.container + ' ' + (visible ? "" : style.hidden)} >
            <button className={style.button} style={{ left: 0 }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button className={style.button} style={{ right: 0 }}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <div className={style.buttonContainer} style={{ right: 0, bottom: 0 }} >

                <button className={style.button}>
                    <FontAwesomeIcon icon={faInfo} />
                </button>
                <button className={style.button}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>

        </div>
    )
}
