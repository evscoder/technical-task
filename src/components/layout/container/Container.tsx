import React, {FC} from 'react';
import styles from './Container.module.css';
import cn from "clsx";

interface Props {
    children: React.ReactElement;
    classNames?: string
}

const Container: FC<Props> = ({ children, classNames }) => {
    return (
        <div className={cn(styles.container, classNames)}>
            { children }
        </div>
    );
};

export default Container;
