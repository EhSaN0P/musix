 import './VibeTypes.css';

const MOCK_GENRES = [
    { id: 1, name: 'پاپ', color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { id: 2, name: 'راک', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, name: 'الکترونیک', color: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)' },
    { id: 4, name: 'رپ و هیپ‌هاپ', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 5, name: 'کلاسیک', color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { id: 6, name: 'ورزشی', color: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
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
