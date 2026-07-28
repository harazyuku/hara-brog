import { Form, Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import InputError from '@/components/input-error';
import Navbar from '@/components/layout/Navbar';
import { Spinner } from '@/components/ui/spinner';
import { home } from '@/routes';
import { store } from '@/routes/login';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    return (
        <div className="retro-page">
            <Head title="管理者ログイン" />
            <Navbar />

            <main className="retro-container py-8 sm:py-12">
                <div className="mx-auto max-w-[560px]">
                    <div className="retro-location mb-3">
                        <span className="text-[#e26666]">IKEHARA PRESS</span> /
                        ADMIN / LOGIN
                    </div>

                    <section className="retro-panel">
                        <h1 className="retro-heading pixel-title">
                            ADMINISTRATOR LOGIN
                        </h1>

                        <div className="p-4 sm:p-6">
                            <div className="mb-5 border border-[#594141] bg-[#130d0d] px-3 py-2 font-mono text-[10px] leading-5 text-[#a99d9d]">
                                <p className="retro-blink text-[#e26666]">
                                    &gt;&gt; AUTHORIZED PERSONNEL ONLY
                                </p>
                                <p>
                                    記事の投稿・編集を行う管理者専用ページです。
                                </p>
                            </div>

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="space-y-4"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-1 block font-mono text-[11px] text-[#d8cccc]"
                                            >
                                                LOGIN ID / E-MAIL
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                className="retro-input font-mono text-sm"
                                                placeholder="your-email@example.com"
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-1 text-xs text-[#ff7373]"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="mb-1 block font-mono text-[11px] text-[#d8cccc]"
                                            >
                                                PASSWORD
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                className="retro-input font-mono text-sm"
                                                placeholder="********"
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-1 text-xs text-[#ff7373]"
                                            />
                                        </div>

                                        <div className="flex items-center border-y border-[#302626] py-3 text-[11px]">
                                            <label className="flex cursor-pointer items-center gap-2 text-[#b9aeae]">
                                                <input
                                                    type="checkbox"
                                                    name="remember"
                                                    tabIndex={3}
                                                    className="size-3.5 accent-[#8f2d2d]"
                                                />
                                                LOGIN STATEを保存
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 pt-1">
                                            <Link
                                                href={home()}
                                                className="retro-link text-xs"
                                            >
                                                « HOMEへ戻る
                                            </Link>
                                            <button
                                                type="submit"
                                                className="da-button min-w-32"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing ? (
                                                    <span className="inline-flex items-center gap-2">
                                                        <Spinner />
                                                        CHECKING...
                                                    </span>
                                                ) : (
                                                    'LOGIN >'
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </Form>

                            {status && (
                                <div className="mt-4 border border-[#4c623f] bg-[#101b0d] px-3 py-2 text-xs text-[#9bd77a]">
                                    {status}
                                </div>
                            )}

                            <div className="mt-6 text-center font-mono text-[9px] leading-4 text-[#625959]">
                                SECURITY SYSTEM Ver.2.0
                                <br />
                                SESSION / COOKIE REQUIRED
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

Login.layout = (page: ReactNode) => page;
