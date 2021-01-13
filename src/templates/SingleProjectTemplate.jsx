import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import Navigation from '../components/projects-navigation/Navigation'
import PanoramicView from '../components/panoramic-view/PanoramicView'

export default function Project({ location, pageContext }) {



  const { name, nextUrl, previousUrl, data } = pageContext
  const { medium, small, fluid } = data

  const { full, panoramic: isPanoramic } = data

  const backgroundURL = small || medium || fluid.src

  const [navVisibility, setNavVisibility] = useState(true)


  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <img className="blur-background" src={backgroundURL} alt={name} onLoad={(e) => e.target.style.opacity = 1} />


      <Layout nonColor={true} title={name} filled={true}>
        <SEO title={name} />
        <div className="project-container">
          {isPanoramic ?
            (
              <PanoramicView data={full} setNavVisibility={setNavVisibility} />
            ) : (
              <img src={full} alt={name} style={{opacity:0}} onLoad={(e) => e.target.style.opacity = 1}/>
            )
          }

        </div>
        <Navigation visible={navVisibility} location={location} next={nextUrl} previous={previousUrl} />
      </Layout>
    </div >
  )
}


