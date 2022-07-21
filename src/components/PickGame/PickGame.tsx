import React from 'react';
import {Link} from "react-router-dom";
import {routes} from "../../App";
import Button from "../Button/Button";
import classes from './PickGame.module.scss'

const PickGame = () => {
    return (
        <div className={classes.pickGame}>
            <Link to={routes.guess}><Button>Слово</Button></Link>
            <Link to={routes.alias}><Button>Alias</Button></Link>
        </div>
    );
};

export default PickGame;
