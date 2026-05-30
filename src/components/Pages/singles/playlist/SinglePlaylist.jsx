import "./SinglePlaylist.css";
import { useParams } from "react-router-dom";
import { Play, Heart, Clock3 } from "lucide-react";

export default function SinglePlaylist() {
    const { slug } = useParams();

    const songs = [
        { id: 1, title: "Night Drive", artist: "Ali Rad", duration: "3:22" },
        { id: 2, title: "Memories", artist: "Sina", duration: "4:11" },
        { id: 3, title: "Lost Love", artist: "Amir", duration: "2:58" },
        { id: 4, title: "Summer Rain", artist: "Arash", duration: "3:44" },
    ];

    return (
        <div className="playlist-page">

            <div className="playlist-header">

                <img
                    src="https://picsum.photos/500"
                    alt=""
                    className="playlist-cover"
                />

                <div className="playlist-info">

                    <span className="playlist-type">
                        Playlist
                    </span>

                    <h1>
                        {slug.replaceAll("-", " ")}
                    </h1>

                    <p className="playlist-description">
                        بهترین موزیک‌ها برای رانندگی شبانه 🌙
                    </p>

                    <div className="playlist-meta">
                        <strong>Musix</strong>
                        <span>•</span>
                        <span>24 Songs</span>
                        <span>•</span>
                        <span>1h 28m</span>
                    </div>

                </div>

            </div>

            <div className="playlist-actions">

                <button className="playlist-play-btn">
                    <Play fill="white" />
                </button>

                <button className="playlist-like-btn">
                    <Heart />
                </button>

            </div>

            <div className="playlist-tracks">

                <h2>Songs</h2>

                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        className="playlist-track"
                    >
                        <span>{index + 1}</span>

                        <div className="track-main">

                            <img
                                src={`https://picsum.photos/60?random=${song.id}`}
                                alt=""
                            />

                            <div>
                                <h4>{song.title}</h4>
                                <span>{song.artist}</span>
                            </div>

                        </div>

                        <Clock3 size={16} />

                        <span>{song.duration}</span>

                    </div>
                ))}

            </div>

        </div>
    );
}