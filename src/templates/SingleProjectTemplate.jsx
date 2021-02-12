import React, { useState } from 'react'
import { graphql } from "gatsby"

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import ProjectPage from '../components/single-project-page/ProjectPage'



export default ({ location, data, pageContext }) => {

  const { name } = pageContext
  const { description, keywords } = data.strapiProjects || data.strapi360Pics

  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <Layout nonColor={true} title={name} filled={true}>
        <SEO title={name} description={`${name} ${keywords ? keywords : " "} ${description ? description : " "}`} />

        <ProjectPage data={data} pageContext={pageContext} location={location} />
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
    strapi360Pics(name: {eq: $project}) {
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


