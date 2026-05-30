
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import './NotFound404.css';

const MOCK_SONGS = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 425,
        lyrics: [
            { time: 0, text: "🎵 (موزیک بی‌کلام)" },
            { time: 5, text: "I've been tryna call" },
        ]
    },
    {
        id: 2,
        title: "Starboy",
        artist: "The Weeknd",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: 344,
        lyrics: []
    }
];
const NotFound404 = () => {
    const navigate = useNavigate();






    return (
        <div className="not-found-container">





            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    <MusicOffIcon className="error-icon" />
                </motion.div>

                <h1 className="glitch" data-text="404">404</h1>
                <h2>نت دراپ شد!</h2>
                <p>به نظر میاد آهنگی که دنبالشی از پلی‌لیست کیهان پاک شده.</p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="home-btn"
                >
                    برگشت به صفحه اصلی
                </motion.button>
            </motion.div>




            <div className="space-y-3 p-4 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-white mb-4">آهنگ‌های پیشنهادی</h2>

            </div>


        </div>
    );
};

export default NotFound404;
