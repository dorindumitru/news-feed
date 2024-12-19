'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { NewsArticle as NewsArticleType } from '@/types/NewsArticle';
import { Button } from '../ui/button';
import { fallbackImages } from '@/resources/fallbackImages';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { addNewsToBookmarks, removeNewsFromBookmarks } from '@/redux/slices/bookmarkedNewsSlice';
import { RootState } from '@/redux/store';

const getRandomFallbackImage = () => {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

const NewsArticle = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const bookmarkedArticles = useSelector((state: RootState) => state.bookmarkedNews.newsArticles);
    const newsArticles: NewsArticleType[] = useSelector((state: RootState) => state.news.newsArticles);
    const newsArticle = newsArticles.find(article => article.uniqueId === searchParams.get("id"));
    const [imageSrc] = useState(newsArticle?.image || getRandomFallbackImage());

    if (newsArticle === undefined) { return (<>News article not found</>); }

    const isBookmarked = bookmarkedArticles.some((news: NewsArticleType) => news.uniqueId === newsArticle.uniqueId);

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            dispatch(removeNewsFromBookmarks(newsArticle.uniqueId));
        } else {
            dispatch(addNewsToBookmarks(newsArticle));
        }
    };

    const formattedDate = new Date(Number(newsArticle.datetime) * 1000).toLocaleString();

    return (
        <div className="relative w-full h-[90vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative h-full p-8 text-white flex flex-col justify-between">
                <div>
                    <div className="flex flex-row justify-between items-start">
                        <h2 className="text-2xl font-bold mb-4">{newsArticle.headline}</h2>
                        <button
                            onClick={handleBookmarkClick}
                            className="text-2xl">
                            {isBookmarked ?
                                <IoIosStar
                                    className="text-yellow-500" /> :
                                <IoIosStarOutline
                                    className="text-yellow-500" />}
                        </button>
                    </div>
                    <p>{newsArticle.summary}</p>
                </div>
                <div className='flex flex-row justify-between items-end'>
                    <div className="mb-4">
                        <p>Related: {newsArticle.related}</p>
                        <p>{formattedDate}</p>
                    </div>
                    <div className="flex flex-row justify-between items-end">
                        <Button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <a href={newsArticle.url} target="_blank" rel="noopener noreferrer">
                                Read the full article
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;
