import React from "react"

import Layout from "../components/layout/layout"
import HeroSection from "../components/hero-section"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <HeroSection />
  </Layout>
)

export default IndexPage
