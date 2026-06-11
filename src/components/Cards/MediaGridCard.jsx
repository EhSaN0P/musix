// src/components/Cards/MediaCard.jsx

import './MediaGridCard.css'

import SongCard from "./SongCard";
import ArtistCard from "./ArtistCard";
import AlbumCard from "./AlbumCard";
import PlaylistCard from "./PlaylistCard";
import RemixCard from "./RemixCard";


function normalizeItem(item) {
    const normalized = {
        ...item,
        title: item.title || item.name,
        image: item.cover_image || item.image,
        subtitle: item.subtitle || item.artist?.name || item.user?.name || '',
    };

    if (!normalized.type && item.tracks_count !== undefined && item.name) normalized.type = 'artist';
    return normalized;
}

export function resolveLink(item) {
    if (item.type === 'original') return `/song/${item.id}`;
    if (item.type === 'remix') return `/song/${item.id}`;
    if (item.type === 'artist') return `/artist/${item.id}`;
    if (item.type === 'remixer') return `/remixer/${item.id}`;
    if (item.type === 'album') return `/album/${item.id}`;
    if (item.type === 'playlist') return `/playlist/${item.id}`;
    if (item.type === 'genre') return `/genre/${item.id}`;
    return '/';
}

    export default function MediaCard({ item }) {
        const normalized = normalizeItem(item);

         switch (normalized.type) {

            case "original":
            return <SongCard  isRemix={false} item={normalized} />;

            case "remix":
                return <SongCard isRemix={true} item={normalized} />;

            case "remixer":
                return <RemixCard item={normalized} />;  // ← مستقیم، بدون چک type2

            case "artist":
                return <ArtistCard item={normalized} />;

            case "album":
                return <AlbumCard item={normalized} />;

            case "playlist":
                return <PlaylistCard item={normalized} />;

            default:
                return null;
        }
    }

