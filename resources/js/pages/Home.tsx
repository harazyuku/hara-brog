import React from 'react';
import { Head, Link } from '@inertiajs/react';
import LatestPostsSection from '@/components/layout/LatestPostsSection';
import Navbar from '@/components/layout/Navbar';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string; // DBから届くので created_at になります
}

interface HomeProps {
    latestPosts: Post[];
}

export default function Home({ latestPosts }: HomeProps) {

    return (
        <>
            <Head title="My Awesome Blog" />


            <div className="min-h-screen bg-white">
                {/* ナビゲーション */}
                <Navbar />

                {/* ヒーローセクション */}
                <header className="py-20 px-6 flex flex-col items-center text-center bg-linear-to-r from-blue-50 to-indigo-50">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        池原優斗のブログ
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        監禁されて作らされてます。助けてください。
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 w-full max-w-2xl">
                        <div className="flex-1 min-w-\[250px\] bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                            <h3 className="text-red-500 font-bold mb-2">Profile</h3>
                            <img src="/images/LE8MC2KbQjCgHOTqnUY0Pg.jpg" alt="池原優斗の写真" className='mx-auto w-32 h-32 rounded-full' />
                            <p className="text-black text-lg font-bold">池原優斗  23歳</p>
                            <p className="text-gray-700">新卒で入った銀行を4ヶ月で辞め、WEBエンジニアになるために、何をとち狂ったか上京してきました。</p>
                        </div>

                        <div className="flex-1 min-w-62.5 bg-blue-600 p-6 rounded-2xl shadow-md text-white">
                            <h3 className="font-bold mb-2">Skills</h3>
                            <p className="opacity-90 text-sm">PHP (Laravel) / TypeScript (React) </p>
                        </div>
                    </div>
                </header>

                <LatestPostsSection posts={latestPosts} />
            </div>
        </>
    );
}
