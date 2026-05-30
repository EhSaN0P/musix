import './SideBarDesktop.css'
import {motion} from "framer-motion";
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {useSelector} from "react-redux";
import {Button, List, ListItem, Tooltip} from "@mui/material";
import * as Icons from "@mui/icons-material";
import * as Lucide from "lucide-react"



import {themes} from "../../../../setting/them.js";
import MusixIconEN from "../../../../assets/custom_icons/MusixIcons/MusixIconEN.jsx";
import MusixIconFA from "../../../../assets/custom_icons/MusixIcons/MusixIconFA.jsx";
import SideBarItemDesktop from "./SideBarItemDesktop/SideBarItemDesktop.jsx";
import {langs} from "../../../../setting/lang.jsx";





export default function SideBarDesktop( ) {


    const lang = useSelector(state => state.languages.currentLang)
    const currentThem = useSelector(state => state.theme.currentTheme)
    const navigate = useNavigate();
    const location = useLocation();
    const [isFlipped, setIsFlipped] = useState(false);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    const sidebarItems = langs[lang].navs.main_menu
    const sidebarFeatures   = langs[lang].navs.feature_menu


    const handleScroll = () => {
        const el = containerRef.current;
        if (!el) return;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const percent = (scrollTop / scrollHeight) * 100;
        setProgress(percent);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };


      return (
        <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="sidebar-container"
        >
            <div className={`sidebar-flip-wrapper  ${isFlipped ? 'flipped' : ''}`}>
                {/* جلو - صفحه اصلی */}
                <aside className="side-bar sidebar-front glass-bg  ">
                    <div>{lang == 'fa' ? <MusixIconFA/> : <MusixIconEN/>}</div>

                    <div
                        className="app-features"
                        ref={containerRef}
                        onScroll={handleScroll}
                    >
                        <div className="scroll-progress">
                            <div
                                className="scroll-progress-bar"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <List>
                            {sidebarItems.map((item, index) => (
                                <SideBarItemDesktop
                                    key={index}
                                    name={item.name}
                                    icon={item.icon}
                                    path={item.path}
                                    active={location.pathname === item.path }
                                    color={'primary'}
                                    onClick={() => handleNavigation(item.path)}
                                />
                            ))}
                        </List>

                    </div>

                    {/* دکمه چرخش */}
                    <div className="flip-button-container p-2 ">
                        <Tooltip title={langs[lang].tooltip.rotate} placement="top">
                            <Button
                                color={themes[currentThem].lists.rotate}
                                className={'list-item'}
                                onClick={handleFlip}
                                variant="outlined"
                                sx={{
                                    width: 'fit-content',
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center'
                                }}
                            >
                                <Icons.FlipCameraAndroid/>

                            </Button>
                        </Tooltip>
                        <Tooltip title={langs[lang].tooltip.logout} placement="top">
                            <Button
                                color={themes[currentThem].lists.logout}
                                className={'list-item'}
                                variant={'contained'}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center'
                                }}
                            >
                                <Icons.Logout />

                            </Button>
                        </Tooltip>


                    </div>

                </aside>

                {/* پشت - صفحه دوم */}
                <aside className="side-bar sidebar-back glass-bg">
                    <div className="back-header">
                        <h3 style={{color:themes[currentThem].lists.ListItemText}}>Settings & More</h3>
                    </div>

                    <List>
                        {sidebarFeatures.map((item, index) => (
                             <SideBarItemDesktop
                                key={index}
                                name={item.name}
                                icon={item.icon}
                                path={item.path}
                                active={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}
                            />
                        ))}
                    </List>

                    {/* دکمه برگشت */}
                    <div className="flip-button-container p-2 ">
                        <Tooltip title={langs[lang].tooltip.rotate} placement="top">
                            <Button
                                color={themes[currentThem].lists.rotate}
                                className={'list-item'}
                                onClick={handleFlip}
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center'
                                }}
                            >
                                <Icons.FlipCameraAndroid />

                            </Button>
                        </Tooltip>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
}
