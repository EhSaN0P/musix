import { useApiQuery } from '../../../hooks/useApi.js';
import MediaCard from '../../Cards/MediaGridCard.jsx';
import '../Home/Home.css';
import './PartyVibe.css';

export default function PartyVibe() {
  const { data, isLoading } = useApiQuery('party-vibe', '/genres/party');
  const genre = data?.data || data;
  const tracks = genre?.tracks || [];

  return (
    <div className="home-container">
      <div className="header-vibe">
        <h2>🎉 Party Vibe</h2>
        <p>Dance and party tracks from the Party genre</p>
      </div>

      <div className="content-grid">
        {tracks.map(track => <MediaCard key={track.id} item={track} />)}
      </div>

      {isLoading && <div className="loading-spinner">🎵 Loading...</div>}
      {!isLoading && tracks.length === 0 && <div className="end-message">No party tracks found</div>}
    </div>
  );
}
