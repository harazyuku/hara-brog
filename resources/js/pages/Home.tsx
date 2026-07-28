import { Head, Link } from '@inertiajs/react';
import LatestPostsSection from '@/components/layout/LatestPostsSection';
import Navbar from '@/components/layout/Navbar';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
}

interface HomeProps {
    latestPosts: Post[];
}

export default function Home({ latestPosts }: HomeProps) {
    return (
        <>
            <Head title="IKEHARA PRESS" />
            <div className="retro-page">
                <Navbar />

                <main className="retro-container py-3">
                    <div className="mb-4 border border-[#3e3232] bg-black px-3 py-2 text-[11px] text-[#918686]">
                        <span className="text-[#e26666]">IKEHARA PRESS</span> /
                        HOME / LATEST NEWS
                        <span className="float-right hidden text-[#766] sm:inline">
                            LAST UPDATE: 2026/07/28
                        </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                        <aside className="space-y-4 self-start">
                            <section className="retro-panel">
                                <h2 className="retro-heading">プロフィール</h2>
                                <div className="p-3">
                                    <img
                                        src="/images/IMG_9062.jpg"
                                        alt="池原優斗"
                                        className="mb-3 aspect-square w-full border border-[#5a4848] bg-[#111] object-cover"
                                    />
                                    <p className="mb-1 text-sm font-bold text-[#eee9e9]">
                                        池原 優斗
                                    </p>
                                    <p className="text-xs leading-5 text-[#aaa1a1]">
                                        銀行を4ヶ月で退職し、Webエンジニアを目指して上京しました。
                                    </p>
                                    <Link
                                        href="/posts"
                                        className="retro-link mt-3 inline-block text-xs"
                                    >
                                        View all entries »
                                    </Link>
                                </div>
                            </section>

                            <section className="retro-panel">
                                <h2 className="retro-heading">DEVELOPMENT</h2>
                                <ul className="space-y-2 p-3 text-xs text-[#b5abab]">
                                    <li>
                                        <span className="text-[#d45353]">
                                            ›
                                        </span>{' '}
                                        PHP / Laravel
                                    </li>
                                    <li>
                                        <span className="text-[#d45353]">
                                            ›
                                        </span>{' '}
                                        TypeScript / React
                                    </li>
                                    <li>
                                        <span className="text-[#d45353]">
                                            ›
                                        </span>{' '}
                                        Inertia.js
                                    </li>
                                </ul>
                            </section>

                            <section className="retro-panel">
                                <h2 className="retro-heading">QUICK LINKS</h2>
                                <div className="flex flex-col gap-2 p-3 text-xs">
                                    <a
                                        href="https://github.com/harazyuku/my-portfolio"
                                        className="retro-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        MY PORTFOLIO
                                    </a>
                                    <a
                                        href="https://github.com/harazyuku/hara-brog"
                                        className="retro-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        SOURCE
                                    </a>
                                </div>
                            </section>
                        </aside>

                        <div className="min-w-0 space-y-4">
                            <section className="retro-panel">
                                <h1 className="retro-heading">
                                    WELCOME TO IKEHARA PRESS
                                </h1>
                                <div className="p-4">
                                    <div className="news-ticker mb-4">
                                        <p className="news-ticker__text pixel-title text-base font-bold">
                                            <span className="news-ticker__item">
                                                ★
                                                池原優斗による個人ニュースサイト
                                            </span>
                                            <span className="news-ticker__item">
                                                ★
                                                Web開発・上京生活・日々の出来事を不定期更新中
                                            </span>
                                            <span className="news-ticker__item">
                                                ★ 最新記事は「LATEST
                                                NEWS」からどうぞ
                                            </span>
                                            <span className="news-ticker__item">
                                                ★ コメント・感想お待ちしています
                                                ★
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-left text-xs text-[#b5abab]">
                                        あなたは{' '}
                                        <span className="visitor-counter">
                                            000023
                                        </span>{' '}
                                        人目の訪問者です。
                                    </p>
                                </div>
                            </section>
                            <LatestPostsSection posts={latestPosts} />
                        </div>
                    </div>
                </main>

                <footer className="w-full border-t-3 border-double border-[#5d4141] bg-black px-3 py-4 text-center text-[10px] leading-5 text-[#706767]">
                    推奨環境：1024×768以上 / JavaScript ON
                    <br />
                    IKEHARA PRESS © 2026 · Powered by Laravel &amp; React
                </footer>
            </div>
        </>
    );
}
