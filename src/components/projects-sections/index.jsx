import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"



export default function ProjectsSection() {

    const data = useStaticQuery(graphql`
        query {
            pics:allStrapi360Pics {
                nodes {
                    img {
                        publicURL
                        childImageSharp {
                            fluid(maxWidth:3200) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                }
                }
            
            }
        }
    `)

    return null
       /*  { data.pics.nodes.map(node => <Img fluid={node.img.childImageSharp.fluid} />) } */
    
}
