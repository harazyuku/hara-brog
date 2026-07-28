import { Link } from '@inertiajs/react';

function Navbar() {
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
                    <div className="flex min-h-14 flex-col justify-center gap-2 border-x border-[#332828] px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/"
                            className="pixel-title group flex w-fit items-center gap-2 text-2xl text-[#f0ebeb]"
                        >
                            <span className="grid h-8 w-8 place-items-center border border-[#804949] bg-[#392525] text-[#e26666] group-hover:bg-[#4a2c2c]">
                                I
                            </span>
                            IKEHARA{' '}
                            <span className="text-[#d45353]">PRESS</span>
                        </Link>
                        <p className="hidden text-[#898080] sm:block">
                            personal news &amp; development journal
                        </p>
                    </div>
                    <nav
                        className="-mb-px flex flex-wrap items-end gap-px border-x border-t border-[#3f3030] px-1 pt-1"
                        aria-label="メインナビゲーション"
                    >
                        <Link href="/" className="press-tab">
                            ホーム
                        </Link>
                        <Link href="/posts" className="press-tab">
                            記事一覧
                        </Link>
                        <Link href="/posts/create" className="press-tab">
                            投稿する
                        </Link>
                        <span className="ml-auto hidden pb-2 text-[10px] text-[#766d6d] md:block">
                            STATUS: ONLINE
                        </span>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;
