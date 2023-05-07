import React from 'react'
import NavItem from './TheNavItem'
import TheNavLogo from './TheNavLogo'

const TheNav = React.memo(() => (
    <nav className="nav">
        <TheNavLogo />
        <NavItem
            ulName="nav__list"
            liName="nav__list-item"
            name={{
                1: 'home',
                2: 'search',
                3: 'folder_open',
                4: 'person'
            }}
            navTwo={{
                ulName: "nav__list",
                liName: "nav__list-item",
                name: {
                    1: 'favorite',
                    2: 'star_rate',
                    3: 'folder_open',
                }
            }}
            navThree={{
                ulName: "nav__list-bottom",
                liName: "nav__list-item",
                name: {
                    1: 'settings'
                }
            }}
        />
    </nav>
));

export default TheNav