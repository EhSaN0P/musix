import   { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

// ایمپورت کامپوننت‌های قبلی و جدید
import PlayerBackground from './PlayerBackground';
import PlayerHeader from './PlayerHeader';
import PlayerBody from './PlayerBody';
import PlayerControls from './PlayerControls';
import DesktopMusicBar from './DesktopMusicBar';
import FullScreenClose from './FullScreenClose';

const TRACK_DATA = {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 372,
    lyrics: [
        { time: 0, text: "🎵 (موزیک بی‌کلام)" },
        { time: 5, text: "I've been tryna call" },
        { time: 9, text: "I've been on my own for long enough" },
        { time: 14, text: "Maybe you can show me how to love, maybe" },
        { time: 20, text: "I'm going through withdrawals" },
        { time: 25, text: "You don't even have to do too much" },
        { time: 30, text: "You can turn me on with just a touch, baby" },
    ]
};

export default function AudioPlayerManager() {
    const isMobile = useMediaQuery('(max-w-768px)'); // تشخیص موبایل یا دسکتاپ

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

    // وضعیت باز بودن فول‌اسکرین در دسکتاپ
    const [isDesktopFullScreen, setIsDesktopFullScreen] = useState(false);
    const [extractedColors, setExtractedColors] = useState({ primary: '#8b5cf6', secondary: '#ec4899' });

    const audioRef = useRef(null);
    const lyricContainerRef = useRef(null);

    // استخراج رنگ هوشمند تصویر
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = TRACK_DATA.cover;
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
    }, []);

    const togglePlay = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const time = audioRef.current.currentTime;
        setCurrentTime(time);
        const index = TRACK_DATA.lyrics.findIndex(
            (l, i) => time >= l.time && (i === TRACK_DATA.lyrics.length - 1 || time < TRACK_DATA.lyrics[i + 1].time)
        );
        if (index !== -1 && index !== currentLyricIndex) setCurrentLyricIndex(index);
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (showLyrics && lyricContainerRef.current) {
            const activeElement = lyricContainerRef.current.children[currentLyricIndex];
            if (activeElement) activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentLyricIndex, showLyrics]);

    // اشتراک‌گذاری دیتای لاجیک بین کامپوننت‌ها
    const commonProps = {
        title: TRACK_DATA.title, artist: TRACK_DATA.artist, cover: TRACK_DATA.cover,
        isPlaying, onTogglePlay: togglePlay, currentTime, duration: TRACK_DATA.duration,
        onProgressChange: handleProgressChange, formatTime, isLiked, onToggleLike: () => setIsLiked(!isLiked),
        isShuffle, onToggleShuffle: () => setIsShuffle(!isShuffle), isRepeat, onToggleRepeat: () => setIsRepeat(!isRepeat),
        colors: extractedColors
    };

    return (
        <>
            {/* سورس صوتی مرکزی واحد */}
            <audio ref={audioRef} src={TRACK_DATA.audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />

            {isMobile ? (
                /* رندر مستقیم پلیر موبایل در حالت فیکس */
                <div className="fixed inset-0 flex flex-col justify-between p-6 text-white font-sans overflow-hidden z-50">
                    <PlayerBackground colors={extractedColors} />
                    <PlayerHeader showLyrics={showLyrics} onToggleLyrics={() => setShowLyrics(!showLyrics)} colors={extractedColors} />
                    <PlayerBody showLyrics={showLyrics} isPlaying={isPlaying} cover={TRACK_DATA.cover} title={TRACK_DATA.title} currentLyricIndex={currentLyricIndex} lyrics={TRACK_DATA.lyrics} lyricContainerRef={lyricContainerRef} colors={extractedColors} />
                    <PlayerControls {...commonProps} />
                </div>
            ) : (
                /* بخش دسکتاپ شامل بار پایین و فول‌اسکرین کاندیشنال */
                <>
                    <DesktopMusicBar {...commonProps} onOpenFullScreen={() => { setIsDesktopFullScreen(true); setShowLyrics(true); }} />

                    {/* فول‌اسکرین دسکتاپ با انیمیشن ورود کشویی نرم */}
                    <div className={`   fixed inset-0 flex flex-col justify-between p-12 text-white font-sans overflow-hidden z-50 transition-all duration-500 ease-in-out ${isDesktopFullScreen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
                        <PlayerBackground colors={extractedColors} />
                        <FullScreenClose onClose={() => setIsDesktopFullScreen(false)} />

                        <div className="max-w-5xl mx-auto w-full h-full flex items-center justify-between space-x-12 mt-6">
                            {/* در دسکتاپ کاور و لیریک همزمان کنار هم نمایش داده می‌شوند که بسیار حرفه‌ای‌تر است */}
                            <PlayerBody showLyrics={false} isPlaying={isPlaying} cover={TRACK_DATA.cover} title={TRACK_DATA.title} colors={extractedColors} />
                            <PlayerBody showLyrics={true} currentLyricIndex={currentLyricIndex} lyrics={TRACK_DATA.lyrics} lyricContainerRef={lyricContainerRef} colors={extractedColors} />
                        </div>

                        <div className="max-w-3xl mx-auto w-full">
                            <PlayerControls {...commonProps} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}