import { useSelector } from 'react-redux';
import { History as HistoryIcon, Clock } from 'lucide-react';
import { useApiQuery } from '../../../hooks/useApi.js';
import MediaCard from '../../Cards/MediaGridCard.jsx';

export function addToHistory() {}

export default function History() {
  const lang = useSelector(s => s.languages.currentLang);
  const { data, isLoading } = useApiQuery('recently-played', '/recently-played');
  const history = data?.data || data || [];

  return (
    <div style={{ padding: '24px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <HistoryIcon size={24} />
          {lang === 'fa' ? 'تاریخچه پخش' : 'Play History'}
        </h2>
      </div>

      {isLoading ? (
        <div className="loading-spinner">🎵 {lang === 'fa' ? 'در حال بارگذاری...' : 'Loading...'}</div>
      ) : history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.3)' }}>
          <Clock size={64} style={{ marginBottom: 16 }} />
          <p>{lang === 'fa' ? 'هنوز چیزی گوش ندادی!' : 'Nothing played yet!'}</p>
        </div>
      ) : (
        <div className="content-grid">
          {history.map(item => <MediaCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
