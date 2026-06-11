import { Link } from 'react-router-dom';
import { useApiQuery } from '../../../hooks/useApi.js';
import './VibeTypes.css';

const colors = [
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
];

const VibeTypes = () => {
    const { data, isLoading } = useApiQuery('genres', '/genres');
    const genres = data?.data || data || [];

    return (
        <div className="vibe-types-container">
            <h1 className="page-title">انواع حس‌ها (Genres)</h1>
            <div className="genres-grid">
                {genres.map((genre, index) => (
                    <Link
                        key={genre.id}
                        to={`/genre/${genre.slug}`}
                        className="genre-card"
                        style={{ background: colors[index % colors.length] }}
                    >
                        <h2 className="genre-name">{genre.name}</h2>
                    </Link>
                ))}
            </div>
            {isLoading && <div className="loading-spinner">🎵 Loading...</div>}
        </div>
    );
};

export default VibeTypes;
