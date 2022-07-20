import React, {CSSProperties, ReactNode} from 'react';
import btn from './Button.module.scss'

interface ButtonProps {
    children: ReactNode,
    onClick?: () => void,
    ref?: any,
    style?: CSSProperties,
    disabled? : boolean
}

const Button = ({children, onClick, style, ref,disabled}: ButtonProps) => {
    return (
        <button className={btn.button} onClick={onClick} ref={ref} style={style} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
