// components/SearchInput.jsx
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import './SearchInput.css';
import {themes} from "../../../setting/them.js";
import {langs} from "../../../setting/lang.jsx";

export default function SearchInput({ value, onChange }) {
    const currentThem = useSelector(state => state.theme.currentTheme);
    const currentLang = useSelector(state => state.languages.currentLang);

    return (
        <TextField
            fullWidth
            placeholder={langs[currentLang].searchFilters.searchPlaceholder}
            value={value}
            onChange={onChange}
            color="success"
            variant="outlined"
            className="search-input"
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    color: themes[currentThem].searchBar.text,
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
        />
    );
}
