FROM php:8.4-apache

# 必要なライブラリのインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo_mysql pdo_pgsql gd zip

# Apacheの設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN a2enmod rewrite

# 作業ディレクトリの設定
WORKDIR /var/www/html

# ソースコードをコピー
COPY . /var/www/html

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Composerの実行
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Vite build
RUN npm install && npm run build

# 権限の設定
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
