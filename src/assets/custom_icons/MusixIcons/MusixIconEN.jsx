import './MusixIconEN.css'

const MusixIconEN = ({ text = "Musix" }) => {
    return (
             <div className="neon-container">
                <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff00aa" />
                            <stop offset="50%" stopColor="#00eeff" />
                            <stop offset="100%" stopColor="#9d00ff" />
                        </linearGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur1" />
                            <feGaussianBlur stdDeviation="10" result="blur2" />
                            <feGaussianBlur stdDeviation="20" result="blur3" />
                            <feMerge>
                                <feMergeNode in="blur3" />
                                <feMergeNode in="blur2" />
                                <feMergeNode in="blur1" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* لایه هاله رنگی */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="neon-glow"
                    >
                        {text}
                    </text>

                    {/* لایه هسته نئون */}
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="neon-text"
                    >
                        {text}
                    </text>
                </svg>
            </div>
     );
};

export default MusixIconEN;