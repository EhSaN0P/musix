import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import { fakeSongs, fakeArtists, searchAll } from '../../../data/fakeDb.js';
import './PartyVibe.css';
import {
  Users, Plus, Lock, Globe, Mic2, MicOff, Music, Send,
  Trash2, Crown, Search, Radio, X, Play, UserCheck, LogOut
} from 'lucide-react';

// ============================================================
// LOCAL STORAGE HELPERS
// ============================================================
const LS_ROOMS_KEY = 'musix_party_rooms';
const LS_USER_KEY  = 'musix_party_user';

function loadRooms() {
  try { return JSON.parse(localStorage.getItem(LS_ROOMS_KEY)) || []; }
  catch { return []; }
}
function saveRooms(rooms) {
  localStorage.setItem(LS_ROOMS_KEY, JSON.stringify(rooms));
}
function loadUser() {
  try { return JSON.parse(localStorage.getItem(LS_USER_KEY)) || null; }
  catch { return null; }
}
function saveUser(u) {
  localStorage.setItem(LS_USER_KEY, JSON.stringify(u));
}

// ============================================================
// FAKE PUSHER — simulates real-time with localStorage + polling
// ============================================================
const MSG_KEY = (roomId) => `musix_party_msgs_${roomId}`;
function pushMsg(roomId, msg) {
  const msgs = getMessages(roomId);
  msgs.push({ ...msg, id: Date.now() + Math.random(), ts: Date.now() });
  localStorage.setItem(MSG_KEY(roomId), JSON.stringify(msgs.slice(-100)));
}
function getMessages(roomId) {
  try { return JSON.parse(localStorage.getItem(MSG_KEY(roomId))) || []; }
  catch { return []; }
}

// ============================================================
// SEED some fake rooms if empty
// ============================================================
function seedRooms() {
  const rooms = loadRooms();
  if (rooms.length > 0) return;
  const seeded = [
    {
      id: 'room_seed_1',
      name: '🎉 Party Night Tehran',
      isPublic: true,
      hostId: 'host_seed',
      hostName: 'DJ Neon',
      currentSong: fakeSongs[3],
      queue: [fakeSongs[0], fakeSongs[5], fakeSongs[10]],
      members: [
        { id: 'host_seed', name: 'DJ Neon', role: 'host', avatar: '🎧' },
        { id: 'u2', name: 'Sara', role: 'listener', avatar: '🌸' },
        { id: 'u3', name: 'Arman', role: 'mini-host', avatar: '🎵' },
      ],
      createdAt: Date.now() - 3600000,
    },
    {
      id: 'room_seed_2',
      name: '🌙 Chill Vibes Only',
      isPublic: true,
      hostId: 'host_seed_2',
      hostName: 'NightOwl',
      currentSong: fakeSongs[2],
      queue: [fakeSongs[7], fakeSongs[1]],
      members: [
        { id: 'host_seed_2', name: 'NightOwl', role: 'host', avatar: '🦉' },
        { id: 'u4', name: 'Mina', role: 'listener', avatar: '💜' },
      ],
      createdAt: Date.now() - 7200000,
    },
  ];
  saveRooms(seeded);
  seeded.forEach(r => {
    pushMsg(r.id, { senderId: r.hostId, senderName: r.hostName, text: '🎉 روم شروع شد!', type: 'system' });
  });
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PartyVibe() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(s => s.theme.currentTheme);
  const lang = useSelector(s => s.languages.currentLang);

  const [user, setUser] = useState(loadUser());
  const [userName, setUserName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSongSearch, setShowSongSearch] = useState(false);
  const [songSearchQ, setSongSearchQ] = useState('');
  const [songResults, setSongResults] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', isPublic: true, password: '' });
  const [view, setView] = useState('lobby'); // 'lobby' | 'room'
  const chatEndRef = useRef(null);
  const pollRef = useRef(null);

  // Init
  useEffect(() => {
    seedRooms();
    refreshRooms();
  }, []);

  // Poll for updates every 1.5s when in a room
  useEffect(() => {
    if (view === 'room' && activeRoom) {
      pollRef.current = setInterval(() => {
        refreshRooms();
        setMessages(getMessages(activeRoom.id));
        // Sync active room state
        const updated = loadRooms().find(r => r.id === activeRoom.id);
        if (updated) setActiveRoom(updated);
      }, 1500);
    }
    return () => clearInterval(pollRef.current);
  }, [view, activeRoom?.id]);

  // Scroll to bottom on new msg
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Song search
  useEffect(() => {
    if (songSearchQ.trim()) {
      const r = searchAll(songSearchQ);
      setSongResults(r.songs);
    } else {
      setSongResults(fakeSongs.slice(0, 8));
    }
  }, [songSearchQ]);

  function refreshRooms() {
    setRooms(loadRooms());
  }

  // ============ USER SETUP ============
  function handleSetUser() {
    if (!userName.trim()) return;
    const u = { id: `user_${Date.now()}`, name: userName.trim(), avatar: randomAvatar() };
    setUser(u);
    saveUser(u);
  }

  function randomAvatar() {
    const avatars = ['🎵','🎧','🌸','🎤','🦉','🌙','🔥','💎','🌈','🎸','🎹','🎺'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  // ============ ROOM MANAGEMENT ============
  function createRoom() {
    if (!newRoom.name.trim() || !user) return;
    const room = {
      id: `room_${Date.now()}`,
      name: newRoom.name.trim(),
      isPublic: newRoom.isPublic,
      password: newRoom.isPublic ? '' : newRoom.password,
      hostId: user.id,
      hostName: user.name,
      currentSong: fakeSongs[0],
      queue: fakeSongs.slice(1, 5),
      members: [{ id: user.id, name: user.name, role: 'host', avatar: user.avatar }],
      createdAt: Date.now(),
    };
    const all = loadRooms();
    all.push(room);
    saveRooms(all);
    pushMsg(room.id, { senderId: 'system', senderName: 'Musix', text: `🎉 ${user.name} روم رو ساخت!`, type: 'system' });
    setShowCreateModal(false);
    setNewRoom({ name: '', isPublic: true, password: '' });
    enterRoom(room);
  }

  function enterRoom(room) {
    if (!user) return;
    // Add user to members if not already there
    const all = loadRooms();
    const idx = all.findIndex(r => r.id === room.id);
    if (idx === -1) return;
    const alreadyIn = all[idx].members.find(m => m.id === user.id);
    if (!alreadyIn) {
      all[idx].members.push({ id: user.id, name: user.name, role: 'listener', avatar: user.avatar });
      saveRooms(all);
      pushMsg(room.id, { senderId: 'system', senderName: 'Musix', text: `👋 ${user.name} وارد روم شد`, type: 'system' });
    }
    const updated = all[idx];
    setActiveRoom(updated);
    setMessages(getMessages(updated.id));
    setView('room');
    // Play current song
    if (updated.currentSong) {
      dispatch(playSong({ song: updated.currentSong, queue: [updated.currentSong, ...updated.queue] }));
    }
  }

  function leaveRoom() {
    if (!user || !activeRoom) return;
    const all = loadRooms();
    const idx = all.findIndex(r => r.id === activeRoom.id);
    if (idx !== -1) {
      all[idx].members = all[idx].members.filter(m => m.id !== user.id);
      // if host leaves, assign new host or delete room
      if (activeRoom.hostId === user.id) {
        if (all[idx].members.length > 0) {
          all[idx].members[0].role = 'host';
          all[idx].hostId = all[idx].members[0].id;
          all[idx].hostName = all[idx].members[0].name;
          pushMsg(activeRoom.id, { senderId: 'system', senderName: 'Musix', text: `👑 ${all[idx].members[0].name} هاست جدید شد`, type: 'system' });
        } else {
          all.splice(idx, 1);
        }
      }
      saveRooms(all);
      pushMsg(activeRoom.id, { senderId: 'system', senderName: 'Musix', text: `👋 ${user.name} روم رو ترک کرد`, type: 'system' });
    }
    setView('lobby');
    setActiveRoom(null);
    refreshRooms();
  }

  function deleteRoom(roomId) {
    if (!user) return;
    const all = loadRooms().filter(r => r.id !== roomId);
    saveRooms(all);
    localStorage.removeItem(MSG_KEY(roomId));
    refreshRooms();
    if (activeRoom?.id === roomId) { setView('lobby'); setActiveRoom(null); }
  }

  // ============ PROMOTE TO MINI-HOST ============
  function promoteMember(memberId) {
    if (!activeRoom || activeRoom.hostId !== user?.id) return;
    const all = loadRooms();
    const idx = all.findIndex(r => r.id === activeRoom.id);
    if (idx === -1) return;
    all[idx].members = all[idx].members.map(m => ({
      ...m,
      role: m.id === memberId ? (m.role === 'mini-host' ? 'listener' : 'mini-host') : m.role
    }));
    saveRooms(all);
    const member = all[idx].members.find(m => m.id === memberId);
    pushMsg(activeRoom.id, { senderId: 'system', senderName: 'Musix', text: `⭐ ${member.name} به مینی هاست تبدیل شد`, type: 'system' });
    setActiveRoom(all[idx]);
  }

  // ============ SONG MANAGEMENT ============
  function canManageSongs() {
    if (!user || !activeRoom) return false;
    const me = activeRoom.members.find(m => m.id === user.id);
    return me && (me.role === 'host' || me.role === 'mini-host');
  }

  function changeSong(song) {
    if (!canManageSongs()) return;
    const all = loadRooms();
    const idx = all.findIndex(r => r.id === activeRoom.id);
    if (idx === -1) return;
    all[idx].currentSong = song;
    saveRooms(all);
    setActiveRoom(all[idx]);
    dispatch(playSong({ song, queue: [song, ...all[idx].queue] }));
    pushMsg(activeRoom.id, { senderId: user.id, senderName: user.name, text: `🎵 آهنگ تغییر کرد: ${song.title}`, type: 'song-change' });
    setShowSongSearch(false);
    setSongSearchQ('');
  }

  function removeSongFromQueue(songId) {
    if (!canManageSongs()) return;
    const all = loadRooms();
    const idx = all.findIndex(r => r.id === activeRoom.id);
    if (idx === -1) return;
    all[idx].queue = all[idx].queue.filter(s => s.id !== songId);
    saveRooms(all);
    setActiveRoom(all[idx]);
  }

  function addSongToQueue(song) {
    if (!canManageSongs()) return;
    const all = loadRooms();
    const idx = all.findIndex(r => r.id === activeRoom.id);
    if (idx === -1) return;
    if (!all[idx].queue.find(s => s.id === song.id)) {
      all[idx].queue.push(song);
      saveRooms(all);
      setActiveRoom(all[idx]);
      pushMsg(activeRoom.id, { senderId: user.id, senderName: user.name, text: `➕ ${user.name} آهنگ اضافه کرد: ${song.title}`, type: 'system' });
    }
  }

  // ============ CHAT ============
  function sendMessage() {
    if (!chatInput.trim() || !user || !activeRoom) return;
    pushMsg(activeRoom.id, { senderId: user.id, senderName: user.name, avatar: user.avatar, text: chatInput.trim(), type: 'chat' });
    setMessages(getMessages(activeRoom.id));
    setChatInput('');
  }

  function myRole() {
    if (!user || !activeRoom) return 'listener';
    return activeRoom.members.find(m => m.id === user.id)?.role || 'listener';
  }

  // ============ RENDER ============

  // USER SETUP GATE
  if (!user) {
    return (
      <div className="party-gate">
        <div className="gate-card glass-bg">
          <div className="gate-icon">🎉</div>
          <h2 className="gate-title">Party Vibe</h2>
          <p className="gate-sub">
            {lang === 'fa' ? 'اول یه اسم برای خودت انتخاب کن!' : 'Pick a username to join the party!'}
          </p>
          <input
            className="gate-input"
            placeholder={lang === 'fa' ? 'نام کاربری...' : 'Your username...'}
            value={userName}
            onChange={e => setUserName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSetUser()}
          />
          <button className="gate-btn" onClick={handleSetUser}>
            {lang === 'fa' ? 'ورود به پارتی 🚀' : 'Enter Party 🚀'}
          </button>
        </div>
      </div>
    );
  }

  // ROOM VIEW
  if (view === 'room' && activeRoom) {
    const role = myRole();
    return (
      <div className="party-room-view">
        {/* Room Header */}
        <div className="room-header glass-bg">
          <div className="room-header-left">
            <button className="back-btn" onClick={leaveRoom}><LogOut size={18} /></button>
            <div className="room-name-wrap">
              <span className="room-icon">{activeRoom.isPublic ? '🌐' : '🔒'}</span>
              <h2 className="room-name">{activeRoom.name}</h2>
            </div>
          </div>
          <div className="room-header-right">
            <span className="members-badge"><Users size={14} /> {activeRoom.members.length}</span>
            {role === 'host' && (
              <button className="danger-btn" onClick={() => deleteRoom(activeRoom.id)}>
                <Trash2 size={16} /> {lang === 'fa' ? 'حذف روم' : 'Delete Room'}
              </button>
            )}
          </div>
        </div>

        <div className="room-body">
          {/* Left: Now Playing + Queue */}
          <div className="room-left">
            {/* Now Playing */}
            <div className="now-playing-card glass-bg">
              <p className="now-playing-label"><Radio size={14} /> {lang === 'fa' ? 'الان داره پخش میشه' : 'Now Playing'}</p>
              <img src={activeRoom.currentSong?.cover} alt="" className="np-cover" />
              <h3 className="np-title">{activeRoom.currentSong?.title}</h3>
              <p className="np-artist">{activeRoom.currentSong?.artist}</p>
              {canManageSongs() && (
                <button className="change-song-btn" onClick={() => setShowSongSearch(true)}>
                  <Music size={16} /> {lang === 'fa' ? 'تغییر آهنگ' : 'Change Song'}
                </button>
              )}
            </div>

            {/* Queue */}
            <div className="queue-section glass-bg">
              <div className="queue-header">
                <h4><Music size={14}/> {lang === 'fa' ? 'صف پخش' : 'Queue'}</h4>
                {canManageSongs() && (
                  <button className="add-queue-btn" onClick={() => setShowSongSearch(true)}>
                    <Plus size={14} />
                  </button>
                )}
              </div>
              <div className="queue-list">
                {activeRoom.queue.length === 0 && (
                  <p className="empty-queue">{lang === 'fa' ? 'صف خالیه!' : 'Queue is empty!'}</p>
                )}
                {activeRoom.queue.map(song => (
                  <div key={song.id} className="queue-item">
                    <img src={song.cover} alt="" className="queue-cover" />
                    <div className="queue-meta">
                      <span className="queue-title">{song.title}</span>
                      <span className="queue-artist">{song.artist}</span>
                    </div>
                    {canManageSongs() && (
                      <div className="queue-actions">
                        <button className="queue-play" onClick={() => changeSong(song)}><Play size={14}/></button>
                        <button className="queue-del" onClick={() => removeSongFromQueue(song.id)}><Trash2 size={14}/></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Members */}
            <div className="members-section glass-bg">
              <h4><Users size={14}/> {lang === 'fa' ? 'اعضا' : 'Members'} ({activeRoom.members.length})</h4>
              <div className="members-list">
                {activeRoom.members.map(m => (
                  <div key={m.id} className={`member-item ${m.id === user.id ? 'me' : ''}`}>
                    <span className="member-avatar">{m.avatar || '🎵'}</span>
                    <div className="member-info">
                      <span className="member-name">{m.name} {m.id === user.id ? '(شما)' : ''}</span>
                      <span className={`member-role role-${m.role}`}>
                        {m.role === 'host' ? '👑 Host' : m.role === 'mini-host' ? '⭐ Mini Host' : '👤 Listener'}
                      </span>
                    </div>
                    {role === 'host' && m.id !== user.id && (
                      <button className="promote-btn" onClick={() => promoteMember(m.id)} title="Promote / Demote">
                        <UserCheck size={14}/>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Chat */}
          <div className="room-chat glass-bg">
            <h4 className="chat-title">💬 {lang === 'fa' ? 'چت' : 'Chat'}</h4>
            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-msg ${msg.type === 'system' || msg.type === 'song-change' ? 'system-msg' : ''} ${msg.senderId === user.id ? 'mine' : ''}`}>
                  {msg.type === 'chat' && msg.senderId !== user.id && (
                    <span className="msg-sender">{msg.avatar} {msg.senderName}</span>
                  )}
                  <div className={`msg-bubble ${msg.senderId === user.id ? 'bubble-mine' : 'bubble-other'}`}>
                    {msg.text}
                  </div>
                  <span className="msg-time">{new Date(msg.ts).toLocaleTimeString('fa', {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-row">
              <input
                className="chat-input"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={lang === 'fa' ? 'پیام بده...' : 'Say something...'}
              />
              <button className="send-btn" onClick={sendMessage}><Send size={18}/></button>
            </div>
          </div>
        </div>

        {/* Song Search Modal */}
        {showSongSearch && (
          <div className="modal-overlay" onClick={() => setShowSongSearch(false)}>
            <div className="modal-card glass-bg" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{lang === 'fa' ? 'انتخاب آهنگ' : 'Choose a Song'}</h3>
                <button className="modal-close" onClick={() => setShowSongSearch(false)}><X/></button>
              </div>
              <div className="modal-search">
                <Search size={16}/>
                <input
                  placeholder={lang === 'fa' ? 'جستجوی آهنگ...' : 'Search songs...'}
                  value={songSearchQ}
                  onChange={e => setSongSearchQ(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="modal-results">
                {songResults.map(song => (
                  <div key={song.id} className="modal-song-item">
                    <img src={song.cover} alt="" />
                    <div>
                      <span className="modal-song-title">{song.title}</span>
                      <span className="modal-song-artist">{song.artist}</span>
                    </div>
                    <div className="modal-song-actions">
                      <button className="modal-play-btn" onClick={() => changeSong(song)}><Play size={14}/> پخش</button>
                      <button className="modal-add-btn" onClick={() => addSongToQueue(song)}><Plus size={14}/> صف</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // LOBBY VIEW
  return (
    <div className="party-lobby">
      {/* Header */}
      <div className="lobby-header">
        <div>
          <h1 className="lobby-title">🎉 Party Vibe</h1>
          <p className="lobby-sub">
            {lang === 'fa'
              ? `سلام ${user.avatar} ${user.name}! بریم پارتی؟`
              : `Hey ${user.avatar} ${user.name}! Ready to party?`}
          </p>
        </div>
        <button className="create-room-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} /> {lang === 'fa' ? 'ساخت روم' : 'Create Room'}
        </button>
      </div>

      {/* Rooms grid */}
      <div className="rooms-grid">
        {rooms.length === 0 && (
          <div className="no-rooms">
            <span>😔</span>
            <p>{lang === 'fa' ? 'رومی وجود نداره! اولین روم رو بساز.' : 'No rooms yet! Create the first one.'}</p>
          </div>
        )}
        {rooms.map(room => (
          <div key={room.id} className="room-card glass-bg" onClick={() => enterRoom(room)}>
            <div className="room-card-header">
              <span className="room-card-icon">{room.isPublic ? <Globe size={16}/> : <Lock size={16}/>}</span>
              <h3 className="room-card-name">{room.name}</h3>
              {room.hostId === user.id && (
                <button className="room-delete-btn" onClick={e => { e.stopPropagation(); deleteRoom(room.id); }}>
                  <Trash2 size={14}/>
                </button>
              )}
            </div>
            <div className="room-card-song">
              <img src={room.currentSong?.cover} alt="" />
              <div>
                <span className="rcs-title">{room.currentSong?.title}</span>
                <span className="rcs-artist">{room.currentSong?.artist}</span>
              </div>
            </div>
            <div className="room-card-footer">
              <span className="host-badge"><Crown size={12}/> {room.hostName}</span>
              <span className="member-count"><Users size={12}/> {room.members.length}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-card glass-bg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'fa' ? 'ساخت روم جدید' : 'Create New Room'}</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}><X/></button>
            </div>
            <div className="create-form">
              <label>{lang === 'fa' ? 'اسم روم' : 'Room Name'}</label>
              <input
                className="form-input"
                placeholder={lang === 'fa' ? 'اسم جذاب بذار...' : 'Give it a cool name...'}
                value={newRoom.name}
                onChange={e => setNewRoom({ ...newRoom, name: e.target.value })}
              />
              <label>{lang === 'fa' ? 'نوع روم' : 'Room Type'}</label>
              <div className="room-type-toggle">
                <button
                  className={`type-btn ${newRoom.isPublic ? 'active' : ''}`}
                  onClick={() => setNewRoom({ ...newRoom, isPublic: true })}
                >
                  <Globe size={16}/> {lang === 'fa' ? 'عمومی' : 'Public'}
                </button>
                <button
                  className={`type-btn ${!newRoom.isPublic ? 'active' : ''}`}
                  onClick={() => setNewRoom({ ...newRoom, isPublic: false })}
                >
                  <Lock size={16}/> {lang === 'fa' ? 'خصوصی' : 'Private'}
                </button>
              </div>
              {!newRoom.isPublic && (
                <>
                  <label>{lang === 'fa' ? 'رمز روم' : 'Password'}</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder={lang === 'fa' ? 'رمز...' : 'Password...'}
                    value={newRoom.password}
                    onChange={e => setNewRoom({ ...newRoom, password: e.target.value })}
                  />
                </>
              )}
              <button className="create-btn" onClick={createRoom}>
                🚀 {lang === 'fa' ? 'بزن بریم!' : "Let's Go!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
