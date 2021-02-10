import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ProgressiveImage from "react-progressive-image"

const GridItem = ({
    item,
    index
}) => {

    const { formats, name, url } = item
    const { medium, small, thumbnail } = formats

    const [error, setError] = useState(null)

    return (
        <>
            {item &&
                <ProgressiveImage
                    src={small}
                    srcSetData={{
                        srcSet: `${small} 500w ${medium} 750w`,
                        sizes: '(max-width: 750px) 750px, 750px'
                    }}
                    placeholder={thumbnail}
                    //delay={100}
                    onError={() => { setError(true) }}
                >
                    {(src, _loading, srcSetData) => (
                        <div className={`img-container ${_loading && !error ? 'loading' : ''}`} key={index}>
                            <Link
                                to={`${url}`}
                                state={{
                                    modal: true,
                                }}
                            >
                                <img
                                    className={`img-container__image `}
                                    src={src}
                                    srcSet={srcSetData.srcSet}
                                    sizes={srcSetData.sizes}
                                    alt={name}
                                />
                                <div className="img-container__info">
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </ProgressiveImage>
            }
        </>
    )
}

export default GridItem