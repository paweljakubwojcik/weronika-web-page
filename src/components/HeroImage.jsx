import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function HeroImage() {
  const data = useStaticQuery(graphql`
     query {
        file(relativePath: { eq: "hero-image.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 3200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
   `)

  if (!data?.file?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <div className="hero-image">
      {/* <div className="hero-image__text">Designer</div> */}
      <Img fluid={data.file.childImageSharp.fluid} />
    </div>
  )
}
