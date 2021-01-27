import React from "react"

import Layout from "../components/layout/layout"

import Button from '../components/button/Button'
import Akcent from '../components/color-accent'

import PreviewGrid from '../components/preview-grid'
import SEO from "../components/seo"

import '../styles/index.scss'
import HeroBackground from '../components/HeroBackground'
import HeroImage from '../components/HeroImage'
import BackgroundThing from "../components/background-thing/BackgroundThing"
import HeroDescription from "../components/HeroDescription"
import ContactSection from '../components/contact-section/ContactSection'

const IndexPage = () => (
  <Layout >
    <SEO title="Home" />
    <section id='home' className='section hero-section'>
      <HeroBackground />

      <header className='hero-section__header'>
        <h2>Let's create <br /> something <br /> <Akcent> beautifull</Akcent></h2>
        <Button className="hero-section__button" to='/projects'> See my work </Button>
        <Button className="hero-section__button" to='/#contact'> Contact me </Button>
      </header>

    </section>

    <section id='about' className='section about-section'>
      <header className='about-section__header'>
        <h2> <Akcent>Who</Akcent> am I ? </h2>
      </header>

      <HeroImage />

      <div className="about-section__content">
        <HeroDescription />
      </div>

    </section>

    <section id='projects' className='section projects-section'>
      <header className='section__header'>
        <h2>
          My
                <Akcent> Work</Akcent>
        </h2>
      </header>

      <BackgroundThing style={{ position: 'absolute', top: 0 }} />

      <PreviewGrid />

      <Button className='projects-section__button' to='/projects'> More projects </Button>
    </section>

    <section id='contact' className='section contact-section'>
      <header className='section__header'>
        <h2>
          Get in <Akcent>touch</Akcent>
        </h2>
      </header>

      <ContactSection />

    </section>
  </Layout>
)

export default IndexPage
