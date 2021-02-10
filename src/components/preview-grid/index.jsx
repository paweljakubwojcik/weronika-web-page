import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import GridItem from '../projectsPage/gridItem'


export default function PreviewGrid() {

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
                name: `${project.name} ${i + 1}`,
                formats: {
                    thumbnail: pic.url,
                    medium: pic.url,
                    small: pic.url
                }
            })
        })
    })

    pics.forEach((pic, index) => {
        pic.url = `/projekty/${pic.name}`
        if (pics[index - 1]) {
            pics[index - 1].nextURL = pic.url
            pic.prevURL = pics[index - 1].url
        }
    })


    return (
        <div className={'projects-grid'}>
            {pics.slice(0, 12).map((pic, i) => <GridItem item={pic} index={'p' + i} key={i} />)}
        </div>
    )

}

/* const ImageLink = ({ to, data, ...rest }) => {
    const { name } = data
    return (
        <Link to={to} >
            <ProgressiveImage   >
                {src => <img style={{ height: '100%' }} {...rest} src={src} alt={name} />}
            </ProgressiveImage>
        </Link>
    )
} */
