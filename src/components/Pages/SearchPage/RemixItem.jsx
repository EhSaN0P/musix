// components/RemixItem.jsx
import { Box, Typography } from '@mui/material';
import './ResultItem.css';

export default function RemixItem({ remix }) {
    return (
        <Box className="result-item remix-item">
            <Typography variant="body1" className="item-title">
                {remix.title}
            </Typography>
            <Typography variant="body2" className="item-subtitle">
                {remix.artist} {remix.bpm ? `• ${remix.bpm} BPM` : ''}
            </Typography>
        </Box>
    );
}
