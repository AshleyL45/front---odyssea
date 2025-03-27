import React from 'react';
import {Outlet} from 'react-router-dom';
import {BackToTopProvider} from '../contexts/BackToTopProvider';
import BackToTopButton from '../components/ReusableComponents/BackToTopButton';

const BackToTopLayout: React.FC = () => {
    return (
        <BackToTopProvider showBackToTop={true}>
            <Outlet/>
            <BackToTopButton/>
        </BackToTopProvider>
    );
};

export default BackToTopLayout;
