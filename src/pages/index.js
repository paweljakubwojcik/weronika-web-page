import React from "react"

import Layout from "../components/layout/layout"
import HeroBackground from '../components/HeroBackground'
import HeroImage from '../components/HeroImage'
import Button from '../components/button/Button'
import Akcent from '../components/color-accent'

import ProjectsSection from '../components/projects-sections'
import SEO from "../components/seo"

import '../styles/index.scss'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <section className='section hero-section'>
      <HeroBackground />

      <header className='hero-section__header'>
        <h2>Let's create something <Akcent> together</Akcent></h2>
        <Button className="hero-section__button" to='/'> Start now </Button>
      </header>

    </section>

    <section id='about' className='section about-section'>
      <header className='about-section__header'>
        <h2> <Akcent>Who</Akcent> am I ? </h2>
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
    <section className='projects-section'>
      <header className='projects-section__header'>
        <h2>
          Find
                <Akcent> Inspiration</Akcent>
        </h2>
      </header>
      
    </section>
  </Layout>
)

export default IndexPage
