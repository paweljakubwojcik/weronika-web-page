import './header.scss'

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <div className="container">
      <header className='main-header'>
        <div className="main-header__title-container">
          <h1 className='main-header__title'>
            Weronika Wójcik
        </h1>
          <div className="main-header__sub-title">
            <span>INTERIOR</span>
            <span>DESIGN</span>
          </div>
        </div>
        <Navbar />
      </header>
    </div>
  )
}

export default Header
