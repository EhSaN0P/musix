// components/SongItem.jsx
import { Box, Typography } from '@mui/material';
import './ResultItem.css';

export default function SongItem({ song }) {
    return (
        <Box className="result-item song-item">
            <Typography variant="body1" className="item-title">
                {song.title}
            </Typography>
            <Typography variant="body2" className="item-subtitle">
                {song.artist}
            </Typography>
        </Box>
    );
}
