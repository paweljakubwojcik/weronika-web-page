import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Navigation from '../components/projects-navigation/Navigation'
import PanoramicView from '../components/panoramic-view/PanoramicView'
import ProgressiveImage from 'react-progressive-image'

export default function Project({ location, pageContext }) {

  const { name, nextUrl, previousUrl, data } = pageContext
  const { thumbnail, medium, small, full, width, height, panoramic: isPanoramic } = data

  const backgroundURL = thumbnail || small || medium

  const [navVisibility, setNavVisibility] = useState(true)

  const dimensions = { width, height }

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
              <ProgressiveImage
                src={full}
                placeholder={thumbnail}>
                {(src, loading) =>
                  <img src={src} alt={name} style={{ width }} />
                }
              </ProgressiveImage>
            )
          }

        </div>
        <Navigation visible={navVisibility} state={location?.state} next={nextUrl} previous={previousUrl} />
      </Layout>
    </div >
  )
}


