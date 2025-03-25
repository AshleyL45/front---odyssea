import {FC} from 'react';
import {Helmet} from "react-helmet";

const Pages: FC<{ children: any, title: string }> = ({children, title}) => {
    return (

        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}

        </>

    );
};

export default Pages;
