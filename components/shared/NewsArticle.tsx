'use client'
import React from 'react'
import { removeNewsFromBookmarks, addNewsToBookmarks } from '@/redux/slices/bookmarkedNewsSlice';
import { RootState } from '@/redux/store';
import { IoIosStar } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { NewsArticle as NewsArticleType } from '@/types/NewsArticle'

const NewsArticle = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const bookmarkedArticles = useSelector((state: RootState) => state.bookmarkedNews.newsArticles);
    const newsArticles: NewsArticleType[] = useSelector((state: RootState) => state.news.newsArticles);

    const newsArticle = newsArticles.find(article => article.uniqueId === searchParams.get("id"));
    if (newsArticle === undefined) { return (<>News article not found</>); }

    const isBookmarked = bookmarkedArticles.some((news: NewsArticleType) => news.uniqueId === newsArticle.uniqueId);

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            dispatch(removeNewsFromBookmarks(newsArticle.uniqueId));
        } else {
            dispatch(addNewsToBookmarks(newsArticle));
        }
    };

    return (
        <div className="flex flex-col justify-between h-[90vh] p-5 bg-cover bg-center" style={{ backgroundImage: newsArticle.image !== "" ? `url(${newsArticle.image})` : `url(https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-06.jpg)` }}>

            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 p-2 rounded-lg text-white bg-gradient-to-r from-slate-400 to-transparent">
                    {newsArticle.headline}
                </h1>
                <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                    <div className="text-sm text-gray-400">
                        <span>{new Date(newsArticle.datetime).toLocaleDateString()}</span> |
                        <span> {newsArticle.source}</span>
                    </div>
                    <button
                        className={`px-3 py-1 rounded-md mt-2 md:mt-0 ${isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white`}
                        onClick={handleBookmarkClick}
                    >
                        <IoIosStar color={isBookmarked ? 'yellow' : "white"} />
                    </button>
                </div>
            </div>

            <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md mt-4">
                <p className="text-lg mb-4 text-gray-800">
                    {newsArticle.summary}
                </p>
                <div className='flex justify-between items-start'>
                    <div>
                        <p className="text-gray-700 font-semibold">Category: <span className="text-gray-500">{newsArticle.category}</span></p>
                        <p className="text-gray-700 font-semibold">Related: <span className="text-gray-500">{newsArticle.related}</span></p>
                    </div>
                    <a
                        href={newsArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-blue-500 group-hover:from-green-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
                    >
                        <span className="relative text-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Read full article
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NewsArticle;
