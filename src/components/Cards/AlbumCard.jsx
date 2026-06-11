import "./MediaGridCard.css";
import "./BaseCard.css";
import "./AlbumCard.css";
import { Link } from "react-router-dom";

export default function AlbumCard({ item }) {

    return (
        <div className="media-card">

            <Link
                className="media-image"
                to={`/album/${item.id}`}
            >
                <img
                    src={item.image || "/images/album/default.png"}
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