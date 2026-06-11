import "./SingleAlbum.css";
import {Link, useParams} from "react-router-dom";
import { Play, Heart, Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import apiService from "../../../../services/apiService.js";
import MusicLoader from "../../../MusicLoader/MusicLoader.jsx";



export default function SingleAlbum() {
    const { slug } = useParams();
    const [album, setAlbum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loadingFav, setLoadingFav] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                setLoading(true);

                const response = await apiService.get(`/albums/${slug}`);

                const albumData = response.data.album;
                console.log(albumData);

                setAlbum(albumData);

                // ✔️ مستقیم از دیتا استفاده کن نه state
                const res = await apiService.get(
                    `/favorites/albums/${albumData.id}/check`
                );

                setIsFavorite(res.data.favorited);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchAlbum();
    }, [slug]);
    if (loading) {
        return (
            <div className="song-page">
                <MusicLoader />
            </div>
        );
    }

    if (!album) {
        return <div className="song-page">Album not found</div>;
    }

    return (
        <div className="album-page">
            {/* Album Header */}
            <div className="album-header">
                <img
                    src={album.cover_image || "/images/album/default.png"}
                    alt={album.name}
                    className="album-cover"
                />
                <div className="album-info">
                    <span className="album-type">Album</span>
                    <h1>{album.name}</h1>
                    <div className="album-meta song-info">
                        <Link to={`/artist/${album.artist.id}`} className={'flex gap-3 items-center '}>
                            <img
                                src={album.artist.cover_image || "/images/artist/default.png"}
                                alt={album.name}
                                className="artist-cover"
                            />
                        <span>{album.artist?.name || "Unknown Artist"}</span>
                        </Link>
                        <span>•</span>
                        <span>{album.release_date_fa || album.release_date || "تاریخ نامشخص"}</span>
                        <span>•</span>
                        <span>{album.tracks?.length || 0} Songs</span>
                      </div>
                </div>
            </div>

            {/* Album Actions */}
            <div className="album-actions">
                <button className="play-btn">
                    <Play fill="white" />
                </button>
                <button
                    className="album-like-btn flex justify-center items-center "
                    disabled={loadingFav}
                    onClick={async () => {
                        if (loadingFav) return;

                        setLoadingFav(true);

                        try {
                            const res = await apiService.post(
                                `/favorites/albums/${album.id}`
                            );

                            setIsFavorite(res.data.favorited);

                        } catch (err) {
                            console.error(err);
                        } finally {
                            setLoadingFav(false);
                        }
                    }}
                >
                    <Heart
                        fill={isFavorite ? "#ef4444" : "none"}
                        color={isFavorite ? "#ef4444" : "currentColor"}
                    />
                </button>
            </div>

            {/* Tracks Section */}
            <div className="tracks-section">
                <h2>Tracks</h2>
                {album.tracks?.length <= 0 ? (
                    <p>No tracks found</p>
                ) : (
                    album.tracks.map((song, index) => (
                        <Link to={`/song/${song.id}}`}>
                            <div key={song.id} className="song-row">
                                <span>{++index}</span>

                                <div className="song-info">
                                    <img
                                        src={song.cover_image || "/images/song/default.png"}
                                        alt={song.title}
                                    />

                                    <span>{song.title}</span>
                                </div>

                                <span>{song.duration || "3:25"}</span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}