
import "./BaseCard.css";
import "./RemixCard.css";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

export default function RemixCard({ item }) {
    return (
        <section className={'remixers-grid'}>

        <Link
            to={`/remixer/${item.slug}`}
            className="remixer-card"
        >
            <div className="vinyl-wrapper">

                <div className="vinyl-record">

                    <img
                        src={item.image || "/images/placeholder-song.jpg"}
                        alt={item.title}
                        className="vinyl-label"
                    />

                    <div className="vinyl-hole"></div>

                </div>

            </div>

            <div className="remixer-info">

                <h3>{item.title}</h3>

                <span className="dj-style">
                    {item.style || "Deep House"}
                </span>

                <div className="dj-stats">

                    <div className="stat">
                        <HeadphonesIcon fontSize="small" />
                        <span>
                            {item.followers || "120K"} شنونده
                        </span>
                    </div>

                    <div className="stat">
                        <GraphicEqIcon fontSize="small" />
                        <span>
                            {item.tracks || "25"} ریمیکس
                        </span>
                    </div>

                </div>

                <button className="play-mixes-btn">

                    <Play
                        size={18}
                        fill="currentColor"
                    />

                    پخش ریمیکس‌ها

                </button>

            </div>

        </Link>

        </section>

    );
}