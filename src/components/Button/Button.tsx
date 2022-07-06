import React, {ReactNode} from 'react';
import {Button as Btn} from 'reakit'
import button from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    onClick?: () => void,
    ref?: any
}

const Button = ({children, onClick, ref}: ButtonProps) => {
    return (
        <Btn className={button.button} onClick={onClick} ref={ref}>
            {children}
        </Btn>
    );
};

export default Button;
