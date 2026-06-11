import "./MediaGridCard.css";
import "./BaseCard.css";
import "./SongCard.css";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";

export default function SongCard({ item,isRemix }) {



    return (
        <div className="media-card">

            <div
                className={'media-image   ' + (isRemix ? " shadow-sm  " : "")}
            >

                <Link to={`/song/${item.id}`}>
                    <div className={isRemix ? "vinyl-record  " : ""}>

                    <img
                         src={item.cover_image || "/images/song/default.png"}
                        alt={item.title}

                    />
                    </div>
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
                    {item.artist?.name || item.artist}
                </p>
            </div>

        </div>
    );
}