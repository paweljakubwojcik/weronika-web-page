import React from 'react'
import { useStaticQuery, graphql } from "gatsby"


export default function PhoneNumber({ timeout }) {

    
    const { strapiPersonalInfo: { telefon: number } } = useStaticQuery(graphql`
            query Phone {
                strapiPersonalInfo {
                    telefon
            }
        }
   `)

    return (
        <div className='phone-number__container'>
            <label>Kliknij aby zadzwonić</label>
            <a href={`tel:${number}`} className='phone-number'>
                {number.split('').map((digit, i) =>
                    <span key={i} style={{
                        transitionDelay: `${i * timeout / 12}ms`,
                        transitionDuration: `${timeout / 3}ms`
                    }}>
                        {digit}
                    </span>)}
            </a>
        </div>
    )
}
