import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import MarkdownEditor from '@/components/markdown-editor';
import { store } from '@/routes/posts';

function PostCreate() {
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

    const {
        data,
        setData,
        submit: submitForm,
        processing,
        errors,
    } = useForm({
        title: '',
        category: '',
        content: '',
    });

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        submitForm(store());
    };

    return (
        // 全体の背景と中央寄せ
        <div className="retro-page">
            <Navbar />
            <div className="retro-container py-10">
                <div className="retro-panel mx-auto max-w-4xl p-5 sm:p-8">
                    <h1 className="retro-heading mb-8 text-2xl text-white">
                        ■ 記事を書く
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* タイトル入力 */}
                        <div>
                            <label className="mb-2 block text-xs font-bold text-[#f0ebeb]">
                                タイトル:
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="retro-input"
                                placeholder="記事のタイトルを入力..."
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* カテゴリーセクション */}
                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <label className="block text-xs font-bold text-[#f0ebeb]">
                                    カテゴリー:
                                </label>

                                {/* モード切替ボタン */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddingNewCategory(
                                            !isAddingNewCategory,
                                        );
                                        setData('category', ''); // モードを変えたら一度リセット
                                    }}
                                    className="retro-link text-xs"
                                >
                                    {isAddingNewCategory
                                        ? '選択に戻る'
                                        : '新しく作る'}
                                </button>
                            </div>

                            {isAddingNewCategory ? (
                                // 【新規入力モード】
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="retro-input"
                                    placeholder="新しいカテゴリー名を入力..."
                                    autoFocus
                                />
                            ) : (
                                // 【選択モード】
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="retro-input"
                                >
                                    <option value="">選択してください</option>
                                    <option value="テック">テック</option>
                                    <option value="日常">日常</option>
                                </select>
                            )}
                            {errors.category && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* 本文入力 */}
                        <div>
                            <label className="mb-2 block text-xs font-bold text-[#f0ebeb]">
                                本文（Markdown）:
                            </label>
                            <MarkdownEditor
                                value={data.content}
                                onChange={(content) =>
                                    setData('content', content)
                                }
                                error={errors.content}
                            />
                        </div>

                        {/* 投稿ボタン */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="da-button w-full py-3 disabled:opacity-50"
                        >
                            {processing ? '投稿中...' : '投稿する'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostCreate;
