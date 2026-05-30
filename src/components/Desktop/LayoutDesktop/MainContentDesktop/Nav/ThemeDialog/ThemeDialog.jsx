import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Palette, Language } from '@mui/icons-material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {themesList} from "../../../../../../setting/them.js";
import {langs} from "../../../../../../setting/lang.jsx";

// Styled Components (same as SettingDialog)
const GlassDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        background: 'rgba(30, 30, 30, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        minHeight: '400px',
        color: '#fff',
    }
}));

const ThemeCard = styled(Box)(({ selected, themecolor }) => ({
    background: selected
        ? `linear-gradient(135deg, ${themecolor}40, ${themecolor}20)`
        : 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: selected
        ? `2px solid ${themecolor}`
        : '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '&:hover': {
        background: selected
            ? `linear-gradient(135deg, ${themecolor}50, ${themecolor}30)`
            : 'rgba(255, 255, 255, 0.12)',
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 16px ${themecolor}40`,
    }
}));

const ThemeColorBox = styled(Box)(({ themecolor }) => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${themecolor}, ${themecolor}CC)`,
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: `0 4px 12px ${themecolor}60`,
}));

const LanguageCard = styled(Box)(({ selected }) => ({
    background: selected
        ? 'linear-gradient(135deg, rgba(100, 100, 255, 0.3), rgba(200, 100, 255, 0.3))'
        : 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    border: selected
        ? '2px solid rgba(100, 100, 255, 0.8)'
        : '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '16px 24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    '&:hover': {
        background: selected
            ? 'linear-gradient(135deg, rgba(100, 100, 255, 0.4), rgba(200, 100, 255, 0.4))'
            : 'rgba(255, 255, 255, 0.12)',
        transform: 'translateY(-2px)',
    }
}));

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

const SectionTitle = styled(Typography)({
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
});


const languages = [
    { id: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
];

export default function ThemeDialog({ open, onClose, currentTheme = 'purple', currentLanguage = 'fa', onSave }) {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    const handleSubmit = () => {
        onSave({ theme: selectedTheme, language: selectedLanguage });
        onClose();
    };

    return (
        <GlassDialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ textAlign: 'center', pt: 3, pb: 2 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: '#fff',
                    }}
                >
                    تنظیمات ظاهری
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ px: 4, py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Theme Section */}
                    <Box>
                        <SectionTitle>
                            <Palette sx={{ fontSize: '1.2rem' }} />
                            انتخاب تم
                        </SectionTitle>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {themesList.map((theme) => (
                                <ThemeCard
                                    key={theme.id}
                                    selected={selectedTheme === theme.id}
                                    themecolor={theme.color}
                                    onClick={() => setSelectedTheme(theme.id)}
                                >
                                    <ThemeColorBox themecolor={theme.color} />
                                    <Box sx={{ flex: 1 }}>
                                        {currentLanguage== 'fa' ?
                                        <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                                            {theme.name}
                                        </Typography> :

                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                                            {theme.nameEn}
                                        </Typography>

                                        }
                                    </Box>
                                    {selectedTheme === theme.id && (
                                        <Box
                                            sx={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                background: theme.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            ✓
                                        </Box>
                                    )}
                                </ThemeCard>
                            ))}
                        </Box>
                    </Box>

                    {/* Language Section */}
                    <Box>
                        <SectionTitle>
                            <Language sx={{ fontSize: '1.2rem' }} />
                            انتخاب زبان
                        </SectionTitle>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {languages.map((lang) => (
                                <LanguageCard
                                    key={lang.id}
                                    selected={selectedLanguage === lang.id}
                                    onClick={() => setSelectedLanguage(lang.id)}
                                    sx={{ flex: 1 }}
                                >
                                    <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                                        {lang.name}
                                    </Typography>

                                    {selectedLanguage === lang.id && (
                                        <Box
                                            sx={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: 'rgba(100, 100, 255, 0.8)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            ✓
                                        </Box>
                                    )}
                                </LanguageCard>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 4, pb: 3, pt: 2, gap: 2, justifyContent: 'center' }}>
                <CancelButton onClick={onClose}>
                    {langs[currentLanguage].cancel}
                </CancelButton>
                <SubmitButton onClick={handleSubmit} variant="contained">
                    {langs[currentLanguage].save}
                </SubmitButton>
            </DialogActions>
        </GlassDialog>
    );
}
