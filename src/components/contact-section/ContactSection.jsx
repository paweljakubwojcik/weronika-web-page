import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import MailForm from './MailForm'
import PhoneNumber from './PhoneNumber'

const buttons = [
    {
        name: 'mail',
        icon: faEnvelope,
        component: <MailForm />
    },
    {
        name: 'messenger',
        icon: faFacebookMessenger,
        component: <div />
    },
    {
        name: 'phone',
        icon: faPhone,
        component: <PhoneNumber />
    },
]

export default function ContactSection() {

    const [active, setActive] = useState('mail')


    return (
        <div className='contact-section__content'>
            {buttons.map(({ name, component }) =>
                active === name && component
            )}
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

