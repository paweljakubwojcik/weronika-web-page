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
        probable fix #3 - change provider or redystribute assets in strapi
    */

    console.log('Building paginated pages')
    const result = await graphql(`
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
    })


    console.log(allPics)

    return null
}