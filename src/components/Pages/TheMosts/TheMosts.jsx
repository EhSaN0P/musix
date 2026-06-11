import '../Home/Home.css';
import ApiMediaGrid from "../ApiMediaGrid.jsx";

const TheMosts = () => (
    <ApiMediaGrid
        queryKey="the-mosts"
        url="/"
        title="🏆 باشگاه رکوردداران"
        subtitle="پرشنونده‌ترین ترک‌ها و آرتیست‌های موزیکس"
        select={(data) => [
            ...(data?.popular_tracks || []),
            ...(data?.popular_artists || []),
        ]}
    />
);

export default TheMosts;
