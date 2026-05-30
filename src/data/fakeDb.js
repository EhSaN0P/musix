// ==========================================
// MUSIX FAKE DATABASE
// همه داده‌های fake پروژه اینجاست
// ==========================================

export const fakeSongs = [
  { id: 1, title: 'خاطرات باران', artist: 'علی راد', artistId: 1, album: 'احساسات گمشده', genre: 'pop', duration: 225, year: 2023, cover: 'https://picsum.photos/seed/song1/300', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', plays: 158000, liked: false },

];

export const fakeArtists = [
  { id: 1, name: 'علی راد', monthlyListeners: 1500000, verified: true, image: 'https://picsum.photos/seed/artist1/300', genre: 'Pop / Hip-hop', bio: 'آرتیست برتر پاپ فارسی' },

];

export const fakeAlbums = [
  { id: 1, title: 'احساسات گمشده', artistId: 1, artist: 'علی راد', year: 2023, cover: 'https://picsum.photos/seed/album1/300', songs: [1, 4, 9] },

];

export const fakeRemixes = [
  { id: 101, title: 'خاطرات باران (ریمیکس بیس‌دار)', originalSongId: 1, artist: 'DJ TIK', bpm: 128, cover: 'https://picsum.photos/seed/remix1/300', duration: 210, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', plays: 45000 },

];

export const fakePlaylists = [
  { id: 201, title: 'بهترین‌های پاپ فارسی', creator: 'Musix Team', creatorId: 'admin', songIds: [1, 4, 9, 5, 10], cover: 'https://picsum.photos/seed/pl1/300', isPublic: true },

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
