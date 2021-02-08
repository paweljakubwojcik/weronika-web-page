import './header.scss'

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"

const Header = ({ title, filled }) => {

  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 10)
      setIsScrolled(true)
    else
      setIsScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`container ${filled || isScrolled ? 'container--filled' : ""}`}>
      <header className='main-header'>
        <div className="main-header__title-container">
          <h1 className='main-header__title'>
            <Link to='/' onClick={() => window.scroll({
              top: 0,
              behavior: 'smooth'
            })}>
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
