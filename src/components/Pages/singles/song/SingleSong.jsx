import "./SingleSong.css";
import { useParams } from "react-router-dom";
import { Play, Heart, Clock3 } from "lucide-react";
import apiService from "../../../../services/apiService.js";
import { useEffect, useState } from "react";
import MusicLoader from "../../../MusicLoader/MusicLoader.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../../../../store/playerSlice.js";

export default function SingleSong() {
    const { slug } = useParams();

    const [song, setSong] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    const fetchTrack = async () => {
        try {
            setLoading(true);

            const response = await apiService.get(`/tracks/${slug}`);

            console.log(response);
            const track = response.data.track;

            setSong(track);
            setRelated(response.data.related);


            const checkFavorite = async (type, id) => {
                const res = await apiService.get(`/favorites/${type}/${id}/check`);
                return res.data.favorited;
            };

            const fav = await checkFavorite(track.type ==='remix'?'remixes':'tracks', track.id);
            setIsFavorite(fav);

            console.log(fav)


        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) fetchTrack();
    }, [slug]);

    const handleFavorite = async () => {
        try {
            if (!song) return;

            const endpoint =
                song.type === "remix"
                    ? `/favorites/remixes/${song.id}`
                    : `/favorites/tracks/${song.id}`;

            const res = await apiService.post(endpoint);




             setIsFavorite(res.data.favorited);


        } catch (err) {
            console.error(err);
        }
    };

    const handlePlay = () => {
        dispatch(setCurrentSong({
            id: song.id,
            title: song.title,
            artist: song.artist?.name,
            cover: song.cover_image,
            audioUrl: song.audio_file,
            lyrics: song.lyrics || [],
        }));

        apiService.post(`/tracks/${song.slug || song.id}/play`).catch(console.error);
    };

    if (loading) return <div className="song-page"><MusicLoader /></div>;
    if (!song) return <div className="song-page">Song not found</div>;

    return (
        <div className="song-page">

            <div className="song-header">
                <img src={song.cover_image || "/images/song/default.png"} />

                <div className="song-info">
                    <span>{song.type}</span>
                    <h1>{song.title}</h1>

                    <div className="song-meta song">
                        <Link to={`/artist/${song.artist.id}`}>
                            {song.artist?.name}
                        </Link>
                        <span>•</span>
                        <span>{song.year}</span>
                        <span>•</span>
                        <span>{song.duration}</span>
                    </div>
                </div>
            </div>

            <div className="song-actions">
                <button className="play-btn" onClick={handlePlay}>
                    <Play fill="white" />
                </button>

                <button className="like-btn-song" onClick={handleFavorite}>
                    <Heart
                        fill={isFavorite ? "#ef4444" : "none"}
                        color={isFavorite ? "#ef4444" : "currentColor"}
                    />
                </button>
            </div>

            <section className="related-section">
                <hr />
                <h2>More Like This</h2>

                {related.map(item => (
                    <div key={item.id} className="related-song">

                        <Link to={`/song/${item.id}`}>
                            <img src={item.cover_image} />
                        </Link>

                        <div>
                            <Link to={`/song/${item.id}`}>
                                <h4>{item.title}</h4>
                            </Link>

                            <Link to={`/artist/${item.artist.id}`}>
                                <span>{item.artist.name}</span>
                            </Link>
                        </div>

                        <Clock3 size={16} />
                        <span>{item.duration}</span>
                    </div>
                ))}
            </section>

        </div>
    );
}
