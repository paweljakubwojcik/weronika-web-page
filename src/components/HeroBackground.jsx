import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useIntersectionObserver } from '../util/hooks/useIntersectionObserver'


//TODO: make it carousel

const defaultParallax = -100

export default function HeroImage() {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "hero-background.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [parallax, setParallax] = useState(defaultParallax)

  const [setRef, visible] = useIntersectionObserver({
    threshold: new Array(100).fill(0).map((e, i) => i / 100)
  }, (e) => {
    const parallax = - e.boundingClientRect.y / 2.5
    setParallax(parallax)
  })

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <div className="hero-background" ref={setRef}>
      <Img style={{ transform: `translateY(${parallax}px)` }} fluid={data.placeholderImage.childImageSharp.fluid} />
      {/*  <div className="hero-background__gradient-effect"></div> */}
    </div>
  )
}
