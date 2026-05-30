import "./SingleAlbum.css";
import { useParams } from "react-router-dom";
import { Play, Heart, Clock3 } from "lucide-react";

export default function SingleAlbum() {
    const { slug } = useParams();

    const songs = [
        { id: 1, title: "First Song", duration: "3:25" },
        { id: 2, title: "Second Song", duration: "4:11" },
        { id: 3, title: "Third Song", duration: "2:58" },
        { id: 4, title: "Fourth Song", duration: "3:44" },
    ];

    return (
        <div className="album-page">

            <div className="album-header">

                <img
                    src="https://picsum.photos/500"
                    alt=""
                    className="album-cover"
                />

                <div className="album-info">

                    <span className="album-type">
                        Album
                    </span>

                    <h1>
                        {slug.replaceAll("-", " ")}
                    </h1>

                    <div className="album-meta">
                        <span>Ali Rad</span>
                        <span>•</span>
                        <span>2025</span>
                        <span>•</span>
                        <span>12 Songs</span>
                        <span>•</span>
                        <span>42 min</span>
                    </div>

                </div>

            </div>

            <div className="album-actions">

                <button className="play-btn">
                    <Play fill="white" />
                </button>

                <button className="album-like-btn">
                    <Heart />
                </button>

            </div>

            <div className="tracks-section">

                <h2>Tracks</h2>

                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        className="track-row"
                    >
                        <span>{index + 1}</span>

                        <div className="track-info">
                            <h4>{song.title}</h4>
                            <span>Ali Rad</span>
                        </div>

                        <Clock3 size={16} />

                        <span>{song.duration}</span>
                    </div>
                ))}

            </div>

        </div>
    );
}