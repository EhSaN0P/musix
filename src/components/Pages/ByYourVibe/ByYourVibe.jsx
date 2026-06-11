import { useApiQuery } from '../../../hooks/useApi.js';
import MediaCard from '../../Cards/MediaGridCard.jsx';
import '../Home/Home.css';
import './ByYourVibe.css';

const ByYourVibe = () => {
    const { data: recentData, isLoading: recentLoading } = useApiQuery('by-your-vibe-recent', '/recently-played');
    const { data: favoritesData, isLoading: favoritesLoading } = useApiQuery('by-your-vibe-favorites', '/favorites');

    const recentlyPlayed = recentData?.data || recentData || [];
    const favorites = favoritesData?.tracks || favoritesData?.favorite_tracks || favoritesData?.data || [];
    const itemsById = new Map([...recentlyPlayed, ...favorites].map(item => [item.id, item]));
    const items = Array.from(itemsById.values());
    const isLoading = recentLoading || favoritesLoading;

    return (
        <div className="home-container by-your-vibe-container">
            <div className="vibe-header">
                <h1 className="page-title">میکسر هوشمند حس‌ها</h1>
                <p className="page-subtitle">بر اساس تاریخچه پخش و علاقه‌مندی‌های شما</p>
            </div>

            <div className="content-grid">
                {items.map(item => <MediaCard key={item.id} item={item} />)}
            </div>

            {isLoading && <div className="loading-spinner">🎵 Loading...</div>}
            {!isLoading && items.length === 0 && <div className="end-message">No personalized tracks yet</div>}
        </div>
    );
};

export default ByYourVibe;
