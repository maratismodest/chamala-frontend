import React from 'react';
import {Button as Btn} from 'reakit'
import button from './Button.module.scss'

const Button = ({children}: any) => {
    return (
        <Btn className={button.button}>
            {children}
        </Btn>
    );
};

export default Button;
