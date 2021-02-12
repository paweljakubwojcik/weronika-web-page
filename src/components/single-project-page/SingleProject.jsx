import React, { useState } from 'react'

import Navigation from './Navigation'
import ProgressiveImage from 'react-progressive-image'
import ExpandableButton from './ExpandableButton'

import { faImages } from '@fortawesome/free-solid-svg-icons'


export default function SingleProject({ data, pageContext, location }) {



    const { prevURL, nextURL, name } = pageContext
    const { img, description } = data.strapiProjects
    const [currentImage, setCurrent] = useState(0)

    return (
        <>
            <div className="project-container">
                <Image img={img[currentImage]} alt={name} /> 
            </div>

            <Navigation
                state={location?.state}
                next={nextURL}
                prev={prevURL}
                info={description}>

                {img.length > 1 && <ExpandableButton icon={faImages}>
                    <Images
                        images={img}
                        current={currentImage}
                        setCurrent={setCurrent}
                        name={name} />
                </ExpandableButton>}
            </Navigation>
        </>

    )
}



const Image = ({ img, alt }) => {

    const {
        formats: { thumbnail },
        url: full,
        width,
        height
    } = img

    const loadingDimensions = { width, height }
    if (typeof window !== `undefined`) {
        if (height > window?.innerHeight) {
            loadingDimensions.height = window?.innerHeight
            loadingDimensions.width = window?.innerHeight * width / height
        }
        if (width > window?.innerWidth) {
            loadingDimensions.height = window?.innerHeight * height / width
            loadingDimensions.width = window?.innerWidth
        }
    }

    return (
        <ProgressiveImage
            src={full}
            placeholder={thumbnail.url}>
            {(src, loading) =>
                <img
                    src={src}
                    alt={alt}
                    style={loading ? { ...loadingDimensions } : {}}
                />
            }
        </ProgressiveImage>
    )

}

const Images = ({ images, current, setCurrent, name }) => {


    return (
        <div className='images-menu'>
            {images.map((img, i) =>
                <img
                    className={`images-menu__item ${i === current ? 'images-menu__item--active' : ''}`}
                    key={i}
                    src={img.formats.thumbnail.url}
                    alt={name + i}
                    onClick={(e) => { setCurrent(i); }}
                    tabindex={0}
                />)
            }
        </div >

    )
}
