import {NewsArticle} from "@/types/NewsArticle";
import axios from "axios";

const finnhubApiKey = process.env.FINNHUB_API_KEY;
const finnhubUrl = "https://finnhub.io/api/v1/";

export const getNews = async (
  symbol: string,
  fromDate: string,
  toDate: string
): Promise<NewsArticle[]> => {
  const news = await axios.get(
    `${finnhubUrl}company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${finnhubApiKey}`
  );
  return news.data;
};
