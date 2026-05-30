import "./MediaGridCard.css";
import { Link } from "react-router-dom";
import "./BaseCard.css";
import "./ArtistCard.css";
export default function ArtistCard({ item }) {

    return (
        <div className="media-card">

            <Link
                className="artist-image"
                to={`/artist/${item.slug}`}
            >
                <img
                    src={item.image || "/images/artist.jpg"}
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