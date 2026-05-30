 import './NewVibes.css';

const MOCK_NEW_VIBES = [
    { id: 1, title: 'Midnight Chill', artist: 'DJ Alex', cover: 'https://placehold.co/150x150/1e1e2f/fff?text=Chill' },
    { id: 2, title: 'Morning Energy', artist: 'Sarah Beats', cover: 'https://placehold.co/150x150/ff5722/fff?text=Energy' },
    { id: 3, title: 'Deep Focus', artist: 'Mind Flow', cover: 'https://placehold.co/150x150/4caf50/fff?text=Focus' },
    { id: 4, title: 'Neon Lights', artist: 'Synthwave Boy', cover: 'https://placehold.co/150x150/9c27b0/fff?text=Neon' },
];

const NewVibes = () => {
    return (
        <div className="new-vibes-container">
            <h1 className="page-title">حس‌های جدید (New Vibes)</h1>
            <p className="page-subtitle">تازه‌ترین ترک‌ها برای ساختن مود امروزت</p>

            <div className="vibes-grid">
                {MOCK_NEW_VIBES.map((vibe) => (
                    <div key={vibe.id} className="vibe-card">
                        <img src={vibe.cover} alt={vibe.title} className="vibe-cover" />
                        <div className="vibe-info">
                            <h3 className="vibe-title">{vibe.title}</h3>
                            <p className="vibe-artist">{vibe.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewVibes;
