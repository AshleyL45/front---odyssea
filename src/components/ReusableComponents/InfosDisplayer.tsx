import {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode;
    image: string
}

const InfosDisplayer: FC<Props> = ({children, image}) => {
    return (
        <>
            <div className="container-infos-displayer">
                <div className="image-infos-displayer" style={{backgroundImage: `url(${image})`}}></div>
                <div className="text-infos-displayer">{children}</div>
            </div>
            <div className="travel-line"></div>
        </>
    );
};

export default InfosDisplayer;
