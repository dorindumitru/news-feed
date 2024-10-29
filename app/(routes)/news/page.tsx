import NavBar from '@/components/shared/NavBar'
import NewsArticle from '@/components/shared/NewsArticle'
import ReduxProvider from '@/redux/reduxProvider'
import React from 'react'
import { Suspense } from 'react'

const page = () => {
    return (
        <div className={'h-screen'}>
            <ReduxProvider>
                <Suspense>
                    <NavBar />
                    <NewsArticle />
                </Suspense>
            </ReduxProvider>
        </div>
    )
}

export default page