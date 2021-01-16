import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const GridItem = ({ item, index }) => {

    return (
        <>
            {item && <div className="img-container" key={index}>
                <Link
                    to={`/project/${item.name}`}
                    state={{ modal: true }}
                >
                    <img className='img-container__image' src={item.data.small} alt="" title="" />
                    <div className="img-container__info">
                        <span>{item.name}</span>
                    </div>
                </Link>
            </div>}
        </>
    )
}

export default GridItem