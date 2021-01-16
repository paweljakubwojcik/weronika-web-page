const fetch = require('node-fetch');

const CMS_BASE_URL = 'https://cms-strapi-weronika-wojcik.herokuapp.com'

exports.getDataFromCMS = async () => {

    const data = await Promise.all([
        await (await fetch(`${CMS_BASE_URL}/projects`)).json(),
        await (await fetch(`${CMS_BASE_URL}/360-pics`)).json()
    ])

    return {
        projects: data[0],
        pic360: data[1],
    }
}


