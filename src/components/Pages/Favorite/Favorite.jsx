// ===== Favorite.jsx =====
// src/components/Pages/Favorite/Favorite.jsx
import './Favorite.css';
// src/components/Pages/Favorite/Favorite.jsx

import { Tabs, Tab, Box } from "@mui/material";
import { themes } from "../../../setting/them.js";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import MediaCard from "../../Cards/MediaGridCard.jsx";
import apiService from "../../../services/apiService";

const TABS = [
  { id: "all", label: "همه", labelEn: "All" },
  { id: "music", label: "موزیک‌ها", labelEn: "Music" },
  { id: "artists", label: "آرتیست‌ها", labelEn: "Artists" },
  { id: "remixers", label: "ریمیکسرها", labelEn: "Remixers" },
  { id: "remixes", label: "ریمیکس‌ها", labelEn: "Remixes" },
  { id: "playlists", label: "پلی‌لیست‌ها", labelEn: "Playlists" },
  { id: "albums", label: "آلبوم‌ها", labelEn: "Albums" },
];

export default function Favorite() {
  const currentTheme = useSelector(
      (state) => state.theme.currentTheme
  );

  const lang = useSelector(
      (state) => state.languages.currentLang
  );

  const [activeTab, setActiveTab] = useState("all");

  const [favorites, setFavorites] = useState({
    tracks: [],
    remixes: [],
    remixers: [],
    artists: [],
    playlists: [],
    albums: [],
  });

   const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);


  async function fetchFavorites() {
    try {
      setLoading(true);

      const response = await apiService.get("/favorites");

        setFavorites({
        tracks: response.data?.tracks || [],
        remixers: response.data?.remixers || [],
        remixes: response.data?.remixes || [],
        artists: response.data?.artists || [],
        playlists: response.data?.playlists || [],
        albums: response.data?.albums || [],
      });
    } catch (error) {
      console.error(error);

      setFavorites({
        tracks: [],
        remixers: [],
        remixes: [],
        artists: [],
        playlists: [],
        albums: [],
      });
    } finally {
      setLoading(false);
    }
  }

  function handleTabChange(id) {
    if (id === activeTab) return;

    setActiveTab(id);
  }

  const tabs = TABS.map((tab) => ({
    ...tab,
    display: lang === "fa" ? tab.label : tab.labelEn,
  }));

  return (
      <div className="home-container">
        <Box className="home-tabs">
          <Tabs
              value={activeTab}
              onChange={(_, value) =>
                  handleTabChange(value)
              }
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                borderBottom:
                    "1px solid rgba(255,255,255,0.12)",
                minHeight: 48,

                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                  backgroundColor:
                      themes[currentTheme]?.searchBar
                          ?.borderColor || "#4ecdc4",
                },

                "& .MuiTabs-scrollButtons": {
                  color: "rgba(255,255,255,0.8)",
                },

                "& .MuiTabs-flexContainer": {
                  gap: "0.5rem",
                },
              }}
          >
            {tabs.map((tab) => (
                <Tab
                    key={tab.id}
                    label={tab.display}
                    value={tab.id}
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      textTransform: "none",
                      minWidth: "auto",
                      px: 3,

                      color:
                          activeTab === tab.id
                              ? `${
                                  themes[currentTheme]
                                      ?.searchFilters
                                      ?.activeTabColor ||
                                  "#fff"
                              } !important`
                              : `${
                                  themes[currentTheme]
                                      ?.searchFilters
                                      ?.tabColor ||
                                  "rgba(255,255,255,.6)"
                              } !important`,

                      transition: "all .3s ease",

                      "&:hover": {
                        backgroundColor:
                            "rgba(255,255,255,.05)",
                      },
                    }}
                />
            ))}
          </Tabs>
        </Box>

        {loading ? (
            <div className="loading-spinner">
              🎵{" "}
              {lang === "fa"
                  ? "در حال بارگذاری..."
                  : "Loading..."}
            </div>
        ) : (
            <>
              {(activeTab === "all" || activeTab === "music") &&
                  favorites.tracks.length > 0 && (
                      <Box className="results-section">
                        <h3 className="section-title">
                          {lang === "fa" ? "موزیک‌ها" : "Music"} ({favorites.tracks.length})
                        </h3>

                        <div className="content-grid">
                          {favorites.tracks.map((song) => (
                              <MediaCard
                                  key={`track-${song.id}`}
                                  item={{
                                    ...song,
                                    type: "original",
                                    image: song.cover,
                                    subtitle: song.artist?.name,
                                  }}
                              />
                          ))}
                        </div>
                      </Box>
                  )}

              {(activeTab === "all" || activeTab === "remixes") &&
                  favorites.remixes.length > 0 && (
                      <Box className="results-section">
                        <h3 className="section-title">
                          {lang === "fa" ? "ریمیکس‌ها" : "Remixes"} ({favorites.remixes.length})
                        </h3>

                        <div className="content-grid">
                          {favorites.remixes.map((song) => (
                              <MediaCard
                                  key={`remix-${song.id}`}
                                  item={{
                                    ...song,

                                    image: song.cover,
                                    subtitle: song.artist?.name,
                                  }}
                              />
                          ))}
                        </div>
                      </Box>
                  )}

              {(activeTab === "all" || activeTab === "artists") &&
                  favorites.artists.length > 0 && (
                      <Box className="results-section">
                        <h3 className="section-title">
                          {lang === "fa" ? "آرتیست‌ها" : "Artists"} ({favorites.artists.length})
                        </h3>

                        <div className="content-grid">
                          {favorites.artists.map((artist) => (
                              <MediaCard
                                  key={`artist-${artist.id}`}
                                  item={{
                                    ...artist,
                                    type: "artist",
                                    image: artist.avatar,
                                    title: artist.name,
                                    subtitle: `${artist.followers_count || 0} followers`,
                                  }}
                              />
                          ))}
                        </div>
                      </Box>
                  )}

              {(activeTab === "all" || activeTab === "remixers") &&
                  favorites.remixers.length > 0 && (
                      <Box className="results-section">
                        <h3 className="section-title">
                          {lang === "fa" ? "ریمیکسرها" : "Remixers"} ({favorites.remixers.length})
                        </h3>

                        <div className="content-grid">
                          {favorites.remixers.map((remixer) => (
                              <MediaCard
                                  key={`remixer-${remixer.id}`}
                                  item={{
                                    ...remixer,
                                    type: "remixer",
                                    image: remixer.avatar,
                                    title: remixer.name,
                                  }}
                              />
                          ))}
                        </div>
                      </Box>
                  )}

              {(activeTab === "all" || activeTab === "albums") &&
                  favorites.albums.length > 0 && (
                      <Box className="results-section">
                        <h3 className="section-title">
                          {lang === "fa" ? "آلبوم‌ها" : "Albums"} ({favorites.albums.length})
                        </h3>

                        <div className="content-grid">
                          {favorites.albums.map((album) => (
                              <MediaCard
                                  key={`album-${album.id}`}
                                  item={{
                                    ...album,
                                    type: "album",
                                    image: album.cover,
                                    subtitle: album.artist?.name,
                                  }}
                              />
                          ))}
                        </div>
                      </Box>
                  )}

              {(activeTab === "all" || activeTab === "playlists") &&
                  favorites.playlists.length > 0 && (
                      <Box className="results-section">
                        <h3 className="section-title">
                          {lang === "fa" ? "پلی‌لیست‌ها" : "Playlists"} ({favorites.playlists.length})
                        </h3>

                        <div className="content-grid">
                          {favorites.playlists.map((playlist) => (
                              <MediaCard
                                  key={`playlist-${playlist.id}`}
                                  item={{
                                    ...playlist,
                                    type: "playlist",
                                    image: playlist.cover,
                                    subtitle: playlist.user?.name,
                                  }}
                              />
                          ))}
                        </div>
                      </Box>
                  )}

              {favorites.tracks.length === 0 &&
                  favorites.remixes.length === 0 &&
                  favorites.remixers.length === 0 &&
                  favorites.artists.length === 0 &&
                  favorites.albums.length === 0 &&
                  favorites.playlists.length === 0 && (
                      <div className="end-message">
                        💔{" "}
                        {lang === "fa"
                            ? "موردی در علاقه‌مندی‌ها پیدا نشد"
                            : "No favorites found"}
                      </div>
                  )}
            </>
        )}
      </div>
  );
}