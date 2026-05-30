import './mobileBottomNav.css';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {langs} from "../../../../../setting/lang.jsx";
import {themes} from "../../../../../setting/them.js";

export default function BottomNavBar() {
    const theme = useSelector(state => state.theme.currentTheme);
    const lang = useSelector(state => state.languages.currentLang)

    const quickAccess = langs[lang].navs.quick_menu;


     return (
        <section className="mobile-bottom-nav glass-bottom-nav  ">
            <nav className="bottom-nav-container flex justify-around items-center w-full">

                {quickAccess.map((item,index) =>

                <Link to={`${item.path}`} key={ index } >
                    <IconButton
                        sx={{ p: 3, color: location.pathname === item.path ? themes[theme].bottomNav.activeIcon :  themes[theme].bottomNav.icon }}
                    >
                        <span className={'flex-col items-center px-2 '}>
                            {item.icon}
                         </span>
                    </IconButton>
                </Link>


                    )
                }

            </nav>
        </section>
    );
}
