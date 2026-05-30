 

export default function PlayerBody({
                                       showLyrics, isPlaying, cover, title, currentLyricIndex, lyrics, lyricContainerRef, colors
                                   }) {
    if (!showLyrics) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center my-4 relative w-full z-10">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-tr from-white/10 to-transparent shadow-2xl">
                    <img
                        src={cover}
                        alt={title}
                        className={`w-full h-full object-cover rounded-full border-4 border-white/10 ${isPlaying ? 'animate-spin-slow' : ''}`}
                        style={{ animationDuration: '20s' }}
                    />
                    {/* سوراخ وسط گرامافون */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neutral-900 rounded-full border-4 border-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={lyricContainerRef}
            className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col items-center py-40 px-6 space-y-6 z-10"
            style={{ maskImage: 'linear-gradient(to bottom, transparent, white 25%, white 75%, transparent)' }}
        >
            {lyrics.map((lyric, index) => (
                <p
                    key={index}
                    className={`text-center font-medium text-base transition-all duration-300 max-w-xs ${
                        index === currentLyricIndex
                            ? 'text-white scale-105 opacity-100 font-bold'
                            : 'text-white/30 scale-95 opacity-40'
                    }`}
                    style={{
                        textShadow: index === currentLyricIndex ? `0 0 20px ${colors.primary}` : 'none'
                    }}
                >
                    {lyric.text}
                </p>
            ))}
        </div>
    );
}