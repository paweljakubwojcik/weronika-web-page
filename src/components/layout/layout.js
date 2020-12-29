/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header.jsx"
import "./layout.scss"

const Layout = ({ children }) => {

  return (
    <div className='wrapper'>
      <Header />
      <main >{children}</main>
      <footer className='main-footer'>
        © {new Date().getFullYear()}, Built with {` `} <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
