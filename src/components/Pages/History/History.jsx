import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { fakeSongs, formatDuration } from '../../../data/fakeDb.js';
import { History as HistoryIcon, Play, Trash2, Clock } from 'lucide-react';

const LS_KEY = 'musix_history';

export function addToHistory(song) {
  try {
    const hist = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    const next = [{ ...song, playedAt: Date.now() }, ...hist.filter(h => h.id !== song.id)].slice(0, 50);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {}
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
}

export default function History() {
  const dispatch = useDispatch();
  const lang = useSelector(s => s.languages.currentLang);
  const [history, setHistory] = useState(loadHistory());

  function clearHistory() {
    localStorage.removeItem(LS_KEY);
    setHistory([]);
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (m < 1) return lang === 'fa' ? 'همین الان' : 'Just now';
    if (m < 60) return lang === 'fa' ? `${m} دقیقه پیش` : `${m}m ago`;
    if (h < 24) return lang === 'fa' ? `${h} ساعت پیش` : `${h}h ago`;
    return lang === 'fa' ? `${d} روز پیش` : `${d}d ago`;
  }

  // Seed some fake history if empty
  useEffect(() => {
    if (history.length === 0) {
      const seeded = fakeSongs.slice(0, 6).map((s, i) => ({
        ...s,
        playedAt: Date.now() - i * 3600000 * (i + 1)
      }));
      localStorage.setItem(LS_KEY, JSON.stringify(seeded));
      setHistory(seeded);
    }
  }, []);

  return (
    <div style={{ padding: '24px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <HistoryIcon size={24} />
          {lang === 'fa' ? 'تاریخچه پخش' : 'Play History'}
        </h2>
        {history.length > 0 && (
          <button onClick={clearHistory} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 50, color: '#ff5050', cursor: 'pointer', fontSize: 13 }}>
            <Trash2 size={14} /> {lang === 'fa' ? 'پاک کردن همه' : 'Clear All'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.3)' }}>
          <Clock size={64} style={{ marginBottom: 16 }} />
          <p>{lang === 'fa' ? 'هنوز چیزی گوش ندادی!' : 'Nothing played yet!'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {history.map((song, i) => (
            <div key={`${song.id}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            >
              <img src={song.cover} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{song.artist}</div>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{timeAgo(song.playedAt)}</span>
              <button   style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
                <Play size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
