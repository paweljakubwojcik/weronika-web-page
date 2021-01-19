import React, { useEffect, useState } from 'react'
import { Link } from "gatsby"
import Button from '../button/Button'

const links = [
    {
        name: 'Home',
        url: '/',
        element: '#home'
    },
    {
        name: 'Projects',
        url: '/projects'
    },
    {
        name: 'About',
        url: '/#about',
        element: '#about'
    },

    {
        name: 'Contact',
        url: '/#contact',
        element: '#contact'
    },
]

export default function Navbar() {

    const { pathname, hash } = window.location
    const [active, setActive] = useState(pathname + hash)

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(entry)
                    const url = entry.target.id === 'home' ? '/' : '/#' + entry.target.id
                    setActive(url)
                    window.history.replaceState(null, null, url)
                }
            })
        }, {
            threshold: 0.0,
            rootMargin: "-50% 0% -50% 0%"
        })

        links.forEach(({ url, element }) => {
            const target = document.body.querySelector(element)
            if (target)
                observer.observe(target)

        })
    }, [])


    return (
        <>
            <div className="navbar">
                <ul className="links">
                    {links.map(link =>
                        <li className={`links__link-element ${link.url === active ? 'links__link-element--active' : ''}`} key={link.name}>
                            <Link to={link.url} onClick={() => setActive(link.url)}>{link.name}</Link>
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