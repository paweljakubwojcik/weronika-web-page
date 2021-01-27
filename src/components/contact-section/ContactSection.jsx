import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import MailForm from './MailForm'

const buttons = [
    {
        name: 'mail',
        icon: faEnvelope
    },
    {
        name: 'messenger',
        icon: faFacebookMessenger
    },
    {
        name: 'phone',
        icon: faPhone
    },
]

export default function ContactSection() {

    const [active, setActive] = useState('mail')


    return (
        <div className='contact-section__content'>
            <MailForm />
            <Switch active={active} setActive={setActive} />
        </div>
    )
}


const Switch = ({ active, setActive }) => {
    return (
        <ul className='switch'>
            {
                buttons.map(({ name, icon }) =>
                    <li
                        className={`switch__element 
                        ${active === name ? 'switch__element--active' : ''}`}
                        key={name}>
                        <button className="switch__button"
                            name={name}
                            role='button'
                            onClick={() => setActive(name)}>
                            <FontAwesomeIcon icon={icon} />
                        </button>
                    </li>
                )
            }
        </ul>
    )
}

