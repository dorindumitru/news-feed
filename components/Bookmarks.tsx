'use client'
import NewsFeed from './NewsFeed';
import { useEffect, useState } from "react";

const Bookmarks = () => {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

    useEffect(() => {
        const storedBookmarks = localStorage.getItem("bookmarkedNews");
        setBookmarkedArticles(JSON.parse(storedBookmarks || '[]'));
    }, []);

    return (
        <NewsFeed initialArticles={bookmarkedArticles} isBookmarkPage={true} />
    );
};

export default Bookmarks;
