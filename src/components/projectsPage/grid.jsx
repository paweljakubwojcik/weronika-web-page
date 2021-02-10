import React, { useEffect } from "react"

import GridItem from "./gridItem.jsx";

const Grid = (props) => {
    const g = props.globalState
    const currentPage = props.pageContext.currentPage

    const items = []
    var i = 0, j = 0, numberOfItemsOnLatestPage = 0

    useEffect(() => {
        // fetch items on initial load
        if (items.length === 0)
            g.loadMore()
    }, [items])

    if (g.useInfiniteScroll && g["page" + currentPage]) {
        for (let pageNum = currentPage; ; pageNum++) {
            const key = "page" + pageNum
            if (g[key]) {
                /* Add gridItems that we have received metadata for. */
                numberOfItemsOnLatestPage = g[key].length
                for (j = 0; j < numberOfItemsOnLatestPage; j++) {
                    items.push(<GridItem item={g[key][j]} key={"gi" + (i++)} />)
                }
            }
            else {
                /* Don't add anything for pages that the user hasn't fetched (scrolled to) yet. */
                break;
            }

        }
    }

    console.log("Rendering " + i + " gridItems.")

    const pics360 = items.filter(node => node.props.item.panoramic)
    const projects = items.filter(node => !node.props.item.panoramic)

    return (
        <>
            {pics360 && <Section title={'Wizualizacje'}> {pics360}</Section>}
            {projects && <Section title={'Galeria'}> {projects}</Section>}
        </>
    )
}

export default Grid;

const Section = ({ children, title }) => {
    const withSpecials = children[1].length >= 7
    return (
        <section className='galery'>
            <header className='section-header'>
                <h2>{title}</h2>
            </header>
            <div className={`projects-grid ${withSpecials ? 'with-specials' : ''}`}>
                {children}
            </div>
        </section>
    )
}