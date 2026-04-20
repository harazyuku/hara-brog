import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
}

interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {
    return (
        <>
            <Head title={`${post.title} | いけBlog`} />

            <div className="min-h-screen bg-gray-50 pb-20">
                {/* シンプルなヘッダーナビ */}
                <Navbar />

                <main className="max-w-4xl mx-auto px-6 mt-10">
                    {/* 記事メインエリア */}
                    <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* 記事のヘッダー情報 */}
                        <header className="p-8 md:p-12 border-b border-gray-50">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                                    <Tag size={14} />
                                    {post.category}
                                </span>
                                <time className="inline-flex items-center gap-1.5 text-gray-400 text-xs">
                                    <Calendar size={14} />
                                    {post.created_at}
                                </time>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-8">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-3">
                                <img
                                    src="/images/LE8MC2KbQjCgHOTqnUY0Pg.jpg"
                                    alt="池原優斗"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div>
                                    <p className="text-sm font-bold text-gray-900">池原優斗</p>
                                    <p className="text-xs text-gray-500">Webエンジニア見習い</p>
                                </div>
                            </div>
                        </header>

                        {/* 記事本文 */}
                        <section className="p-8 md:p-12">
                            <div className="text-gray-800 leading-loose text-lg whitespace-pre-wrap font-serif">
                                {post.content}
                            </div>
                        </section>
                    </article>

                    {/* 著者プロフィールカード（フッター付近） */}
                    <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
                        <img
                            src="/images/LE8MC2KbQjCgHOTqnUY0Pg.jpg"
                            alt="池原優斗"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">池原優斗（23）</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                銀行を4ヶ月で辞め、エンジニアを目指して上京。現在、監禁されながら（？）LaravelとReactを猛勉強中。
                                このブログは、その生存確認と学習の記録です。
                            </p>
                            <div className="flex justify-center md:justify-start gap-4 text-xs font-bold text-blue-600 uppercase tracking-widest">
                                <span>PHP / Laravel</span>
                                <span>TypeScript / React</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
