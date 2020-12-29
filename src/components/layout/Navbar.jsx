import React, { useState } from 'react'
import { Link } from "gatsby"
import Button from '../button/Button'

const links = [
    {
        name: 'Home',
        url: '/'
    },
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

export default function Navbar() {


    return (
        <>
            <div className="navbar">
                <ul className="links">
                    {links.map(link =>
                        <li className="links__link-element" key={link.name}>
                            <Link to={link.url}>{link.name}</Link>
                        </li>
                    )}
                </ul>
                <SideBar />
            </div>
        </>
    )
}

const SideBar = () => {
    const [visible, setSideBarVis] = useState(false)
    return (
        <>
            <button
                className={`navbar__ham-btn navbar__ham-btn--${visible ? 'close' : 'open'}`}
                onClick={() => setSideBarVis(visible => !visible)} >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <aside className={`sidebar ${visible ? 'sidebar--visible' : ''}`}>
                <ul className="sidebar__links-list">
                    {links.map(link =>
                        <li className="sidebar__link-element" key={link.name}>
                            <Button to={link.url}>{link.name}</Button>
                        </li>
                    )}
                </ul>
            </aside>
        </>
    )
}