import { Tabs, Tab, Box } from "@mui/material";
import { themes } from "../../../setting/them.js";

import { useEffect, useState } from 'react';
import './Home.css';
import { useSelector } from 'react-redux';

import MediaCard from "../../Cards/MediaGridCard.jsx";
import apiService from '../../../services/apiService';
import { useApiQuery } from "../../../hooks/useApi.js";

// ---- Tabs config ----
const TABS = [
  { id: 'music', label: 'موزیک‌ها', labelEn: 'Music' },
  { id: 'artists', label: 'آرتیست‌ها', labelEn: 'Artists' },
  { id: 'remixers', label: 'ریمیکسر ‌ها', labelEn: 'remixers' },
  { id: 'playlists', label: 'پلی‌لیست‌ها', labelEn: 'Playlists' },
  { id: 'albums', label: 'آلبوم‌ها', labelEn: 'Albums' },
];



export default function Home() {
  const currentThem = useSelector(state => state.theme.currentTheme);
   const lang = useSelector(s => s.languages.currentLang);
  const [activeTab, setActiveTab] = useState('music');
  const [items, setItems] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  const endpointMap = {
    music: '/tracks',
    artists: '/artists',
    albums: '/albums',
    playlists: '/playlists',
    remixers: '/remixers',
  };

  const normalize = (item, tab) => {
    if (tab === 'music') return { ...item, image: item.cover_image, subtitle: item.artist?.name };
    if (tab === 'artists' || tab === 'remixers') return { ...item, title: item.name, image: item.image };
    if (tab === 'albums') return { ...item, image: item.cover_image, subtitle: item.artist?.name };
    if (tab === 'playlists') return { ...item, image: item.cover_image, subtitle: item.user?.name };
    return item;
  };

  const { data, isLoading } = useApiQuery(['home-list', activeTab], endpointMap[activeTab]);

  useEffect(() => {
    const apiData = data?.data || data || [];
    setItems(apiData.map(item => normalize(item, activeTab)));
    setNextUrl(data?.links?.next || null);
  }, [data, activeTab]);

  function handleTabChange(id) {
    if (id === activeTab) return;
    setActiveTab(id);
    setItems([]);
    setNextUrl(null);
  }

  const loadMore = async () => {
    if (!nextUrl) return;
    const response = await apiService.get(nextUrl.replace(apiService.defaults.baseURL, ''));
    const apiData = response.data?.data || [];
    setItems(prev => [...prev, ...apiData.map(item => normalize(item, activeTab))]);
    setNextUrl(response.data?.links?.next || null);
  };



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
      {nextUrl && <button className="end-message" onClick={loadMore}>{lang === 'fa' ? 'بارگذاری بیشتر' : 'Load more'}</button>}
      {!nextUrl && items.length > 0 && <div className="end-message">✅ {lang === 'fa' ? 'همه چیز نمایش داده شد' : 'All caught up!'}</div>}
    </div>
  );
}
