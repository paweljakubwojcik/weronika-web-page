import React, { useState } from 'react'
import { graphql } from "gatsby"

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Navigation from '../components/projects-navigation/Navigation'
import PanoramicView from '../components/panoramic-view/PanoramicView'
import ProgressiveImage from 'react-progressive-image'

export default function Project({ location, data: { strapiProjects: data }, pageContext }) {

  console.log(data)

  const { name, nextUrl, previousUrl, index, panoramic: isPanoramic } = pageContext
  const img = data.img[index]
  const { formats: { thumbnail, medium, small }, url: full, width, height } = img
  const { description, keywords } = data

  const backgroundURL = thumbnail?.url || small?.url || medium?.url

  const [navVisibility, setNavVisibility] = useState(true)

  const loadingDimensions = { width, height }

  if (typeof window !== `undefined`) {
    if (height > window?.innerHeight) {
      loadingDimensions.height = window?.innerHeight
      loadingDimensions.width = window?.innerHeight * width / height
    }
    if (width > window?.innerWidth) {
      loadingDimensions.height = window?.innerHeight * height / width
      loadingDimensions.width = window?.innerWidth
    }
  }


  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <img className="blur-background" src={backgroundURL} alt={name} onLoad={(e) => e.target.style.opacity = 1} />

      <Layout nonColor={true} title={name} filled={true}>
        <SEO title={name} description={name + (keywords ? keywords : " ") + (description ? description : " ")} />
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

export const query = graphql`
  query($project: String!) {
    strapiProjects(name: {eq: $project}) {
      name
      description
      keywords
      img{
          url
          formats {
            large {
              url
            }
            medium {
              url
            }
            small {
              url
            }
            thumbnail {
              url
            }
        }
        height
        width
      }
    }
  }
`


