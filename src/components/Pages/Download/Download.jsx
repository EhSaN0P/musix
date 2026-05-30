import './Download.css';
import { motion } from 'framer-motion';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

const DOWNLOADS_DATA = [
    { id: 1, title: 'میکس تابستونی ۲۰۲۶', artist: 'دی‌جی حس', status: 'downloading', progress: 65, size: '45 MB' },
    { id: 2, title: 'آرامش در شب', artist: 'نوا', status: 'downloading', progress: 32, size: '28 MB' },
    { id: 3, title: 'پرواز تا ماه', artist: 'اکس‌بند', status: 'completed', size: '12 MB' },
    { id: 4, title: 'پادکست وایب - قسمت ۱۲', artist: 'رادیو حس', status: 'completed', size: '85 MB' },
];

const Downloads = () => {
    return (
        <div className="downloads-container">


            <div className="downloads-list">
                <h3>لیست دانلودها</h3>

                {DOWNLOADS_DATA.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="download-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    >
                        <div className="download-info">
                            <h4>{item.title}</h4>
                            <p>{item.artist} • {item.size}</p>
                        </div>

                        <div className="download-action">
                            {item.status === 'downloading' ? (
                                <div className="progress-circle-wrapper">
                                    <CircularProgress
                                        variant="determinate"
                                        value={item.progress}
                                        size={40}
                                        thickness={4}
                                        sx={{ color: '#00e5ff' }}
                                    />
                                    <span className="progress-text">{item.progress}%</span>
                                </div>
                            ) : (
                                <motion.div className="completed-actions" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <CheckCircleIcon color="success" />
                                    <button className="delete-btn"><DeleteOutlineIcon fontSize="small" /></button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Downloads;
