'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import NewsCard from '@/components/shared/NewsCard';
import { setNews } from "@/redux/slices/newsSlice";
import { NewsArticle } from '@/types/NewsArticle';

const NewsFeed = ({ initialArticles, isBookmarkPage }: { initialArticles: NewsArticle[], isBookmarkPage: boolean }) => {
  const dispatch = useDispatch();
  const reduxNews = useSelector((state: RootState) => state.news.newsArticles);
  const bookmarkedArticles = useSelector((state: RootState) => state.bookmarkedNews.newsArticles);
  const articles = isBookmarkPage ? bookmarkedArticles : reduxNews;

  useEffect(() => {
    if (reduxNews.length === 0 && !isBookmarkPage) {
      dispatch(setNews(initialArticles));
    }
  }, [dispatch, initialArticles, reduxNews, isBookmarkPage]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((articles.length - 1) / (itemsPerPage - 1));
  const startIndex = (currentPage - 1) * (itemsPerPage - 1) + 1;
  const currentArticles = articles.slice(startIndex, startIndex + (itemsPerPage - 1));

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 p-4 h-[90vh] ">

      <div className="flex flex-1 md:flex-row gap-6 overflow-hidden">

        {/* Primary Article (pinned on the left) */}
        <div className="hidden md:flex w-full md:w-1/3 flex-grow flex-col">
          {articles.length > 0 && (
            <div className="flex-1">
              <NewsCard article={articles[0]} />
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 flex-grow flex flex-col max-h-full">
          <div className="overflow-y-auto flex flex-col gap-4 flex-1">
            {/* Include the first article in the list for mobile view */}
            {articles.length > 0 && (
              <div className="md:hidden">
                <NewsCard article={articles[0]} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-x-hidden">
              {currentArticles.map((article) => (
                <div key={article.uniqueId}>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:bg-gray-200"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <div className="flex items-center ml-4">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-500 mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {[7, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
