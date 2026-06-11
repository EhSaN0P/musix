import './SingleArtist.css';
import {Link, useParams} from "react-router-dom";
import { Play, Heart } from "lucide-react";
import {useEffect, useState} from "react";
import apiService from "../../../../services/apiService.js";
import MusicLoader from "../../../MusicLoader/MusicLoader.jsx";

export default function SingleArtist() {
    const { slug } = useParams();

     const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                setLoading(true);

                const response = await apiService.get(`/artists/${slug}`);

                setArtist(response.data.artist);
                const checkFavorite = async () => {
                    const res = await apiService.get(
                        `/favorites/artists/${response.data.artist.id}/check`
                    );

                    setIsFavorite(res.data.favorited);
                };

                checkFavorite();

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchTrack();
    }, [slug]);

    if (loading) {
        return <div className="song-page"><MusicLoader/></div>;
    }

    if (!artist) {
        return <div className="song-page">artist not found</div>;
    }

    console.log(artist);

    return (
        <div className="artist-page">
            <div className="artist-header">
                <img
                    src={artist.cover_image || "/images/artist/default.png"}
                    alt={artist.name}
                    className="artist-cover"
                />

                <div className="artist-info">
                    <span className="verified">✓ Verified Artist</span>

                    <h1>{artist.name}</h1>

                    <p>{artist.followers_count.toLocaleString()} monthly listeners</p>
                </div>
            </div>

            <div className="artist-actions">
                <button className="play-btn">
                    <Play size={22} fill="white" />
                </button>

                <button
                    className="follow-btn"
                    onClick={async () => {
                        const res = await apiService.post(
                            `/favorites/artists/${artist.id}`
                        );

                        setIsFavorite(res.data.favorited);
                    }}
                >
                    <Heart
                        fill={isFavorite ? "#ef4444" : "none"}
                        color={isFavorite ? "#ef4444" : "currentColor"}
                    />
                 </button>
            </div>

            <section className="popular-section">
                <h2>Popular</h2>

                {artist.tracks.map((track,index) => (
                    <Link to={`/song/${track.id}`}>
                        <div key={track.id} className="song-row">
                            <span>{++index}</span>

                            <div className="song-info">
                                <img
                                    src={track.cover_image || "/images/song/default.png"}
                                    alt={track.title}
                                />

                                <span>{track.title}</span>
                            </div>

                            <span>{track.duration || "3:25"}</span>
                        </div>
                    </Link>
                ))}
            </section>

            <section className="albums-section">
                <h2>Albums</h2>

                <div className="albums-grid">
                    {artist.albums.length <=0 ? 'no album'  :artist.albums.map((album) => (
                        <Link to={`/album/${album.id}`}>
                            <div key={album.id} className="album-card">
                                <img
                                    src={album.image || "/images/album/default.png"}
                                    alt={album.name}
                                />

                                <h4>{album.name}</h4>
                                <span>{album.release_date || "تاریخ نامشخص"} • Album</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}