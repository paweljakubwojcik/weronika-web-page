import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"



const links = [
  {
    name: 'Projects',
    url: '/projects'
  },
  {
    name: 'About',
    url: '#about'
  },
  {
    name: 'Contact',
    url: '#contact'
  },
]


const Header = () => (
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

    <ul className="links">
      {links.map(link =>
        <li className="links__link-element">
          <Link to={link.url}>{link.name}</Link>
        </li>
      )}
    </ul>
  </header>
)

export default Header
