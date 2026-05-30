// src/components/Cards/MediaCard.jsx

import './MediaGridCard.css'

import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import PlaylistCard from "./PlaylistCard";
import RemixCard from "./RemixCard";

export default function MediaCard({ item }) {

    switch (item.type) {

        case "song":
            return <SongCard item={item} />;

        case "artist":
            return <ArtistCard item={item} />;

        case "album":
            return <AlbumCard item={item} />;

        case "playlist":
            return <PlaylistCard item={item} />;

        case "remix":
            return <RemixCard item={item} />;

        default:
            return null;
    }
}