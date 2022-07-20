import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button/Button";

const PickGame = () => {
    return (
        <>
            <Link to={'/game'}><Button>Слово</Button></Link>
            <div style={{marginBottom: 16}}></div>
            <Link to={'/alias'}><Button>Alias</Button></Link>
        </>
    );
};

export default PickGame;
