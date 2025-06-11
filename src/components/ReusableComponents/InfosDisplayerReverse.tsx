import {FC, ReactNode} from 'react';

interface Props {
    image: string;
    children: ReactNode
}

const InfosDisplayerReverse: FC<Props> = ({image, children}) => {
    return (
        <>
            <section className='container-infos-displayer-reverse'>
                <div className="text-infos-displayer">{children}</div>
                <div className="image-infos-displayer" style={{backgroundImage: `url(${image})`}}></div>
            </section>
            <div className="travel-line"></div>
        </>
    );
};

export default InfosDisplayerReverse;
