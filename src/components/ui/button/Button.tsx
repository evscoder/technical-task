import React, {FC} from 'react';
import cn from "clsx";
import styles from './Button.module.css';

interface Props {
    classNames?: string,
    onClick: () => void,
    type?: 'button' | 'reset' | 'submit',
    children: string,
    disabled?: boolean
}

const Button: FC<Props> = ({ children, ...props }) => {
    return (
        <button className={cn(styles.button, props.classNames)} {...props}>
            { children }
        </button>
    );
};

export default Button;
