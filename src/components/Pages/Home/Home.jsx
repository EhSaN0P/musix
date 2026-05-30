import { Tabs, Tab, Box } from "@mui/material";
import { themes } from "../../../setting/them.js";

import { useState, useEffect, useRef, useCallback } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
 import { fakeSongs, fakeArtists, fakeAlbums, fakeRemixes, fakePlaylists, formatDuration, formatPlays } from '../../../data/fakeDb.js';
import { Play, Heart } from 'lucide-react';
import MediaGridCard from "../../Cards/MediaGridCard.jsx";
import MediaCard from "../../Cards/MediaGridCard.jsx";

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


  const currentThem = useSelector(state => state.theme.currentTheme);
   const lang = useSelector(s => s.languages.currentLang);
  const [activeTab, setActiveTab] = useState('music');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [favIds, setFavIds] = useState(loadFavs());
  const observer = useRef();



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




  const tabs = TABS.map(t => ({ ...t, display: lang === 'fa' ? t.label : t.labelEn }));



  return (
    <div className="home-container">
      <Box className="home-tabs">
        <Tabs
            value={activeTab}
            onChange={(_, value) => handleTabChange(value)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              minHeight: 48,

              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor:
                    themes[currentThem]?.searchBar?.borderColor || '#4ecdc4',
              },

              '& .MuiTabs-scrollButtons': {
                color: 'rgba(255,255,255,0.8)',
              },

              '& .MuiTabs-flexContainer': {
                gap: '0.5rem',
              },
            }}
        >
          {tabs.map(tab => (
              <Tab
                  key={tab.id}
                  label={tab.display}
                  value={tab.id}
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 3,

                    color:
                        activeTab === tab.id
                            ? `${themes[currentThem]?.searchFilters?.activeTabColor || '#fff'} !important`
                            : `${themes[currentThem]?.searchFilters?.tabColor || 'rgba(255,255,255,.6)'} !important`,

                    transition: 'all .3s ease',

                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,.05)',
                    },
                  }}
              />
          ))}
        </Tabs>
      </Box>

        <div className="content-grid">
            {items.map(item => (
                <MediaCard
                    key={`${item.type}-${item.id}`}
                    item={item}
                />
            ))}
        </div>

      {isLoading && <div className="loading-spinner">🎵 {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</div>}
      {!hasMore && items.length > 0 && <div className="end-message">✅ {lang === 'fa' ? 'همه چیز نمایش داده شد' : 'All caught up!'}</div>}
    </div>
  );
}
