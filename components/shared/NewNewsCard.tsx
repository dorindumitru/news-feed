"use client";

import React, { forwardRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { NewsArticle } from '@/types/NewsArticle';
import { Drawer, DrawerContent } from '../ui/drawer';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addNewsToBookmarks, removeNewsFromBookmarks } from '@/redux/slices/bookmarkedNewsSlice';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { fallbackImages } from '@/resources/fallbackImages';
interface NewNewsCardProps {
  article: NewsArticle;
}

const getRandomFallbackImage = () => {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

const NewNewsCard = forwardRef<HTMLDivElement, NewNewsCardProps>(({ article }, ref) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const bookmarkedArticles = useSelector((state: RootState) => state.bookmarkedNews.newsArticles);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageSrc, setImageSrc] = useState(article.image || getRandomFallbackImage());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBookmarked(bookmarkedArticles.some((news: NewsArticle) => news.id === article.id));
    }
  }, [bookmarkedArticles, article.id]);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      dispatch(removeNewsFromBookmarks(article.id));
    } else {
      dispatch(addNewsToBookmarks(article));
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const formattedDate = new Date(Number(article.datetime) * 1000).toLocaleString();

  return (
    <div
      ref={ref}
      className="h-full">
      <CardContainer
        className="h-full">
        <CardBody
          className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-[400px] rounded-xl p-5 m-5 border flex flex-col justify-between">
          <div
            className='flex flex-row justify-between items-start gap-3'>
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white max-h-[56px] overflow-hidden">
              {article.headline}
            </CardItem>
            <CardItem
              translateZ="50">
              <button
                onClick={handleBookmarkClick}
                className="text-2xl">
                {isBookmarked ?
                  <IoIosStar
                    className="text-yellow-500" /> :
                  <IoIosStarOutline
                    className="text-yellow-500" />}
              </button>
            </CardItem>
          </div>
          <button
            onClick={handleDrawerOpen} >
            <CardItem
              translateZ="100"
              className="w-full mt-4">
              <img
                src={imageSrc}
                className="w-full h-40 object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-sm text-neutral-600 dark:text-white mt-4 max-h-[60px] overflow-hidden">
              {article.summary}
            </CardItem>
          </button>
          <button
            onClick={handleDrawerOpen}
            className='flex flex-row justify-between items-end'>
            <CardItem
              translateZ="50"
              className="text-sm text-neutral-600 dark:text-white mt-2">
              Related: {article.related}
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-sm text-neutral-600 dark:text-white mt-2">
              {formattedDate}
            </CardItem>
            <CardItem
              translateZ="50"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              Read More
            </CardItem>
          </button>
        </CardBody>
      </CardContainer>

      <Drawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}>
        <DrawerContent
          className='h-[70vh] bg-cover bg-center'
          style={{ backgroundImage: `url(${imageSrc})` }}>
          <div
            className="absolute inset-0 bg-black opacity-50">
          </div>
          <div
            className="relative p-8 text-white flex flex-col ">
            <div>
              <div
                className='flex flex-row justify-between items-start'>
                <DialogTitle
                  className="text-2xl font-bold mb-4">
                  {article.headline}
                </DialogTitle>
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
              <DialogDescription
                className="mb-4">
                {article.summary}
              </DialogDescription>
            </div>
            <div
              className='flex flex-row justify-between items-end'>
              <div>
                <p
                  className="mb-4">
                  Related: {article.related}
                </p>
                <p>
                  {formattedDate}
                </p>
              </div>
              <Button
                className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                <Link
                  href={article.url}
                  target="_blank">
                  Read the full article
                </Link>
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>

  );
});

NewNewsCard.displayName = 'NewNewsCard';

export { NewNewsCard };
