# --- Build & Runtime Stage ---
FROM php:8.4-apache

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install system dependencies (PHP extensions + SQLite)
RUN apt-get update && apt-get install -y \
    libpng-dev libxml2-dev libzip-dev libpq-dev libonig-dev libicu-dev libsqlite3-dev unzip git curl \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo_mysql pdo_pgsql pdo_sqlite gd zip opcache intl bcmath mbstring \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Apache Config
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --no-interaction --no-dev --optimize-autoloader

# ビルド用環境変数 (SQLiteを使用可能にする)
ENV APP_ENV=production
ENV APP_KEY=base64:j2FzWZip07EHE+ZpQDB30wtXvhQ7orNHTpxei1780XE=
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=:memory:
ENV NODE_OPTIONS=--max-old-space-size=400
ENV PORT=80

# NPM Install & Build
RUN npm install --no-audit --no-fund
# Wayfinderの型生成が失敗してもビルドを止めない
RUN php artisan wayfinder:generate --with-form || echo "Wayfinder skip"
RUN npm run build

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

CMD ["apache2-foreground"]
