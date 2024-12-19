'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewNewsCard } from './shared/NewNewsCard';
import { RootState } from '@/redux/store';
import { setNews } from '@/redux/slices/newsSlice';
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

  const [itemsPerPage] = useState<number>(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentArticles, setCurrentArticles] = useState<NewsArticle[]>(articles.slice(0, itemsPerPage));

  useEffect(() => {
    setCurrentArticles(articles.slice(0, currentPage * itemsPerPage));
  }, [articles, currentPage, itemsPerPage]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArticleRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage * itemsPerPage < articles.length) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [articles.length, currentPage, itemsPerPage]
  );

  return (
    <div className="bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-4 h-[90vh] overflow-auto">
      {currentArticles.map((article, index) => {
        if (index === currentArticles.length - 1) {
          return <NewNewsCard ref={lastArticleRef} key={article.id} article={article} />;
        } else {
          return <NewNewsCard key={article.id} article={article} />;
        }
      })}
    </div>
  );
};

export default NewsFeed;