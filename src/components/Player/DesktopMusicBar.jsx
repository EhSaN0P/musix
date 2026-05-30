import './DesktopMusicBar.css'
 import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Heart, Maximize2 } from 'lucide-react';

export default function DesktopMusicBar({
                                            title, artist, cover, isPlaying, onTogglePlay, currentTime, duration,
                                            onProgressChange, formatTime, isLiked, onToggleLike, isShuffle, onToggleShuffle,
                                            isRepeat, onToggleRepeat, onOpenFullScreen, colors
                                        }) {
    return (
        <div className="  fixed bottom-0 left-0 right-0 h-20 bg-neutral-950/60 backdrop-blur-xl border-t border-white/10 text-white flex items-center justify-between px-6 z-40 select-none">

            {/* سمت چپ: اطلاعات آهنگ */}
            <div className=" flex items-center space-x-4 w-1/4">
                <img src={cover} alt={title} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                <div className="truncate">
                    <h4 className="text-sm font-semibold truncate">{title}</h4>
                    <p className="text-xs opacity-50 truncate">{artist}</p>
                </div>
                <button onClick={onToggleLike} className="p-2 hover:bg-white/5 rounded-full transition">
                    <Heart size={16} fill={isLiked ? colors.primary : "transparent"} stroke={isLiked ? colors.primary : "currentColor"} />
                </button>
            </div>

            {/* وسط: کنترلرها و پروگرس بار */}
            <div className="flex flex-col items-center space-y-1.5 flex-1 max-w-2xl">
                <div className="flex items-center space-x-6">
                    <button onClick={onToggleShuffle} style={{ color: isShuffle ? colors.primary : 'rgba(255,255,255,0.4)' }} className="transition">
                        <Shuffle size={14} />
                    </button>
                    <button className="text-white/70 hover:text-white transition">
                        <SkipBack size={18} fill="currentColor" />
                    </button>
                    <button
                        onClick={onTogglePlay}
                        className="p-2.5 bg-white text-neutral-950 rounded-full hover:scale-105 active:scale-95 transition"
                    >
                        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="translate-x-0.5" />}
                    </button>
                    <button className="text-white/70 hover:text-white transition">
                        <SkipForward size={18} fill="currentColor" />
                    </button>
                    <button onClick={onToggleRepeat} style={{ color: isRepeat ? colors.primary : 'rgba(255,255,255,0.4)' }} className="transition">
                        <Repeat size={14} />
                    </button>
                </div>

                {/* خط زمان (Slider) */}
                <div className="w-full flex items-center space-x-3 text-[11px] font-mono opacity-50">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range" min="0" max={duration} value={currentTime} onChange={onProgressChange}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        style={{
                            background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) 100%)`
                        }}
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* سمت راست: دکمه فول اسکرین کردن لیریک */}
            <div className="w-1/4 flex justify-end">
                <button
                    onClick={onOpenFullScreen}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition text-xs opacity-80"
                >
                    <Maximize2 size={14} />
                    <span>Lyrics & Player</span>
                </button>
            </div>


        </div>
    );
}