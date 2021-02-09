
require('dotenv').config();


module.exports = {
  siteMetadata: {
    title: `Weronika Wójcik`,
    description: `Weronika Wójcik - dyplomowany projektant wnętrz z doświadczeniem i pasją. Zaprojektuje niepowtarzalne wnętrze twojej łazienki.`,
    author: `Me, the developer <pawel.jakub.wojcik@gmail.com>`,
    cmsUrl: "https://cms-strapi-weronika-wojcik.herokuapp.com",
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/ // See below to configure properly
        }
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://cms-strapi-weronika-wojcik.herokuapp.com`,
        queryLimit: 100, // Default to 100
        contentTypes: ['projects', '360-pics'],
        //If using single types place them in this array.
        singleTypes: [`hero-image`, `hero-description`, 'hero-projects', 'personal-info'],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: `${process.env.STRAPI_ID}`,
          password: `${process.env.STRAPI_PASS}`,
        },
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
