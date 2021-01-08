
import React from "react"
import PropTypes from "prop-types"


import Header from "./header.jsx"
import "./layout.scss"

const Layout = ({ children, nonColor }) => {

  return (
    <div className={`wrapper ${nonColor ? "no-Color" : ""}`}>
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
  nonColor: PropTypes.bool
}

export default Layout
