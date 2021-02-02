import React, { useState } from 'react'

import Button from '../button/Button'
import Shadow from '../shadow-thingy/Shadow'

export default function MailForm({ timeout }) {

    const [values, setValues] = useState({})

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
    }


    return (
        <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className='form'
            style={{
                transitionDuration: `${timeout}ms`
            }}
        >
            <Input name='email' label={'Your email'} values={values}
                style={{ width: 'fit-content' }}>
                <input type="email" name="email" className='form__input' />
            </Input>
            <Input name='message' label='Your message' values={values} big>
                <textarea name="message" id="" className='form__input form__textarea'></textarea>
            </Input>
            <Button className='form__button' as='button' role='submit'>Send</Button>
        </form>
    )
}

const Input = ({ children, name, label, values, big, ...rest }) => {
    return (
        <div className={`form__input-container ${values[name] ? "form__input-container--filled" : ""}`}
            {...rest}
        >
            <label htmlFor={name}>{label}</label>
            {children}
            <Shadow className='form__input-shadow' big={big} />
        </div>
    )
}


