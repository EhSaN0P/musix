// MainContent.jsx
import { useLocation } from 'react-router-dom';
import './MainContentMobile.css';
import MobileHeader from "./MobileHeader/MobileHeader .jsx";
import Nav from "../../../Desktop/LayoutDesktop/MainContentDesktop/Nav/Nav.jsx";

export default function MainContentMobile({ children }) {
    const location = useLocation();

    // استخراج نام صفحه از path
    const getPageName = () => {
        const path = location.pathname;
        if (path === '/') return 'New Vibes';

        // تبدیل /vibe-types به Vibe Types
        return path
            .slice(1)
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="main-content-mobile glass-bg  sidebar-container">
            <Nav />

            <MobileHeader></MobileHeader>
            <div className="page-header">
                <h1>{getPageName()}</h1>
            </div>
            <div className="page-body">
                {children}

            </div>
        </div>
    );
}
