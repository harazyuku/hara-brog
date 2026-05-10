import React from 'react'
import { Link } from '@inertiajs/react';

function Navbar() {
    return (
        <nav className="p-6 border-b flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-900"> いけBlog</Link>
            <div className="space-x-4">
                <Link href="/posts" className="text-gray-600 hover:text-blue-500">記事一覧</Link>
                <Link href="/posts/create" className="text-gray-600 hover:text-blue-500">記事を作成</Link>
                <Link href="/posts/create" className="text-gray-600 hover:text-blue-500">記事を作成</Link>
                <Link href="/register/create" className="text-gray-600 hover:text-blue-500">会員登録</Link>
            </div>
        </nav>
    )
}



export default Navbar
