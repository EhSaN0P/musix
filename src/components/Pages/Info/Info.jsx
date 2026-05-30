import React from 'react';
import { motion } from 'framer-motion';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import './Info.css';

const Info = () => {
    return (
        <div className="info-container">
            <motion.div
                className="info-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
            >
                <div className="logo-placeholder">
                    <InfoIcon sx={{ fontSize: 60, color: '#b388ff' }} />
                </div>

                <h1>موزیکس (Musix)</h1>
                <p className="version">نسخه ۱.۰.۰ بتا</p>

                <div className="info-details">
                    <p>
                        موزیکس یک پلتفرم پخش موسیقی هوشمند است که با عشق و آخرین تکنولوژی‌های روز طراحی شده تا بهترین حس شنیداری را برای شما به ارمغان بیاورد.
                    </p>
                </div>

                <div className="tech-stack">
                    <h3>تکنولوژی‌های استفاده شده:</h3>
                    <div className="badges">
                        <span>React 19</span>
                        <span>Vite</span>
                        <span>Framer Motion</span>
                        <span>Material UI</span>
                        <span>Laravel (به زودی)</span>
                    </div>
                </div>

                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="contact-btn">
                    <CodeIcon /> گزارش باگ یا پیشنهاد
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Info;
