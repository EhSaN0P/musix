import '../Home/Home.css';
import ApiMediaGrid from "../ApiMediaGrid.jsx";

const VibeLists = () => (
    <ApiMediaGrid
        queryKey="vibe-lists"
        url="/playlists"
        title="پلی‌لیست‌های اختصاصی"
        subtitle="مجموعه‌هایی که دقیقاً برای لحظات خاص طراحی شدن"
        select={(data) => data?.data || []}
    />
);

export default VibeLists;
