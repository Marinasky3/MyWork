import { NavLink } from 'react-router-dom';

import { StyledLink } from '../Link/StyledLink';

import './NavBar.scss'

const links = [
    {
        id: 1,
        url: '/dashboard',
        // exact: true,
        title: 'Dashboard'
    },
    {
        id: 2,
        url: '/conjunctions',
        // exact: true,
        title: 'Conjunctions'
    },
    // {
    //     id: 3,
    //     url: 'spaceguard.ai/docs',
    //     // exact: true,
    //     title: 'Documentation'
    // },
   
];

export const NavBar = () => {

    return (
        <nav className='navBar_styledNavList'>
            
                {links.map(({ id, url, exact, title }, index) => (
                    <div key={index} className = 'navBar_styledNavItem ' key={id}>
                        <StyledLink as={NavLink} to={url} exact >{title}</StyledLink>
                    </div>
                ))}
                <div className = 'navBar_styledNavItem ' >
                        <a  href="https://spaceguard.ai/docs" target="_blank" >Documentation</a>
                </div>
        </nav>
    )
}