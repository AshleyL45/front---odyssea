import {FC, ReactNode} from 'react';
import style from "../../styles/AboutUs.module.css";

interface Props {
    children: ReactNode;
    image: string;
}

const InfosDisplayer: FC<Props> = ({children, image}) => {
    return (
        <>
            <div className={style.containerInfosDisplayer}>
                <div
                    className={style.imageInfosDisplayer}
                    style={{backgroundImage: `url(${image})`}}
                ></div>
                <div className={style.textInfosDisplayer}>{children}</div>
            </div>
            <div className={style.travelLine}></div>
        </>
    );
};

export default InfosDisplayer;
