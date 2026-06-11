import { useParams } from "react-router-dom";
import { useApiQuery } from "../../../hooks/useApi.js";
import MediaCard from "../../Cards/MediaGridCard.jsx";
import "../Home/Home.css";

export default function GenrePage() {
    const { slug } = useParams();
    const { data, isLoading } = useApiQuery(["genre", slug], `/genres/${slug}`, {}, { enabled: !!slug });
    const genre = data?.data || data;
    const tracks = genre?.tracks || [];

    return (
        <div className="home-container">
            <div className="header-vibe">
                <h2>{genre?.name || "Genre"}</h2>
                <p>Tracks in this vibe</p>
            </div>
            <div className="content-grid">
                {tracks.map(track => <MediaCard key={track.id} item={track} />)}
            </div>
            {isLoading && <div className="loading-spinner">🎵 Loading...</div>}
            {!isLoading && tracks.length === 0 && <div className="end-message">No tracks found</div>}
        </div>
    );
}
