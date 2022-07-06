import React from 'react';
import {Link} from "react-router-dom";
import header from './Header.module.scss'

const Header = () => {
    return (
        <header>
            <Link to={'/'} className={header.title}>
                Chamala
            </Link>
        </header>
    );
};

export default Header;
