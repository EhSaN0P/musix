import './MusicLoader.css'
export default function MusicLoader({ text = "Loading..." }) {
    return (
        <div className="loader-container">
            <div className="pulse-orb">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="core"></div>
            </div>
            <p className="loader-text">{text}</p>
        </div>
    );
}
