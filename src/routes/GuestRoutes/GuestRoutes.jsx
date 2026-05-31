import {Routes,Route} from "react-router-dom";
import GuestRoute from "../GuestRoute.jsx";
import Login from "../../components/auth/Login.jsx";
import Register from "../../components/auth/Register.jsx";
import PartyVibe from "../../components/Pages/PartyVibe/PartyVibe.jsx";
import VibeTypes from "../../components/Pages/VibeTypes/VibeTypes.jsx";
import NewVibes from "../../components/Pages/NewVibes/NewVibes.jsx";
import VibeLists from "../../components/Pages/VibeLists/VibeLists.jsx";
import VibeMakers from "../../components/Pages/VibeMakers/VibeMakers.jsx";
import Vibes from "../../components/Pages/Vibes/Vibes.jsx";
import SingleArtist from "../../components/Pages/singles/artist/SingleArtist.jsx";
import SingleSong from "../../components/Pages/singles/song/SingleSong.jsx";
import SingleAlbum from "../../components/Pages/singles/album/SingleAlbum.jsx";
import SinglePlaylist from "../../components/Pages/singles/playlist/SinglePlaylist.jsx";
import SingleRemixer from "../../components/Pages/singles/remix/SingleRemixer.jsx";
import TheMosts from "../../components/Pages/TheMosts/TheMosts.jsx";
import VibeRemixers from "../../components/Pages/VibeRemixers/VibeRemixers.jsx";
import NotFound404 from "../../components/Pages/NotFound404/NotFound404.jsx";
import Settings from "../../components/Pages/Settings/Settings.jsx";
import Info from "../../components/Pages/Info/Info.jsx";

export const GuestRoutes = () => (
    <>
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
    </>
);