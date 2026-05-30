import { useState, useEffect, useRef, useCallback } from 'react';
import './VibeMakers.css';
import { useSelector } from 'react-redux';
import { fakeArtists, formatPlays } from '../../../data/fakeDb.js';
import ArtistCard from "../../Cards/ArtistCard.jsx";

function getArtistsPage(page) {
    const LIMIT = 12;

    const allItems = fakeArtists.map(a => ({
        ...a,
        type: 'artist',
        image: a.image,
        title: a.name,
        subtitle: `${formatPlays(a.monthlyListeners)} شنونده`,
    }));

    const start = (page - 1) * LIMIT;
    const slice = allItems.slice(start, start + LIMIT);

    return { data: slice, hasMore: start + LIMIT < allItems.length };
}

export default function VibeMakers() {
    const lang = useSelector(s => s.languages.currentLang);

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef(null);

    const lastItemRef = useCallback(
        node => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) setPage(p => p + 1);
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            const { data, hasMore: hm } = getArtistsPage(page);

            setItems(prev => (page === 1 ? data : [...prev, ...data]));
            setHasMore(hm);
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [page]);

    return (
        <div className="home-container">
            <div className="content-grid">
                {items.map((item, index) => {
                    const isLast = items.length === index + 1;

                    return (
                        <ArtistCard item={item}/>
                    );
                })}
            </div>

            {isLoading && (
                <div className="loading-spinner">
                    🎵 {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}
                </div>
            )}

            {!hasMore && items.length > 0 && (
                <div className="end-message">
                    ✅ {lang === 'fa' ? 'همه آرتیست‌ها نمایش داده شد' : 'All artists loaded!'}
                </div>
            )}
        </div>
    );
}
