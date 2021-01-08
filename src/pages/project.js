import React from 'react'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

export default function Project() {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "projekty/beige-6.jpg" }) {
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

  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <div className="blur-background" style={{ backgroundImage: `url(${data.placeholderImage?.childImageSharp.fixed.src})` }}>
      </div>
      <Layout nonColor={true}>
        <SEO title={'beige-6'} />
        <div className="project-container">
          <Img fluid={fluid} style={{ width }} />
        </div>
      </Layout>

    </div >
  )
}
