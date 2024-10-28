'use client'
import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { NewsArticle } from '@/types/NewsArticle';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const articles = useSelector((state: RootState) => state.news.newsArticles);
    const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = articles.filter(article =>
            article.headline.toLowerCase().includes(term)
        );
        setFilteredArticles(filtered);
    };

    const handleArticleClick = (id: string) => {
        router.push(`/news/${id}`);
        setSearchTerm('');
        setFilteredArticles([]);
    };

    return (
        <div className="relative w-full max-w-sm">
            <div className="flex items-center w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search articles by title..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => filteredArticles.length && handleArticleClick(filteredArticles[0].id)}
                    className='ml-2 bg-slate-300 rounded-md h-10 w-10 flex items-center justify-center'
                >
                    <IoMdSearch />
                </button>
            </div>

            {/* Dropdown for filtered articles */}
            {searchTerm && filteredArticles.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                    {filteredArticles.map(article => (
                        <div
                            key={article.id}
                            onClick={() => handleArticleClick(article.id)}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {article.image && <img src={article.image} alt="thumbnail" className="w-10 h-10 object-cover mr-3 rounded-full" />}
                            <span className="text-gray-700">{article.headline}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
