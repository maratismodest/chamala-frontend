import React, {ReactNode} from 'react';
import btn from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    onClick?: () => void,
    ref?: any
}

const Button = ({children, onClick, ref}: ButtonProps) => {
    return (
        <button className={btn.button} onClick={onClick} ref={ref}>
            {children}
        </button>
    );
};

export default Button;
