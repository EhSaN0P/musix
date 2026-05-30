// ==========================================
// MUSIX FAKE DATABASE
// همه داده‌های fake پروژه اینجاست
// ==========================================

export const fakeSongs = [
  { id: 1, title: 'خاطرات باران', artist: 'علی راد', artistId: 1, album: 'احساسات گمشده', genre: 'pop', duration: 225, year: 2023, cover: 'https://picsum.photos/seed/song1/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', plays: 158000, liked: false },
  { id: 2, title: 'پرواز در شب', artist: 'سارا مهری', artistId: 2, album: 'فرکانس‌های آبی', genre: 'electronic', duration: 252, year: 2024, cover: 'https://picsum.photos/seed/song2/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', plays: 87000, liked: false },
  { id: 3, title: 'سکوت کویر', artist: 'رضا نیک‌خواه', artistId: 3, album: 'سکوت', genre: 'traditional', duration: 320, year: 2022, cover: 'https://picsum.photos/seed/song3/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', plays: 42000, liked: false },
  { id: 4, title: 'نبض شهر', artist: 'علی راد', artistId: 1, album: 'احساسات گمشده', genre: 'hiphop', duration: 190, year: 2024, cover: 'https://picsum.photos/seed/song4/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', plays: 215000, liked: false },
  { id: 5, title: 'موج و ساحل', artist: 'نیلا', artistId: 4, album: 'اقیانوس', genre: 'pop', duration: 200, year: 2023, cover: 'https://picsum.photos/seed/song5/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', plays: 63000, liked: false },
  { id: 6, title: 'آتش درون', artist: 'کامران', artistId: 5, album: 'آتش', genre: 'rock', duration: 245, year: 2023, cover: 'https://picsum.photos/seed/song6/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', plays: 130000, liked: false },
  { id: 7, title: 'رویای سفید', artist: 'سارا مهری', artistId: 2, album: 'فرکانس‌های آبی', genre: 'electronic', duration: 270, year: 2024, cover: 'https://picsum.photos/seed/song7/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', plays: 95000, liked: false },
  { id: 8, title: 'ستاره‌های دور', artist: 'رضا نیک‌خواه', artistId: 3, album: 'سکوت', genre: 'traditional', duration: 280, year: 2022, cover: 'https://picsum.photos/seed/song8/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', plays: 38000, liked: false },
  { id: 9, title: 'بی‌قرار', artist: 'علی راد', artistId: 1, album: 'احساسات گمشده', genre: 'pop', duration: 210, year: 2023, cover: 'https://picsum.photos/seed/song9/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', plays: 178000, liked: false },
  { id: 10, title: 'شب‌های تهران', artist: 'نیلا', artistId: 4, album: 'اقیانوس', genre: 'pop', duration: 230, year: 2023, cover: 'https://picsum.photos/seed/song10/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', plays: 71000, liked: false },
  { id: 11, title: 'دیوانه‌وار', artist: 'کامران', artistId: 5, album: 'آتش', genre: 'rock', duration: 265, year: 2023, cover: 'https://picsum.photos/seed/song11/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', plays: 142000, liked: false },
  { id: 12, title: 'باد شمال', artist: 'سارا مهری', artistId: 2, album: 'فرکانس‌های آبی', genre: 'electronic', duration: 300, year: 2024, cover: 'https://picsum.photos/seed/song12/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', plays: 54000, liked: false },
];

export const fakeArtists = [
  { id: 1, name: 'علی راد', monthlyListeners: 1500000, verified: true, image: 'https://picsum.photos/seed/artist1/300', genre: 'Pop / Hip-hop', bio: 'آرتیست برتر پاپ فارسی' },
  { id: 2, name: 'سارا مهری', monthlyListeners: 850000, verified: true, image: 'https://picsum.photos/seed/artist2/300', genre: 'Electronic', bio: 'نوآور موسیقی الکترونیک ایران' },
  { id: 3, name: 'رضا نیک‌خواه', monthlyListeners: 420000, verified: false, image: 'https://picsum.photos/seed/artist3/300', genre: 'Traditional / Fusion', bio: 'استاد موسیقی سنتی مدرن' },
  { id: 4, name: 'نیلا', monthlyListeners: 630000, verified: true, image: 'https://picsum.photos/seed/artist4/300', genre: 'Pop', bio: 'صدای گرم پاپ فارسی' },
  { id: 5, name: 'کامران', monthlyListeners: 1100000, verified: true, image: 'https://picsum.photos/seed/artist5/300', genre: 'Rock / Alternative', bio: 'پیشرو راک ایرانی' },
];

export const fakeAlbums = [
  { id: 1, title: 'احساسات گمشده', artistId: 1, artist: 'علی راد', year: 2023, cover: 'https://picsum.photos/seed/album1/300', songs: [1, 4, 9] },
  { id: 2, title: 'فرکانس‌های آبی', artistId: 2, artist: 'سارا مهری', year: 2024, cover: 'https://picsum.photos/seed/album2/300', songs: [2, 7, 12] },
  { id: 3, title: 'سکوت', artistId: 3, artist: 'رضا نیک‌خواه', year: 2022, cover: 'https://picsum.photos/seed/album3/300', songs: [3, 8] },
  { id: 4, title: 'اقیانوس', artistId: 4, artist: 'نیلا', year: 2023, cover: 'https://picsum.photos/seed/album4/300', songs: [5, 10] },
  { id: 5, title: 'آتش', artistId: 5, artist: 'کامران', year: 2023, cover: 'https://picsum.photos/seed/album5/300', songs: [6, 11] },
];

export const fakeRemixes = [
  { id: 101, title: 'خاطرات باران (ریمیکس بیس‌دار)', originalSongId: 1, artist: 'DJ TIK', bpm: 128, cover: 'https://picsum.photos/seed/remix1/300', duration: 210, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', plays: 45000 },
  { id: 102, title: 'پرواز در شب (نسخه آکوستیک)', originalSongId: 2, artist: 'سارا مهری', bpm: 90, cover: 'https://picsum.photos/seed/remix2/300', duration: 240, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', plays: 32000 },
  { id: 103, title: 'نبض شهر (ریمیکس Trap)', originalSongId: 4, artist: 'DJ Shadow IR', bpm: 140, cover: 'https://picsum.photos/seed/remix3/300', duration: 195, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', plays: 88000 },
];

export const fakePlaylists = [
  { id: 201, title: 'بهترین‌های پاپ فارسی', creator: 'Musix Team', creatorId: 'admin', songIds: [1, 4, 9, 5, 10], cover: 'https://picsum.photos/seed/pl1/300', isPublic: true },
  { id: 202, title: 'آرامش شبانه', creator: 'کاربر ۱۲', creatorId: 'user12', songIds: [3, 8, 2, 7], cover: 'https://picsum.photos/seed/pl2/300', isPublic: true },
  { id: 203, title: 'هیجان و انرژی', creator: 'Musix Team', creatorId: 'admin', songIds: [6, 11, 4, 12], cover: 'https://picsum.photos/seed/pl3/300', isPublic: true },
];

// Helper: format duration from seconds to mm:ss
export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Helper: format plays count
export function formatPlays(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n;
}

// Search across all data
export function searchAll(query) {
  const q = query.toLowerCase().trim();
  if (!q) return { songs: [], albums: [], artists: [], remixes: [], playlists: [] };
  return {
    songs: fakeSongs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)),
    albums: fakeAlbums.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)),
    artists: fakeArtists.filter(a => a.name.toLowerCase().includes(q)),
    remixes: fakeRemixes.filter(r => r.title.toLowerCase().includes(q) || r.artist.toLowerCase().includes(q)),
    playlists: fakePlaylists.filter(p => p.title.toLowerCase().includes(q) || p.creator.toLowerCase().includes(q)),
  };
}

export function getSongById(id) {
  return fakeSongs.find(s => s.id === id) || fakeRemixes.find(r => r.id === id);
}
