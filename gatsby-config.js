module.exports = {
  siteMetadata: {
    title: `Weronika Wójcik Interior Design`,
    description: `Searching for a bathroom design? I\'m an interior designer eager to help you with all stylistic choces and materials`,
    author: `Me, the developer <pawel.jakub.wojcik@gmail.com>`,
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
        contentTypes: [],
        //If using single types place them in this array.
        singleTypes: [`hero-image`, `hero-description`, 'hero-projects'],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: "",
          password: "",
        },
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
