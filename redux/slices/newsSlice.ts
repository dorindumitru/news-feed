import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewsArticle} from "@/types/NewsArticle";

export interface NewsState {
  newsArticles: NewsArticle[];
}

const initialState: NewsState = {
  newsArticles: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<NewsArticle[]>) => {
      state.newsArticles = action.payload;
    },
  },
});

export const {setNews} = newsSlice.actions;

export default newsSlice.reducer;
