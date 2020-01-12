import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/sirluggia-news.png'

function Header() {
    return (
        <header>
            <Link to="/">
                <img src={logo} alt="logo"/>
            </Link>
            <Link to="/favorites">Favorites</Link>
        </header>
    )
}

export default Header;
