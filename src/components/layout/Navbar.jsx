import React, { useEffect, useState } from 'react'
import { Link } from "gatsby"
import Button from '../button/Button'
import { scrollTo } from '../../util/methods'

const links = [
    {
        name: '',
        url: '/',
        element: '#home'
    },
    {
        name: 'O mnie',
        url: '/#About',
        element: '#about'
    },
    {
        name: 'Projekty',
        url: '/#projekty',
        element: '#projekty'
    },
    {
        name: 'Kontakt',
        url: '/#kontakt',
        element: '#kontakt'
    },
]



export default function Navbar() {


    const [active, setActive] = useState(null)

    useEffect(() => {

        const { pathname, hash } = window?.location
        setActive(pathname + hash)

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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

    const handleClick = (e, elementID, url) => {
        setActive(url)
        if (scrollTo(elementID))
            e.preventDefault()
    }


    return (
        <>
            <div className="navbar">
                <ul className="links">
                    {links.map(link =>
                        link.name.length !== 0 && <li className={`links__link-element ${link.url === active ? 'links__link-element--active' : ''}`} key={link.name}>
                            <Link to={link.url} onClick={(e) => handleClick(e, link.element, link.url)}>{link.name}</Link>
                        </li>
                    )}
                </ul>
                <SideBar handleClick={handleClick} />
            </div>
        </>
    )
}

const SideBar = ({ handleClick }) => {
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
                        link.name.length !== 0 && <li className="sidebar__link-element" key={link.name}>
                            <Button
                                to={link.url}
                                onClick={(e) => {
                                    handleClick(e, link.element, link.url)
                                    setSideBarVis(visible => !visible)
                                }}>
                                {link.name}
                            </Button>
                        </li>
                    )}
                </ul>
            </aside>
        </>
    )
}