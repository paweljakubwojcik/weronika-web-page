import React, { useState } from 'react'

import PanoramicProject from './PanoramicProject'
import SingleProject from './SingleProject'


export default function ProjectPage({ data, pageContext, location }) {

    const { name } = pageContext
    const isPanoramic = data.strapi360Pics ? true : false

    const img = data.strapiProjects?.img[0] || data.strapi360Pics?.img
    const {
        formats: { thumbnail, medium, small },
    } = img
    const backgroundURL = thumbnail?.url || small?.url || medium?.url

    return (
        <>
            <img className="blur-background" src={backgroundURL} alt={name} />
            {isPanoramic ?
                (
                    <PanoramicProject data={data} pageContext={pageContext} location={location}/>
                ) : (
                    <SingleProject data={data} pageContext={pageContext} location={location}/>
                )
            }
        </>
    )
}
