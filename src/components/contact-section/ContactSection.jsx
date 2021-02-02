import React, { useState } from 'react'

import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

import MailForm from './MailForm'
import PhoneNumber from './PhoneNumber'


const transitionTimeout = 500;

const buttons = [
    {
        name: 'mail',
        icon: faEnvelope,
        Component: MailForm
    },
    {
        name: 'messenger',
        icon: faFacebookMessenger,
        //TODO: messenger component
        Component: null
    },
    {
        name: 'phone',
        icon: faPhone,
        Component: PhoneNumber
    },
]

export default function ContactSection() {

    const [active, setActive] = useState('mail')


    return (
        <div className='contact-section__content'>
            <div className="contact-section__content-container">
                <SwitchTransition>
                    <CSSTransition key={active} timeout={transitionTimeout} classNames="switch-transition">
                        <>
                            {buttons.map(({ name, Component }) =>
                                name === active && Component && <Component timeout={transitionTimeout} key={name} />
                            )}
                        </>
                    </CSSTransition>
                </SwitchTransition>
            </div>
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

