require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Artofactory`,
    siteUrl: `https://www.artofactory.com`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-5304MZMMYN",
      },
    },

    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_KEY,
        tables: [
          {
            baseId: `appntJvRc0wlBRXVh`,
            tableName: `Products`,
            tableView: `artofactory`,
            mapping: { photo: 'fileNode' },
          },
          {
            baseId: `appntJvRc0wlBRXVh`,
            tableName: `Data`,
            tableView: `gallery`,
            mapping: { photo: 'fileNode' },
          },
        ],
      },
    },
    
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
