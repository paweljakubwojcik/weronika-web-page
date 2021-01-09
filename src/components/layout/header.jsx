import './header.scss'

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Navbar from "./Navbar"

const Header = ({ title }) => {
  return (
    <div className="container">
      <header className='main-header'>
        <div className="main-header__title-container">
          <h1 className='main-header__title'>
            <Link to='/' >
              Weronika Wójcik
            </Link>
          </h1>
        <div className="main-header__sub-title">
          <span>INTERIOR</span>
          <span>DESIGN</span>
        </div>
        </div>
      {title ? <h3 className="main-header__project-title" >{title}</h3> : <Navbar />}

      </header>
    </div >
  )
}

export default Header
