import "./SingleSong.css";
import { useParams } from "react-router-dom";
import { Play, Heart, Clock3 } from "lucide-react";

export default function SingleSong() {
    const { slug } = useParams();

    return (
        <div className="song-page">

            <div className="song-header">

                <img
                    src="https://picsum.photos/400"
                    alt={slug}
                    className="song-cover"
                />

                <div className="song-info">

                    <span className="song-type">
                        Single
                    </span>

                    <h1>
                        {slug.replaceAll("-", " ")}
                    </h1>

                    <div className="song-meta">
                        <span>Ali Rad</span>
                        <span>•</span>
                        <span>Album Name</span>
                        <span>•</span>
                        <span>2025</span>
                        <span>•</span>
                        <span>3:42</span>
                    </div>

                </div>

            </div>

            <div className="song-actions">

                <button className="play-btn">
                    <Play fill="white" />
                </button>

                <button className="like-btn-song">
                    <Heart />
                </button>

            </div>

            <section className="lyrics-section">

                <h2>Lyrics</h2>

                <div className="lyrics-box">
                    متن آهنگ اینجا قرار می‌گیرد...
                </div>

            </section>

            <section className="related-section">

                <h2>More Like This</h2>

                {[1, 2, 3, 4, 5].map(song => (
                    <div
                        key={song}
                        className="related-song"
                    >
                        <img
                            src={`https://picsum.photos/60?random=${song}`}
                            alt=""
                        />

                        <div>
                            <h4>Song {song}</h4>
                            <span>Ali Rad</span>
                        </div>

                        <Clock3 size={16} />

                        <span>3:21</span>

                    </div>
                ))}

            </section>

        </div>
    );
}