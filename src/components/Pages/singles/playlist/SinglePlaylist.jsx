import "./SinglePlaylist.css";
import {Link, useParams} from "react-router-dom";
import { Play, Heart, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import apiService from "../../../../services/apiService.js";
import MusicLoader from "../../../MusicLoader/MusicLoader.jsx";

export default function SinglePlaylist() {
    const { slug } = useParams();

    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loadingFav, setLoadingFav] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchPlaylist = async () => {
            try {
                setLoading(true);

                const res = await apiService.get(`/playlists/${slug}`);
                const data = res.data;

                setPlaylist(data);

                const favRes = await apiService.get(
                    `/favorites/playlists/${data.id}/check`
                );

                setIsFavorite(favRes.data.favorited);
            } catch (err) {
                console.error(err);
                setPlaylist(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [slug]);

    const toggleFavorite = async () => {
        if (!playlist || loadingFav) return;

        try {
            setLoadingFav(true);

            const res = await apiService.post(
                `/favorites/playlists/${playlist.id}`
            );

            setIsFavorite(res.data.favorited);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingFav(false);
        }
    };

    if (loading) {
        return (
            <div className="playlist-page">
                <MusicLoader />
            </div>
        );
    }

    if (!playlist) {
        return <div className="playlist-page">Playlist not found</div>;
    }

    return (
        <div className="playlist-page">

            <div className="playlist-header">
                <img
                    src={playlist.cover_image || "/images/playlist/default.png"}
                    alt={playlist.name}
                    className="playlist-cover"
                />

                <div className="playlist-info">
                    <span className="playlist-type">Playlist</span>

                    <h1>{playlist.name}</h1>

                    <p>{playlist.description || "No description"}</p>

                    <div className="playlist-meta">
                        <strong>{playlist.user?.name || "User"}</strong>
                        <span>•</span>
                        <span>{playlist.tracks?.length || 0} Songs</span>
                    </div>
                </div>
            </div>

            <div className="playlist-actions">
                <button className="playlist-play-btn">
                    <Play fill="white" />
                </button>

                <button
                    className="playlist-like-btn flex justify-center items-center "
                    disabled={loadingFav}
                    onClick={toggleFavorite}
                >
                    <Heart
                        fill={isFavorite ? "#ef4444" : "none"}
                        color={isFavorite ? "#ef4444" : "currentColor"}
                    />
                </button>
            </div>

            <div className="playlist-tracks">
                <h2>Songs</h2>

                {playlist.tracks?.length > 0 ? (
                    playlist.tracks.map((song, index) => (
                       <Link to={`/song/${song.slug}`}>

                        <div key={song.id} className="playlist-track">
                            <span>{index + 1}</span>

                            <div className="track-main">
                                <img
                                    src={song.cover_image || "/images/song/default.png"}
                                    alt={song.title}
                                />

                                <div>
                                    <h4>{song.title}</h4>
                                    <span>{song.artist?.name}</span>
                                </div>
                            </div>

                            <Clock3 size={16} />
                            <span>{song.duration || "0:00"}</span>
                        </div>
                       </Link>
                    ))
                ) : (
                    <p>No songs found</p>
                )}
            </div>

        </div>
    );
}