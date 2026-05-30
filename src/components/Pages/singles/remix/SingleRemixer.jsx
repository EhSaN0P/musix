import "./SingleRemixer.css";
import { useParams } from "react-router-dom";
import {
    Play,
    Heart,
    Send,
    Globe
} from "lucide-react";

export default function SingleRemixer() {

    const { slug } = useParams();

    const remixes = [
        { id: 1, title: "Summer Night Remix", plays: "1.2M" },
        { id: 2, title: "Deep House Version", plays: "850K" },
        { id: 3, title: "Faded Remix", plays: "620K" },
        { id: 4, title: "Ocean Drive Remix", plays: "510K" }
    ];

    return (
        <div className="remixer-page">

            <div className="remixer-hero">

                <div className="remixer-overlay">

                    <span className="verified">
                        ✓ Verified Remixer
                    </span>

                    <h1>
                        {slug.replaceAll("-", " ")}
                    </h1>

                    <p>
                        Deep House • Progressive House • Techno
                    </p>

                    <div className="remixer-meta">

                        <span>120K Followers</span>

                        <span>•</span>

                        <span>2.4M Plays</span>

                        <span>•</span>

                        <span>86 Remixes</span>

                    </div>

                </div>

            </div>

            <div className="remixer-actions">

                <button className="play-btn">
                    <Play fill="white" />
                </button>

                <button className="follow-btn">
                    <Heart />
                    Follow
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

                {remixes.map((item, index) => (
                    <div
                        key={item.id}
                        className="remix-row"
                    >
                        <span>{index + 1}</span>

                        <div className="remix-info">
                            <h4>{item.title}</h4>
                            <span>{item.plays} plays</span>
                        </div>

                    </div>
                ))}

            </section>

        </div>
    );
}