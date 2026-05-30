import {useState} from "react";
import {motion} from "framer-motion";
import {useSelector} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom";

import './SideBarMobile.css'
import BottomNavBar from "./bottomNav/BottomNavBar.jsx";
import FabMenuButton from "./bottomNav/FabMenuButton.jsx";
import SideDrawer from "./Drawer/SideDrawer.jsx";


export default function SideBarMobile(){

    const lang = useSelector(state=>state.languages.currentLang)
    const navigate = useNavigate()
    const location = useLocation()

    const [drawerOpen,setDrawerOpen] = useState(false)

    const handleNavigation = (path)=>{
        navigate(path)
        setDrawerOpen(false)
    }

    return(
        <>

            <motion.div
                initial={{y:100,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{duration:0.5}}
                className="mobile-bottom-nav"
            >

                <BottomNavBar
                     handleNavigation={handleNavigation}
                 />

                <FabMenuButton
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}

                />




            </motion.div>

            <SideDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                lang={lang}
                location={location}
                 handleNavigation={handleNavigation}
            />

        </>
    )
}
