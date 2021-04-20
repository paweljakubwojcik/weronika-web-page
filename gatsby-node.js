/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const fs = require("fs")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const stringToURL = require("./src/util/normalizeStringToUrl")

exports.onPreInit = () => {
  /* checkin heckin node version because I dont wanna spend another 2h debugging dependencies tree just because of node version mismach */
  const v = process.versions.node
  const isRequiredVersion = v.match(/(^14.)+/g)
  if (!isRequiredVersion)
    console.error(
      "\x1b[31m%s\x1b[0m",
      ` Your node version is : ${v} \n This project requires node 14`
    )
}

exports.createSchemaCustomization = ({ actions }) => {
  console.log("creating custom scheme")
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

        type StrapiHeroImage implements Node{
            image: File @link(from: "image___NODE")
        }
    `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all StrapiHeroImages nodes that have a featured image url, call createRemoteFileNode
  if (node.internal.type === "StrapiHeroImage" && node.image.url !== null) {
    let fileNode = await createRemoteFileNode({
      url: node.image.url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.image___NODE = fileNode.id
    }
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const basePath = "projekty"

  try {
    const { data: result } = await graphql(`
      query DataQuery {
        pics360: allStrapi360Pics {
          nodes {
            img {
              ...data
            }
            name
          }
        }

        projects: allStrapiProjects(sort: { order: DESC, fields: updatedAt }) {
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
    result.pics360.nodes.forEach(node => {
      const {
        img: { formats },
        name,
      } = node
      allPics.push({
        name,
        project: name,
        formats: {
          medium: formats.medium?.url,
          small: formats.small?.url,
          thumbnail: formats.thumbnail?.url,
        },
        panoramic: true,
      })
    })

    //adding every picture as separate node
    result.projects.nodes.forEach(project => {
      const { name, img } = project
      const { formats } = img[0]

      allPics.push({
        name: `${name}`,
        project: name,
        formats: {
          medium: formats.medium?.url,
          small: formats.small?.url,
          thumbnail: formats.thumbnail?.url,
        },
      })
    })

    allPics.forEach((pic, index) => {
      pic.url = `/${basePath}/${stringToURL(pic.name)}`
      if (allPics[index - 1]) {
        allPics[index - 1].nextURL = pic.url
        pic.prevURL = allPics[index - 1].url
      }
    })

    console.log("Building paginated pages")
    const paginatedPageTemplate = path.resolve(
      `src/templates/paginatedPageTemplate.jsx`
    )

    /* Iterate needed pages and create them. */
    const countImagesPerPage = 20
    const countPages = Math.ceil(allPics.length / countImagesPerPage)

    for (let currentPage = 1; currentPage <= countPages; currentPage++) {
      const pathSuffix = currentPage /* To create paths "/", "/2", "/3", ... */

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
        currentPage: 1,
      },
    })

    console.log(`\nCreated ${countPages} pages of paginated content.`)

    console.log("Building single project pages")
    const singleItemTemplatePage = path.resolve(
      `src/templates/SingleProjectTemplate.jsx`
    )

    allPics.forEach(picData => {
      const { name, url } = picData
      const pageData = {
        path: url,
        component: singleItemTemplatePage,
        context: picData,
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
    fs.mkdirSync(dir)
  }
  const filePath = dir + "projects" + pathSuffix + ".json"
  const dataToSave = JSON.stringify(pageData.pageImages)
  fs.writeFile(filePath, dataToSave, function (err) {
    if (err) {
      return console.log(err)
    }
  })
}
