
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
            to={`/remixer/${item.id}`}
            className="remixer-card"
        >
            <div className="vinyl-wrapper">

                <div className="vinyl-record">

                    <img
                        src={item.image || "/images/playlist/default.png"}
                        alt={item.name}
                        className="vinyl-label"
                    />

                    <div className="vinyl-hole"></div>

                </div>

            </div>

            <div className="remixer-info">

                <h3>{item.name}</h3>

                {/*<span className="dj-style">*/}
                {/*    {item.style || "Deep House"}*/}
                {/*</span>*/}



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