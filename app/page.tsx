import NewsFeed from "@/components/NewsFeed";
import NavBar from "@/components/shared/NavBar";
import { fetchAndDeduplicateNews, fetchNews } from "@/lib/newsHelpers";
import ReduxProvider from "@/redux/reduxProvider";

export default async function Home() {
  const news = await fetchAndDeduplicateNews()
  return (
    <ReduxProvider>
      <NavBar />
      <NewsFeed initialArticles={news} isBookmarkPage={false} />
    </ReduxProvider>
  );
}
