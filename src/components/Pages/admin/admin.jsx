// ============================================================
// Musix Admin Panel — AdminPanel.jsx
// مسیر: src/components/admin/AdminPanel.jsx
// ============================================================
// نحوه اضافه کردن به App.jsx:
//   import AdminPanel from './components/admin/AdminPanel.jsx';
//   <Route path="/admin/*" element={<AdminPanel />} />
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Routes, Route, NavLink, useParams } from 'react-router-dom';
import apiService from "../../../services/apiService.js";
import {logout} from "../../../store/authSlice.js";

// ─── Design Tokens ──────────────────────────────────────────
const glass = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
};
const glassCard = {
    ...glass,
    padding: '24px',
};
const colors = {
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.15)',
    accentBorder: 'rgba(168,85,247,0.4)',
    danger: '#ef4444',
    dangerLight: 'rgba(239,68,68,0.15)',
    success: '#22c55e',
    successLight: 'rgba(34,197,94,0.12)',
    text: 'rgba(255,255,255,0.9)',
    textMuted: 'rgba(255,255,255,0.45)',
    surface: 'rgba(255,255,255,0.04)',
    surfaceHover: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.08)',
};

// ─── Shared UI Components ─────────────────────────────────────

function Spinner() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{
                width: 36, height: 36,
                border: `3px solid ${colors.border}`,
                borderTop: `3px solid ${colors.accent}`,
                borderRadius: '50%',
                animation: 'adminSpin 0.8s linear infinite'
            }} />
        </div>
    );
}

function Badge({ children, color = colors.accent }) {
    return (
        <span style={{
            background: color + '22',
            color,
            border: `1px solid ${color}44`,
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: 600,
        }}>{children}</span>
    );
}

function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, type = 'button', style: s }) {
    const base = {
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
        fontWeight: 600, borderRadius: '10px', transition: 'all 0.2s',
        opacity: disabled ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: '6px',
    };
    const sizes = { sm: { padding: '6px 14px', fontSize: '12px' }, md: { padding: '10px 20px', fontSize: '13px' }, lg: { padding: '13px 28px', fontSize: '14px' } };
    const variants = {
        primary: { background: `linear-gradient(135deg, ${colors.accent}, #7c3aed)`, color: '#fff' },
        danger: { background: colors.dangerLight, color: colors.danger, border: `1px solid ${colors.danger}44` },
        ghost: { background: 'transparent', color: colors.textMuted, border: `1px solid ${colors.border}` },
        success: { background: colors.successLight, color: colors.success, border: `1px solid ${colors.success}44` },
    };
    return (
        <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...s }}>
            {children}
        </button>
    );
}

function Input({ label, name, value, onChange, type = 'text', required, placeholder, as }) {
    const inputStyle = {
        width: '100%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`,
        borderRadius: '10px', padding: '10px 14px', color: colors.text, fontSize: '13px',
        outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
    };
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', color: colors.textMuted, fontSize: '12px', marginBottom: '6px', fontWeight: 600 }}>{label}</label>}
            {as === 'textarea'
                ? <textarea name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} rows={4} style={inputStyle} />
                : <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} style={inputStyle} />
            }
        </div>
    );
}

function Select({ label, name, value, onChange, options, required }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', color: colors.textMuted, fontSize: '12px', marginBottom: '6px', fontWeight: 600 }}>{label}</label>}
            <select name={name} value={value} onChange={onChange} required={required} style={{
                width: '100%', background: '#1a1a2e', border: `1px solid ${colors.border}`,
                borderRadius: '10px', padding: '10px 14px', color: colors.text, fontSize: '13px',
                outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
            }}>
                <option value="">انتخاب کنید...</option>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </div>
    );
}

function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '20px' }}>
            <div style={{ ...glassCard, maxWidth: '520px', width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: colors.text, fontSize: '16px' }}>{title}</h3>
                    <Btn variant="ghost" size="sm" onClick={onClose}>✕</Btn>
                </div>
                {children}
            </div>
        </div>
    );
}

function Alert({ msg, type = 'error', onClose }) {
    if (!msg) return null;
    const c = type === 'error' ? colors.danger : colors.success;
    const bg = type === 'error' ? colors.dangerLight : colors.successLight;
    return (
        <div style={{ background: bg, border: `1px solid ${c}44`, borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: c, fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{msg}</span>
            {onClose && <span onClick={onClose} style={{ cursor: 'pointer', opacity: 0.6, marginRight: '8px' }}>✕</span>}
        </div>
    );
}

function Table({ columns, data, onEdit, onDelete, loading }) {
    if (loading) return <Spinner />;
    if (!data.length) return <p style={{ color: colors.textMuted, textAlign: 'center', padding: '40px 0' }}>موردی یافت نشد</p>;
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    {columns.map(c => <th key={c.key} style={{ textAlign: 'right', padding: '10px 12px', color: colors.textMuted, fontWeight: 600, whiteSpace: 'nowrap' }}>{c.label}</th>)}
                    <th style={{ textAlign: 'right', padding: '10px 12px', color: colors.textMuted }}>عملیات</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, i) => (
                    <tr key={row.id ?? i} style={{ borderBottom: `1px solid ${colors.border}`, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = colors.surfaceHover}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        {columns.map(c => (
                            <td key={c.key} style={{ padding: '12px', color: colors.text, verticalAlign: 'middle' }}>
                                {c.render ? c.render(row[c.key], row) : (row[c.key] ?? '—')}
                            </td>
                        ))}
                        <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {onEdit && <Btn size="sm" variant="ghost" onClick={() => onEdit(row)}>✏️ ویرایش</Btn>}
                                {onDelete && <Btn size="sm" variant="danger" onClick={() => onDelete(row)}>🗑️</Btn>}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── CRUD Hook ───────────────────────────────────────────────
function useCrud(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetch = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await apiService.get(endpoint);
            const items = res.data?.data ?? res.data ?? [];
            setData(Array.isArray(items) ? items : []);
        } catch (e) {
            setError(e.message ?? 'خطا در بارگذاری');
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => { fetch(); }, [fetch]);

    const create = async (payload) => {
        try {
            const res = await apiService.post(endpoint, payload);
            setData(prev => [res.data?.data ?? res.data, ...prev]);
            setSuccess('با موفقیت ایجاد شد');
            setTimeout(() => setSuccess(''), 3000);
            return true;
        } catch (e) { setError(e.message ?? 'خطا در ایجاد'); return false; }
    };

    const update = async (id, payload) => {
        try {
            const res = await apiService.put(`${endpoint}/${id}`, payload);
            const updated = res.data?.data ?? res.data;
            setData(prev => prev.map(i => (i.id === id ? updated : i)));
            setSuccess('با موفقیت ویرایش شد');
            setTimeout(() => setSuccess(''), 3000);
            return true;
        } catch (e) { setError(e.message ?? 'خطا در ویرایش'); return false; }
    };

    const remove = async (id) => {
        try {
            await apiService.delete(`${endpoint}/${id}`);
            setData(prev => prev.filter(i => i.id !== id));
            setSuccess('با موفقیت حذف شد');
            setTimeout(() => setSuccess(''), 3000);
        } catch (e) { setError(e.message ?? 'خطا در حذف'); }
    };

    return { data, loading, error, success, setError, setSuccess, fetch, create, update, remove };
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        Promise.all([
            apiService.get('/tracks').catch(() => ({ data: { total: 0 } })),
            apiService.get('/artists').catch(() => ({ data: [] })),
            apiService.get('/albums').catch(() => ({ data: [] })),
            apiService.get('/genres').catch(() => ({ data: [] })),
        ]).then(([t, ar, al, g]) => {
            setStats({
                tracks: t.data?.total ?? t.data?.data?.length ?? (Array.isArray(t.data) ? t.data.length : 0),
                artists: Array.isArray(ar.data?.data) ? ar.data.data.filter(a => a.type === 'artist').length : (Array.isArray(ar.data) ? ar.data.filter(a => a.type === 'artist').length : 0),
                albums: ar.data?.total ?? al.data?.data?.length ?? (Array.isArray(al.data) ? al.data.length : 0),
                genres: Array.isArray(g.data?.data) ? g.data.data.length : (Array.isArray(g.data) ? g.data.length : 0),
            });
        });
    }, []);

    const cards = [
        { label: 'آهنگ‌ها', value: stats?.tracks ?? '…', icon: '🎵', color: '#a855f7' },
        { label: 'هنرمندان', value: stats?.artists ?? '…', icon: '🎤', color: '#3b82f6' },
        { label: 'آلبوم‌ها', value: stats?.albums ?? '…', icon: '💿', color: '#f59e0b' },
        { label: 'ژانرها', value: stats?.genres ?? '…', icon: '🎼', color: '#22c55e' },
    ];

    return (
        <div>

            <h2 style={{ color: colors.text, marginBottom: '24px', fontSize: '20px' }}>داشبورد</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px', marginBottom: '32px' }}>
                {cards.map(c => (
                    <div key={c.label} style={{ ...glassCard, textAlign: 'center' }}>
                        <div style={{ fontSize: '36px', marginBottom: '8px' }}>{c.icon}</div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: c.color }}>{c.value}</div>
                        <div style={{ color: colors.textMuted, fontSize: '13px', marginTop: '4px' }}>{c.label}</div>
                    </div>
                ))}
            </div>
            <div style={{ ...glassCard }}>
                <h3 style={{ color: colors.text, marginBottom: '12px', fontSize: '15px' }}>راهنمای سریع</h3>
                <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 2 }}>
                    از منوی سمت راست بخش مورد نظر را انتخاب کنید.<br />
                    برای اضافه کردن محتوا روی دکمه «+ جدید» کلیک کنید.<br />
                    تمام تغییرات بلافاصله در API اعمال می‌شوند.
                </p>
            </div>
        </div>
    );
}

// ─── Tracks Page ─────────────────────────────────────────────
function TracksPage() {
    const { data, loading, error, success, setError, create, update, remove } = useCrud('/tracks');
    const { data: artists } = useCrud('/artists');
    const { data: albums } = useCrud('/albums');
    const { data: genres } = useCrud('/genres');

    const empty = { title: '', artist_id: '', album_id: '', type: 'original', lyrics: '', genre_ids: [] };
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [delConfirm, setDelConfirm] = useState(null);

    const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
    const openEdit = (row) => { setEditing(row); setForm({ title: row.title, artist_id: row.artist_id ?? row.artist?.id ?? '', album_id: row.album_id ?? row.album?.id ?? '', type: row.type, lyrics: row.lyrics ?? '', genre_ids: row.genres?.map(g => g.id) ?? [] }); setModal(true); };
    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = editing ? await update(editing.id, form) : await create(form);
        if (ok) setModal(false);
    };

    const artistOpts = (Array.isArray(artists) ? artists : []).map(a => ({ value: a.id, label: a.name }));
    const albumOpts = (Array.isArray(albums) ? albums : []).map(a => ({ value: a.id, label: a.name }));

    const columns = [
        { key: 'title', label: 'عنوان' },
        { key: 'artist', label: 'هنرمند', render: (v, row) => row.artist?.name ?? '—' },
        { key: 'album', label: 'آلبوم', render: (v, row) => row.album?.name ?? '—' },
        { key: 'type', label: 'نوع', render: v => <Badge color={v === 'remix' ? '#f59e0b' : colors.accent}>{v === 'remix' ? 'ریمیکس' : 'اصلی'}</Badge> },
        { key: 'play_count', label: 'پخش' },
    ];

    console.log('renssder')
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: colors.text, margin: 0 }}>آهنگ‌ها</h2>
                <Btn onClick={openCreate}>+ آهنگ جدید</Btn>
            </div>
            <Alert msg={error} type="error" onClose={() => setError('')} />
            <Alert msg={success} type="success" />
            <div style={glassCard}>
                <Table columns={columns} data={Array.isArray(data) ? data : []} loading={loading} onEdit={openEdit} onDelete={r => setDelConfirm(r)} />
            </div>

            <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'ویرایش آهنگ' : 'آهنگ جدید'}>
                <form onSubmit={handleSubmit}>
                    <Input label="عنوان *" name="title" value={form.title} onChange={handleChange} required />
                    <Select label="هنرمند *" name="artist_id" value={form.artist_id} onChange={handleChange} options={artistOpts} required />
                    <Select label="آلبوم" name="album_id" value={form.album_id} onChange={handleChange} options={albumOpts} />
                    <Select label="نوع" name="type" value={form.type} onChange={handleChange} options={[{ value: 'original', label: 'اصلی' }, { value: 'remix', label: 'ریمیکس' }]} />
                    <Input label="متن آهنگ" name="lyrics" value={form.lyrics} onChange={handleChange} as="textarea" />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                        <Btn variant="ghost" onClick={() => setModal(false)}>انصراف</Btn>
                        <Btn type="submit" variant="primary">{editing ? 'ذخیره' : 'ایجاد'}</Btn>
                    </div>
                </form>
            </Modal>

            <Modal open={!!delConfirm} onClose={() => setDelConfirm(null)} title="حذف آهنگ">
                <p style={{ color: colors.textMuted, marginBottom: '20px' }}>آهنگ «{delConfirm?.title}» حذف شود؟</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <Btn variant="ghost" onClick={() => setDelConfirm(null)}>انصراف</Btn>
                    <Btn variant="danger" onClick={() => { remove(delConfirm.id); setDelConfirm(null); }}>حذف</Btn>
                </div>
            </Modal>
        </div>
    );
}

// ─── Artists Page ─────────────────────────────────────────────
function ArtistsPage({ type = 'artist' }) {
    const endpoint = type === 'remixer' ? '/remixers' : '/artists';
    const { data, loading, error, success, setError, create, update, remove } = useCrud(endpoint);
    const empty = { name: '', bio: '', instagram: '', youtube: '', spotify: '', type };
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [delConfirm, setDelConfirm] = useState(null);

    const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
    const openEdit = (row) => { setEditing(row); setForm({ name: row.name, bio: row.bio ?? '', instagram: row.instagram ?? '', youtube: row.youtube ?? '', spotify: row.spotify ?? '', type: row.type }); setModal(true); };
    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = editing ? await update(editing.id, form) : await create(form);
        if (ok) setModal(false);
    };

    const columns = [
        { key: 'name', label: 'نام' },
        { key: 'followers_count', label: 'دنبال‌کنندگان' },
        { key: 'instagram', label: 'اینستاگرام', render: v => v ? <a href={`https://instagram.com/${v}`} target="_blank" rel="noreferrer" style={{ color: colors.accent }}>@{v}</a> : '—' },
        { key: 'type', label: 'نوع', render: v => <Badge color={v === 'remixer' ? '#f59e0b' : colors.accent}>{v === 'remixer' ? 'ریمیکسر' : 'هنرمند'}</Badge> },
    ];

    const title = type === 'remixer' ? 'ریمیکسرها' : 'هنرمندان';

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: colors.text, margin: 0 }}>{title}</h2>
                <Btn onClick={openCreate}>+ جدید</Btn>
            </div>
            <Alert msg={error} type="error" onClose={() => setError('')} />
            <Alert msg={success} type="success" />
            <div style={glassCard}>
                <Table columns={columns} data={Array.isArray(data) ? data : []} loading={loading} onEdit={openEdit} onDelete={r => setDelConfirm(r)} />
            </div>

            <Modal open={modal} onClose={() => setModal(false)} title={editing ? `ویرایش ${title}` : `${title[0]} جدید`}>
                <form onSubmit={handleSubmit}>
                    <Input label="نام *" name="name" value={form.name} onChange={handleChange} required />
                    <Input label="بیوگرافی" name="bio" value={form.bio} onChange={handleChange} as="textarea" />
                    <Input label="اینستاگرام" name="instagram" value={form.instagram} onChange={handleChange} placeholder="username" />
                    <Input label="یوتیوب" name="youtube" value={form.youtube} onChange={handleChange} placeholder="channel url" />
                    <Input label="اسپاتیفای" name="spotify" value={form.spotify} onChange={handleChange} placeholder="profile url" />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                        <Btn variant="ghost" onClick={() => setModal(false)}>انصراف</Btn>
                        <Btn type="submit">{editing ? 'ذخیره' : 'ایجاد'}</Btn>
                    </div>
                </form>
            </Modal>

            <Modal open={!!delConfirm} onClose={() => setDelConfirm(null)} title="حذف">
                <p style={{ color: colors.textMuted, marginBottom: '20px' }}>«{delConfirm?.name}» حذف شود؟</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <Btn variant="ghost" onClick={() => setDelConfirm(null)}>انصراف</Btn>
                    <Btn variant="danger" onClick={() => { remove(delConfirm.id); setDelConfirm(null); }}>حذف</Btn>
                </div>
            </Modal>
        </div>
    );
}

// ─── Albums Page ─────────────────────────────────────────────
function AlbumsPage() {
    const { data, loading, error, success, setError, create, update, remove } = useCrud('/albums');
    const { data: artists } = useCrud('/artists');
    const empty = { name: '', artist_id: '', release_date: '' };
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [delConfirm, setDelConfirm] = useState(null);

    const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
    const openEdit = (row) => { setEditing(row); setForm({ name: row.name, artist_id: row.artist_id ?? row.artist?.id ?? '', release_date: row.release_date ?? '' }); setModal(true); };
    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = editing ? await update(editing.id, form) : await create(form);
        if (ok) setModal(false);
    };

    const artistOpts = (Array.isArray(artists) ? artists : []).filter(a => a.type === 'artist').map(a => ({ value: a.id, label: a.name }));

    const columns = [
        { key: 'name', label: 'نام آلبوم' },
        { key: 'artist', label: 'هنرمند', render: (v, row) => row.artist?.name ?? '—' },
        { key: 'release_date', label: 'تاریخ انتشار' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: colors.text, margin: 0 }}>آلبوم‌ها</h2>
                <Btn onClick={openCreate}>+ آلبوم جدید</Btn>
            </div>
            <Alert msg={error} type="error" onClose={() => setError('')} />
            <Alert msg={success} type="success" />
            <div style={glassCard}>
                <Table columns={columns} data={Array.isArray(data) ? data : []} loading={loading} onEdit={openEdit} onDelete={r => setDelConfirm(r)} />
            </div>

            <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'ویرایش آلبوم' : 'آلبوم جدید'}>
                <form onSubmit={handleSubmit}>
                    <Input label="نام *" name="name" value={form.name} onChange={handleChange} required />
                    <Select label="هنرمند *" name="artist_id" value={form.artist_id} onChange={handleChange} options={artistOpts} required />
                    <Input label="تاریخ انتشار" name="release_date" type="date" value={form.release_date} onChange={handleChange} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                        <Btn variant="ghost" onClick={() => setModal(false)}>انصراف</Btn>
                        <Btn type="submit">{editing ? 'ذخیره' : 'ایجاد'}</Btn>
                    </div>
                </form>
            </Modal>

            <Modal open={!!delConfirm} onClose={() => setDelConfirm(null)} title="حذف آلبوم">
                <p style={{ color: colors.textMuted, marginBottom: '20px' }}>آلبوم «{delConfirm?.name}» حذف شود؟</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <Btn variant="ghost" onClick={() => setDelConfirm(null)}>انصراف</Btn>
                    <Btn variant="danger" onClick={() => { remove(delConfirm.id); setDelConfirm(null); }}>حذف</Btn>
                </div>
            </Modal>
        </div>
    );
}

// ─── Genres Page ─────────────────────────────────────────────
function GenresPage() {
    const { data, loading, error, success, setError, create, update, remove } = useCrud('/genres');
    const empty = { name: '' };
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [delConfirm, setDelConfirm] = useState(null);

    const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
    const openEdit = (row) => { setEditing(row); setForm({ name: row.name }); setModal(true); };
    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = async (e) => { e.preventDefault(); const ok = editing ? await update(editing.id, form) : await create(form); if (ok) setModal(false); };

    const columns = [
        { key: 'name', label: 'نام ژانر' },
        { key: 'slug', label: 'اسلاگ' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: colors.text, margin: 0 }}>ژانرها</h2>
                <Btn onClick={openCreate}>+ ژانر جدید</Btn>
            </div>
            <Alert msg={error} type="error" onClose={() => setError('')} />
            <Alert msg={success} type="success" />
            <div style={glassCard}>
                <Table columns={columns} data={Array.isArray(data) ? data : []} loading={loading} onEdit={openEdit} onDelete={r => setDelConfirm(r)} />
            </div>
            <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'ویرایش ژانر' : 'ژانر جدید'}>
                <form onSubmit={handleSubmit}>
                    <Input label="نام *" name="name" value={form.name} onChange={handleChange} required />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                        <Btn variant="ghost" onClick={() => setModal(false)}>انصراف</Btn>
                        <Btn type="submit">{editing ? 'ذخیره' : 'ایجاد'}</Btn>
                    </div>
                </form>
            </Modal>
            <Modal open={!!delConfirm} onClose={() => setDelConfirm(null)} title="حذف ژانر">
                <p style={{ color: colors.textMuted, marginBottom: '20px' }}>ژانر «{delConfirm?.name}» حذف شود؟</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <Btn variant="ghost" onClick={() => setDelConfirm(null)}>انصراف</Btn>
                    <Btn variant="danger" onClick={() => { remove(delConfirm.id); setDelConfirm(null); }}>حذف</Btn>
                </div>
            </Modal>
        </div>
    );
}

// ─── Playlists Page ───────────────────────────────────────────
function PlaylistsPage() {
    const { data, loading, error, success, setError, create, update, remove } =
        useCrud('/playlists');

    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', is_public: false });

    const [delConfirm, setDelConfirm] = useState(null);

    // 🎧 tracks manager
    const [trackModal, setTrackModal] = useState(null);
    const [allTracks, setAllTracks] = useState([]);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [loadingTracks, setLoadingTracks] = useState(false);

    // ======================
    // CRUD playlist
    // ======================
    const openCreate = () => {
        setEditing(null);
        setForm({ title: '', is_public: false });
        setModal(true);
    };

    const openEdit = (row) => {
        setEditing(row);
        setForm({
            title: row.title ?? '',
            is_public: row.is_public ?? false,
        });
        setModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(p => ({
            ...p,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submitPlaylist = async (e) => {
        e.preventDefault();
        const payload = { ...form };

        const ok = editing
            ? await update(editing.id, payload)
            : await create(payload);

        if (ok) setModal(false);
    };

    // ======================
    // 🎧 TRACK MANAGER
    // ======================
    const openTrackManager = async (playlist) => {
        setTrackModal(playlist);
        setLoadingTracks(true);

        try {
            const [tracksRes, playlistRes] = await Promise.all([
                apiService.get('/tracks'),
                apiService.get(`/playlists/${playlist.id}`)
            ]);

            const tracks = tracksRes.data?.data ?? tracksRes.data ?? [];
            setAllTracks(tracks);

            const playlist = playlistRes.data?.data ?? playlistRes.data;

            const current = playlist?.tracks ?? [];

            setSelectedTracks(current.map(t => t.id));

        } finally {
            setLoadingTracks(false);
        }
    };

    const toggleTrack = (id) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const saveTracks = async () => {
        try {
            await apiService.post(
                `/playlists/${trackModal.id}/tracks`,
                { track_ids: selected }
            );

            setTrackModal(null);
        } catch (e) {
            console.error(e);
        }
    };

    // filtered tracks (SEARCH)
    const filteredTracks = allTracks.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { key: 'title', label: 'عنوان' },
        {
            key: 'user',
            label: 'کاربر',
            render: (v, r) => r.user?.name ?? '—'
        },
        {
            key: 'is_public',
            label: 'عمومی',
            render: v => (
                <Badge color={v ? colors.success : colors.textMuted}>
                    {v ? 'بله' : 'خیر'}
                </Badge>
            )
        }
    ];

    return (
        <div>

            {/* HEADER */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 20
            }}>
                <h2 style={{ color: colors.text }}>پلی‌لیست‌ها</h2>

                <Btn onClick={openCreate}>
                    + جدید
                </Btn>
            </div>

            <Alert msg={error} type="error" onClose={() => setError('')} />
            <Alert msg={success} type="success" />

            {/* TABLE */}
            <div style={glassCard}>
                <Table
                    columns={columns}
                    data={Array.isArray(data) ? data : []}
                    loading={loading}
                    onEdit={openEdit}
                    onDelete={setDelConfirm}
                />
            </div>

            {/* CREATE/EDIT */}
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                title={editing ? "ویرایش" : "ساخت پلی‌لیست"}
            >
                <form onSubmit={submitPlaylist}>

                    <Input
                        label="عنوان"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label style={{ color: colors.textMuted }}>
                        <input
                            type="checkbox"
                            name="is_public"
                            checked={form.is_public}
                            onChange={handleChange}
                        />
                        عمومی
                    </label>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Btn type="submit">
                            ذخیره
                        </Btn>
                    </div>

                </form>
            </Modal>

            {/* DELETE */}
            <Modal
                open={!!delConfirm}
                onClose={() => setDelConfirm(null)}
                title="حذف"
            >
                <p style={{ color: colors.textMuted }}>
                    حذف «{delConfirm?.title}»؟
                </p>

                <Btn
                    variant="danger"
                    onClick={() => {
                        remove(delConfirm.id);
                        setDelConfirm(null);
                    }}
                >
                    حذف
                </Btn>
            </Modal>

            {/* 🎧 TRACK MANAGER PRO */}
            <Modal
                open={!!trackModal}
                onClose={() => setTrackModal(null)}
                title={`آهنگ‌ها - ${trackModal?.title}`}
            >

                <Input
                    label="جستجوی آهنگ"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loadingTracks ? (
                    <Spinner />
                ) : (
                    <div style={{
                        maxHeight: 350,
                        overflowY: 'auto'
                    }}>
                        {filteredTracks.map(t => (
                            <div
                                key={t.id}
                                onClick={() => toggleTrack(t.id)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: 10,
                                    marginBottom: 6,
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    background: selected.includes(t.id)
                                        ? colors.accentLight
                                        : 'transparent',
                                    border: `1px solid ${colors.border}`
                                }}
                            >
                                <span style={{ color: colors.text }}>
                                    {t.title}
                                </span>

                                <input
                                    type="checkbox"
                                    checked={selected.includes(t.id)}
                                    readOnly
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginTop: 12
                }}>
                    <Btn variant="ghost" onClick={() => setTrackModal(null)}>
                        بستن
                    </Btn>

                    <Btn onClick={saveTracks}>
                        ذخیره آهنگ‌ها
                    </Btn>
                </div>

            </Modal>

        </div>
    );
}

// ─── Users Page ───────────────────────────────────────────────
function UsersPage() {
    const {
        data,
        loading,
        error,
        success,
        setError,
        update,
        remove
    } = useCrud('/users');

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', email: '' });
    const [modal, setModal] = useState(false);
    const [delConfirm, setDelConfirm] = useState(null);

    // ─── OPEN EDIT ─────────────────────────
    const openEdit = (user) => {
        setEditing(user);
        setForm({
            name: user.name || '',
            email: user.email || '',
        });
        setModal(true);
    };

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await update(editing.id, form);
        if (ok) setModal(false);
    };

    const columns = [
        { key: 'name', label: 'نام' },
        { key: 'email', label: 'ایمیل' },
        {
            key: 'created_at',
            label: 'عضویت',
            render: v =>
                v ? new Date(v).toLocaleDateString('fa-IR') : '—'
        }
    ];

    return (
        <div>
            <h2 style={{ color: colors.text, marginBottom: '20px' }}>
                کاربران
            </h2>

            <Alert msg={error} type="error" onClose={() => setError('')} />
            <Alert msg={success} type="success" />

            <div style={glassCard}>
                <Table
                    columns={columns}
                    data={Array.isArray(data) ? data : []}
                    loading={loading}
                    onEdit={openEdit}
                    onDelete={setDelConfirm}
                />
            </div>

            {/* ─── EDIT MODAL ───────────────────── */}
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                title="ویرایش کاربر"
            >
                <form onSubmit={handleSubmit}>
                    <Input
                        label="نام"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="ایمیل"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 10,
                        marginTop: 10
                    }}>
                        <Btn
                            variant="ghost"
                            onClick={() => setModal(false)}
                            type="button"
                        >
                            انصراف
                        </Btn>

                        <Btn type="submit">
                            ذخیره
                        </Btn>
                    </div>
                </form>
            </Modal>

            {/* ─── DELETE CONFIRM ───────────────── */}
            <Modal
                open={!!delConfirm}
                onClose={() => setDelConfirm(null)}
                title="حذف کاربر"
            >
                <p style={{ color: colors.textMuted }}>
                    آیا کاربر «{delConfirm?.name}» حذف شود؟
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginTop: 15
                }}>
                    <Btn
                        variant="ghost"
                        onClick={() => setDelConfirm(null)}
                    >
                        انصراف
                    </Btn>

                    <Btn
                        variant="danger"
                        onClick={() => {
                            remove(delConfirm.id);
                            setDelConfirm(null);
                        }}
                    >
                        حذف
                    </Btn>
                </div>
            </Modal>
        </div>
    );
}
// ─── Upload Page ──────────────────────────────────────────────
function UploadPage() {
    const [file, setFile] = useState(null);
    const [type, setType] = useState('track');
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError('');
        setResult(null);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('type', type);
            const res = await apiService.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setResult(res.data);
        } catch (e) {
            setError(e.message ?? 'خطا در آپلود');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2 style={{ color: colors.text, marginBottom: '20px' }}>آپلود فایل</h2>
            <div style={glassCard}>
                <Alert msg={error} type="error" onClose={() => setError('')} />
                <Select label="نوع فایل" name="type" value={type} onChange={e => setType(e.target.value)} options={[
                    { value: 'track', label: 'تصویر آهنگ' },
                    { value: 'audio', label: 'فایل صوتی (MP3)' },
                    { value: 'artist', label: 'تصویر هنرمند' },
                    { value: 'album', label: 'تصویر آلبوم' },
                    { value: 'user', label: 'آواتار کاربر' },
                    { value: 'playlist', label: 'تصویر پلی‌لیست' },
                ]} />
                <div style={{ border: `2px dashed ${colors.border}`, borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '16px', cursor: 'pointer' }}
                     onClick={() => document.getElementById('adminFileInput').click()}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
                    <p style={{ color: colors.textMuted, margin: 0, fontSize: '13px' }}>
                        {file ? file.name : 'کلیک کنید یا فایل را اینجا بکشید'}
                    </p>
                    <input id="adminFileInput" type="file" hidden onChange={e => setFile(e.target.files[0])}
                           accept={type === 'audio' ? 'audio/*' : 'image/*'} />
                </div>
                <Btn onClick={handleUpload} disabled={!file || uploading}>
                    {uploading ? 'در حال آپلود...' : '⬆️ آپلود'}
                </Btn>
                {result && (
                    <div style={{ marginTop: '20px', background: colors.successLight, border: `1px solid ${colors.success}44`, borderRadius: '10px', padding: '16px' }}>
                        <p style={{ color: colors.success, margin: '0 0 8px', fontSize: '13px', fontWeight: 600 }}>✅ آپلود موفق</p>
                        <p style={{ color: colors.textMuted, margin: 0, fontSize: '12px', wordBreak: 'break-all' }}>آدرس: {result.url}</p>
                        <p style={{ color: colors.textMuted, margin: '4px 0 0', fontSize: '12px' }}>مسیر: {result.path}</p>
                        {type !== 'audio' && result.url && (
                            <img src={result.url} alt="preview" style={{ marginTop: '12px', maxWidth: '200px', borderRadius: '8px' }} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────
const navItems = [
    { path: '/admin', label: 'داشبورد', icon: '📊', exact: true },
    { path: '/admin/tracks', label: 'آهنگ‌ها', icon: '🎵' },
    { path: '/admin/artists', label: 'هنرمندان', icon: '🎤' },
    { path: '/admin/remixers', label: 'ریمیکسرها', icon: '🎧' },
    { path: '/admin/albums', label: 'آلبوم‌ها', icon: '💿' },
    { path: '/admin/genres', label: 'ژانرها', icon: '🎼' },
    { path: '/admin/playlists', label: 'پلی‌لیست‌ها', icon: '📋' },
    { path: '/admin/users', label: 'کاربران', icon: '👥' },
    { path: '/admin/upload', label: 'آپلود', icon: '⬆️' },
];

function Sidebar({ onLogout }) {
    return (
        <div style={{ width: '220px', minHeight: '100vh', ...glass, borderRadius: 0, borderLeft: 'none', borderTop: 'none', borderBottom: 'none', display: 'flex', flexDirection: 'column', padding: '0' }}>
            {/* Logo */}
            <div style={{ padding: '24px 20px 16px', borderBottom: `1px solid ${colors.border}` }}>
                <div style={{ fontSize: '20px', fontWeight: 800, background: `linear-gradient(135deg, #fff, ${colors.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    🎵 Musix
                </div>
                <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '4px' }}>پنل مدیریت</div>
            </div>
            {/* Nav */}
            <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
                {navItems.map(item => (
                    <NavLink key={item.path} to={item.path} end={item.exact}
                             style={({ isActive }) => ({
                                 display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                                 borderRadius: '10px', marginBottom: '4px', textDecoration: 'none',
                                 fontSize: '13px', fontWeight: 500, transition: 'all 0.2s',
                                 background: isActive ? colors.accentLight : 'transparent',
                                 color: isActive ? colors.accent : colors.textMuted,
                                 border: isActive ? `1px solid ${colors.accentBorder}` : '1px solid transparent',
                             })}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            {/* Logout */}
            <div style={{ padding: '16px 10px', borderTop: `1px solid ${colors.border}` }}>
                <button onClick={onLogout} style={{ width: '100%', background: colors.dangerLight, border: `1px solid ${colors.danger}33`, borderRadius: '10px', padding: '10px', color: colors.danger, cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600 }}>
                    🚪 خروج از حساب
                </button>
            </div>
        </div>
    );
}

// ─── Access Denied ────────────────────────────────────────────
function AccessDenied() {
    const navigate = useNavigate();
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '64px' }}>🔒</div>
            <h2 style={{ color: colors.text, margin: 0 }}>دسترسی محدود</h2>
            <p style={{ color: colors.textMuted, fontSize: '14px' }}>این بخش فقط برای ادمین‌ها قابل دسترسی است</p>
            <Btn onClick={() => navigate('/')}>بازگشت به خانه</Btn>
        </div>
    );
}

// ─── Main AdminPanel ──────────────────────────────────────────
export default function AdminPanel() {
    const { user, isAuthenticated } = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isAdmin = isAuthenticated && user?.roles?.some(r => r.name === 'admin' || r === 'admin');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };


    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login');
    //     }
    // }, [user, navigate]);
    if (!isAdmin) return <AccessDenied />;

    return (
        <>
            <style>{`
                @keyframes adminSpin { to { transform: rotate(360deg); } }
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.3); border-radius: 3px; }
            `}</style>
            <div dir="rtl" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Vazirmatn, Tahoma, sans-serif', color: colors.text, position: 'fixed', inset: 0, zIndex: 500, background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0535 50%, #0a0f1e 100%)' }}>
                {/* Sidebar */}
                <Sidebar onLogout={handleLogout} />

                {/* Main Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                    {/* Top bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                        <div />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ ...glass, padding: '8px 16px', borderRadius: '10px', fontSize: '13px', color: colors.textMuted }}>
                                👤 {user?.name}
                            </div>
                            <Badge color={colors.success}>ادمین</Badge>
                        </div>
                    </div>

                    {/* Routes */}
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="tracks" element={<TracksPage />} />
                        <Route path="artists" element={<ArtistsPage type="artist" />} />
                        <Route path="remixers" element={<ArtistsPage type="remixer" />} />
                        <Route path="albums" element={<AlbumsPage />} />
                        <Route path="genres" element={<GenresPage />} />
                        <Route path="playlists" element={<PlaylistsPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="upload" element={<UploadPage />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}