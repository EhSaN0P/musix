import './SingleArtist.css';
import { useParams } from "react-router-dom";
import { Play, Heart } from "lucide-react";

export default function SingleArtist() {
    const { slug } = useParams();

    return (
        <div className="artist-page">
            <div className="artist-header">
                <img
                    src="https://picsum.photos/300"
                    alt={slug}
                    className="artist-cover"
                />

                <div className="artist-info">
                    <span className="verified">✓ Verified Artist</span>

                    <h1>{slug.replaceAll('-', ' ')}</h1>

                    <p>12,345,678 monthly listeners</p>
                </div>
            </div>

            <div className="artist-actions">
                <button className="play-btn">
                    <Play size={22} fill="white" />
                </button>

                <button className="follow-btn">
                    <Heart size={18} />
                    Follow
                </button>
            </div>

            <section className="popular-section">
                <h2>Popular</h2>

                {[1, 2, 3, 4, 5].map((song) => (
                    <div key={song} className="song-row">
                        <span>{song}</span>

                        <div className="song-info">
                            <img
                                src={`https://picsum.photos/50?random=${song}`}
                                alt=""
                            />

                            <span>Song {song}</span>
                        </div>

                        <span>3:25</span>
                    </div>
                ))}
            </section>

            <section className="albums-section">
                <h2>Albums</h2>

                <div className="albums-grid">
                    {[1, 2, 3, 4].map((album) => (
                        <div key={album} className="album-card">
                            <img
                                src={`https://picsum.photos/300?random=${album}`}
                                alt=""
                            />

                            <h4>Album {album}</h4>
                            <span>2025 • Album</span>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}