import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

interface Comment {
    id: number;
    name: string;
    content: string;
    created_at: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
    comments: Comment[];
}

interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {

    const { data, setData, post: postRequest, processing, reset, errors } = useForm({
        name: '',
        content: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        postRequest(`/posts/${post.id}/comments`, {
            onSuccess: () => reset('content'),
        });
    };

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

                    {/* コメントセクション */}
                    <section className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            コメント
                            <span className="text-sm font-normal text-gray-400 font-sans">
                                {post.comments ? post.comments.length : 0}件
                            </span>
                        </h2>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            {/* コメント投稿フォーム */}
                            <form onSubmit={submit} className="mb-12 border-b border-gray-50 pb-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                        <h3 className="text-sm font-bold text-gray-900">コメントを投稿する</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                className="w-60 bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                                placeholder="名無し" maxLength={10}
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                                            placeholder="ここにコメントを入力してください..."
                                            rows={4}
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            required
                                            maxLength={255}
                                        ></textarea>
                                        {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100 active:scale-[0.98] hover:shadow-blue-200 disabled:opacity-50"
                                        >
                                            {processing ? '送信中...' : 'コメントを送信'}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* コメント一覧 */}
                            <div className="space-y-4">
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map((commentItem) => (
                                        <div
                                            key={commentItem.id}
                                            className="p-5 rounded-2xl bg-gray-50/30 border border-gray-100/50 hover:bg-white hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                                    <h4 className="text-sm font-bold text-gray-900">
                                                        {commentItem.name}
                                                    </h4>
                                                </div>
                                                <time className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                                                    {commentItem.created_at}
                                                </time>
                                                </div>
                                            {/* 本文：左側に細いラインを入れて引用のような落ち着いた雰囲気に */}
                                            <p className="text-gray-600 text-sm leading-relaxed pl-3.5 border-l-2 border-gray-100 ml-0.5 whitespace-pre-wrap break-words">
                                                {commentItem.content}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-400 text-sm py-10 border-t border-gray-50">
                                        まだコメントはありません。
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
