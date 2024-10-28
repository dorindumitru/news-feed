import Bookmarks from '@/components/Bookmarks';
import NavBar from '@/components/shared/NavBar';
import ReduxProvider from '@/redux/reduxProvider';
import React from 'react'

const page = () => {
    return (
        <ReduxProvider>
            <NavBar />
            <Bookmarks />
        </ReduxProvider>
    )
}

export default page
