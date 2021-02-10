/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { getDataFromCMS } = require('./loader')
const path = require(`path`)
const fs = require('fs');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
        interface Entry {
            keywords: String
            name: String
            description: String
        }
        type Strapi360Pics implements Node & Entry {
            img : IMG   
        }
        type StrapiProjects implements Node & Entry {
            img : [IMG]
        }
        type IMG{
            formats: FORMATS
            url: String
            width: Int
            height: Int
        }
        type FORMATS {
            large: format
            medium: format
            small: format
            thumbnail: format
        }
        type format {
            url: String!
        }
        `)
}


exports.createPagesStatefully = async ({ actions, graphql }) => {
    const { createPage } = actions
    const basePath = 'projekty'

    try {

        const { data: result } = await graphql(`
        
            query DataQuery {
                pics360:allStrapi360Pics {
                    nodes {
                        img {
                            ...data
                        }
                        name
                    }
                }

                projects:allStrapiProjects {
                    nodes {
                        img {
                            ...data
                        }
                        name
                    }
                }
            }

            fragment data on IMG {
                formats {
                    medium {
                        url
                    }
                    small {
                        url
                    }
                    thumbnail {
                        url
                    }
                }
            }
        `)

        const allPics = []
        result.pics360.nodes.forEach((node) => {

            const { img: { formats }, name } = node
            allPics.push({
                name,
                project: name,
                formats: {
                    medium: formats.medium?.url,
                    small: formats.small?.url,
                    thumbnail: formats.thumbnail?.url,
                },
                panoramic: true
            })
        })

        //adding every picture as separate node
        result.projects.nodes.forEach((project) => {
            const { name, img } = project

            img.forEach((node, index) => {
                const { formats } = node
                allPics.push({
                    name: `${name} ${index + 1}`,
                    project: name,
                    index,
                    formats: {
                        medium: formats.medium?.url,
                        small: formats.small?.url,
                        thumbnail: formats.thumbnail?.url,
                    },
                })
            })
        })


        allPics.forEach((pic, index) => {
            pic.url = `/${basePath}/${pic.name}`
            if (allPics[index - 1]) {
                allPics[index - 1].nextURL = pic.url
                pic.prevURL = allPics[index - 1].url
            }
        })

        console.log('Building paginated pages')
        const paginatedPageTemplate = path.resolve(`src/templates/paginatedPageTemplate.jsx`)

        /* Iterate needed pages and create them. */
        const countImagesPerPage = 20
        const countPages = Math.ceil(allPics.length / countImagesPerPage)

        for (let currentPage = 1; currentPage <= countPages; currentPage++) {
            const pathSuffix = currentPage  /* To create paths "/", "/2", "/3", ... */

            /* Collect images needed for this page. */
            const startIndexInclusive = countImagesPerPage * (currentPage - 1)
            const endIndexExclusive = startIndexInclusive + countImagesPerPage
            const pageImages = allPics.slice(startIndexInclusive, endIndexExclusive)

            /* Combine all data needed to construct this page. */
            const pageData = {
                pageImages,
                countPages,
                currentPage,
            }
            /* Create JSON (for infinite scroll) */
            createJSON(pageData)
        }


        createPage({
            path: `/${basePath}`,
            component: paginatedPageTemplate,
            context: {
                countPages,
                currentPage: 1
            }
        })

        console.log(`\nCreated ${countPages} pages of paginated content.`)


        console.log('Building single project pages')
        const singleItemTemplatePage = path.resolve(`src/templates/SingleProjectTemplate.jsx`)

        allPics.forEach(picData => {
            const { name } = picData
            const pageData = {
                path: `/${basePath}/${name}`,
                component: singleItemTemplatePage,
                context: picData
            }
            createPage(pageData)
        })

        console.log(`\nCreated ${allPics.length} single image pages.`)


    } catch (error) {
        throw error
    }

}


function createJSON(pageData) {
    const pathSuffix = pageData.currentPage
    const dir = "public/paginationJson/"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const filePath = dir + "projects" + pathSuffix + ".json";
    const dataToSave = JSON.stringify(pageData.pageImages);
    fs.writeFile(filePath, dataToSave, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}