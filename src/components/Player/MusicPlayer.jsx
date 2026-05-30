import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from "react-responsive";
import { useSelector } from 'react-redux';
import { Play, Pause } from 'lucide-react';
import MobilePlayer from "./MobilePlayer.jsx";
import DesktopMusicBar from "./DesktopMusicBar.jsx";
import PlayerBackground from "./PlayerBackground.jsx";
import PlayerBody from "./PlayerBody.jsx";
import FullScreenClose from "./FullScreenClose.jsx";

export default function MusicPlayer() {
    const isMobile = useMediaQuery({ maxWidth: 1170 });



    // دریافت داده‌های آهنگِ در حال پخش به صورت داینامیک از رداکس
    const currentSong = useSelector(s => s.player.currentSong);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

    const [isDesktopFullScreen, setIsDesktopFullScreen] = useState(false);
    const [isMobileFullScreen, setIsMobileFullScreen] = useState(false);

    const [extractedColors, setExtractedColors] = useState({ primary: '#8b5cf6', secondary: '#ec4899' });

    const audioRef = useRef(null);
    const lyricContainerRef = useRef(null);

    // ۱. افکت هوشمند تغییر آهنگ و استخراج رنگ
    useEffect(() => {
        if (!currentSong) return;

        setCurrentTime(0);
        setCurrentLyricIndex(0);

        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("پخش خودکار منتظر تعامل کاربر است..."));
        }

        if (currentSong.cover) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = currentSong.cover;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width; canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const topLeft = ctx.getImageData(20, 20, 1, 1).data;
                const bottomRight = ctx.getImageData(img.width - 20, img.height - 20, 1, 1).data;
                setExtractedColors({
                    primary: `rgb(${topLeft[0]}, ${topLeft[1]}, ${topLeft[2]})`,
                    secondary: `rgb(${bottomRight[0]}, ${bottomRight[1]}, ${bottomRight[2]})`
                });
            };
        }
    }, [currentSong]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
        }
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const time = audioRef.current.currentTime;
        setCurrentTime(time);

        if (currentSong?.lyrics && currentSong.lyrics.length > 0) {
            const index = currentSong.lyrics.findIndex(
                (l, i) => time >= l.time && (i === currentSong.lyrics.length - 1 || time < currentSong.lyrics[i + 1].time)
            );
            if (index !== -1 && index !== currentLyricIndex) setCurrentLyricIndex(index);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // اسکرول اختصاصی و بدون باگ لیریک
    useEffect(() => {
        if (showLyrics && lyricContainerRef.current) {
            const container = lyricContainerRef.current;
            const activeElement = container.children[currentLyricIndex];
            if (activeElement) {
                const containerRect = container.getBoundingClientRect();
                const elementRect = activeElement.getBoundingClientRect();
                const relativeTop = elementRect.top - containerRect.top;
                const scrollToPosition = container.scrollTop + relativeTop - (containerRect.height / 2) + (elementRect.height / 2);
                container.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
            }
        }
    }, [currentLyricIndex, showLyrics]);

    // آماده‌سازی پراپس‌ها قبل از رندر مشروط ظاهر
    const sharedProps = {
        track: currentSong || {},
        title: currentSong?.title || "Unknown Title",
        artist: currentSong?.artist || "Unknown Artist",
        cover: currentSong?.cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
        isPlaying,
        onTogglePlay: togglePlay,
        currentTime,
        duration: duration || currentSong?.duration || 0,
        onProgressChange: handleProgressChange,
        formatTime,
        isLiked,
        onToggleLike: () => setIsLiked(!isLiked),
        isShuffle,
        onToggleShuffle: () => setIsShuffle(!isShuffle),
        isRepeat,
        onToggleRepeat: () => setIsRepeat(!isRepeat),
        colors: extractedColors,
        showLyrics,
        setShowLyrics,
        currentLyricIndex,
        lyricContainerRef,
        onCloseMobile: () => setIsMobileFullScreen(false)
    };

    // 🛡️ حل مشکل هوک‌ها: اگر آهنگی نیست، یک المان صوتی مخفی رندر می‌شود تا هوک‌ها زنده بمانند
    if (!currentSong) {
        return (
            <audio
                ref={audioRef}
                src=""
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
        );
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            {isMobile ? (
                /* 📱 بخش موبایل */
                <>
                    {/* مینی پلیر کوچک پایین صفحه موبایل */}
                    <div
                        onClick={() => setIsMobileFullScreen(true)}
                        className="fixed bottom-[5rem] left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] h-16 bg-neutral-900/85 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-3 shadow-2xl z-50 active:scale-98 transition"
                    >
                        <div className="flex items-center space-x-3 truncate">
                            <img
                                src={sharedProps.cover}
                                alt=""
                                className={`w-11 h-11 rounded-xl object-cover shadow-md ${isPlaying ? 'animate-spin-slow' : ''}`}
                                style={{ animationDuration: '12s' }}
                            />
                            <div className="text-left truncate">
                                <h4 className="text-xs font-bold text-white truncate">{sharedProps.title}</h4>
                                <p className="text-[10px] text-white/50 truncate">{sharedProps.artist}</p>
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                            className="p-2.5 bg-white text-neutral-950 rounded-full shadow-md active:scale-90 transition"
                        >
                            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-0.5" />}
                        </button>
                    </div>

                    {/* پلیر فول اسکرین موبایل */}
                    <div className={`fixed inset-0 z-[9999] transition-all duration-500 ease-in-out ${isMobileFullScreen ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible pointer-events-none'}`}>
                        <MobilePlayer {...sharedProps} />
                    </div>
                </>
            ) : (
                /* 💻 بخش دسکتاپ */
                <>
                    <DesktopMusicBar {...sharedProps} onOpenFullScreen={() => { setIsDesktopFullScreen(true); setShowLyrics(true); }} />

                    <div className={`fixed inset-0 flex flex-col justify-between p-12 text-white font-sans overflow-hidden z-50 transition-all duration-500 ease-in-out ${isDesktopFullScreen ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible pointer-events-none'}`}>
                        <PlayerBackground colors={extractedColors} />
                        <FullScreenClose onClose={() => setIsDesktopFullScreen(false)} />

                        <div className="max-w-5xl mx-auto w-full h-full flex items-center justify-between space-x-12 mt-6">
                            <PlayerBody showLyrics={false} isPlaying={isPlaying} cover={sharedProps.cover} title={sharedProps.title} colors={extractedColors} />
                            <PlayerBody showLyrics={true} currentLyricIndex={currentLyricIndex} lyrics={currentSong.lyrics || []} lyricContainerRef={lyricContainerRef} colors={extractedColors} />
                        </div>

                        <div className="max-w-3xl mx-auto w-full">
                            <MobilePlayer {...sharedProps} onlyControls={true} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}