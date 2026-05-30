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

    const hasResults =
        (results?.songs?.length ?? 0) > 0 ||
        (results?.albums?.length ?? 0) > 0 ||
        (results?.artists?.length ?? 0) > 0 ||
        (results?.remixes?.length ?? 0) > 0 ||
        (results?.playlists?.length ?? 0) > 0;

    if (!hasResults) {
        return (
            <Box className={`search-results ${currentTheme}`}>
                <Typography variant="body1" className="empty-message">
                    {langs[currentLang].notFoundSearch}
                </Typography>
            </Box>
        );
    }

    // تابع کمکی برای یکسان‌سازی فرمت دیتا برای MediaCard
    // اگر کلیدهای دیتای شما فرق دارد (مثلا به جای image از coverProfile استفاده شده)، اینجا را تغییر دهید
    const formatItem = (data, type) => ({
        id: data.id,
        title: data.title || data.name || 'بدون عنوان',
        subtitle: data.subtitle || data.artist || data.singer || (type === 'artists' ? 'آرتیست' : ''),
        image: data.image || data.cover || data.thumbnail || '',
        type: type
    });

    return (
        <Box className={`search-results ${currentTheme}`}>

            {/* Songs */}
            {(activeFilter === 'all' || activeFilter === 'songs') && (results?.songs?.length ?? 0) > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters.songs.value} ({results.songs.length})
                    </Typography>
                    <div className="content-grid">
                        <div className="content-grid">
                            {results.songs.map(item=>(
                                <MediaGridCard
                                    key={item.id}
                                    item={{
                                        ...item,
                                        type:'song'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Box>
            )}

            {/* Albums */}
            {(activeFilter === 'all' || activeFilter === 'albums') && (results?.albums?.length ?? 0) > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters.albums.value} ({results.albums.length})
                    </Typography>
                    <div className="content-grid">
                        <div className="content-grid">
                            {results.albums.map(item=>(
                                <MediaGridCard
                                    key={item.id}
                                    item={{
                                        ...item,
                                        type:'albums'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Box>
            )}

            {/* Artists */}
            {(activeFilter === 'all' || activeFilter === 'artists') && (results?.artists?.length ?? 0) > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters.artists.value} ({results.artists.length})
                    </Typography>
                    <div className="content-grid">
                        <div className="content-grid">
                            {results.artists.map(item=>(
                                <MediaGridCard
                                    key={item.id}
                                    item={{
                                        ...item,
                                        type:'artist'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Box>
            )}

            {/* Remixes */}
            {(activeFilter === 'all' || activeFilter === 'remixes') && (results?.remixes?.length ?? 0) > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters?.remixes?.value ?? 'ریمیکس‌ها'} ({results.remixes.length})
                    </Typography>
                    <div className="content-grid">

                        <div className="content-grid">
                            {results.remixes.map(item=>(
                                <MediaGridCard
                                    key={item.id}
                                    item={{
                                        ...item,
                                        type:'remixes'
                                    }}
                                />
                            ))}
                        </div>

                    </div>
                </Box>
            )}

            {/* Playlists */}
            {(activeFilter === 'all' || activeFilter === 'playlists') && (results?.playlists?.length ?? 0) > 0 && (
                <Box className="results-section">
                    <Typography variant="h6" className="section-title">
                        {langs[currentLang].searchFilters?.playlists?.value ?? 'پلی‌لیست‌ها'} ({results.playlists.length})
                    </Typography>
                    <div className="content-grid">
                        <div className="content-grid">
                            {results.playlists.map(item=>(
                                <MediaGridCard
                                    key={item.id}
                                    item={{
                                        ...item,
                                        type:'playlist'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Box>
            )}

        </Box>
    );
}
