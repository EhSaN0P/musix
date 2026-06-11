import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Avatar, TextField, IconButton, Box } from '@mui/material';
import {Close, PhotoCamera, Settings} from '@mui/icons-material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Profile from "../../../../../Pages/Profile/Profile.jsx";
import {CloseButton} from "@headlessui/react";

// Styled Components
const GlassDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        background: 'rgba(30, 30, 30, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        minHeight: '500px',
        color: '#fff',
    }
}));

const GlassTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.12)',
        },
        '&.Mui-focused': {
            background: 'rgba(255, 255, 255, 0.15)',
        },
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(100, 100, 255, 0.6)',
            borderWidth: '2px',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-focused': {
            color: 'rgba(100, 100, 255, 0.9)',
        }
    },
    '& .MuiInputBase-input': {
        color: '#fff',
    },
});

const GlassAvatar = styled(Avatar)({
    width: 120,
    height: 120,
    border: '3px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
    fontSize: '3rem',
    background: 'linear-gradient(135deg, rgba(100, 100, 255, 0.3), rgba(200, 100, 255, 0.3))',
    color: '#fff',
});

const CameraButton = styled(IconButton)({
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'rgba(100, 100, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: '#fff',
    '&:hover': {
        background: 'rgba(100, 100, 255, 0.6)',
        transform: 'scale(1.1)',
    },
    transition: 'all 0.3s ease',
});

const ProfileButton = styled(Button)({
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    textTransform: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        transform: 'translateY(-2px)',
    },
    '& .MuiButton-startIcon': {
        color: 'rgba(255, 255, 255, 0.8)',
    }
});

const CancelButton = styled(Button)({
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '10px 32px',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
    }
});

const SubmitButton = styled(Button)({
    background: 'linear-gradient(135deg, rgba(100, 100, 255, 0.5), rgba(200, 100, 255, 0.5))',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '10px 32px',
    color: '#fff',
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(100, 100, 255, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, rgba(100, 100, 255, 0.7), rgba(200, 100, 255, 0.7))',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(100, 100, 255, 0.4)',
    }
});

export default function SettingDialog({ open, onClose, onNavigateToProfile }) {
    const [username, setUsername] = useState('نینجا دولوپر');
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log('Username:', username);
        console.log('Profile Image:', profileImage);
        onClose();
    };

    return (
        <GlassDialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <IconButton sx={{width:'fit-content',margin:2}} color={'error'}>
                <Close onClick={onClose} />
            </IconButton>
           <Profile/>
        </GlassDialog>
    );
}
