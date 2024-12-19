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

    const linkClass = useCallback((path: string) =>
        `font-bold text-xl ${pathName === path ? 'text-white' : 'text-slate-400'} hover:text-white transition`,
        [pathName]
    );

    return (
        <nav className="bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center h-[12vh] md:h-[10vh]">

            <div className="flex flex-col md:flex-row md:items-center md:flex-1">
                <div className="flex flex-row justify-start space-x-8 md:space-x-0 gap-3">
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
            </div>

            <div className="mt-4 md:mt-0 md:w-auto w-full max-w-md">
                <div className="flex justify-center">
                    <SearchBar />
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
