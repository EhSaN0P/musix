import { configureStore } from '@reduxjs/toolkit';
import themSlice from './themSlice.js';
import langSlice from './langSlice.js';
import playerSlice from './playerSlice.js';
import authSlice from "./authSlice.js";

export const store = configureStore({
  reducer: {
    theme: themSlice,
    languages: langSlice,
    player: playerSlice,
    auth: authSlice,

  },
});
