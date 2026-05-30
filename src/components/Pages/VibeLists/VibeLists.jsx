 import { motion } from 'framer-motion';
import './VibeLists.css';
 import PlaylistCard from "../../Cards/PlaylistCard.jsx";

const PLAYLISTS = [
    { id: 1, title: 'کدنویسی در شب', type: 'large', color: '#651fff', tracks: 42, img: 'https://placehold.co/400x400/1a1a2e/651fff?text=Code+Night' },
    { id: 2, title: 'باشگاه و انرژی', type: 'small', color: '#ff1744', tracks: 15, img: 'https://placehold.co/200x200/2b0000/ff1744?text=Gym' },
    { id: 3, title: 'کافه بارونی', type: 'medium', color: '#00b0ff', tracks: 28, img: 'https://placehold.co/200x400/001a2b/00b0ff?text=Cafe' },
    { id: 4, title: 'مهمونی آخر هفته', type: 'wide', color: '#00e676', tracks: 55, img: 'https://placehold.co/400x200/002b11/00e676?text=Party' },
    { id: 5, title: 'ریلکسیشن', type: 'small', color: '#ea80fc', tracks: 12, img: 'https://placehold.co/200x200/2b002b/ea80fc?text=Relax' },
];

const VibeLists = () => {
    return (
        <div className="vibe-lists-container">
            <div className="header-vibe">
                <h2>پلی‌لیست‌های اختصاصی</h2>
                <p>مجموعه‌هایی که دقیقاً برای لحظات خاص طراحی شدن</p>
            </div>

            <motion.div
                className="bento-grid"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
            >
                {PLAYLISTS.map((playlist) => (
                     <PlaylistCard item={playlist}   />
                ))}
            </motion.div>
        </div>
    );
};

export default VibeLists;
