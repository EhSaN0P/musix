// ===== Favorite.jsx =====
// src/components/Pages/Favorite/Favorite.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { fakeSongs, formatDuration } from '../../../data/fakeDb.js';
import { Heart, Play, Trash2, Music } from 'lucide-react';

const LS_KEY = 'musix_favorites';

function loadFavs() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
}
function saveFavs(ids) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids));
}
export function isFavorite(id) { return loadFavs().includes(id); }
export function toggleFavorite(id) {
  const favs = loadFavs();
  const idx = favs.indexOf(id);
  if (idx === -1) favs.push(id);
  else favs.splice(idx, 1);
  saveFavs(favs);
  return !idx === -1;
}

export default function Favorite() {
  const dispatch = useDispatch();
  const lang = useSelector(s => s.languages.currentLang);
  const [favIds, setFavIds] = useState(loadFavs());
  const favSongs = fakeSongs.filter(s => favIds.includes(s.id));

  function handleRemove(id) {
    const next = favIds.filter(f => f !== id);
    saveFavs(next);
    setFavIds(next);
  }

  function playAll() {
    if (favSongs.length === 0) return;

  }

  return (
    <div style={{ padding: '24px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Heart size={24} fill="#ff4d6d" color="#ff4d6d" />
          {lang === 'fa' ? 'علاقه‌مندی‌ها' : 'Favorites'}
        </h2>
        {favSongs.length > 0 && (
          <button onClick={playAll} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: 'linear-gradient(135deg,#a855f7,#6366f1)', border: 'none', borderRadius: 50, color: '#fff', cursor: 'pointer', fontWeight: 700 }}>
            <Play size={16} /> {lang === 'fa' ? 'پخش همه' : 'Play All'}
          </button>
        )}
      </div>

      {favSongs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.3)' }}>
          <Heart size={64} style={{ marginBottom: 16 }} />
          <p>{lang === 'fa' ? 'هنوز آهنگی لایک نکردی!' : 'No favorites yet!'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {favSongs.map((song, i) => (
            <div key={song.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, transition: 'background 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            >
              <span style={{ width: 24, color: 'rgba(255,255,255,0.3)', fontSize: 13, textAlign: 'center' }}>{i + 1}</span>
              <img src={song.cover} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{song.artist}</div>
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{formatDuration(song.duration)}</span>
              <button   style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
                <Play size={18} />
              </button>
              <button onClick={() => handleRemove(song.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,80,80,0.7)', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
