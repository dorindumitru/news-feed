'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'

const NavBar = () => {
    const pathName = usePathname()

    return (
        <div className="w-screen flex flex-row justify-between items-center pr-4 bg-gray-800">
            <div className='flex flex-row items-start gap-6 p-4 bg-gray-800 h-[10vh]'>
                <Link
                    href={'/'}
                    className={pathName === '/' ? 'font-bold text-4xl text-white' : "font-bold text-4xl text-slate-400"}>
                    News
                </Link>
                <Link href={'/bookmarks'}
                    className={pathName === 'bookmarks' ? 'font-bold text-4xl text-white' : "font-bold text-4xl text-slate-400"}>
                    Bookmarks
                </Link>
            </div>
            <SearchBar />
        </div>
    )
}

export default NavBar;
