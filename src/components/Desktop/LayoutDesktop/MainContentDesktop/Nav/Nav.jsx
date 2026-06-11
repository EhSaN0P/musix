import './Nav.css';

import   { useState } from 'react';
import {AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Divider, Button, Avatar, Box} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingDialog from './ProfileDialog/SettingDialog.jsx';
 import {ColorLensSharp, ImageSearch, Logout, MusicNote, MusicVideo, Person, QueueMusicSharp} from "@mui/icons-material";
import {DivideCircle, FileMusic, Search, Settings, Star} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {langs} from "../../../../../setting/lang.jsx";
import {themes} from "../../../../../setting/them.js";
import ThemeDialog from './ThemeDialog/ThemeDialog.jsx';
import {setTheme} from "../../../../../store/themSlice.js";
import {setLang} from "../../../../../store/langSlice.js";
import SearchInput from "./Search/Search.jsx";
import {Link} from "react-router-dom";

export default function Nav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogs, setDialogs] = useState({ profile: false, theme: false });

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const dispatch = useDispatch();

    const currentLang = useSelector(state => state.languages.currentLang)
    const currentThem = useSelector(state => state.theme.currentTheme)

    const [themeDialogOpen, setThemeDialogOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(currentThem);
    const [currentLanguage, setCurrentLanguage] = useState(currentLang);

    const handleThemeSave = ({ theme, language }) => {
        dispatch(setTheme(theme));
        dispatch(setLang(language));
        setCurrentLanguage(language);
        console.log('Theme:', theme, 'Language:', language);
    };


    const {isAuthenticated,user} = useSelector(state => state.auth);

     return (
        <AppBar position="static" style={{ background: "transparent", border:"none", boxShadow: "none" }}>
            <Toolbar className={'flex justify-between'}>
                    <Typography component={'div'}  >
                        <SearchInput/>
                    </Typography>

                <Box className={'flex justify-between  gap-3'}>
                    <Link to={'/profile'}>
                        <Avatar src={user? user.avatar  : '/images/artist.jpg'} >

                        </Avatar>
                    </Link>
                <IconButton color="inherit" onClick={handleMenuClick}>
                    <MoreVertIcon />
                </IconButton>
                </Box>

                <Menu
                    className={'pop-up-menu'}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{ className: 'glass-bg' }} // اعمال کلاس شیشه‌ای
                >
                    <MenuItem className={'pop-up-menu-item'}
                              onClick={() => {
                                  setDialogs({...dialogs, profile: true});
                                  handleClose();
                              }}
                    >
                        <Settings/>
                        {langs[currentLang].popUp.settingButton}
                    </MenuItem>

                    <MenuItem className={'pop-up-menu-item'} onClick={() => {
                         setThemeDialogOpen(true)
                        handleClose();
                    }}>
                        <ColorLensSharp/>
                        {langs[currentLang].popUp.themLangButton}
                    </MenuItem>
                    <Divider/>


                    <Button variant={'text'} color={themes[currentThem].popUp.logout} className={'pop-up-menu-item pop-up-menu-item-logout'}
                     onClick={() => {
                        alert('log out')
                        handleClose();
                      }}
                     >
                            <Logout/>
                            {langs[currentLang].popUp.logoutButton}
                    </Button>

                </Menu>
            </Toolbar>

            {/* کامپوننت‌های دیالوگ */}
            <SettingDialog open={dialogs.profile} onClose={() => setDialogs({...dialogs, profile: false})} />

            <ThemeDialog
                open={themeDialogOpen}
                onClose={() => setThemeDialogOpen(false)}
                currentTheme={currentTheme}
                currentLanguage={currentLanguage}
                onSave={handleThemeSave}
            />
        </AppBar>
    );
}
