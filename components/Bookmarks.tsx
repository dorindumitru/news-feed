'use client'
import NewsFeed from './NewsFeed';

const Bookmarks = () => {
    const bookmarkedArticles = typeof window !== "undefined" && localStorage.getItem("bookmarkedNews")
        ? JSON.parse(localStorage.getItem("bookmarkedNews") as string)
        : []
    return (
        < >
            <NewsFeed initialArticles={bookmarkedArticles} isBookmarkPage={true} />
        </>
    );
};

export default Bookmarks;
