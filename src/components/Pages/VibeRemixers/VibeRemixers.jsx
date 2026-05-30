 import { motion } from 'framer-motion';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import './VibeRemixers.css';
 import RemixCard from "../../Cards/RemixCard.jsx";

const REMIXERS_DATA = [
    { id: 1, name: 'DJ Aligator', style: 'Trance / Club', tracks: 124, followers: '1.2M', cover: 'https://placehold.co/300/1a1a2e/00e5ff?text=DJA' },
    { id: 2, name: 'Morteza Mashup', style: 'Persian Pop / Mashup', tracks: 89, followers: '850K', cover: 'https://placehold.co/300/2a0a2a/ff1744?text=MM' },
    { id: 3, name: 'Deep Sense', style: 'Deep House / Chill', tracks: 45, followers: '320K', cover: 'https://placehold.co/300/003300/00e676?text=DS' },
    { id: 4, name: 'Rhythm Master', style: 'Electronic / EDM', tracks: 210, followers: '2.5M', cover: 'https://placehold.co/300/3e2723/ff9100?text=RM' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
};

const VibeRemixers = () => {
    return (
        <div className="remixers-container">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="remixers-header">
                <GraphicEqIcon className="header-icon" />
                <div>
                    <h1>مسترِ بیت‌ها و ریمیکسرها</h1>
                    <p>جادوگرانی که به آهنگ‌ها جون دوباره میدن!</p>
                </div>
            </motion.div>

            <motion.div
                className="remixers-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {REMIXERS_DATA.map((dj) => (
                         <RemixCard item={dj}/>
                 ))}
            </motion.div>
        </div>
    );
};

export default VibeRemixers;
