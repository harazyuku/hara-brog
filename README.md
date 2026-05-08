# My Blog (Laravel 13 + React Inertia)

Laravel 13 と React (Inertia.js) を使用した、モダンで高速なブログアプリケーションです。
Tailwind CSS v4 を採用し、スタイリッシュな UI と快適な開発体験を提供します。

## 🚀 技術スタック

- **Backend:** Laravel 13 (PHP 8.3+)
- **Frontend:** React 19, Inertia.js, TypeScript
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite 6
- **Database:** SQLite (デフォルト) / MySQL / PostgreSQL
- **Tools:** ESLint, Prettier, Pest (Testing)

## 🛠 セットアップ

リポジトリをクローンした後、以下の手順で環境を構築してください。

### 1. 依存関係のインストール

```bash
composer install
npm install
```

### 2. 環境設定

```bash
cp .env.example .env
php artisan key:generate
```

※ `.env` 内の `DB_CONNECTION` などを必要に応じて修正してください。

### 3. データベースの準備

```bash
touch database/database.sqlite  # SQLiteを使用する場合
php artisan migrate
```

## 💻 開発の進め方

以下のコマンドを実行すると、PHP サーバーと Vite の開発サーバーが同時に立ち上がります。

```bash
npm run dev
```

- **Server:** [http://localhost:8000](http://localhost:8000)
- **Vite:** [http://localhost:5173](http://localhost:5173)

## 📂 ディレクトリ構成（主要部分）

- `app/` - Laravel バックエンドのロジック
- `resources/js/Pages/` - React のページコンポーネント
  - `Home.tsx` - トップページ
  - `Posts.tsx` - 記事一覧
  - `PostShow.tsx` - 記事詳細
  - `PostCreate.tsx` - 記事投稿
- `routes/web.php` - ルーティング定義
- `database/` - マイグレーションとシーダー

## 🧪 テスト・フォーマット

```bash
# テストの実行
php artisan test

# リンターの実行
npm run lint

# フォーマットの修正
npm run format
```
