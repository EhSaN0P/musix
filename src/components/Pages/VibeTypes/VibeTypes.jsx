 import './VibeTypes.css';

 const MOCK_GENRES = [
     {
         id: 1,
         slug: 'pop',
         name: 'پاپ',
         description: 'موسیقی پاپ ایرانی و خارجی',
         gradient: {
             from: '#f6d365',
             to: '#fda085'
         },
         imageUrl: '/images/genres/pop.jpg',
         playlistsCount: 42,
         createdAt: '2026-05-30T10:00:00Z'
     },
     {
         id: 2,
         slug: 'rock',
         name: 'راک',
         description: 'راک کلاسیک و مدرن',
         gradient: {
             from: '#f093fb',
             to: '#f5576c'
         },
         imageUrl: '/images/genres/rock.jpg',
         playlistsCount: 18,
         createdAt: '2026-05-30T10:00:00Z'
     },
     {
         id: 3,
         slug: 'electronic',
         name: 'الکترونیک',
         description: 'موسیقی الکترونیک و EDM',
         gradient: {
             from: '#5ee7df',
             to: '#b490ca'
         },
         imageUrl: '/images/genres/electronic.jpg',
         playlistsCount: 25,
         createdAt: '2026-05-30T10:00:00Z'
     },
     {
         id: 4,
         slug: 'hip-hop',
         name: 'رپ و هیپ‌هاپ',
         description: 'هیپ‌هاپ، ترپ و رپ',
         gradient: {
             from: '#43e97b',
             to: '#38f9d7'
         },
         imageUrl: '/images/genres/hiphop.jpg',
         playlistsCount: 31,
         createdAt: '2026-05-30T10:00:00Z'
     }
 ];

const VibeTypes = () => {
    return (
        <div className="vibe-types-container">
            <h1 className="page-title">انواع حس‌ها (Genres)</h1>
            <div className="genres-grid">
                {MOCK_GENRES.map((genre) => (
                    <div
                        key={genre.id}
                        className="genre-card"
                        style={{ background: genre.color }}
                    >
                        <h2 className="genre-name">{genre.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VibeTypes;
