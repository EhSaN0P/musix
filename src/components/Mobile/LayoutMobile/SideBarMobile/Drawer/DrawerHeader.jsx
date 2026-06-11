import {Avatar,Box,Typography  ,IconButton} from "@mui/material";
import * as Icons from "@mui/icons-material";
import {useSelector} from "react-redux";
import {themes} from "../../../../../setting/them.js";
import './DrawerHeader.css'
import {langs} from "../../../../../setting/lang.jsx";
import {useEffect, useState} from "react";
import apiService from "../../../../../services/apiService.js";
import {setLoading, setUser} from "../../../../../store/authSlice.js";
import {Link} from "react-router-dom";

export default function DrawerHeader({currentTheme,setDrawerOpen}){

    const them = useSelector(state => state.theme.currentTheme);
    const lang = useSelector(state => state.languages.currentLang);

    const header = themes[them].drawer.user_name;
     const gradient = themes.makeGradient(them)

    const { isAuthenticated, user } = useSelector(
        state => state.auth
    );
     useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await apiService.get("/auth/me");

                setUser(res.data.user);

                if (res.data.user?.avatar) {
                    setAvatar(res.data.user.avatar);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return(
        <Box className="drawer-header-profile " sx={{background:gradient}}  >

            {isAuthenticated && <Box sx={{display: 'flex', alignItems: 'center', gap: 2, marginBlock: 2}}>

                <Link to={'/profile'}  >
                    <Avatar src={user.avatar} sx={{width: 56, height: 56}}>

                    </Avatar>
                </Link>
                <Link to={'/profile'}  >
                    <Box>
                        <Typography sx={{color: header}} variant="h6">
                            {user.name}
                        </Typography>
                    </Box>
                </Link>

            </Box>}

            {/*close btn*/}
            <IconButton
                onClick={()=>setDrawerOpen(false)}
                sx={{position:'absolute',top:5,right:5}}
                color={'error'}
            >
                <Icons.Close/>
            </IconButton>

        </Box>
    )
}
