import { useState, useEffect, useRef, useCallback } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
 import { fakeSongs, fakeArtists, fakeAlbums, fakeRemixes, fakePlaylists, formatDuration, formatPlays } from '../../../data/fakeDb.js';
import { Play, Heart } from 'lucide-react';
import MediaGridCard from "../../Cards/MediaGridCard.jsx";

const FAV_KEY = 'musix_favorites';
function loadFavs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch { return []; } }
function saveFavs(ids) { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); }

// ---- Tabs config ----
const TABS = [
  { id: 'music', label: 'موزیک‌ها', labelEn: 'Music' },
  { id: 'artists', label: 'آرتیست‌ها', labelEn: 'Artists' },
  { id: 'remixes', label: 'ریمیکس‌ها', labelEn: 'Remixes' },
  { id: 'playlists', label: 'پلی‌لیست‌ها', labelEn: 'Playlists' },
  { id: 'albums', label: 'آلبوم‌ها', labelEn: 'Albums' },
];

function getTabData(tab, page) {
  const LIMIT = 12;
  let allItems = [];
  if (tab === 'music') allItems = fakeSongs.map(s => ({ ...s, type: 'song', image: s.cover, subtitle: s.artist }));
  if (tab === 'artists') allItems = fakeArtists.map(a => ({ ...a, type: 'artist', image: a.image, title: a.name, subtitle: `${formatPlays(a.monthlyListeners)} شنونده` }));
  if (tab === 'remixes') allItems = fakeRemixes.map(r => ({ ...r, type: 'remix', image: r.cover, subtitle: r.artist }));
  if (tab === 'playlists') allItems = fakePlaylists.map(p => ({ ...p, type: 'playlist', image: p.cover, subtitle: p.creator }));
  if (tab === 'albums') allItems = fakeAlbums.map(a => ({ ...a, type: 'album', image: a.cover, subtitle: a.artist }));
  const start = (page - 1) * LIMIT;
  const slice = allItems.slice(start, start + LIMIT);
  return { data: slice, hasMore: start + LIMIT < allItems.length };
}

export default function Home() {
   const lang = useSelector(s => s.languages.currentLang);
  const [activeTab, setActiveTab] = useState('music');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favIds, setFavIds] = useState(loadFavs());
  const observer = useRef();

  const lastItemRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) setPage(p => p + 1);
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const { data, hasMore: hm } = getTabData(activeTab, page);
      setItems(prev => page === 1 ? data : [...prev, ...data]);
      setHasMore(hm);
      setIsLoading(false);
    }, 400);
  }, [activeTab, page]);

  function handleTabChange(id) {
    if (id === activeTab) return;
    setActiveTab(id);
    setItems([]);
    setPage(1);
    setHasMore(true);
  }



  function toggleFav(id, e) {
    e.stopPropagation();
    const next = favIds.includes(id) ? favIds.filter(f => f !== id) : [...favIds, id];
    setFavIds(next);
    saveFavs(next);
  }

  const tabs = TABS.map(t => ({ ...t, display: lang === 'fa' ? t.label : t.labelEn }));



  return (
    <div className="home-container">
      <nav className="tab-nav">
        {tabs.map(tab => (
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => handleTabChange(tab.id)}>
            {tab.display}
          </button>
        ))}
      </nav>

      <div className="content-grid">
        {items.map((item, index) => {

          const liked = favIds.includes(item.id);
          return (
              <MediaGridCard
                  item={item}
                  liked={liked}
                  onLike={() => toggleFav(item.id)}
                  onPlay={() => console.log(item)}
              />
          );
        })}
      </div>

      {isLoading && <div className="loading-spinner">🎵 {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</div>}
      {!hasMore && items.length > 0 && <div className="end-message">✅ {lang === 'fa' ? 'همه چیز نمایش داده شد' : 'All caught up!'}</div>}
    </div>
  );
}
