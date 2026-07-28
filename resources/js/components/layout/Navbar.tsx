import { Link, usePage } from '@inertiajs/react';
import { login, logout } from '@/routes';
import { create, index } from '@/routes/posts';

function Navbar() {
    const { auth } = usePage().props;

    return (
        <>
            <img
                src="/images/haikei.PNG"
                alt=""
                aria-hidden="true"
                className="retro-background"
                draggable={false}
            />
            <header className="border-y border-[#3b3030] border-t-[#8f2d2d] bg-black text-xs">
                <div className="retro-container">
                    <div className="flex min-h-20 flex-col justify-center gap-2 border-x border-[#332828] px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/"
                            className="pixel-title group flex w-fit items-center gap-2 text-2xl text-[#f0ebeb]"
                        >
                            <img
                                src="/images/mario-dancing.gif"
                                alt=""
                                aria-hidden="true"
                                className="h-16 w-auto object-contain"
                            />
                            IKEHARA{' '}
                            <span className="text-[#d45353]">PRESS</span>
                        </Link>
                        <div className="hidden items-center gap-3 sm:flex">
                            <div className="text-right">
                                <p className="retro-blink text-[#d8b66b]">
                                    ☆ WELCOME TO MY HOMEPAGE ☆
                                </p>
                                <p className="text-[9px] text-[#898080]">
                                    personal news &amp; development journal
                                </p>
                            </div>
                            <img
                                src="/images/retro-tech-decoration.gif"
                                alt="パソコンの周りをLaravel、React、TypeScriptのロゴが回るレトロGIF"
                                className="h-12 w-auto max-w-36 object-contain"
                            />
                        </div>
                    </div>
                    <nav
                        className="-mb-px flex flex-wrap items-end gap-px border-x border-t border-[#3f3030] px-1 pt-1"
                        aria-label="メインナビゲーション"
                    >
                        <Link href="/" className="press-tab">
                            ホーム
                        </Link>
                        <Link href={index()} className="press-tab">
                            記事一覧
                        </Link>
                        {auth.user?.is_admin && (
                            <Link href={create()} className="press-tab">
                                投稿する
                            </Link>
                        )}
                        {auth.user ? (
                            <Link
                                href={logout()}
                                as="button"
                                className="press-tab"
                            >
                                ログアウト
                            </Link>
                        ) : (
                            <Link href={login()} className="press-tab">
                                管理者ログイン
                            </Link>
                        )}
                        <span className="ml-auto hidden pb-2 text-[10px] text-[#766d6d] md:block">
                            STATUS: ONLINE
                        </span>
                    </nav>
                    <div className="retro-address-bar">
                        <span className="shrink-0 text-[#e26666]">
                            LOCATION:
                        </span>
                        <span className="truncate text-[#c6bebe]">
                            /index.html
                        </span>
                        <span className="ml-auto hidden shrink-0 text-[#706767] sm:inline">
                            56K MODEM / UTF-8 / JS:ON
                        </span>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;
