import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosStar } from "react-icons/io";
import Link from 'next/link';
import { addNewsToBookmarks, removeNewsFromBookmarks } from '@/redux/slices/bookmarkedNewsSlice';
import { RootState } from '@/redux/store';
import { NewsArticle } from '@/types/NewsArticle';
interface NewsCardProps {
    article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const dispatch = useDispatch();
    const bookmarkedArticles = useSelector((state: RootState) => state.bookmarkedNews.newsArticles);

    const isBookmarked = bookmarkedArticles.some((news: NewsArticle) => news.id === article.id);

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            dispatch(removeNewsFromBookmarks(article.id));
        } else {
            dispatch(addNewsToBookmarks(article));
        }
    };
    return (
        <div
            className="bg-cover bg-center rounded-lg p-4 h-[100%] flex flex-col justify-between"
            style={{ backgroundImage: article.image !== "" ? `url(${article.image})` : `url(https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-06.jpg)` }}
        >
            <div className='flex flex-row justify-between'>
                <button
                    className={`px-3 py-1 rounded-md ${isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    onClick={handleBookmarkClick}
                >
                    <IoIosStar color={isBookmarked ? 'yellow' : "white"} />
                </button>
                <span className="text-white bg-slate-500 rounded p-1 text-sm font-semibold">{article.related}</span>
            </div>

            <div className="flex flex-col justify-between items-center mt-4 text-white">
                <Link href={`/news/?id=${article.uniqueId}`} className="text-l font-bold text-black rounded-sm p-1 bg-gradient-to-r from-slate-400 to-transparent mt-2">{article.headline}</Link>
                <div>
                    <span className="text-sm">{article.source}</span>
                    <span className="block text-xs text-gray-300">{new Date(article.datetime).toLocaleString()}</span>
                </div>

            </div>
        </div>
    );
};

export default NewsCard;
