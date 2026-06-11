import {Drawer,Box,Divider} from "@mui/material";
import DrawerHeader from "./DrawerHeader.jsx";
import DrawerMenuSection from "./DrawerMenuSection.jsx";
import DrawerFooter from "./DrawerFooter.jsx";
import {useSelector} from "react-redux";
import {langs} from "../../../../../setting/lang.jsx";

export default function SideDrawer({
                                       drawerOpen,
                                       setDrawerOpen,
                                       lang,
                                       location,
                                       handleNavigation,

                                   }){

    const currentLang = useSelector(state => state.languages.currentLang);
    const sidebarItems = langs[currentLang].navs.main_menu;
    const sidebarFeatures = langs[currentLang].navs.feature_menu;

    return(

        <Drawer
            anchor={lang=='fa' ? 'right':'left'}
            open={drawerOpen}
            onClose={()=>setDrawerOpen(false)}
            className={'drawer'}
        >

            <Box>

                <DrawerHeader setDrawerOpen={setDrawerOpen}/>

                <Divider/>

                <DrawerMenuSection
                    title="Main Menu"
                    items={sidebarItems}
                    location={location}
                    handleNavigation={handleNavigation}

                />

                <Divider/>

                <DrawerMenuSection
                    title="More Options"
                    items={sidebarFeatures}
                    location={location}
                    handleNavigation={handleNavigation}
                    startIndex={sidebarItems.length}
                />

                <DrawerFooter setDrawerOpen={setDrawerOpen} />
            </Box>

        </Drawer>

    )
}
