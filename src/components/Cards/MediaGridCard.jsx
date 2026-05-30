import './MediaGridCard.css';
import { Play, Heart, Music2, Disc3, ListMusic } from 'lucide-react';

export default function MediaGridCard({
                                          item,
                                          liked = false,
                                          onLike,
                                          onPlay,
                                      }) {

    const isArtist = item.type === 'artist';

    const getBadge = () => {
        switch (item.type) {
            case 'song':
                return 'موزیک';

            case 'artist':
                return 'آرتیست';

            case 'album':
                return 'آلبوم';

            case 'playlist':
                return 'پلی لیست';

            case 'remix':
                return 'ریمیکس';

            default:
                return '';
        }
    };

    return (
        <div className="media-grid-card">

            <div className={`mg-image ${isArtist ? 'artist' : ''}`}>

                <img
                    src={item.image}
                    alt={item.title}
                />

                {!isArtist && (
                    <button
                        className="mg-play"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPlay?.(item);
                        }}
                    >
                        <Play size={18} fill="white" />
                    </button>
                )}

                {(item.type === 'song' || item.type === 'remix') && (
                    <button
                        className={`mg-like ${liked ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike?.(item.id);
                        }}
                    >
                        <Heart
                            size={16}
                            fill={liked ? 'currentColor' : 'none'}
                        />
                    </button>
                )}

                <span className="mg-badge">
                    {getBadge()}
                </span>

            </div>

            <div className="mg-content">

                <h4 className="mg-title">
                    {item.title}
                </h4>

                <p className="mg-subtitle">
                    {item.subtitle}
                </p>

            </div>

        </div>
    );
}