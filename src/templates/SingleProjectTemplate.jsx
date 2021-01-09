import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import Navigation from '../components/projects-navigation/Navigation'
import PanoramicView from '../components/panoramic-view/PanoramicView'

export default function Project({ location, pageContext }) {

  const { name, nextUrl, previousUrl, data: { fluid, fixed } } = pageContext

  const isPanoramic = false

  const width = fluid?.presentationWidth;
  const height = fluid?.presentationHeight;
  const backgroundURL = fixed.src.replace(/([()])/g, '\\' + '$&')

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
        <Navigation visible={navVisibility} location={location} next={nextUrl} previous={previousUrl} />
      </Layout>
    </div >
  )
}
