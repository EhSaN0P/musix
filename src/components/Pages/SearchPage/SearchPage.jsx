// SearchPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import SearchInput from './SearchInput';
import SearchTabs from './SearchTabs';
import SearchResults from './SearchResults';
import { mockData } from './mockData';
import './SearchPage.css';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const filterParam = searchParams.get('filter') || 'all';

    const [searchValue, setSearchValue] = useState(query);
    const [activeFilter, setActiveFilter] = useState(filterParam);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFilterChange = (event, newValue) => {
        setActiveFilter(newValue);
        if (searchValue.trim().length > 0) {
            setSearchParams({ q: searchValue, filter: newValue });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue.trim().length > 0) {
                setSearchParams({ q: searchValue, filter: activeFilter });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, activeFilter, setSearchParams]);

    useEffect(() => {
        setSearchValue(query);
        setActiveFilter(filterParam);
    }, [query, filterParam]);

    const filterResults = () => {
        if (!query) return { songs: [], albums: [], artists: [], remixes: [], playlists: [] };

        const searchLower = query.toLowerCase();

        const filteredSongs = mockData.songs.filter(song =>
            song.title.toLowerCase().includes(searchLower) ||
            song.artist.toLowerCase().includes(searchLower)
        );

        const filteredAlbums = mockData.albums.filter(album =>
            album.title.toLowerCase().includes(searchLower) ||
            album.artist.toLowerCase().includes(searchLower)
        );

        const filteredArtists = mockData.artists.filter(artist =>
            artist.name.toLowerCase().includes(searchLower)
        );

        // جستجو در ریمیکس‌ها
        const filteredRemixes = mockData.remixes.filter(remix =>
            remix.title.toLowerCase().includes(searchLower) ||
            remix.artist.toLowerCase().includes(searchLower)
        );

        // جستجو در پلی‌لیست‌ها
        const filteredPlaylists = mockData.playlists.filter(playlist =>
            playlist.title.toLowerCase().includes(searchLower) ||
            playlist.creator.toLowerCase().includes(searchLower)
        );

        return {
            songs: filteredSongs,
            albums: filteredAlbums,
            artists: filteredArtists,
            remixes: filteredRemixes,
            playlists: filteredPlaylists
        };
    };


    const results = filterResults();

    return (
        <Box className="search-page">
            <SearchInput
                value={searchValue}
                onChange={handleChange}
            />

            {query && (
                <SearchTabs
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />
            )}

            <SearchResults
                query={query}
                results={results}
                activeFilter={activeFilter}
            />
        </Box>
    );
}
