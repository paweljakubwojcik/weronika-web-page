import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const GridItem = props => {

    return (
        <>
            <div className="img-container" key={props.index}>

                {props.item && props.js && (
                    <Link to={`/viewItem?id=${props.item.l}`}>
                        <Img className='image' fluid={props.item.fluid} alt="" title="" />
                    </Link>
                )}
                {props.item && !props.js && (
                    <a href={props.item.l} target="_blank" rel="noopener noreferrer">
                        <img src={props.item.s} alt="" title="" />
                    </a>
                )}

            </div>
            <style jsx>
                {`
                    .img-container {
                        position: relative;
                        width:100%;
                        background:#EEE;
                        overflow: hidden;
                        z-index: 1;
                    }
                    .img-container .image {
                        top: 0;
                        display: block;
                        position: absolute;
                        height: 100%;
                        margin: 0 !important;
                        transition: 0.2s ease-in-out;
                        z-index: 2;
                    }
                    .image-container .image:hover{
                            opacity: 0.4;
                            transform: scale(1.1);
                    }
                `}
            </style>
        </>
    )
}

export default GridItem