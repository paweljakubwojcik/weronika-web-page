import React, { useState } from 'react'

import Button from '../button/Button'

export default function MailForm() {

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
        <form onSubmit={handleSubmit} onChange={handleChange} className='form'>
            <Input name='email' label={'Your email'} values={values}>
                <input type="email" name="email" className='form__input' />
            </Input>
            <Input name='message' label='Your message' values={values}>
                <textarea name="message" id="" className='form__input form__textarea'></textarea>
            </Input>
            <Button className='form__button' as='button' role='submit'>Send</Button>
        </form>
    )
}

const Input = ({ children, name, label, values }) => {
    return (
        <div className={`form__input-container ${values[name] ? "form__input-container--filled" : ""}`}>
            <label htmlFor={name}>{label}</label>
            {children}
        </div>
    )
}


