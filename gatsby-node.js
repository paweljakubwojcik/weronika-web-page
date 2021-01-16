/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const fs = require('fs');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // TODO: reduce this query, write this functions from the beggining 
    try {
        const result = await graphql(`
            query MyQuery {
                allStrapiProjects {
                    nodes {
                        name
                        description
                        img {
                            url
                            hash
                            formats {
                            medium {
                                childImageSharp {
                                ...GatsbyImageSharpFluid
                                }
                                publicURL
                            }
                            small {
                                childImageSharp {
                                ...GatsbyImageSharpFluid
                                }
                                publicURL
                            }
                            thumbnail {
                                childImageSharp {
                                ...GatsbyImageSharpFluid
                                }
                                publicURL
                            }
                            }
                        }
                        }
                }
                
                allStrapi360Pics {
                    edges {
                        node {
                            name
                            
                            img{
                                childImageSharp {
                                ...GatsbyImageSharpFluid
                                    original{
                                            src
                                        }
                                }
                                publicURL
                            }
                        }
                        next {
                            name
                        }
                        previous {
                            name
                        }
                    }
                }
            }

            fragment GatsbyImageSharpFluid on ImageSharp {
                fluid {
                    presentationHeight
                    presentationWidth
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                }
                
            }
       
    `)

        console.log(result)

        // TODO: ensure that every pic has unique name


        const allPics = result.data.allStrapi360Pics.edges.map(({ previous, node, next }) => {
            return {
                name: `${node.name}`,
                previous: previous?.name,
                next: next?.name,
                data: {
                    description: node.description,
                    full: node.img.childImageSharp.original.src,
                    fluid: node.img.childImageSharp.fluid,
                    panoramic: true
                }
            }
        })

        //adding every picture as separate node
        result.data.allStrapiProjects.nodes.reduce((previousProject, currentProject, i) => {
            currentProject.img.reduce((previous, current, index) => {
                const { name } = currentProject
                const { hash, formats } = current
                const { medium, small, thumbnail } = formats
                const entry = {
                    name: `${name}-${index + 1}`,
                    previous: previous?.name,
                    data: {
                        description: currentProject.description,
                        full: current.url,
                        medium: current.url.replace(`${hash}`, `medium_${hash}`),
                        small: current.url.replace(`${hash}`, `small_${hash}`),
                        thumbnail: current.url.replace(`${hash}`, `thumbnail_${hash}`),
                        fluid: medium?.childImageSharp.fluid || small?.childImageSharp.fluid || thumbnail?.childImageSharp.fluid
                    }
                }
                if (allPics[allPics.length - 1]) allPics[allPics.length - 1].next = entry.name
                allPics.push(entry)
                return entry
            }, previousProject)

            return allPics[allPics.length - 1]
        }, allPics[allPics.length - 1])

        console.log('Building paginated pages')
        const paginatedPageTemplate = path.resolve(`src/templates/paginatedPageTemplate.jsx`)

        /* Iterate needed pages and create them. */
        const countImagesPerPage = 20
        const countPages = Math.ceil(allPics.length / countImagesPerPage)

        for (let currentPage = 1; currentPage <= countPages; currentPage++) {
            const pathSuffix = (currentPage > 1 ? currentPage : "") /* To create paths "/", "/2", "/3", ... */

            /* Collect images needed for this page. */
            const startIndexInclusive = countImagesPerPage * (currentPage - 1)
            const endIndexExclusive = startIndexInclusive + countImagesPerPage
            const pageImages = allPics.slice(startIndexInclusive, endIndexExclusive)

            /* Combine all data needed to construct this page. */
            const pageData = {
                path: `/projects/${pathSuffix}`,
                component: paginatedPageTemplate,
                context: {
                    /* If you need to pass additional data, you can pass it inside this context object. */
                    pageImages: pageImages,
                    currentPage: currentPage,
                    countPages: countPages
                }
            }

            /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
            createJSON(pageData)
            createPage(pageData)
        }
        console.log(`\nCreated ${countPages} pages of paginated content.`)


        console.log('Building single project pages')
        const singleItemTemplatePage = path.resolve(`src/templates/SingleProjectTemplate.jsx`)

        allPics.forEach(picData => {

            const { name, next, previous, data } = picData
            const basePath = 'project'
            const pageData = {
                path: `/${basePath}/${name}`,
                component: singleItemTemplatePage,
                context: {
                    name,
                    nextUrl: next ? `/${basePath}/${next}` : null,
                    previousUrl: previous ? `/${basePath}/${previous}` : null,
                    data
                }
            }
            createPage(pageData)
        })

        console.log(`\nCreated ${allPics.length} single image pages.`)


    } catch (error) {
        throw error
    }

}


function createJSON(pageData) {
    const pathSuffix = pageData.path.split('/').reverse()[0]
    const dir = "public/paginationJson/"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const filePath = dir + "projects" + pathSuffix + ".json";
    const dataToSave = JSON.stringify(pageData.context.pageImages);
    fs.writeFile(filePath, dataToSave, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}