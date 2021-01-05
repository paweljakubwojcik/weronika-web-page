import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styles from './preview-grid.module.scss'



export default function PreviewGrid() {

    const data = useStaticQuery(graphql`
        query MyQuery {
            pics:allImageSharp {
                nodes {
                ...Parts
                }
            }
        }

        fragment Parts on ImageSharp {
            fixed(quality: 95, width: 300, height: 300) {
                src
            }
            fluid(maxWidth:1000) {
                 ...GatsbyImageSharpFluid
            }
        }
    `)

    const length = 6
    const randomIndex = Math.floor(Math.random() * (data.pics.nodes.length - length))
    const pics = data.pics.nodes.slice(randomIndex, randomIndex + length)

    return (
        <div className={styles.container}>
            <div className={styles.columnLeft + ' ' + styles.column}>
                {pics.slice(0, pics.length / 2).map(pic => <ImageLink fluid={pic.fluid} to={'/'} />)}
            </div>
            <div className={styles.columnRight + ' ' + styles.column}>
                {pics.slice(pics.length / 2, pics.length).map(pic => <ImageLink fluid={pic.fluid} to={'/'} />)}
            </div>
        </div>
    )

}

const ImageLink = ({ to, fluid, ...rest }) => {
    return (
        <Link to={to} >
            <Img fluid={fluid} style={{ height: '100%'}} {...rest} />
        </Link>
    )
}
