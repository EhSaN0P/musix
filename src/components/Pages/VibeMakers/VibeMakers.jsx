import '../Home/Home.css';
import ApiMediaGrid from "../ApiMediaGrid.jsx";

export default function VibeMakers() {
    return (
        <ApiMediaGrid
            queryKey="vibe-makers"
            url="/artists"
            title="Vibe Makers"
            subtitle="آرتیست‌های موزیکس"
            select={(data) => data?.data || []}
        />
    );
}
