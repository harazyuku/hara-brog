import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Tag, FileText, Plus, List } from 'lucide-react';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import MarkdownEditor from '@/components/markdown-editor';
import { show, update } from '@/routes/posts';

interface PostEditProps {
    post: {
        id: number;
        title: string;
        content: string;
        category: string;
        created_at: string;
    };
}

export default function PostEdit({ post }: PostEditProps) {
    // カテゴリーの切り替え状態
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

    const {
        data,
        setData,
        submit: submitForm,
        processing,
        errors,
    } = useForm({
        title: post.title,
        content: post.content,
        category: post.category,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm(update(post.id));
    };

    return (
        <>
            <Head title="記事を編集 | いけBlog" />
            <div className="retro-page pb-20">
                <Navbar />

                <main className="retro-container mt-10">
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href={show(post.id)}
                            className="retro-link flex items-center gap-2 text-sm"
                        >
                            <ArrowLeft size={16} />
                            <span>戻る</span>
                        </Link>
                        <h1 className="text-xl text-white">■ EDIT ENTRY</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="retro-panel p-5 sm:p-8">
                            {/* カテゴリー選択 */}
                            <div className="mb-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#f0ebeb]">
                                        <Tag size={14} />
                                        カテゴリー
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddingNewCategory(
                                                !isAddingNewCategory,
                                            );
                                            setData(
                                                'category',
                                                isAddingNewCategory
                                                    ? post.category
                                                    : '',
                                            );
                                        }}
                                        className="retro-link flex items-center gap-1 text-[10px]"
                                    >
                                        {isAddingNewCategory ? (
                                            <>
                                                <List size={12} /> 選択に戻る
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={12} /> 新しく作る
                                            </>
                                        )}
                                    </button>
                                </div>

                                {isAddingNewCategory ? (
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData('category', e.target.value)
                                        }
                                        className="retro-input text-sm"
                                        placeholder="新しいカテゴリー名を入力..."
                                        autoFocus
                                    />
                                ) : (
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData('category', e.target.value)
                                        }
                                        className="retro-input cursor-pointer appearance-none text-sm"
                                    >
                                        <option value="">
                                            選択してください
                                        </option>
                                        <option value="テック">テック</option>
                                        <option value="日常">日常</option>
                                        {/* 元のカテゴリーが選択肢にない場合のために表示しておく */}
                                        {post.category !== '日常' &&
                                            post.category !== '日常' && (
                                                <option value={post.category}>
                                                    {post.category}
                                                </option>
                                            )}
                                    </select>
                                )}
                                {errors.category && (
                                    <div className="mt-1 text-xs text-red-500">
                                        {errors.category}
                                    </div>
                                )}
                            </div>

                            {/* タイトル入力 */}
                            <div className="mb-8">
                                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#f0ebeb]">
                                    <FileText size={14} />
                                    タイトル
                                </label>
                                <textarea
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    rows={2}
                                    className="retro-input resize-none text-2xl"
                                    placeholder="タイトルを入力してください"
                                />
                                {errors.title && (
                                    <div className="mt-1 text-xs text-red-500">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            {/* 本文入力 */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#f0ebeb]">
                                    本文
                                </label>
                                <MarkdownEditor
                                    value={data.content}
                                    onChange={(content) =>
                                        setData('content', content)
                                    }
                                    rows={15}
                                    error={errors.content}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="da-button inline-flex items-center gap-2 px-8 py-3 disabled:opacity-50"
                            >
                                <Save size={20} />
                                <span>
                                    {processing
                                        ? '保存中...'
                                        : '変更を保存する'}
                                </span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}
