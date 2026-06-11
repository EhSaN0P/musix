import "./SingleRemixer.css";
import { useParams } from "react-router-dom";
import {
    Play,
    Heart,
    Send,
    Globe
} from "lucide-react";
import {useEffect, useState} from "react";
import apiService from "../../../../services/apiService.js";
import MusicLoader from "../../../MusicLoader/MusicLoader.jsx";

export default function SingleRemixer() {
    const { slug } = useParams();

    const [remixer, setRemixer] = useState(null);
     const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchRemixer  = async () => {
        try {
            setLoading(true);


            const response = await apiService.get(`/remixers/${slug}`);

            const remixer = response.data.remixer;

            setRemixer(remixer);


            const checkFavorite = async (type, id) => {
                const res = await apiService.get(`/favorites/${type}/${id}/check`);
                return res.data.favorited;
            };



            const fav = await checkFavorite('remixers', remixer.id);
            setIsFavorite(fav);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slug) return;
        fetchRemixer();
    }, [slug]);

    const handleFavorite = async () => {
        try {
            if (!remixer) return;

            const res = await apiService.post(
                `/favorites/remixers/${remixer.id}`
            );



            setIsFavorite(res.data.favorited);


        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="song-page"><MusicLoader /></div>;
    if (!remixer) return <div className="song-page">Song not found</div>;

     return (
        <div className="remixer-page">

            <div className="remixer-hero">

                <div className="remixer-overlay">

                    <span className="verified">
                        ✓ Verified Remixer
                    </span>

                    <h1>
                        {remixer.name}
                    </h1>

                    <p>
                        {remixer.type }
                    </p>

                    <div className="remixer-meta">

                        <span>{remixer.followers_count } Followers</span>

                        <span>•</span>

                        {/*<span>2.4M Plays</span>*/}


                        <span>{remixer.tracks.length} Remixes</span>

                    </div>

                </div>

            </div>

            <div className="remixer-actions">

                <button className="play-btn">
                    <Play fill="white" />
                </button>

                <button onClick={handleFavorite} className="follow-btn">
                    <Heart style={{color:'red'}}   fill={isFavorite ? "red" : "none"} />
                    {isFavorite ? "Following" : "Follow"}

                </button>

            </div>

            <section className="socials-section">

                <h2>Links</h2>

                <div className="social-links">

                    <a href="#">

                        Instagram
                    </a>

                    <a href="#">

                        YouTube
                    </a>

                    <a href="#">
                        <Send size={18} />
                        Telegram
                    </a>

                    <a href="#">
                        <Globe size={18} />
                        Website
                    </a>

                </div>

            </section>

            <section className="about-section">

                <h2>About</h2>

                <p>
                    Professional electronic music producer and remixer.
                    Creating Deep House, Progressive House and Techno
                    remixes since 2018.
                </p>

            </section>

            <section className="stats-section">

                <div className="stat-card">
                    <h3>2.4M</h3>
                    <span>Total Plays</span>
                </div>

                <div className="stat-card">
                    <h3>120K</h3>
                    <span>Followers</span>
                </div>

                <div className="stat-card">
                    <h3>86</h3>
                    <span>Remixes</span>
                </div>

            </section>

            <section className="popular-remixes">

                <h2>Popular Remixes</h2>

                {/*{remixer.map((item, index) => (*/}
                {/*    <div*/}
                {/*        key={item.id}*/}
                {/*        className="remix-row"*/}
                {/*    >*/}
                {/*        <span>{index + 1}</span>*/}

                {/*        <div className="remix-info">*/}
                {/*            <h4>{item.title}</h4>*/}
                {/*            <span>{item.plays} plays</span>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*))}*/}

            </section>

        </div>
    );
}