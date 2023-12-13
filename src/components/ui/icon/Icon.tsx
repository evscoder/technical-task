import {FC} from 'react';
import {IconProps} from "../../../types/types";

interface Props extends IconProps {}
const Icon: FC<Props> = (icon) => {
    return (
        <svg className={`icon-${icon.name}`} width={icon.width} height={icon.height ? icon.height : icon.width}>
            <use xlinkHref={`#${icon.name}`}></use>
        </svg>
    );
};

export default Icon;
