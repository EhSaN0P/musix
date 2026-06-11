import '../Home/Home.css';
import ApiMediaGrid from "../ApiMediaGrid.jsx";

const NewVibes = () => (
    <ApiMediaGrid
        queryKey="new-vibes"
        url="/"
        title="حس‌های جدید (New Vibes)"
        subtitle="تازه‌ترین ترک‌ها برای ساختن مود امروزت"
        select={(data) => data?.new_releases || []}
    />
);

export default NewVibes;
