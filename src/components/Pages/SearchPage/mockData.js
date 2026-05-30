// data/mockData.js
export const mockData = {
    songs: [
        { id: 1, title: 'خاطرات باران', artist: 'علی راد', genre: 'پاپ', duration: '3:45', year: 2023 },
        { id: 2, title: 'پرواز در شب', artist: 'سارا مهری', genre: 'الکترونیک', duration: '4:12', year: 2024 },
        { id: 3, title: 'سکوت کویر', artist: 'رضا نیک‌خواه', genre: 'سنتی مدرن', duration: '5:20', year: 2022 },
        { id: 4, title: 'نبض شهر', artist: 'علی راد', genre: 'هیپ‌هاپ', duration: '3:10', year: 2024 }
    ],
    albums: [
        { id: 1, title: 'احساسات گمشده', artist: 'علی راد', year: 2023, tracks: [1, 4] },
        { id: 2, title: 'فرکانس‌های آبی', artist: 'سارا مهری', year: 2024, tracks: [2] }
    ],
    artists: [
        { id: 1, name: 'علی راد', monthlyListeners: 150000, verified: true },
        { id: 2, name: 'سارا مهری', monthlyListeners: 85000, verified: false },
        { id: 3, name: 'رضا نیک‌خواه', monthlyListeners: 42000, verified: true }
    ],
    remixes: [
        { id: 101, originalSongId: 1, title: 'خاطرات باران (ریمیکس بیس‌دار)', artist: 'دی‌جی تیک', bpm: 128 },
        { id: 102, originalSongId: 2, title: 'پرواز در شب (نسخه آکوستیک)', artist: 'سارا مهری', bpm: 90 }
    ],
    playlists: [
        { id: 201, title: 'بهترین‌های پاپ فارسی', creator: 'مدیر', songIds: [1, 4, 101], totalDuration: '10:55' },
        { id: 202, title: 'آرامش شبانه', creator: 'کاربر ۱۲', songIds: [3, 2, 102], totalDuration: '13:52' }
    ]
};
