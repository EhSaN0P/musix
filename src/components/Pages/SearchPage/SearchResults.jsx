import { Box, Typography } from '@mui/material';
import './SearchResults.css';
import { useSelector } from "react-redux";
import { langs } from "../../../setting/lang.jsx";
import MediaGridCard from "../../Cards/MediaGridCard.jsx";

export default function SearchResults({ query, results, activeFilter }) {
    const currentLang = useSelector(state => state.languages?.currentLang || 'fa');
    const currentTheme = useSelector(state => state.theme?.currentTheme || 'dark');

    if (!query) {
        return (
            <Box className={`search-results ${currentTheme}`}>
                <Typography variant="body1" className="empty-message">
                    {langs[currentLang].searchFilters.searchSomeThing}
                </Typography>
            </Box>
        );
    }



    // ✅ fix: safe fallback
    const tracks = results?.tracks || [];
    const remixes = results?.remixes || [];
    const remixers = results?.remixes || [];
    const albums = results?.albums || [];
    const artists = results?.artists || [];
    const playlists = results?.playlists || [];

    const hasResults =
        tracks.length > 0 ||
        albums.length > 0 ||
        artists.length > 0 ||
        playlists.length > 0 ||
        remixes.length > 0;
        remixers.length > 0;
1
    if (!hasResults) {
        return (
            <Box className={`search-results ${currentTheme}`}>
                <Typography variant="body1" className="empty-message">
                    {langs[currentLang].notFoundSearch}
                </Typography>
            </Box>
        );
    }

    return (
        <Box className={`search-results ${currentTheme}`}>

            {/* Songs */}
            {(activeFilter === 'all' || activeFilter === 'songs') && tracks.length > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters.songs.value} ({tracks.length})
                    </Typography>

                    <div className="content-grid">
                        {tracks.map(item => (
                            <MediaGridCard
                                key={item.id}
                                item={{
                                    ...item,
                                    type: 'original',
                                    type2: item.type
                                }}
                            />
                        ))}
                    </div>
                </Box>
            )}

            {/* Albums */}
            {(activeFilter === 'all' || activeFilter === 'albums') && albums.length > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters.albums.value} ({albums.length})
                    </Typography>

                    <div className="content-grid">
                        {albums.map(item => (
                            <MediaGridCard
                                key={item.id}
                                item={{
                                    ...item,
                                    type: 'album',
                                }}
                            />
                        ))}
                    </div>
                </Box>
            )}

            {/* Artists */}
            {(activeFilter === 'all' || activeFilter === 'artists') &&
                artists.filter(item => item.type !== 'remixer').length > 0 && (

                    <Box className="results-section">

                        <Typography variant="h6" className="section-title">
                            {langs[currentLang].searchFilters.artists.value} (
                            {artists.filter(item => item.type !== 'remixer').length}
                            )
                        </Typography>

                        <div className="content-grid">
                            {artists
                                .filter(item => item.type !== 'remixer')
                                .map(item => (
                                    <MediaGridCard
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                        </div>

                    </Box>
                )}

            {/* Remixers */}
            {(activeFilter === 'all' || activeFilter === 'remixers') && remixers.length > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters.remixers.value} ({remixers.length})
                    </Typography>

                    <div className="content-grid">
                        {artists.map(item => (
                            <MediaGridCard
                                key={item.id}
                                item={{
                                    ...item,
                                }}
                            />
                        ))}
                    </div>
                </Box>
            )}


            {/* Remixes (FIXED) */}
            {(activeFilter === 'all' || activeFilter === 'remixes') && remixes.length > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters?.remixes?.value ?? 'ریمیکس‌ها'} ({remixes.length})
                    </Typography>

                    <div className="content-grid">
                        {remixes.map(item => (
                            <MediaGridCard
                                key={item.id}
                                item={{
                                    ...item,
                                }}
                            />
                        ))}
                    </div>
                </Box>
            )}

            {/* Playlists */}
            {(activeFilter === 'all' || activeFilter === 'playlists') && playlists.length > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters?.playlists?.value ?? 'پلی‌لیست‌ها'} ({playlists.length})
                    </Typography>

                    <div className="content-grid">
                        {playlists.map(item => (
                            <MediaGridCard
                                key={item.id}
                                item={{
                                    ...item,
                                    type: 'playlist'
                                }}
                            />
                        ))}
                    </div>
                </Box>
            )}

        </Box>
    );
}