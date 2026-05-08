import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Tag, FileText, Plus, List } from 'lucide-react';

interface PostEditProps {
    post: {
        id: number;
        title: string;
        content: string;
        category: string;
        created_at: string;
    }
}

export default function PostEdit({ post }: PostEditProps) {
    // カテゴリーの切り替え状態
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        category: post.category,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <>
            <Head title="記事を編集 | いけBlog" />
            <div className="min-h-screen bg-gray-50 pb-20">
                <Navbar />

                <main className="max-w-4xl mx-auto px-6 mt-10">
                    <div className="flex items-center justify-between mb-8">
                        <Link 
                            href={`/posts/${post.id}`}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>戻る</span>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">記事の編集</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            {/* カテゴリー選択 */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <Tag size={14} />
                                        カテゴリー
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddingNewCategory(!isAddingNewCategory);
                                            setData('category', isAddingNewCategory ? post.category : '');
                                        }}
                                        className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md transition-colors"
                                    >
                                        {isAddingNewCategory ? <><List size={12} /> 選択に戻る</> : <><Plus size={12} /> 新しく作る</>}
                                    </button>
                                </div>

                                {isAddingNewCategory ? (
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full bg-blue-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                        placeholder="新しいカテゴリー名を入力..."
                                        autoFocus
                                    />
                                ) : (
                                    <select
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">選択してください</option>
                                        <option value="tech">テック</option>
                                        <option value="life">日常</option>
                                        {/* 元のカテゴリーが選択肢にない場合のために表示しておく */}
                                        {post.category !== 'tech' && post.category !== 'life' && (
                                            <option value={post.category}>{post.category}</option>
                                        )}
                                    </select>
                                )}
                                {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                            </div>

                            {/* タイトル入力 */}
                            <div className="mb-8">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    <FileText size={14} />
                                    タイトル
                                </label>
                                <textarea
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    rows={2}
                                    className="w-full bg-white border-b-2 border-gray-100 focus:border-blue-500 text-2xl font-extrabold text-gray-900 outline-none py-2 resize-none transition-colors"
                                    placeholder="タイトルを入力してください"
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>

                            {/* 本文入力 */}
                            <div>
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    本文
                                </label>
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows={15}
                                    className="w-full bg-white border-none text-lg text-gray-800 leading-loose outline-none py-2 resize-none font-serif"
                                    placeholder="ここから記事を書きましょう..."
                                />
                                {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <Save size={20} />
                                <span>{processing ? '保存中...' : '変更を保存する'}</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}
