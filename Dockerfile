# --- Node.js Build Stage ---
FROM node:20 AS node_builder
# Viteビルド中に php artisan wayfinder:generate が走るためPHPが必要
RUN apt-get update && apt-get install -y php-cli php-xml php-mbstring unzip

WORKDIR /app
COPY package*.json ./
ENV NODE_OPTIONS=--max-old-space-size=400
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# --- PHP/Apache Stage ---
FROM php:8.3-apache
...
# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    libonig-dev \
    libicu-dev \
    git \
    unzip \
    curl \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo_mysql pdo_pgsql gd zip opcache intl bcmath mbstring \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Apache Config
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# Make Apache listen to the $PORT
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/g' /etc/apache2/sites-available/000-default.conf

# Set environment variables
ENV PORT=80
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /var/www/html

# Copy application files
COPY . .

# Copy build artifacts from node_builder
COPY --from=node_builder /app/public/build ./public/build

# Install PHP dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Create necessary directories and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache} bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Start Apache
CMD ["apache2-foreground"]
