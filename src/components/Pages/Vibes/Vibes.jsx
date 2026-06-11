import '../Home/Home.css';
import ApiMediaGrid from "../ApiMediaGrid.jsx";

export default function Vibes() {
    return (
        <ApiMediaGrid
            queryKey="vibes"
            url="/tracks"
            title="Vibes"
            subtitle="Explore all original tracks"
            select={(data) => data?.data || []}
        />
    );
}
