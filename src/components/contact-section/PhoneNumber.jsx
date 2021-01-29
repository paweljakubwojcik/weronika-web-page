import React from 'react'

export default function PhoneNumber({ timeout }) {


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
