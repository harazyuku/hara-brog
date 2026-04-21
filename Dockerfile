FROM php:8.2-apache

# 1. 必要なライブラリのインストール（gitとunzipを追加）
RUN apt-get update && apt-get install -y \
    libpng-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    git \
    unzip \
    && docker-php-ext-install pdo_mysql gd zip

# 2. Apacheの設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN a2enmod rewrite

# 3. 作業ディレクトリの設定
WORKDIR /var/www/html

# 4. ソースコードをコピー
COPY . /var/www/html

# 5. Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Composerの実行（メモリ不足や競合を避ける設定を追加）
RUN composer install --no-dev --optimize-autoloader --no-interaction

# 7. 権限の設定（Laravelがログやキャッシュを書けるようにする）
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
