import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
  currentSong: {
    id: null,
    title: null,
    artist: null,
    cover: null,
    audioUrl: null, // آدرس فایل mp3 آهنگ
    lyrics: null , // متن آهنگ (اگه داره، وگرنه آرایه خالی)
    duration: null
  }, // این بخش اضافه شد تا دیتای آهنگ در حال پخش رو ذخیره کنه
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // برای باز و بسته کردن ظاهر پلیر (اگه نیاز داشتی)
    setPlayerActive: (state) => {
      state.active = !state.active;
    },

    // اکشن اصلی برای تغییر آهنگ و پاس دادن دیتای اون جیسون
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.active = true; // به محض اینکه آهنگ ست شد، پلیر رو هم فعال (باز) کنه
    },

    // متوقف کردن یا خالی کردن پلیر (اختیاری)
    clearPlayer: (state) => {
      state.currentSong = null;
      state.active = false;
    }
  },
});

export const {
  setPlayerActive,
  setCurrentSong, // حتماً این رو export کن تا بتونی در کامپوننت‌ها دیسپچش کنی
  clearPlayer
} = playerSlice.actions;

export default playerSlice.reducer;