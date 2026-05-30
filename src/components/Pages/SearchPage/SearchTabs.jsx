// components/SearchTabs.jsx
import { Box, Tabs, Tab } from '@mui/material';
import { useSelector } from 'react-redux';
import { themes } from '../../../setting/them.js';
import { langs } from '../../../setting/lang.jsx';
import './SearchTabs.css';

export default function SearchTabs({ activeFilter, onFilterChange }) {
    const currentThem = useSelector(state => state.theme.currentTheme);
    const currentLang = useSelector(state => state.languages.currentLang);

    const filters = Object.values(langs[currentLang].searchFilters);

    return (
        <Box className="search-tabs">
            <Tabs
                value={activeFilter}
                onChange={onFilterChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                    minHeight: 48,
                    '& .MuiTabs-indicator': {
                        height: 3,
                        borderRadius: '3px 3px 0 0',
                        backgroundColor: themes[currentThem].searchBar.borderColor || '#4ecdc4',
                    },
                    '& .MuiTabs-scrollButtons': {
                        width: 40,
                        color: 'rgba(255, 255, 255, 0.9)',
                        '&.Mui-disabled': {
                            opacity: 0.2,
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        }
                    },
                    '& .MuiTabs-flexContainer': {
                        gap: '0.5rem',
                    }
                }}
            >
                {filters.map((item) => (
                    <Tab
                        key={item.id}
                        label={item.value}
                        value={item.id}
                        sx={{
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            minWidth: 'auto',
                            padding: '0.75rem 1.5rem',
                            color: activeFilter === item.id
                                ? `${themes[currentThem].searchFilters.activeTabColor} !important`
                                : `${themes[currentThem].searchFilters.tabColor} !important`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: 'rgba(255, 255, 255, 0.9)',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            }
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
}
