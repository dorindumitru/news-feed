import {getNews} from "@/server/finnhub/finnhub";
import {NewsArticle} from "@/types/NewsArticle";

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

export async function fetchAndDeduplicateNews(): Promise<NewsArticle[]> {
  const {startDate, endDate} = getLast10DaysRange();

  const requests = topCompanies.map((topCompany) => getNews(topCompany.symbol, startDate, endDate));
  const articles = await Promise.all(requests);

  const allArticles = articles.flat();
  return allArticles.map((article, index) => ({
    ...article,
    uniqueId: `${article.id}-${index}`,
  }));
}
