import {useState, useEffect} from 'react';

export function useIsMobile(): boolean {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);

    useEffect(() => {
        const onResize = () => setIsMobileOrTablet(window.innerWidth <= 768);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isMobileOrTablet;
}
