import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const GridItem = ({ item, js, index }) => {

    console.log(item)

    return (
        <>
            {item && <div className="img-container" key={index}>

                {js && (
                    <Link
                        to={`/project/${item.name}`}
                        state={{ modal: true }}
                    >
                        <Img className='img-container__image' fluid={item.data.fluid} alt="" title="" />
                        <div className="img-container__info">
                            <span>{item.name}</span>
                        </div>
                    </Link>
                )}
                {!js && (
                    <a href={item.l} target="_blank" rel="noopener noreferrer">
                        <img src={item.s} alt="" title="" />
                    </a>
                )}
            </div>}
        </>
    )
}

export default GridItem