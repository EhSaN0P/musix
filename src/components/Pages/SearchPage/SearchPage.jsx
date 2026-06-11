// SearchPage.jsx

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';

import SearchInput from './SearchInput';
import SearchTabs from './SearchTabs';
import SearchResults from './SearchResults';

import apiService from '../../../services/apiService.js';

import './SearchPage.css';

export default function SearchPage() {

    const normalizeTrack = (item) => ({
        ...item,
        type: item.type === "remix" ? "remix" : "original",
        image: item.cover,
        title: item.title,
        subtitle: item.artist?.name,
    });

    const normalizeArtist = (item) => ({
        ...item,
        type: "artist",
        image: item.avatar,
        title: item.name,
        subtitle: `${item.followers_count || 0} followers`,
    });

    const normalizeAlbum = (item) => ({
        ...item,
        type: "album",
        image: item.cover,
        subtitle: item.artist?.name,
    });

    const normalizePlaylist = (item) => ({
        ...item,
        type: "playlist",
        image: item.cover,
        subtitle: item.user?.name,
    });





    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('q') || '';
    const filterParam = searchParams.get('filter') || 'all';

    const [searchValue, setSearchValue] = useState(query);
    const [activeFilter, setActiveFilter] = useState(filterParam);

    const [results, setResults] = useState({
        tracks: [],
        artists: [],
        albums: [],
        playlists: [],
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFilterChange = (_, newValue) => {
        setActiveFilter(newValue);

        if (searchValue.trim()) {
            setSearchParams({
                q: searchValue,
                filter: newValue,
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue.trim()) {
                setSearchParams({
                    q: searchValue,
                    filter: activeFilter,
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, activeFilter]);

    useEffect(() => {
        setSearchValue(query);
        setActiveFilter(filterParam);
    }, [query, filterParam]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                const data = res.data;

                setResults({
                    tracks: (data.tracks || []).map(normalizeTrack),
                    artists: (data.artists || []).map(normalizeArtist),
                    albums: (data.albums || []).map(normalizeAlbum),
                    playlists: (data.playlists || []).map(normalizePlaylist),
                });

                return;
            }

            try {
                setLoading(true);

                const res = await apiService.get('/search', {
                    params: {
                        q: query,
                    },
                });

                setResults(res.data);
            } catch (error) {
                console.error(error);

                setResults({
                    tracks: [],
                    artists: [],
                    albums: [],
                    playlists: [],
                });
            } finally {
                 setLoading(false);

            }
        };

        fetchResults();
    }, [query]);

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
                loading={loading}
            />
        </Box>
    );
}