import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import Navigation from '../components/projects-navigation/Navigation'
import PanoramicView from '../components/panoramic-view/PanoramicView'

export default function Project({ location }) {

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

  const isPanoramic = true

  const fluid = data.placeholderImage?.childImageSharp.fluid
  const width = fluid?.presentationWidth;
  const height = fluid?.presentationHeight;
  const name = data.placeholderImage?.name
  const backgroundURL = data.placeholderImage?.childImageSharp.fixed.src.replace(/([()])/g, '\\' + '$&')

  const [navVisibility, setNavVisibility] = useState(true)


  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <div className="blur-background" style={{ backgroundImage: `url(${backgroundURL})` }}></div>


      <Layout nonColor={true} title={name}>
        <SEO title={name} />
        <div className="project-container">
          {isPanoramic ?
            (
              <PanoramicView data={fluid.src} setNavVisibility={setNavVisibility} />
            ) : (
              <Img fluid={fluid} style={{ width }} />
            )
          }

        </div>
        <Navigation visible={navVisibility} location={location} />
      </Layout>
    </div >
  )
}
