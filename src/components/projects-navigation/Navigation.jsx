import React from 'react'
import { Link } from 'gatsby'

import style from './projects-navigation.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes, faInfo, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ location, next, previous, info, back = '/', visible }) {

    const { state = {} } = location
    const { modal } = state

    return (
        <div className={style.container + ' ' + (visible ? "" : style.hidden)} >
            {modal && previous &&
                <Link to={previous} replace className={style.button} style={{ left: 0 }}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>}
            {modal && next &&
                <Link to={next} replace className={style.button} style={{ right: 0 }}>
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
