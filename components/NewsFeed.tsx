'use client'
import React, { useEffect, useState } from 'react';
import { NewsArticle } from '@/types/NewsArticle';
import NewsCard from './shared/NewsCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setNews } from "../redux/slices/newsSlice";

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
    // Initialize Redux state and Pagination
    const [itemsPerPage, setItemsPerPage] = useState<number>(7);
    const [currentPage, setCurrentPage] = useState(1);

    if (reduxNews.length < 1) {
        dispatch(setNews(articles));
    }

    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

    // Pagination Handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Dropdown for selecting items per page
    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to page 1 to avoid out-of-bounds issues
    };

    return (
        <div className="flex flex-col gap-6 p-4 h-[90vh]">

            {/* News Articles Display */}
            <div className="flex flex-col gap-6 h-full overflow-y-auto">
                <div className="flex gap-6 h-full">
                    {/* Primary Article */}
                    <div className="w-full md:w-1/3 h-full">
                        {currentArticles.length > 0 && (
                            <div className="h-full">
                                <NewsCard article={currentArticles[0]} />
                            </div>
                        )}
                    </div>

                    {/* Secondary Articles Grid */}
                    <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {currentArticles.slice(1).map((article) => (
                            <div key={article.uniqueId}>
                                <NewsCard article={article} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination Controls with Items per Page Selector */}
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

                {/* Dropdown Inline with Pagination */}
                <div className="flex items-center ml-4">
                    <label htmlFor="itemsPerPage" className="text-sm text-gray-500 mr-2">Items per page:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {[5, 7, 10, 15, 20].map((num) => (
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
