import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import Navbar from '@/components/layout/Navbar';

export default function Register() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="会員登録" />
            <Navbar />

            <div className="py-20 px-6 flex flex-col items-center justify-center bg-linear-to-r from-blue-50 to-indigo-50 min-h-[calc(100vh-64px)]">
                <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
                    <div className="text-center mb-10">
                        <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
                            Join us
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">会員登録</h1>
                        <p className="text-gray-500 text-lg">
                            あなたもブログの一員になりませんか？
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">お名前</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="名前を入力"
                                            className="h-12 rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <InputError message={errors.name} className="mt-1 ml-1" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">メールアドレス</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="example@mail.com"
                                            className="h-12 rounded-xl border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <InputError message={errors.email} className="mt-1 ml-1" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">パスワード</Label>
                                        <PasswordInput
                                            id="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="off"
                                            name="password"
                                            placeholder="Password"
                                            className="h-12 rounded-xl border-gray-200"
                                        />
                                        <InputError message={errors.password} className="mt-1 ml-1" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            パスワード（確認）
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="off"
                                            name="password_confirmation"
                                            placeholder="Confirm password"
                                            className="h-12 rounded-xl border-gray-200"
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-1 ml-1" />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-blue-200 active:scale-[0.98] mt-2"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        アカウントを作成する
                                    </Button>
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-100 text-center text-sm text-gray-600">
                                    すでにアカウントをお持ちですか？{' '}
                                    <TextLink href={login()} tabIndex={6} className="text-blue-600 font-bold hover:underline">
                                        ログインする
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};


