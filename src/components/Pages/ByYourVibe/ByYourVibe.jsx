import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from '@mui/material/Slider';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import './ByYourVibe.css';

const ByYourVibe = () => {
    const [mood, setMood] = useState({ energy: 50, happiness: 50, focus: 50 });
    const [isMixing, setIsMixing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleMix = () => {
        setIsMixing(true);
        setShowResults(false);
        // شبیه‌سازی زمان آنالیز هوش مصنوعی
        setTimeout(() => {
            setIsMixing(false);
            setShowResults(true);
        }, 2500);
    };

    return (
        <div className="by-your-vibe-container">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="vibe-header">
                <GraphicEqIcon className="vibe-icon" />
                <h1 className="page-title">میکسر هوشمند حس‌ها</h1>
                <p className="page-subtitle">اسلایدرها رو تنظیم کن تا موزیک دقیقاً هم‌فرکانس با مودت ساخته بشه.</p>
            </motion.div>

            <div className="mixer-panel">
                <div className="slider-group">
                    <label>🔥 سطح انرژی ({mood.energy}%)</label>
                    <Slider
                        value={mood.energy}
                        onChange={(e, val) => setMood({...mood, energy: val})}
                        sx={{ color: '#ff5722' }}
                    />
                </div>

                <div className="slider-group">
                    <label>😊 میزان شادی ({mood.happiness}%)</label>
                    <Slider
                        value={mood.happiness}
                        onChange={(e, val) => setMood({...mood, happiness: val})}
                        sx={{ color: '#ffeb3b' }}
                    />
                </div>

                <div className="slider-group">
                    <label>🧠 تمرکز و آرامش ({mood.focus}%)</label>
                    <Slider
                        value={mood.focus}
                        onChange={(e, val) => setMood({...mood, focus: val})}
                        sx={{ color: '#00bcd4' }}
                    />
                </div>

                <button
                    className={`mix-btn ${isMixing ? 'mixing' : ''}`}
                    onClick={handleMix}
                    disabled={isMixing}
                >
                    {isMixing ? 'در حال آنالیز امواج مغزی...' : 'برام میکس کن!'}
                </button>
            </div>

            <AnimatePresence>
                {isMixing && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="loading-waves"
                    >
                        <div className="wave"></div><div className="wave"></div><div className="wave"></div>
                    </motion.div>
                )}

                {showResults && !isMixing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="results-panel"
                    >
                        <h3>✨ پلی‌لیست اختصاصی شما آماده شد!</h3>
                        <div className="result-track">
                            <div className="track-color" style={{ background: `rgb(${mood.energy * 2}, ${mood.happiness * 2}, ${mood.focus * 2})` }}></div>
                            <div className="track-info">
                                <h4>Vibe Mix #{Math.floor(Math.random() * 1000)}</h4>
                                <p>تولید شده بر اساس {mood.energy}% انرژی و {mood.happiness}% شادی</p>
                            </div>
                            <button className="play-btn">▶ پخش</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ByYourVibe;
