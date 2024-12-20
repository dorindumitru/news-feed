import {configureStore} from "@reduxjs/toolkit";
import bookmarkedNewsReducer from "@/redux/slices/bookmarkedNewsSlice";
import newsReducer from "@/redux/slices/newsSlice";

export const store = configureStore({
  reducer: {
    bookmarkedNews: bookmarkedNewsReducer,
    news: newsReducer,
  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
