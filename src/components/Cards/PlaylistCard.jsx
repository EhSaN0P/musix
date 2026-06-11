import "./MediaGridCard.css";
import "./BaseCard.css";
import "./PlaylistCard.css";
import { Link } from "react-router-dom";

export default function PlaylistCard({ item }) {

    return (
        <div className="media-card">

            <Link
                className="media-image"
                to={`/playlist/${item.id}`}
            >
                <img
                    src={item.image || "/images/playlist/default.png"}
                    alt={item.title}
                />
            </Link>

            <div className="media-content">

                <h4 className="media-title">
                    {item.title}
                </h4>

                <p className="media-subtitle">
                    {item.subtitle}
                </p>

            </div>

        </div>
    );
}