import {Button, ListItem} from "@mui/material";
 import {Link} from "react-router";
 import {themes} from "../../../../../setting/them.js";
import {useSelector} from "react-redux";

export default function SideBarItemDesktop({name,icon,active,css,path}) {

    const color = useSelector((state) => state.theme.currentTheme);
    return<Link to={path}>

     <ListItem>
         <Button

             color={themes[color].lists.ListItemDesktop}
             sx={{
                 display:'flex', justifyContent:'start', gap:2,
                 ...css

             }}
             className={active ?"list-item-active" :'list-item'}
             variant="outlined"

         >
             {icon}
             {name}
         </Button>
     </ListItem>
 </Link>


}