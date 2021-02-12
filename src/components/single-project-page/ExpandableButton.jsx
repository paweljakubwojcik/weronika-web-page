import React, { useState, useCallback, useEffect } from 'react'
import style from './projects-navigation.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ icon, children }) => {

    const [isOpen, setOpen] = useState(false)
    const [expandableDOM, setExpandableDOM] = useState(false)

    const handleClick = (e) => {
        setOpen(prev => !prev)
        e.target.blur()
    }

    const close = useCallback((e) => {
        if (!expandableDOM.contains(e.target) && isOpen === true)
            setOpen(false)
    }, [expandableDOM, isOpen])

    useEffect(() => {
        if (expandableDOM) {
            window.addEventListener('click', close)
        }
        return () => {
            window.removeEventListener('click', close)
        }

    }, [expandableDOM, close])

    return (
        <div className={style.expandableContainer + ' ' + (isOpen ? style.open : style.closed)}>
            <button className={style.button}
                onClick={handleClick} >
                <FontAwesomeIcon icon={icon} />
            </button>

            <div
                className={style.expandableContent}
                ref={setExpandableDOM}
                onFocusCapture={() => setOpen(true)}
                
            >
                {children}
            </div>
        </div >
    )
}
