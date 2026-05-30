import './MobilePlayer.css'
 import { AppBar } from "@mui/material";
import PlayerBackground from './PlayerBackground';
import PlayerHeader from './PlayerHeader';
import PlayerBody from './PlayerBody';
import PlayerControls from './PlayerControls';

export default function MobilePlayer(props) {
    const {
        showLyrics, setShowLyrics, isPlaying, onTogglePlay, cover, title, artist,
        currentLyricIndex, track, lyricContainerRef, colors, isLiked, onToggleLike,
        currentTime, duration, onProgressChange, formatTime, isShuffle, onToggleShuffle,
        isRepeat, onToggleRepeat, onlyControls = false,
        onCloseMobile // <-- این متد را از ورودی دریافت می‌کنیم
    } = props;

    if (onlyControls) {
        return (
            <PlayerControls
                title={title} artist={artist} isLiked={isLiked} onToggleLike={onToggleLike}
                currentTime={currentTime} duration={duration} onProgressChange={onProgressChange} formatTime={formatTime}
                isShuffle={isShuffle} onToggleShuffle={onToggleShuffle} isRepeat={isRepeat} onToggleRepeat={onToggleRepeat}
                isPlaying={isPlaying} onTogglePlay={onTogglePlay} colors={colors}
            />
        );
    }

    return (
        <AppBar id='mobile-player-container' position='fixed' sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
            <div className="relative w-full h-[100vh] flex flex-col justify-between p-6 text-white font-sans select-none overflow-hidden">

                <PlayerBackground colors={colors} />

                {/* این بخش اصلاح شد تا تابع خروج را به هدر تحویل دهد */}
                <PlayerHeader
                    showLyrics={showLyrics}
                    onToggleLyrics={() => setShowLyrics(!showLyrics)}
                    colors={colors}
                    onCloseMobile={onCloseMobile} // <-- پاس دادن به هدر
                />

                <PlayerBody
                    showLyrics={showLyrics} isPlaying={isPlaying} cover={cover} title={title}
                    currentLyricIndex={currentLyricIndex} lyrics={track.lyrics} lyricContainerRef={lyricContainerRef} colors={colors}
                />

                <PlayerControls
                    title={title} artist={artist} isLiked={isLiked} onToggleLike={onToggleLike}
                    currentTime={currentTime} duration={duration} onProgressChange={onProgressChange} formatTime={formatTime}
                    isShuffle={isShuffle} onToggleShuffle={onToggleShuffle} isRepeat={isRepeat} onToggleRepeat={onToggleRepeat}
                    isPlaying={isPlaying} onTogglePlay={onTogglePlay} colors={colors}
                />
            </div>
        </AppBar>
    );
}