import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function HeroImage() {
  const data = useStaticQuery(graphql`
     query {
         image:strapiHeroImage {
           image {
             childImageSharp {
               fluid(grayscale:true) {
                 ...GatsbyImageSharpFluid
               }
             }
           }
         }
       }
   `)

  if (!data?.image?.image?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <div className="hero-image">
      {/* <div className="hero-image__text">Designer</div> */}
      <Img fluid={data.image.image.childImageSharp.fluid} />
    </div>
  )
}
