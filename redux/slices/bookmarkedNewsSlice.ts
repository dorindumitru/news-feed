import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewsArticle} from "@/types/NewsArticle";

export interface BookmarkedNewsState {
  newsArticles: NewsArticle[];
}

const initialState: BookmarkedNewsState = {
  newsArticles:
    typeof window !== "undefined" && localStorage.getItem("bookmarkedNews")
      ? JSON.parse(localStorage.getItem("bookmarkedNews") as string)
      : [],
};

const bookmarkedNewsSlice = createSlice({
  name: "bookmarkedNews",
  initialState,
  reducers: {
    // Action to add news to bookmarks
    addNewsToBookmarks: (state, action: PayloadAction<NewsArticle>) => {
      state.newsArticles.push(action.payload);
      localStorage.setItem("bookmarkedNews", JSON.stringify(state.newsArticles)); // Save to localStorage
    },

    // Action to remove news from bookmarks by ID
    removeNewsFromBookmarks: (state, action: PayloadAction<string>) => {
      state.newsArticles = state.newsArticles.filter((article) => article.id !== action.payload);
      localStorage.setItem("bookmarkedNews", JSON.stringify(state.newsArticles)); // Save to localStorage
    },
  },
});

export const {addNewsToBookmarks, removeNewsFromBookmarks} = bookmarkedNewsSlice.actions;

export default bookmarkedNewsSlice.reducer;
