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
            {/* Upper Section */}
            <div>
                <h1 className="text-4xl font-bold mb-4 p-2 rounded-lg text-white bg-gradient-to-r from-slate-400 to-transparent">
                    {newsArticle.headline}
                </h1>
                <div className='flex justify-between items-center'>
                    <div className="text-sm text-gray-400">
                        <span>{new Date(newsArticle.datetime).toLocaleDateString()}</span> |
                        <span> {newsArticle.source}</span>
                    </div>
                    <button
                        className={`px-3 py-1 rounded-md ${isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white`}
                        onClick={handleBookmarkClick}
                    >
                        <IoIosStar color={isBookmarked ? 'yellow' : "white"} />
                    </button>
                </div>
            </div>

            {/* Summary and Links */}
            <div>
                <p className="text-lg mb-4 p-2 rounded-md text-white bg-gradient-to-r from-slate-900 to-transparent ">
                    {newsArticle.summary}
                </p>
                <div className='flex justify-between items-start'>
                    <div>
                        <p className="text-gray-400">Category: {newsArticle.category}</p>
                        <p className="text-gray-400">Related: {newsArticle.related}</p>
                    </div>
                    <a href={newsArticle.url} target="_blank" className="text-blue-500 underline mt-4">Read full article</a>
                </div>
            </div>
        </div>
    );
}

export default NewsArticle;
