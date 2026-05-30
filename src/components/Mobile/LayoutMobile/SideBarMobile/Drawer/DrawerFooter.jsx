import {motion} from "framer-motion";
import * as Icons from "@mui/icons-material";
import './DrawerFooter.css'

export default function DrawerFooter(){

    return(
        <div className="drawer-footer">

            <motion.button
                whileTap={{scale:0.95}}
                className="logout-button"
            >

                <Icons.Logout/>
                <span>Logout</span>

            </motion.button>

        </div>
    )
}
