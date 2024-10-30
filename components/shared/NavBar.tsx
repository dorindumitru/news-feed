'use client'
import React, { useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'

const NavBar = () => {
    const pathName = usePathname()
    const links = [
        { href: '/', label: 'News' },
        { href: '/bookmarks', label: 'Bookmarks' },
    ];

    // Memoize the function to prevent re-creating on each render
    const linkClass = useCallback((path: string) =>
        `font-bold text-4xl ${pathName === path ? 'text-white' : 'text-slate-400'}`,
        [pathName]
    );

    return (
        <div className="w-screen flex flex-row justify-between items-center pr-4 bg-gray-800">
            <div className='flex flex-row items-start gap-6 p-4 bg-gray-800 h-[10vh]'>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={linkClass(link.href)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
            <SearchBar />
        </div>
    )
}

export default NavBar;
