// MainContent.jsx
import { useLocation } from 'react-router-dom';
import './MainContentDesktop.css';
import Nav from './Nav/Nav.jsx';

export default function MainContentDesktop({ children }) {
    const location = useLocation();

    const getPageName = () => {
        const path = location.pathname;
        if (path === '/') return 'New Vibes';

        return path
            .slice(1)
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (


        <div className="main-content-desktop  glass-bg   ">

            <Nav />
             <div className="page-header">
                <h1>{getPageName()}</h1>
            </div>
            <div className="page-body">

                {children}

            </div>
        </div>

     );
}
