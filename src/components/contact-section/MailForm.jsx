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
            <div className={`form__input-container ${values.email ? "form__input-container--filled" : ""}`}>
                <label htmlFor="email">Your email</label>
                <input type="email" name="email" className='form__input' />
            </div>
            <div className={`form__input-container ${values.message ? "form__input-container--filled" : ""}`}>
                <label htmlFor="message">Your message</label>
                <textarea name="message" id="" className='form__input form__textarea'></textarea>
            </div>
            <Button className='form__button' as='button' role='submit'>Send</Button>
        </form>
    )
}

const Input = () => {

}
