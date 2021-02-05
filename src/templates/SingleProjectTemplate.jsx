import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Navigation from '../components/projects-navigation/Navigation'
import PanoramicView from '../components/panoramic-view/PanoramicView'
import ProgressiveImage from 'react-progressive-image'

export default function Project({ location, pageContext }) {
  console.log(pageContext)

  const { name, nextUrl, previousUrl, data } = pageContext
  const { thumbnail, medium, small, full, width, height, panoramic: isPanoramic, description } = data

  const backgroundURL = thumbnail || small || medium

  const [navVisibility, setNavVisibility] = useState(true)

  const loadingDimensions = { width, height }
  if (height > window.innerHeight) {
    loadingDimensions.height = window.innerHeight
    loadingDimensions.width = window.innerHeight * width / height
  }
  if (width > window.innerWidth) {
    loadingDimensions.height = window.innerHeight * height / width
    loadingDimensions.width = window.innerWidth
  }


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
                  <img src={src} alt={name} style={loading ? { ...loadingDimensions } : {}} />
                }
              </ProgressiveImage>
            )
          }

        </div>
        <Navigation visible={navVisibility} state={location?.state} next={nextUrl} previous={previousUrl} info={description} />
      </Layout>
    </div >
  )
}


