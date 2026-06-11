import '../Home/Home.css';
import ApiMediaGrid from "../ApiMediaGrid.jsx";

const VibeRemixers = () => (
    <ApiMediaGrid
        queryKey="vibe-remixers"
        url="/remixers"
        title="مسترِ بیت‌ها و ریمیکسرها"
        subtitle="جادوگرانی که به آهنگ‌ها جون دوباره میدن!"
        select={(data) => data?.data || data || []}
    />
);

export default VibeRemixers;
