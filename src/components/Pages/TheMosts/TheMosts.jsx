import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TimerIcon from '@mui/icons-material/Timer';
import './TheMosts.css';

// دیتای فیک برای دسته‌بندی‌های مختلف
const MOCK_DATA = {
    played: [
        { id: 'p1', title: 'کهکشان', artist: 'اکس‌بند', value: '۱۲M پخش', cover: 'https://placehold.co/150/ffd700/fff?text=1', rank: 1 },
        { id: 'p2', title: 'پرواز', artist: 'سیامک', value: '۸M پخش', cover: 'https://placehold.co/150/c0c0c0/fff?text=2', rank: 2 },
        { id: 'p3', title: 'شب تاریک', artist: 'دی‌جی مریم', value: '۶.5M پخش', cover: 'https://placehold.co/150/cd7f32/fff?text=3', rank: 3 },
        { id: 'p4', title: 'موج', artist: 'سینا درخشنده', value: '۴M پخش', cover: 'https://placehold.co/100/333/fff?text=4', rank: 4 },
        { id: 'p5', title: 'بارون', artist: 'ایهام', value: '۳.2M پخش', cover: 'https://placehold.co/100/333/fff?text=5', rank: 5 },
    ],
    liked: [
        { id: 'l1', title: 'عشق من', artist: 'شایع', value: '۲M لایک', cover: 'https://placehold.co/150/ff1744/fff?text=1', rank: 1 },
        { id: 'l2', title: 'خاطره', artist: 'معین زد', value: '۱.8M لایک', cover: 'https://placehold.co/150/ff5252/fff?text=2', rank: 2 },
        { id: 'l3', title: 'سکوت', artist: 'بهرام', value: '۱.2M لایک', cover: 'https://placehold.co/150/ff8a80/fff?text=3', rank: 3 },
        { id: 'l4', title: 'دیوونه', artist: 'رضا بهرام', value: '۹۰۰K لایک', cover: 'https://placehold.co/100/333/fff?text=4', rank: 4 },
    ],
    viral: [
        { id: 'v1', title: 'ترند تیک‌تاک', artist: 'دی‌جی تبا', value: '۵۰۰K اشتراک', cover: 'https://placehold.co/150/00e5ff/fff?text=1', rank: 1 },
        { id: 'v2', title: 'چالش رقص', artist: 'آرمین زارعی', value: '۳۰۰K اشتراک', cover: 'https://placehold.co/150/18ffff/fff?text=2', rank: 2 },
        { id: 'v3', title: 'میم‌موزیک', artist: 'ناشناس', value: '۱۵۰K اشتراک', cover: 'https://placehold.co/150/84ffff/fff?text=3', rank: 3 },
    ],
    longest: [
        { id: 't1', title: 'سفر به فضا (میکس)', artist: 'دی‌جی استرو', value: '۴۵:۰۰ دقیقه', cover: 'https://placehold.co/150/b388ff/fff?text=1', rank: 1 },
        { id: 't2', title: 'مدیتیشن عمیق', artist: 'نوا', value: '۳۰:۰۰ دقیقه', cover: 'https://placehold.co/150/7c4dff/fff?text=2', rank: 2 },
        { id: 't3', title: 'پادکست وایب', artist: 'رادیو حس', value: '۲۸:۳۰ دقیقه', cover: 'https://placehold.co/150/651fff/fff?text=3', rank: 3 },
    ]
};

const TABS = [
    { id: 'played', label: 'پرشنونده‌ترین‌ها', icon: <LocalFireDepartmentIcon fontSize="small" /> },
    { id: 'liked', label: 'محبوب‌ترین‌ها', icon: <FavoriteIcon fontSize="small" /> },
    { id: 'viral', label: 'وایرال‌ترین‌ها', icon: <ShareIcon fontSize="small" /> },
    { id: 'longest', label: 'طولانی‌ترین‌ها', icon: <TimerIcon fontSize="small" /> },
];

const TheMosts = () => {
    const [activeTab, setActiveTab] = useState('played');

    const currentData = MOCK_DATA[activeTab];
    const topThree = currentData.slice(0, 3);
    const others = currentData.slice(3);

    // در صورتی که دیتای کافی برای سکو نباشه، ارور نده
    const podiumOrder = topThree.length === 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;

    return (
        <div className="the-mosts-container">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="header">
                <h1 className="page-title">🏆 باشگاه رکوردداران</h1>
                <p className="page-subtitle">آهنگ‌هایی که تو دسته‌های مختلف بهترین بودن!</p>
            </motion.div>

            {/* تب‌های جابجایی بین دسته‌بندی‌ها */}
            <div className="tabs-container">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="activeTabGlow" className="active-tab-bg" />
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3 }}
                    className="content-wrapper"
                >
                    {/* بخش سکوی قهرمانی */}
                    <div className="podium-section">
                        {podiumOrder.map((track) => {
                            const heights = { 1: 200, 2: 150, 3: 100 };

                            return (
                                <motion.div
                                    key={track.id}
                                    className={`podium-item rank-${track.rank}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: heights[track.rank] || 100, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 60, delay: track.rank * 0.1 }}
                                >
                                    <div className="podium-content">
                                        <div className="podium-cover-wrapper">
                                            <img src={track.cover} alt={track.title} />
                                            <div className="play-overlay"><PlayArrowRoundedIcon fontSize="large" /></div>
                                        </div>
                                        <h3 className="track-title">{track.title}</h3>
                                        <span className="track-artist">{track.artist}</span>
                                        <div className="podium-base">#{track.rank}</div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* بخش لیست بقیه آهنگ‌ها */}
                    {others.length > 0 && (
                        <div className="list-section">
                            {others.map((track, i) => (
                                <motion.div
                                    key={track.id}
                                    className="list-item"
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                >
                                    <div className="list-rank">#{track.rank}</div>
                                    <img src={track.cover} alt={track.title} className="list-cover" />
                                    <div className="list-info">
                                        <h4>{track.title}</h4>
                                        <p>{track.artist}</p>
                                    </div>
                                    <div className="list-value">{track.value}</div>
                                    <button className="list-play-btn"><PlayArrowRoundedIcon /></button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TheMosts;
