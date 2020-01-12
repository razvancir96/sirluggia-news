import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/sirluggia-news.png';
import { connect } from 'react-redux';
import './Header.scss';

function Header(props) {
    const { favoritesNumber } = props;

    return (
        <header className="container-fluid container-min-max-width d-flex justify-content-between align-items-center
            pl-0 pr-5 h6">
            <Link to="/">
                <img src={logo} alt="logo"/>
            </Link>
            <p className="favorites">
                <Link to="/favorites" className="mr-1">FAVORITES</Link>
                <span>{`(${favoritesNumber})`}</span>
            </p>
        </header>
    )
}

function mapStateToProps(state) {
    return {
        favoritesNumber: state.favorites.data.length
    };
}

export default connect(mapStateToProps, null)(Header);
