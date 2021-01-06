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

    /* //
    //FIXME: INVALID QUERY 
        query randomly returns null for some fields
        probable fix - quering for url field -  but that way we are gonna be quering heroku server every time image has to load
        probable fix #2 - querying all imagesharp
        probable fix #3 - change provider or redystribute assets in strapi - /TODO: CHANGE MONGOdb TO CLOUDINARY !!!
    */

    console.log('Building paginated pages')
    /*     const result = await graphql(`
            query MyQuery {
                allStrapiFolders {
                    nodes {
                        Name
                        Pics {
                            url
                            formats {
                                small {
                                    childImageSharp {
                                      ...Parts  
                                    }
                                }
                                medium {
                                    childImageSharp {
                                        ...Parts 
                                    }
                                }
                                large {
                                    childImageSharp {
                                        ...Parts 
                                    }
                                }
                            }
                        }
                    }
                }
            }
    
            fragment Parts on ImageSharp{
                fixed(quality: 95, width: 300, height: 300) {
                    src
                }
                fluid {
                    originalImg
                }
            }
        `)
    
        const allPics = []
        result.data.allStrapiFolders.nodes.forEach(node => {
            node.Pics.forEach((pic, i) => {
                allPics.push({
                    name: `${node.Name}-${i}`,
                    large: pic.formats.large?.childImageSharp.fluid.originalImg 
                        || pic.formats.medium?.childImageSharp.fluid.originalImg 
                        || pic.formats.small?.childImageSharp.fluid.originalImg,
                    
                    small: pic.formats.large?.childImageSharp.fixed.src 
                        || pic.formats.medium?.childImageSharp.fixed.src 
                        || pic.formats.small?.childImageSharp.fixed.src,
                })
            })
    }) */


    // querying all local pics
    try {
        const result = await graphql(`
            query MyQuery {
                allFile(filter: {sourceInstanceName: {eq: "images"}}) {
                    edges {
                        node {
                            name
                            childImageSharp {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
            fragment GatsbyImageSharpFluid on ImageSharp {
                fluid {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                }
            }
    `)

        const allPics = []
        result.data.allFile.edges.forEach(({ node }) => {
            allPics.push({
                name: node.name,
                fluid: node.childImageSharp.fluid
            })
        })

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