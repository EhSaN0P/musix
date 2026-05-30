import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box } from '@mui/material';
import { useSelector } from "react-redux";
import { langs } from "../../../../../../setting/lang.jsx";
import { themes } from "../../../../../../setting/them.js";
import {Search} from "lucide-react";

function SearchInput() {
    const currentLang = useSelector(state => state.languages.currentLang);
    const currentThem = useSelector(state => state.theme.currentTheme);

    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue.trim().length > 0) {
                navigate(`/search?q=${encodeURIComponent(searchValue)}`);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, navigate]);

    useEffect(() => {
        if (location.pathname === '/search') {
            setSearchValue('');
        }
    }, [location.pathname]);

    if (location.pathname === '/search') {
        return null;
    }

    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 400 }}>
            {/* آیکون بیرون TextField */}
            <Box sx={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                pointerEvents: 'none',
                color: themes[currentThem]?.searchBar?.text || 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Search/>
            </Box>

            <TextField
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: "3rem",
                        paddingRight: '40px', // فضا برای آیکون
                        color: themes[currentThem]?.searchBar?.text ,
                        backgroundColor: themes[currentThem]?.searchBar?.backgroundColor || 'rgba(255, 255, 255, 0.05)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: themes[currentThem].searchBar.borderColor,
                }
                }}
                placeholder={langs[currentLang]?.searchBar?.placeholder || 'جستجو...'}
                value={searchValue}
                onChange={handleChange}
            />
        </Box>
    );




}

export default SearchInput;
