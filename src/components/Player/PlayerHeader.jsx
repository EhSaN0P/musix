import React from 'react';
import {ListMusic, AlignLeft, Image as ImageIcon, ChevronLeft} from 'lucide-react';

export default function PlayerHeader({ showLyrics, onToggleLyrics, colors, onCloseMobile }) {
    return (
        <div className="flex justify-between items-center w-full h-12 z-10">
            {/* دکمه لیست موزیک که حالا وظیفه خروج و مینی‌پلیر کردن در موبایل را دارد */}
            <button
                onClick={onCloseMobile}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition text-white"
            >
                <ChevronLeft size={18} className="opacity-80" />
            </button>

            <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Now Playing</p>
            </div>

            <button
                onClick={onToggleLyrics}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition"
                style={{ color: showLyrics ? colors.primary : 'white' }}
            >
                {showLyrics ? <ImageIcon size={18} /> : <AlignLeft size={18} />}
            </button>
        </div>
    );
}