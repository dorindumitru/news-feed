import {getNews} from "@/server/finnhub/finnhub";
import {NewsArticle} from "@/types/NewsArticle";
import {randomUUID} from "crypto";

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const topCompanies = [
  {symbol: "AAPL", name: "Apple"},
  {symbol: "MSFT", name: "Microsoft"},
  {symbol: "GOOGL", name: "Google"},
  {symbol: "AMZN", name: "Amazon"},
  {symbol: "FB", name: "Facebook"},
  {symbol: "TSLA", name: "Tesla"},
];

const getLast10DaysRange = () => {
  const today = new Date();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(today.getDate() - 10);

  const startDate = formatDate(tenDaysAgo);
  const endDate = formatDate(today);

  return {startDate, endDate};
};

const getNewsForTopCompanies = async (): Promise<NewsArticle[]> => {
  const {startDate, endDate} = getLast10DaysRange();
  const allNews: NewsArticle[] = [];
  for (const topCompany of topCompanies) {
    const news = await getNews(topCompany.symbol, startDate, endDate);
    for (const newsArticle of news) {
      allNews.push(newsArticle);
    }
  }

  return allNews;
};

export const fetchNews = async (): Promise<NewsArticle[]> => {
  try {
    const newsData: NewsArticle[] = [];
    const news = await getNewsForTopCompanies();
    for (let i = 0; i < news.length; i++) {
      news[i].id = String(i);
      newsData.push(news[i]);
    }
    return newsData;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export async function fetchAndDeduplicateNews(): Promise<NewsArticle[]> {
  const {startDate, endDate} = getLast10DaysRange();

  const requests = topCompanies.map((topCompany) => getNews(topCompany.symbol, startDate, endDate));
  const articles = await Promise.all(requests);
  // const articles = await Promise.all(results.map((result) => result.json()));

  // Flatten and deduplicate articles by ID
  const allArticles = articles.flat();
  return allArticles.map((article, index) => ({
    ...article,
    uniqueId: `${article.id}-${index}`, // Generate a unique identifier
  }));
}
