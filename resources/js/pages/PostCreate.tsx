import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar';

function PostCreate() {

    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

    const { data, setData, post } = useForm({
        title: '',
        category: '',
        content: '',
    });

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        // 全体の背景と中央寄せ
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">ブログを作成</h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* タイトル入力 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="記事のタイトルを入力..."
                            />
                        </div>

                        {/* カテゴリーセクション */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-700">カテゴリー</label>

                                {/* モード切替ボタン */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddingNewCategory(!isAddingNewCategory);
                                        setData('category', ''); // モードを変えたら一度リセット
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    {isAddingNewCategory ? '選択に戻る' : '新しく作る'}
                                </button>
                            </div>

                            {isAddingNewCategory ? (
                                // 【新規入力モード】
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-4 py-2 border border-blue-300 bg-blue-50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="新しいカテゴリー名を入力..."
                                    autoFocus
                                />
                            ) : (
                                // 【選択モード】
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option value="">選択してください</option>
                                    <option value="tech">テック</option>
                                    <option value="life">日常</option>
                                </select>
                            )}
                        </div>

                        {/* 本文入力 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-48 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="ここへ内容を書きましょう"
                            />
                        </div>

                        {/* 投稿ボタン */}
                        <button
                            type='submit'
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 active:scale-[0.98]"
                        >
                            投稿する
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostCreate
