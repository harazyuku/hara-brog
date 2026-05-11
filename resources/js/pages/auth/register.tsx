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
        <div className="min-h-screen bg-white">
            <Head title="会員登録" />
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">会員登録</h1>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">お名前</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="池原 優斗"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="example@mail.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</Label>
                                        <PasswordInput
                                            id="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="off"
                                            name="password"
                                            placeholder="パスワードを入力"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">パスワード（確認）</Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="off"
                                            name="password_confirmation"
                                            placeholder="もう一度パスワードを入力"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 active:scale-[0.98]"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        アカウントを作成する
                                    </Button>
                                </div>

                                <div className="mt-8 text-center text-sm text-gray-600 border-t pt-6">
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


