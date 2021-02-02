import React from 'react'

import Delivery from '../../../assets/svg/delivery.svg'
import Speed from '../../../assets/svg/speed.svg'

import './delivery.scss'


export default () => {

    const speedArray = new Array(10).fill(0)

    return (
        <div className='delivery-container'>
            <Delivery className='delivery' />
            { speedArray.map((n, i) =>
                <Speed key={i} className='speed'
                    style={{
                        top: `${Math.random() * 60 + 20}%`,
                        animationDuration: `${Math.random() * 2000 + 200}ms`

                    }} />
            )}
        </div>
    )
}
