import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import welcome from './Welcome.module.scss'
import {ReactComponent as Logo} from "./welcome.svg";

const Welcome = () => {
    return (
        <div>
            <Logo/>
            <h1 className={welcome.title}>Изучение татарского языка в формате мини-игр</h1>
            <Link to={'/game'}><Button>Начать</Button></Link>

        </div>
    );
};

export default Welcome;
