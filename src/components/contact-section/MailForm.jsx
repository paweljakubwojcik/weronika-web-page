import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { graphql, useStaticQuery } from 'gatsby'

import Button from '../button/Button'
import Shadow from '../shadow-thingy/Shadow'
import Delivery from './delivery-animation/Delivery'
import MessageSent from './message-sent/MessageSent'

const fetchStates = {
    READY: 'ready',
    LOADING: 'loading',
    SENT: 'sent'
}

export default function MailForm({ timeout }) {

    const { site: { siteMetadata: { cmsUrl } } } = useStaticQuery(graphql`
     query data {
        site {
            siteMetadata {
                cmsUrl
            }
        }
    }
    `)

    const [values, setValues] = useState({})
    const [fetchState, setFetchState] = useState({
        state: fetchStates.READY,
        error: null,
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let { name, email, message } = values

        if (name && email && message) {
            setFetchState(prev => { return { ...prev, state: fetchStates.LOADING } })
            fetch(`${cmsUrl}/emails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(data => data.json())
                .then(() => {
                    setFetchState(prev => { return { ...prev, state: fetchStates.SENT } })
                })
                .catch(e => () => setFetchState(prev => { return { ...prev, error: e } }))
        }
        else {
            setFetchState(prev => { return { ...prev, error: 'please fill up all inputs' } })
        }
    }


    return (
        <SwitchTransition>
            <CSSTransition key={fetchState.state} timeout={500} classNames="switch-transition">
                <>
                    {fetchState.state === fetchStates.READY &&
                        <form
                            onSubmit={handleSubmit}
                            onChange={handleChange}
                            className={`form ${fetchState.loading ? 'form--loading' : ""}`}
                            style={{
                                transitionDuration: `${timeout}ms`
                            }}
                        >
                            <Input name='name' label={'Your name'} values={values}
                                style={{ width: 'fit-content', width: '-moz-fit-content' }}>
                                <input type="input" name="name" className='form__input' />
                            </Input>
                            <Input name='email' label={'Your email'} values={values}
                                style={{ width: 'fit-content', width: '-moz-fit-content' }}>
                                <input type="email" name="email" className='form__input' />
                            </Input>
                            <Input name='message' label='Your message' values={values} big>
                                <textarea name="message" id="message" className='form__input form__textarea'></textarea>
                            </Input>
                            {fetchState.error && <p className='error-message'>{fetchState.error}</p>}
                            <Button className='form__button' as='button' role='submit'>Send</Button>
                        </form>
                    }

                    {fetchState.state === fetchStates.LOADING && <Delivery />}
                    {fetchState.state === fetchStates.SENT && <MessageSent />}
                </>
            </CSSTransition>
        </SwitchTransition>
    )
}

const Input = ({ children, name, label, values, big, ...rest }) => {
    return (
        <div
            className={`form__input-container ${values[name] ? "form__input-container--filled" : ""}`}
            {...rest}
        >
            <label htmlFor={name}>{label}</label>
            {children}
            <Shadow className='form__input-shadow' big={big} />
        </div>
    )
}


