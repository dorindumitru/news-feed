import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewsArticle} from "@/types/NewsArticle";

export interface BookmarkedNewsState {
  newsArticles: NewsArticle[];
}

const loadBookmarks = (): NewsArticle[] => {
  if (typeof window !== "undefined") {
    const storedBookmarks = localStorage.getItem("bookmarkedNews");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  }
  return [];
};

const saveBookmarks = (bookmarks: NewsArticle[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarks));
  }
};

const initialState: BookmarkedNewsState = {
  newsArticles: loadBookmarks(),
};

const bookmarkedNewsSlice = createSlice({
  name: "bookmarkedNews",
  initialState,
  reducers: {
    addNewsToBookmarks: (state, action: PayloadAction<NewsArticle>) => {
      state.newsArticles.push(action.payload);
      saveBookmarks(state.newsArticles);
    },
    removeNewsFromBookmarks: (state, action: PayloadAction<string>) => {
      state.newsArticles = state.newsArticles.filter((article) => article.id !== action.payload);
      saveBookmarks(state.newsArticles);
    },
  },
});

export const {addNewsToBookmarks, removeNewsFromBookmarks} = bookmarkedNewsSlice.actions;

export default bookmarkedNewsSlice.reducer;
