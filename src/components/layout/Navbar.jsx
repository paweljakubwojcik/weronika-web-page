import React from 'react'
import { Link } from "gatsby"

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

export default function Navbar() {
    return (
        <div className="navbar">
            <ul className="links">
                {links.map(link =>
                    <li className="links__link-element" key={link.name}>
                        <Link to={link.url}>{link.name}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}
