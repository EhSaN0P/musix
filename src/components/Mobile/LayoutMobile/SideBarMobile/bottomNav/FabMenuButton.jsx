import { Fab } from "@mui/material";
import { motion } from "framer-motion";
import * as Icons from "@mui/icons-material";

export default function FabMenuButton({drawerOpen,setDrawerOpen,theme}) {

    return(
        <Fab
            className="fab-menu-button"
            onClick={()=>setDrawerOpen(true)}

        >

            <motion.div
                animate={{rotate: drawerOpen ? 45 : 0}}
                transition={{duration:0.3}}
            >
                <Icons.Menu sx={{fontSize:32}}/>
            </motion.div>

        </Fab>
    )
}
