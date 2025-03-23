import React, {createContext, ReactNode, useContext} from 'react';

interface BackToTopContextProps {
    showBackToTop: boolean;
}

const BackToTopContext = createContext<BackToTopContextProps>({showBackToTop: false});

export const BackToTopProvider = ({children, showBackToTop}: { children: ReactNode, showBackToTop: boolean }) => {
    return (
        <BackToTopContext.Provider value={{showBackToTop}}>
            {children}
        </BackToTopContext.Provider>
    );
};

export const useBackToTop = () => useContext(BackToTopContext);
