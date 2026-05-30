 import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Heart } from 'lucide-react';

export default function PlayerControls({
                                           title, artist, isLiked, onToggleLike, currentTime, duration, onProgressChange, formatTime,
                                           isShuffle, onToggleShuffle, isRepeat, onToggleRepeat, isPlaying, onTogglePlay, colors
                                       }) {
    return (

        <div  className="w-full space-y-5 bg-white/[0.04] border border-white/10 p-5 rounded-3xl shadow-xl z-10">
            {/* اطلاعات ترک */}
            <div className="flex justify-between items-center">
                <div className="truncate pr-4">
                    <h2 className="text-lg font-bold truncate tracking-wide">{title}</h2>
                    <p className="text-xs opacity-50 truncate mt-0.5">{artist}</p>
                </div>
                <button onClick={onToggleLike} className="p-2 rounded-full bg-white/5 active:scale-95 transition">
                    <Heart size={16} fill={isLiked ? colors.primary : "transparent"} stroke={isLiked ? colors.primary : colors.primary} />
                </button>
            </div>

            {/* پروگرس بار */}
            <div dir={'ltr'}  className="space-y-1">
                <input
                    type="range" min="0" max={duration} value={currentTime} onChange={onProgressChange}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white transition"
                    style={{
                        background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                />
                <div className="flex justify-between text-[10px] opacity-40 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* دکمه‌های ناوبری مینیمال */}
            <div dir={'ltr'}  className="flex justify-between items-center px-2">
                <button onClick={onToggleShuffle} style={{ color: isShuffle ? colors.primary : 'rgba(255,255,255,0.4)' }} className="p-2 transition">
                    <Shuffle size={14} />
                </button>
                <button className="p-2 text-white/70 hover:text-white active:scale-95 transition">
                    <SkipBack size={18} fill="currentColor" />
                </button>
                <button
                    onClick={onTogglePlay}
                    className="p-3.5 rounded-full text-neutral-950 shadow-md active:scale-90 transition-transform"
                    style={{ backgroundColor: 'white' }}
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-0.5" />}
                </button>
                <button className="p-2 text-white/70 hover:text-white active:scale-95 transition">
                    <SkipForward size={18} fill="currentColor" />
                </button>
                <button onClick={onToggleRepeat} style={{ color: isRepeat ? colors.primary : 'rgba(255,255,255,0.4)' }} className="p-2 transition">
                    <Repeat size={14} />
                </button>
            </div>
        </div>
    );
}