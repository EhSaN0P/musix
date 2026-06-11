import {motion} from "framer-motion";
import * as Icons from "@mui/icons-material";
import './DrawerFooter.css'
import {useState} from "react";
import {Button, Tooltip} from "@mui/material";
import {langs} from "../../../../../setting/lang.jsx";
import {themes} from "../../../../../setting/them.js";
import Swal from "sweetalert2";
import apiService from "../../../../../services/apiService.js";
import {logout} from "../../../../../store/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export default function DrawerFooter( {setDrawerOpen}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lang = useSelector(state => state.languages.currentLang)
    const currentThem = useSelector(state => state.theme.currentTheme)

    const { isAuthenticated, user } = useSelector(
        state => state.auth
    );
    const handleLogout = async () => {

        setDrawerOpen(false);

        const result = await Swal.fire({
            title: langs[lang].swalLogout.title,
            text: langs[lang].swalLogout.text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: langs[lang].swalLogout.yes,
            cancelButtonText: langs[lang].swalLogout.no,
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            await apiService.post("/auth/logout");
            dispatch(logout());
            navigate("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: error.message || "مشکلی رخ داده است",
            });
        }
    };

    return(
        <div className="drawer-footer">



            {isAuthenticated &&

                <Tooltip title={langs[lang].tooltip.logout} placement="top">
                    <Button
                        color={themes[currentThem].lists.logout}
                        className={'list-item'}
                        variant={'contained'}
                        onClick={handleLogout}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <Icons.Logout />
                    </Button>

                </Tooltip>

            }

            {!isAuthenticated &&

                <Tooltip title={langs[lang].tooltip.login} placement="top">
                    <Button
                        color={themes[currentThem].lists.login}
                        className={'list-item'}
                        variant={'contained'}
                        onClick={()=> {
                            setDrawerOpen(false);

                            navigate('/login')

                        }}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <Icons.Login />
                    </Button>

                </Tooltip>

            }






        </div>
    )
}
