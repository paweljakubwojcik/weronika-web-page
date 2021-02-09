import React from 'react'
import { useStaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from './preview-grid.module.scss'

import { ProgressiveImage } from 'react-progressive-image'
import GridItem from '../projectsPage/gridItem'


export default function PreviewGrid() {

    //TODO: create new type in strapi named 'hero-page-images' of something
    const data = useStaticQuery(graphql`
        query MyQuery {
            projects:strapiHeroProjects {
                projects {
                name
                img {
                   url
                }
                }
            }
            }
    `)


    const pics = []

    data.projects.projects.forEach(project => {
        project.img.forEach((pic, i) => {
            pics.push({
                name: `${project.name}-${i + 1}`,
                data: {
                    full: pic.url,
                    medium: pic.url,
                    small: pic.url
                }
            })
        })
    })

   
    return (
        <div className={'projects-grid'}>
            {pics.slice(0, 12).map((pic, i) => <GridItem item={pic} index={'p' + i} key={i} />)}
        </div>
    )

}

const ImageLink = ({ to, data, ...rest }) => {
    const { name } = data
    return (
        <Link to={to} >
            <ProgressiveImage   >
                {src => <img style={{ height: '100%' }} {...rest} src={src} alt={name} />}
            </ProgressiveImage>
        </Link>
    )
}
