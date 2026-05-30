// components/ArtistItem.jsx
import { Box, Typography } from '@mui/material';
import './ResultItem.css';

export default function ArtistItem({ artist }) {
    return (
        <Box className="result-item artist-item">
            <Typography variant="body1" className="item-title">
                {artist.name}
            </Typography>
            <Typography variant="body2" className="item-subtitle">
                {artist.songsCount} آهنگ
            </Typography>
        </Box>
    );
}
