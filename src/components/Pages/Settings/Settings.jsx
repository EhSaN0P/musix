import React from 'react';
import { motion } from 'framer-motion';
import Switch from '@mui/material/Switch';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import './Settings.css';

const Settings = () => {
    const [settings, setSettings] = React.useState({
        notifications: true,
        darkMode: true,
        highQualityAudio: false,
    });

    const handleToggle = (name) => {
        setSettings(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="settings-container">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="settings-header">
                <h2>تنظیمات حساب کاربری</h2>
                <p>موزیکس رو همونطوری که دوست داری شخصی‌سازی کن</p>
            </motion.div>

            <motion.div className="settings-list" variants={containerVariants} initial="hidden" animate="show">
                <motion.div variants={itemVariants} className="setting-item">
                    <div className="setting-info">
                        <NotificationsActiveIcon className="setting-icon" />
                        <div>
                            <h3>اعلان‌ها</h3>
                            <p>دریافت خبر از آهنگ‌های جدید هنرمندان مورد علاقه</p>
                        </div>
                    </div>
                    <Switch checked={settings.notifications} onChange={() => handleToggle('notifications')} color="info" />
                </motion.div>

                <motion.div variants={itemVariants} className="setting-item">
                    <div className="setting-info">
                        <DarkModeIcon className="setting-icon" />
                        <div>
                            <h3>تم تاریک (Dark Mode)</h3>
                            <p>محافظت از چشم‌ها در محیط‌های کم‌نور</p>
                        </div>
                    </div>
                    <Switch checked={settings.darkMode} onChange={() => handleToggle('darkMode')} color="info" />
                </motion.div>

                <motion.div variants={itemVariants} className="setting-item">
                    <div className="setting-info">
                        <SecurityIcon className="setting-icon" />
                        <div>
                            <h3>کیفیت بالای پخش</h3>
                            <p>مصرف اینترنت بیشتر برای صدای شفاف‌تر (Hi-Res)</p>
                        </div>
                    </div>
                    <Switch checked={settings.highQualityAudio} onChange={() => handleToggle('highQualityAudio')} color="info" />
                </motion.div>

                <motion.div variants={itemVariants} className="setting-item clickable">
                    <div className="setting-info">
                        <LanguageIcon className="setting-icon" />
                        <div>
                            <h3>زبان اپلیکیشن</h3>
                            <p>فارسی (FA)</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Settings;
