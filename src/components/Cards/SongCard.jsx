import "./MediaGridCard.css";
import "./BaseCard.css";
import "./SongCard.css";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";

export default function SongCard({ item }) {

    return (
        <div className="media-card">

            <div className="media-image">

                <Link to={`/song/${item.slug}`}>
                    <img src={item.image} alt={item.title} />
                </Link>

                <div className="mg-play">
                    <Play size={18} fill="white" />
                </div>

                <div className="mg-like">
                    <Heart size={18} fill="#ff4d6d" />
                </div>

            </div>

            <div className="media-content">

                <h4 className="media-title">
                    {item.title}
                </h4>

                <p className="media-subtitle">
                    {item.artist}
                </p>

            </div>

        </div>
    );
}