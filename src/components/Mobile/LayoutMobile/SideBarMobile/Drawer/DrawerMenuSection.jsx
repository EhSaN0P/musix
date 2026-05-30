import {Button, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {useSelector} from "react-redux";
import {themes} from "../../../../../setting/them.js";
import './DrawerMenuSection.css'


export default function DrawerMenuSection({items,title,location,handleNavigation,startIndex=0}){
     const theme = useSelector(state => state.theme.currentTheme);
     const currentThem = themes[theme].lists;


     return(
        <>


            <List sx={{px:1}}>
                {items.map((item,index)=>(
                    <motion.div
                        key={index}
                        initial={{x:-50,opacity:0}}
                        animate={{x:0,opacity:1}}
                        transition={{delay:(startIndex+index)*0.05}}
                    >

                        <ListItem disablePadding >
                            <Button
                                selected={location.pathname===item.path}
                                onClick={()=>handleNavigation(item.path)}
                                sx={{
                                    borderRadius:'16px',
                                    mb:0.5,
                                    background:`${location.pathname===item.path?currentThem.ListItemActive:currentThem.ListItem} `,
                                    color:`${location.pathname===item.path?currentThem.activePrimary:currentThem.primary} `



                                }}
                                variant={item.path===location.pathname? 'contained' : 'outlined'}
                                className={'mobile-item-menu'}
                            >

                                <ListItemIcon  sx={{
                                    minWidth:40 ,
                                    color:`${location.pathname===item.path?currentThem.activePrimary:currentThem.primary} `

                                }}>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText primary={item.name}/>

                            </Button>
                        </ListItem>

                    </motion.div>
                ))}
            </List>
        </>
    )
}
