import './header.scss'

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <header className='main-header'>
      <div className="main-header__title-container">
        <h1 className='main-header__title'>
          <Link to="/"> Weronika Wójcik </Link>
        </h1>
        <div className="main-header__sub-title">
          <span>INTERIOR</span>
          <span>DESIGN</span>
        </div>
      </div>

      <Navbar />
    </header>
  )
}

export default Header
