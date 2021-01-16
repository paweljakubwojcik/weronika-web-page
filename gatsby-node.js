/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { getDataFromCMS } = require('./loader')
const path = require(`path`)
const fs = require('fs');



exports.createPages = async ({ actions }) => {
    const { createPage } = actions

    try {

        const result = await getDataFromCMS()

        const allPics = []
        result.pic360.forEach((node, i) => {

            const { name, description, img } = node

            allPics.push({
                name: `${name}`,
                data: {
                    description,
                    full: img.url,
                    medium: img.formats.medium?.url,
                    small: img.formats.small?.url,
                    thumbnail: img.formats.thumbnail?.url,
                    panoramic: true
                }
            })

            allPics[i].previous = allPics[i - 1]?.name
            if (allPics[i - 1]) allPics[i - 1].next = allPics[i].name

        })

        //adding every picture as separate node
        result.projects.forEach((project) => {
            const { name, img, description } = project

            img.forEach((node, index) => {
                const { url, formats, width, height } = node
                const { medium, small, thumbnail } = formats

                allPics.push({
                    name: `${name}-${index + 1}`,
                    data: {
                        description,
                        full: url,
                        medium: medium?.url,
                        small: small?.url,
                        thumbnail: thumbnail?.url,
                        width,
                        height
                    }
                })
                const i = allPics.length - 1
                allPics[i].previous = allPics[i - 1]?.name
                if (allPics[i - 1]) allPics[i - 1].next = allPics[i].name
            })
        })

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
            if (currentPage === 1)
                createPage(pageData)
        }
        console.log(`\nCreated ${countPages} pages of paginated content.`)


        console.log('Building single project pages')
        const singleItemTemplatePage = path.resolve(`src/templates/SingleProjectTemplate.jsx`)

        allPics.forEach(picData => {
            const { name, next, previous } = picData
            const basePath = 'project'
            const pageData = {
                path: `/${basePath}/${name}`,
                component: singleItemTemplatePage,
                context: {
                    url: `/${basePath}/${name}`,
                    previousUrl: `/${basePath}/${previous}`,
                    nextUrl: `/${basePath}/${next}`,
                    ...picData,
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