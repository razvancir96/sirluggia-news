import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

const Layout = (props) => {
    return(
        <div className="layout d-flex flex-column">
            <Header/>
                { props.children }
            <Footer/>
        </div>
    );
}

export default Layout;