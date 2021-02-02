const fetch = require('node-fetch');

const { siteMetadata: { cmsUrl: CMS_URL } } = require('./gatsby-config')

exports.getDataFromCMS = async () => {

    const data = await Promise.all([
        await (await fetch(`${CMS_URL}/projects`)).json(),
        await (await fetch(`${CMS_URL}/360-pics`)).json()
    ])

    return {
        projects: data[0],
        pic360: data[1],
    }
}


