import { Tabs, Tab, Box } from "@mui/material";
import { themes } from "../../../setting/them.js";

import { useState, useEffect, useRef, useCallback } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
 import {  formatDuration, formatPlays } from '../../../data/fakeDb.js';

import MediaCard from "../../Cards/MediaGridCard.jsx";
import apiService from '../../../services/apiService';
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
    const fetchData = async () => {
      try {
        setIsLoading(true);

        let endpoint = "/songs";

        switch (activeTab) {
          case "artists":
            endpoint = "/artists";
            break;

          case "albums":
            endpoint = "/albums";
            break;

          case "playlists":
            endpoint = "/playlists";
            break;

          default:
            endpoint = "/songs";
        }

        const response = await apiService.get(endpoint);

        const apiData = response.data?.data || response.data;

        let formattedData = [];

        if (activeTab === "music") {
          formattedData = apiData.map(song => ({
            ...song,
            type: "song",
            image: song.cover,
            subtitle: song.artist?.name,
          }));
        }

        if (activeTab === "artists") {
          formattedData = apiData.map(artist => ({
            ...artist,
            type: "artist",
            image: artist.avatar,
            title: artist.name,
            subtitle: `${artist.followers_count || 0} followers`,
          }));
        }

        if (activeTab === "albums") {
          formattedData = apiData.map(album => ({
            ...album,
            type: "album",
            image: album.cover,
            subtitle: album.artist?.name,
          }));
        }

        if (activeTab === "playlists") {
          formattedData = apiData.map(playlist => ({
            ...playlist,
            type: "playlist",
            image: playlist.cover,
            subtitle: playlist.user?.name,
          }));
        }

        setItems(formattedData);
        setHasMore(false);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, [activeTab]);

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
