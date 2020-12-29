import React from 'react'
import HeroBackground from './hero-background/HeroBackground'
import Button from '../button/Button'

import './hero-section.scss'

export default function HeroSection() {
    return (
        <section className='section hero-section'>
            <HeroBackground />
            <header className='hero-section__header'>
                <h2>Let's create something
                    <div className="hero-section__colored-text"> together</div>
                </h2>
                <Button className="hero-section__button" to='/'>
                    Start now
                </Button>
            </header>

        </section>
    )
}
