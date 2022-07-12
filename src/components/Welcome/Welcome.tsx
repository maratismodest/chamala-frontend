import cn from 'classnames'
import React from 'react';
import {isMobile} from 'react-device-detect';
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import welcome from './Welcome.module.scss'
import {ReactComponent as Logo} from "./welcome.svg";

const Welcome = () => {
    return (
        <>
            <Logo/>
            <h1 className={cn(welcome.title, {
                [welcome.titleMobile]: isMobile
            })}>Изучение татарского языка в формате мини-игр</h1>
            <Link to={'/pick-game'}><Button>Начать</Button></Link>
        </>
    );
};

export default Welcome;
