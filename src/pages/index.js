import React from "react"

import Layout from "../components/layout/layout"
import HeroSection from "../components/hero-section"
import AboutSection from "../components/about-section"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <HeroSection />
    <AboutSection />
  </Layout>
)

export default IndexPage
