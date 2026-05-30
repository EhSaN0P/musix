import {Avatar,Box,Typography  ,IconButton} from "@mui/material";
import * as Icons from "@mui/icons-material";
import {useSelector} from "react-redux";
import {themes} from "../../../../../setting/them.js";
import './DrawerHeader.css'
import {langs} from "../../../../../setting/lang.jsx";

export default function DrawerHeader({currentTheme,setDrawerOpen}){

    const them = useSelector(state => state.theme.currentTheme);
    const lang = useSelector(state => state.languages.currentLang);

    const header = themes[them].drawer.user_name;
    const header_text = langs[lang].guest_name;
    const gradient = themes.makeGradient(them)


    return(
        <Box className="drawer-header-profile " sx={{background:gradient}}  >

            <Box sx={{display:'flex',alignItems:'center',gap:2,marginBlock:2}}>

                <Avatar sx={{width:56,height:56}}>

                 </Avatar>

                <Box>
                    <Typography sx={{color:header}} variant="h6">
                        {header_text}
                    </Typography>
                 </Box>

            </Box>

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
