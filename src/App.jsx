import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import { themes } from './setting/them';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';




// Layouts
import LayoutDesktop from './components/Desktop/LayoutDesktop/LayoutDesktop.jsx';
import LayoutMobile from './components/Mobile/LayoutMobile/LayoutMobile.jsx';

// Pages
import Home from './components/Pages/Home/Home.jsx';
import SearchPage from './components/Pages/SearchPage/SearchPage.jsx';
import Profile from './components/Pages/Profile/Profile.jsx';
import PartyVibe from './components/Pages/PartyVibe/PartyVibe.jsx';
import Favorite from './components/Pages/Favorite/Favorite.jsx';
import History from './components/Pages/History/History.jsx';

// Stub pages for routes not yet built
function StubPage({ name }) {
  return (
    <div style={{ padding: 40, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <h2 style={{ color: '#fff' }}>{name}</h2>
      <p>در حال توسعه...</p>
    </div>
  );
}

// Player
import MusicPlayer from './components/Player/MusicPlayer.jsx';
import VibeTypes from "./components/Pages/VibeTypes/VibeTypes.jsx";
import VibeMakers from "./components/Pages/VibeMakers/VibeMakers.jsx";
import ByYourVibe from "./components/Pages/ByYourVibe/ByYourVibe.jsx";
import TheMosts from "./components/Pages/TheMosts/TheMosts.jsx";
import VibeLists from "./components/Pages/VibeLists/VibeLists.jsx";
import VibeRemixers from "./components/Pages/VibeRemixers/VibeRemixers.jsx";
import Downloads from "./components/Pages/Download/Download.jsx";
import Settings from "./components/Pages/Settings/Settings.jsx";
import Info from "./components/Pages/Info/Info.jsx";
import NotFound404 from "./components/Pages/NotFound404/NotFound404.jsx";
import SingleSong from "./components/Pages/singles/song/SingleSong.jsx";
import SingleArtist from "./components/Pages/singles/artist/SingleArtist.jsx";
import SingleAlbum from "./components/Pages/singles/album/SingleAlbum.jsx";
import SinglePlaylist from "./components/Pages/singles/playlist/SinglePlaylist.jsx";
import SingleRemixer from "./components/Pages/singles/remix/SingleRemixer.jsx";
import Vibes from "./components/Pages/Vibes/Vibes.jsx";
import {logout, setUser} from "./store/authSlice.js";
import apiService from "./services/apiService.js";
import {Navigate} from "react-router-dom";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import {AuthRoutes} from "./routes/AuthRoutes/AuthRoutes.jsx";
import {GuestRoutes} from "./routes/GuestRoutes/GuestRoutes.jsx";
import NewVibes from "./components/Pages/NewVibes/NewVibes.jsx";
import GenrePage from "./components/Pages/GenrePage/GenrePage.jsx";
import CreatePlaylist from "./components/Pages/Playlists/CreatePlaylist.jsx";
import AdminPanel from './components/Pages/admin/admin.jsx';

function App() {
  const dir = useSelector(s => s.languages.currentLang);
  const currentThem = useSelector(s => s.theme.currentTheme);

  useEffect(() => {
    document.body.style.background = themes.makeGradient(currentThem ?? 'blue');
    document.body.style.animation = 'gradientMove 8s ease infinite';
    document.querySelector('body').dir = dir === 'fa' ? 'rtl' : 'ltr';
  }, [dir, currentThem]);

  const isMobile = useMediaQuery({ maxWidth: 1170 });
  const isDesktop = useMediaQuery({ minWidth: 1171 });

    const { isAuthenticated, user } = useSelector(
        state => state.auth
    );



  // Auth
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiService.get('/auth/me');

                dispatch(setUser(res.data.user));
            } catch (error) {
                dispatch(logout());
            }
        };

        if (localStorage.getItem('token')) {
            fetchUser();
        }
    }, []);
  // Auth


  const routes = (
      <Routes>
          <Route
              path="/favorite"
              element={
                  <ProtectedRoute>
                      <Favorite />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/history"
              element={
                  <ProtectedRoute>
                      <History />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/by-your-vibe"
              element={
                  <ProtectedRoute>
                      <ByYourVibe />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/download"
              element={
                  <ProtectedRoute>
                      <Downloads />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/profile"
              element={
                  <ProtectedRoute>
                      <Profile />
                  </ProtectedRoute>
              }
          />

          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />



          <Route
              path="/login"
              element={
                  <GuestRoute>
                      <Login />
                  </GuestRoute>
              }
          />

          <Route
              path="/register"
              element={
                  <GuestRoute>
                      <Register />
                  </GuestRoute>
              }
          />

          <Route path="/party-vibe" element={<PartyVibe />} />
          <Route path="/new-vibes" element={<NewVibes />} />
          <Route path="/vibe-types" element={<VibeTypes />} />
          <Route path="/vibe-lists" element={<VibeLists />} />
          <Route path="/vibe-makers" element={<VibeMakers />} />
          <Route path="/vibes" element={<Vibes />} />
          <Route path="/genre/:slug" element={<GenrePage />} />
          <Route
              path="/playlists/create"
              element={
                  <ProtectedRoute>
                      <CreatePlaylist />
                  </ProtectedRoute>
              }
          />

          <Route path="/artist/:slug" element={<SingleArtist />} />
          <Route path="/song/:slug" element={<SingleSong />} />
          <Route path="/album/:slug" element={<SingleAlbum />} />
          <Route path="/playlist/:slug" element={<SinglePlaylist />} />
          <Route path="/remixer/:slug" element={<SingleRemixer />} />

          <Route path="/the-mosts" element={<TheMosts />} />
          <Route path="/vibe-remixers" element={<VibeRemixers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/info" element={<Info />} />

          <Route path="*" element={<NotFound404 />} />

          <Route
              path="/admin/*"
              element={
                  <ProtectedRoute>
                      <AdminPanel />
                  </ProtectedRoute>
              }
          />
      </Routes>
  );

  return (
    <main className="App">



      {isDesktop && <LayoutDesktop>{routes}</LayoutDesktop>}
      {isMobile && <LayoutMobile>{routes}</LayoutMobile>}
      {/* Global Music Player */}
      <MusicPlayer />
    </main>
  );
}

export default App;
