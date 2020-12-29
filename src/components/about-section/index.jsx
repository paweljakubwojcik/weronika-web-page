import React from 'react'
import './about-section.scss'
import HeroImage from './HeroImage'
import Akcent from '../color-accent'

export default function AboutSection() {
    return (
        <section id='about' className='section about-section'>
            <header className='about-section__header'>
                <h2>
                    <Akcent>Who</Akcent> am I ?
                </h2>
            </header>
            <HeroImage />
            <div className="about-section__content">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat perferendis sed nulla ducimus, minima necessitatibus
                    suscipit. Aliquid exercitationem corporis magni eos porro nesciunt
                    ex repellat suscipit, cumque qui numquam aut.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat perferendis sed nulla ducimus, minima necessitatibus
                    suscipit. Aliquid exercitationem corporis magni eos porro nesciunt
                    ex repellat suscipit, cumque qui numquam aut.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat perferendis sed nulla ducimus, minima necessitatibus
                    suscipit. Aliquid exercitationem corporis magni eos porro nesciunt
                    ex repellat suscipit, cumque qui numquam aut.
                </p>
            </div>
        </section>
    )
}
