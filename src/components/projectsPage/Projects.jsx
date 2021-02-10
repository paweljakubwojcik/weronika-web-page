import React, { useEffect } from "react"

import { InfiniteScroll } from "./infiniteScroll.jsx"

import Grid from "./grid.jsx"
import BackgroundThing from '../background-thing/BackgroundThing'

export default function Projects({ globalState, pageContext }) {


    useEffect(() => {
        /*  console.log("*** Constructing View ***") */
        if (globalState.isInitializing() || !globalState.useInfiniteScroll) {
            const pageKey = "page" + (pageContext?.currentPage)
            console.log(`View is initializing items according to ${pageKey}.`)
            globalState.updateState({
                cursor: pageContext.currentPage + 1
            })
        }
    }, [])

    return (
        <>
            <BackgroundThing />

            <article className='projekty-container'>
                <InfiniteScroll
                    throttle={150}
                    threshold={400}
                    hasMore={globalState.hasMore(pageContext)}
                    onLoadMore={globalState.loadMore}
                >
                    {/* Grid given as a child element for Infinite Scroll. */}
                    <Grid globalState={globalState} pageContext={pageContext} />

                </InfiniteScroll>

            </article>
            {/* Loading spinner. */}
            {(globalState.cursor === 1 || globalState.hasMore(pageContext)) && (
                <div className="spinner">
                    {/* /TODO: find icon */}
                    <p>loading...</p>
                </div>
            )}
        </>


    )
}
