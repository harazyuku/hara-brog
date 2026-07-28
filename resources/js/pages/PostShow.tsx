import { Head, useForm } from '@inertiajs/react';
import { Calendar, Tag } from 'lucide-react';
import type React from 'react';
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
    content_html: string;
    category: string;
    created_at: string;
    comments: Comment[];
}

interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {
    const {
        data,
        setData,
        post: postRequest,
        processing,
        reset,
        errors,
    } = useForm({
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

            <div className="retro-page pb-20">
                {/* シンプルなヘッダーナビ */}
                <Navbar />

                <main className="retro-container mt-8">
                    {/* 記事メインエリア */}
                    <article className="retro-panel overflow-hidden">
                        {/* 記事のヘッダー情報 */}
                        <header className="border-b border-[#554545] p-6 md:p-10">
                            <div className="mb-6 flex flex-wrap items-center gap-4">
                                <span className="inline-flex items-center gap-1.5 border border-[#5b4545] bg-[#302222] px-2 py-1 text-xs text-[#e08a8a]">
                                    <Tag size={14} />
                                    {post.category}
                                </span>
                                <time className="inline-flex items-center gap-1.5 text-xs text-[#888]">
                                    <Calendar size={14} />
                                    {post.created_at}
                                </time>
                            </div>

                            <h1 className="mb-8 text-3xl leading-tight text-white md:text-4xl">
                                &gt;&gt; {post.title}
                            </h1>

                            <div className="flex items-center gap-3">
                                <img
                                    src="/images/IMG_9062.jpg"
                                    alt="池原優斗"
                                    className="h-12 w-12 border border-[#5a4848] object-cover"
                                />
                                <div>
                                    <p className="text-sm font-bold text-[#f0ebeb]">
                                        池原優斗
                                    </p>
                                    <p className="text-xs text-[#887e7e]">
                                        Webエンジニア見習い
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* 記事本文 */}
                        <section className="p-6 md:p-10">
                            <div
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: post.content_html,
                                }}
                            />
                        </section>
                    </article>

                    {/* 著者プロフィールカード（フッター付近） */}
                    <div className="retro-panel mt-10 flex flex-col items-center gap-6 p-6 md:flex-row">
                        <img
                            src="/images/IMG_9062.jpg"
                            alt="池原優斗"
                            className="h-24 w-24 border border-[#5a4848] object-cover"
                        />
                        <div className="text-center md:text-left">
                            <h3 className="retro-heading mb-3">
                                ■ ABOUT AUTHOR
                            </h3>
                            <p className="mb-4 leading-relaxed text-[#b5abab]">
                                銀行を4ヶ月で辞め、エンジニアを目指して上京。現在、監禁されながら（？）LaravelとReactを猛勉強中。
                                このブログは、その生存確認と学習の記録です。
                            </p>
                            <div className="flex justify-center gap-4 text-xs text-[#e26666] md:justify-start">
                                <span>PHP / Laravel</span>
                                <span>TypeScript / React</span>
                            </div>
                        </div>
                    </div>

                    {/* コメントセクション */}
                    <section id="comments" className="mt-12 scroll-mt-4">
                        <h2 className="retro-heading mb-4 flex items-center gap-2">
                            ■ BBS / コメント
                            <span className="text-[10px] text-[#9e9292]">
                                {post.comments ? post.comments.length : 0}件
                            </span>
                        </h2>

                        <div className="retro-panel p-5 sm:p-8">
                            {/* コメント投稿フォーム */}
                            <form
                                onSubmit={submit}
                                className="mb-10 border-b border-[#554545] pb-10"
                            >
                                <div className="space-y-4">
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                                        <h3 className="text-sm font-bold text-[#f0ebeb]">
                                            &gt;&gt; コメントを投稿する
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <input
                                                type="text"
                                                className="retro-input max-w-full text-sm sm:w-60"
                                                placeholder="名無し"
                                                maxLength={10}
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            className="retro-input resize-none text-sm"
                                            placeholder="ここにコメントを入力してください..."
                                            rows={4}
                                            value={data.content}
                                            onChange={(e) =>
                                                setData(
                                                    'content',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            maxLength={255}
                                        ></textarea>
                                        {errors.content && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.content}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="da-button px-6 py-2 disabled:opacity-50"
                                        >
                                            {processing
                                                ? '送信中...'
                                                : 'コメントを送信'}
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
                                            className="border-b border-[#413535] p-4"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                                                    <h4 className="text-sm font-bold text-[#f0ebeb]">
                                                        {commentItem.name}
                                                    </h4>
                                                </div>
                                                <time className="text-[10px] tracking-wider text-[#887e7e]">
                                                    {commentItem.created_at}
                                                </time>
                                            </div>
                                            {/* 本文：左側に細いラインを入れて引用のような落ち着いた雰囲気に */}
                                            <p className="ml-0.5 whitespace-pre-wrap break-words border-l border-[#5b4545] pl-3.5 text-sm leading-relaxed text-[#b5abab]">
                                                {commentItem.content}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="border-t border-[#413535] py-10 text-center text-sm text-[#887e7e]">
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
