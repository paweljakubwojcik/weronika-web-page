import React from 'react'

export default function PhoneNumber({ timeout }) {

    //TODO: fetch this from strapi
    const number = '999243111'

    return (


        <a href={`tel:${number}`} className='phone-number'>
            {number.split('').map((digit, i) =>
                <span key={i} style={{
                    transitionDelay: `${i * timeout / 12}ms`,
                    transitionDuration: `${timeout / 3}ms`
                }}>
                    {digit}
                </span>)}
        </a>

    )
}
