// components/PlaylistItem.jsx
import { Box, Typography } from '@mui/material';
import './ResultItem.css';

export default function PlaylistItem({ playlist }) {
    return (
        <Box className="result-item playlist-item">
            <Typography variant="body1" className="item-title">
                {playlist.title}
            </Typography>
            <Typography variant="body2" className="item-subtitle">
                توسط {playlist.creator} • {playlist.songIds?.length ?? 0} آهنگ
            </Typography>
        </Box>
    );
}
