// components/AlbumItem.jsx
import { Box, Typography } from '@mui/material';
import './ResultItem.css';

export default function AlbumItem({ album }) {
    return (
        <Box className="result-item album-item">
            <Typography variant="body1" className="item-title">
                {album.title}
            </Typography>
            <Typography variant="body2" className="item-subtitle">
                {album.artist} • {album.year}
            </Typography>
        </Box>
    );
}
