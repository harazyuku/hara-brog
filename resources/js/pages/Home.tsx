import { Head, Link } from '@inertiajs/react';
import InlineGif from '@/components/inline-gif';
import LatestPostsSection from '@/components/layout/LatestPostsSection';
import Navbar from '@/components/layout/Navbar';
import VisitorCounter from '@/components/VisitorCounter';

interface Post {
    id: number;
    title: string;
    content: string;
    category: string;
    created_at: string;
    has_icon: boolean;
}

interface HomeProps {
    latestPosts: Post[];
    visitorNumber: number;
}

export default function Home({ latestPosts, visitorNumber }: HomeProps) {
    return (
        <>
            <Head title="IKEHARA PRESS" />
            <div className="retro-page">
                <Navbar />

                <main className="retro-container retro-site-frame py-2">
                    <div className="retro-location mb-3">
                        <span className="text-[#e26666]">IKEHARA PRESS</span> /
                        HOME / LATEST NEWS
                        <span className="float-right hidden text-[#766] sm:inline">
                            LAST UPDATE: 2026/07/28
                        </span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-[240px_minmax(0,1fr)]">
                        <aside className="space-y-3 self-start">
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
                                    <li className="flex min-h-6 items-center justify-between gap-3">
                                        <span>
                                            <span className="text-[#d45353]">
                                                ›
                                            </span>{' '}
                                            PHP / Laravel
                                        </span>
                                        <InlineGif
                                            src="/images/icon-laravel-pixel.svg"
                                            className="retro-float-icon size-5"
                                        />
                                    </li>
                                    <li className="flex min-h-6 items-center justify-between gap-3">
                                        <span>
                                            <span className="text-[#d45353]">
                                                ›
                                            </span>{' '}
                                            TypeScript / React
                                        </span>
                                        <InlineGif
                                            src="/images/icon-react-pixel.svg"
                                            className="retro-float-icon size-5 [animation-delay:-.35s]"
                                        />
                                    </li>
                                    <li className="flex min-h-6 items-center justify-between gap-3">
                                        <span>
                                            <span className="text-[#d45353]">
                                                ›
                                            </span>{' '}
                                            Inertia.js
                                        </span>
                                        <InlineGif
                                            src="/images/icon-inertia-pixel.svg"
                                            className="retro-float-icon size-5 [animation-delay:-.7s]"
                                        />
                                    </li>
                                </ul>
                            </section>

                            <section className="retro-panel">
                                <h2 className="retro-heading">QUICK LINKS</h2>
                                <div className="flex flex-col gap-2 p-3 text-xs">
                                    <a
                                        href="https://github.com/harazyuku"
                                        className="retro-link flex min-h-6 items-center justify-between gap-3"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span>MY GitHub</span>
                                        <InlineGif
                                            src="/images/icon-github-pixel.svg"
                                            className="retro-float-icon size-5 [animation-delay:-1.05s]"
                                        />
                                    </a>
                                    <a
                                        href="https://github.com/harazyuku/hara-brog"
                                        className="retro-link flex min-h-6 items-center justify-between gap-3"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span>SOURCE</span>
                                        <InlineGif
                                            src="/images/icon-source-pixel.svg"
                                            className="retro-float-icon size-5 [animation-delay:-1.4s]"
                                        />
                                    </a>
                                </div>
                            </section>
                        </aside>

                        <div className="min-w-0 space-y-3">
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
                                        <VisitorCounter
                                            value={visitorNumber
                                                .toString()
                                                .padStart(6, '0')}
                                        />{' '}
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
                    無断転載禁止！リンクはご自由にどうぞ。管理人：池原優斗
                    <br />
                    IKEHARA PRESS © 2026 · Powered by Laravel &amp; React
                </footer>
            </div>
        </>
    );
}
