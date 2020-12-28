import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import HeroImage from "../components/hero-background/HeroImage"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <HeroImage />
  </Layout>
)

export default IndexPage
