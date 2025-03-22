import React from 'react';
import {Outlet} from 'react-router-dom';
import {BackToTopProvider} from '../contexts/BackToTopProvider';
import BackToTopButton from '../components/BackToTopButton';

const BackToTopLayout: React.FC = () => {
    return (
        <BackToTopProvider showBackToTop={true}>
            <Outlet/>
            <BackToTopButton/>
        </BackToTopProvider>
    );
};

export default BackToTopLayout;
