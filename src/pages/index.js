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
    <SEO title='Interior Design'/>
    <section id='home' className='section hero-section'>
      <HeroBackground />

      <header className='hero-section__header'>
        <h2>Stwórzmy <br /> razem coś <br /><Akcent style={ { fontSize: "1.3em" } }> pięknego </Akcent></h2>
        <Button className="hero-section__button" to='/projekty'> Portfolio </Button>
        <Button className="hero-section__button" to='/#kontakt'> Kontakt </Button>
      </header>

    </section>

    <section id='about' className='section about-section'>
      <header className='about-section__header'>
        <h2> <Akcent>Kim</Akcent> jestem ? </h2>
      </header>

      <HeroImage />

      <div className="about-section__content">
        <HeroDescription />
      </div>

    </section>

    <section id='projekty' className='section projects-section'>
      <header className='section__header'>
        <h2>
        Moje
                <Akcent> Projekty</Akcent>
        </h2>
      </header>

      <BackgroundThing style={{ position: 'absolute', top: 0 }} />

      <PreviewGrid />

      <Button className='projects-section__button' to='/projekty'> Więcej projektów </Button>
    </section>

    <section id='kontakt' className='section contact-section'>
      <header className='section__header'>
        <h2>
          <Akcent>Skontaktuj </Akcent>się ze mną
        </h2>
      </header>

      <ContactSection />

    </section>
  </Layout >
)

export default IndexPage
