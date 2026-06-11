import React from 'react';
import { motion } from 'framer-motion';
import Switch from '@mui/material/Switch';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../store/themSlice.js';
import { setLang } from '../../../store/langSlice.js';
import apiService from '../../../services/apiService.js';
import './Settings.css';

const Settings = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(s => s.theme.currentTheme);
    const currentLang = useSelector(s => s.languages.currentLang);
    const user = useSelector(s => s.auth.user);
    const [settings, setSettings] = React.useState({
        notifications: true,
        darkMode: currentTheme !== 'light',
        highQualityAudio: false,
    });

    const persistPreference = async (nextSettings = settings, lang = currentLang) => {
        const preferences = { theme: nextSettings.darkMode ? 'blue' : 'light', language: lang };

        if (user) {
            await apiService.put('/profile', { bio: user.bio || '', preferences }).catch(console.error);
        } else {
            localStorage.setItem('preferences', JSON.stringify(preferences));
        }
    };

    const handleToggle = (name) => {
        const next = { ...settings, [name]: !settings[name] };
        setSettings(next);

        if (name === 'darkMode') {
            dispatch(setTheme(next.darkMode ? 'blue' : 'light'));
        }

        persistPreference(next);
    };

    const toggleLanguage = () => {
        const nextLang = currentLang === 'fa' ? 'en' : 'fa';
        dispatch(setLang(nextLang));
        persistPreference(settings, nextLang);
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

                <motion.div variants={itemVariants} className="setting-item clickable" onClick={toggleLanguage}>
                    <div className="setting-info">
                        <LanguageIcon className="setting-icon" />
                        <div>
                            <h3>زبان اپلیکیشن</h3>
                            <p>{currentLang.toUpperCase()}</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Settings;
