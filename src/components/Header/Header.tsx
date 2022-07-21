import React from 'react';
import {Link} from "react-router-dom";
import {routes} from "../../App";
import header from './Header.module.scss'

const Header = () => {
    return (
        <header>
            <Link to={routes.main} className={header.title}>
                Chamala
            </Link>
        </header>
    );
};

export default Header;
