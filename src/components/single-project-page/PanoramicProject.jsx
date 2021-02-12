import React, { useState } from 'react'
import Navigation from './Navigation'
import PanoramicView from '../panoramic-view/PanoramicView'

export default function PanoramicProject({ data, pageContext, location }) {

    const [navVisibility, setNavVisibility] = useState(true)

    const { prevURL, nextURL } = pageContext
    const { img, description } = data.strapi360Pics
    const { url: full } = img

    return (
        <>
            <div className="project-container">
                <PanoramicView data={full} setNavVisibility={setNavVisibility} />
            </div>
            <Navigation
                visible={navVisibility}
                state={location?.state}
                next={nextURL}
                prev={prevURL}
                info={description}>
            </Navigation>
        </>

    )
}
