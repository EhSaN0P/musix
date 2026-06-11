import { useApiQuery } from "../../hooks/useApi.js";
import MediaCard from "../Cards/MediaGridCard.jsx";

export default function ApiMediaGrid({ queryKey, url, select, title, subtitle, emptyText = "No items found" }) {
    const { data, isLoading } = useApiQuery(queryKey, url);
    const rawItems = select ? select(data) : (data?.data || data || []);
    const items = Array.isArray(rawItems) ? rawItems : [];

    return (
        <div className="home-container">
            {(title || subtitle) && (
                <div className="header-vibe">
                    {title && <h2>{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </div>
            )}

            <div className="content-grid">
                {items.map(item => (
                    <MediaCard key={`${item.type || "item"}-${item.id}`} item={item} />
                ))}
            </div>

            {isLoading && <div className="loading-spinner">🎵 Loading...</div>}
            {!isLoading && items.length === 0 && <div className="end-message">{emptyText}</div>}
        </div>
    );
}
