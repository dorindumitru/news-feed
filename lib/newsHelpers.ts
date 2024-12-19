import {NewsArticle} from "@/types/NewsArticle";
import {getNews} from "@/server/finnhub/finnhub";
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

const loadArticles = (key: string): NewsArticle[] => {
  if (typeof window !== "undefined") {
    const storedArticles = localStorage.getItem(key);
    return storedArticles ? JSON.parse(storedArticles) : [];
  }
  return [];
};

const saveArticles = (articles: NewsArticle[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("newsArticles", JSON.stringify(articles));
  }
};

export async function fetchAndDeduplicateNews(): Promise<NewsArticle[]> {
  const {startDate, endDate} = getLast10DaysRange();

  const requests = topCompanies.map((topCompany) => getNews(topCompany.symbol, startDate, endDate));
  const articles = await Promise.all(requests);

  const allArticles = articles.flat();
  const existingArticles = loadArticles("newsArticles");

  const newArticles = allArticles.filter(
    (newArticle) =>
      !existingArticles.some((existingArticle) => existingArticle.id === newArticle.id)
  );

  const updatedArticles = [...existingArticles, ...newArticles];

  saveArticles(updatedArticles);

  return updatedArticles;
}
