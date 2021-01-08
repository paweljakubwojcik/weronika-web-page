import React, { useEffect } from "react"

import { InfiniteScroll } from "./infiniteScroll.jsx"

import Grid from "./grid.jsx"
import BackgroundThing from '../background-thing/BackgroundThing'

export default function Projects({ globalState, pageContext }) {


    useEffect(() => {
        console.log("*** Constructing View ***")
        if (globalState.isInitializing() || !globalState.useInfiniteScroll) {
            const pageKey = "page" + pageContext.currentPage
            console.log(`View is initializing items according to ${pageKey}.`)
            globalState.updateState({
                [pageKey]: pageContext.pageImages,
                cursor: pageContext.currentPage + 1
            })
        }
    }, [])

    const paginationData = {
        currentPage: pageContext.currentPage,
        countPages: pageContext.countPages,
        useInfiniteScroll: globalState.useInfiniteScroll
    }

    return (
        <>

            <BackgroundThing />

            <InfiniteScroll
                throttle={150}
                threshold={400}
                hasMore={globalState.hasMore(pageContext)}
                onLoadMore={globalState.loadMore}
            >

                <section className='galery'>
                    <header className='section-header'>
                        <h2>Galeria</h2>
                    </header>

                    {/* Grid given as a child element for Infinite Scroll. */}
                    <Grid globalState={globalState} pageContext={pageContext} />
                </section>
            </InfiniteScroll>

            {/* Loading spinner. */}
            {(globalState.cursor === 0 || globalState.hasMore(pageContext)) && (
                <div className="spinner">
                    {/* /TODO: find icon */}
                    <p>loading...</p>
                </div>
            )}

            {/* Fallback to Pagination for non JS users. */}
            {/* {globalState.useInfiniteScroll && (
                <noscript>
                    <style>
                        {`.spinner { display: none !important; }`}
                    </style>
                    <Pagination paginationData={paginationData} />
                    <h4><center>Infinite Scroll does not work without JavaScript.</center></h4>
                </noscript>
            )} */}

            {/* Fallback to Pagination on toggle (for demo) and also on error. */}
            {/* {!globalState.useInfiniteScroll && (
                <Pagination paginationData={paginationData} />
            )} */}

        </>


    )
}
