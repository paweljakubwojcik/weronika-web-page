import React from 'react'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import Navigation from '../components/projects-navigation/Navigation'

export default function Project() {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "projekty/panorama.jpg" }) {
        name
        childImageSharp {
          fluid(maxWidth: 3200) {
            presentationHeight
            presentationWidth
            ...GatsbyImageSharpFluid
          }
          fixed{
              src
          }
        }
      }
    }
  `)


  const fluid = data.placeholderImage?.childImageSharp.fluid
  const width = fluid?.presentationWidth;
  const height = fluid?.presentationHeight;
  const name = data.placeholderImage?.name
  const backgroundURL = data.placeholderImage?.childImageSharp.fixed.src.replace(/([()])/g, '\\' + '$&')
  console.log(backgroundURL)

  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <div className="blur-background" style={{ backgroundImage: `url(${backgroundURL})` }}></div>
      

      <Layout nonColor={true} title={name}>
        <SEO title={name} />
        <div className="project-container">
          <Img fluid={fluid} style={{ width }} />

        </div>
        <Navigation />
      </Layout>

      

    </div >
  )
}
