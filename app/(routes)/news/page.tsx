import NavBar from '@/components/shared/NavBar'
import NewsArticle from '@/components/shared/NewsArticle'
import ReduxProvider from '@/redux/reduxProvider'
import React from 'react'

const page = () => {
    return (
        <div className={'h-screen'}>
            <ReduxProvider>
                <NavBar />
                <NewsArticle />
            </ReduxProvider>
        </div>
    )
}

export default page