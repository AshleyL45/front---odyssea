import {FC, ReactNode} from 'react';
import style from "../../styles/AboutUs.module.css";

interface Props {
    image: string;
    children: ReactNode;
}

const InfosDisplayerReverse: FC<Props> = ({image, children}) => {
    return (
        <>
            <section className={style.containerInfosDisplayerReverse}>
                <div className={style.textInfosDisplayer}>{children}</div>
                <div
                    className={style.imageInfosDisplayer}
                    style={{backgroundImage: `url(${image})`}}
                ></div>
            </section>
            <div className={style.travelLine}></div>
        </>
    );
};

export default InfosDisplayerReverse;
