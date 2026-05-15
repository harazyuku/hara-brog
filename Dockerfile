# --- Build Stage (PHP + Node.js) ---
FROM php:8.4-cli AS builder

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install system dependencies for PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev libxml2-dev libzip-dev libpq-dev libonig-dev libicu-dev unzip git curl \
    && docker-php-ext-install pdo_mysql pdo_pgsql gd zip intl bcmath mbstring

WORKDIR /app
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Install NPM and Build (Wayfinder needs php artisan to work here)
ENV NODE_OPTIONS=--max-old-space-size=400
RUN npm install
RUN npm run build

# --- Final Stage (Apache) ---
FROM php:8.4-apache

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libxml2-dev libzip-dev libpq-dev libonig-dev libicu-dev unzip git curl \
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

# Copy everything from builder stage
COPY --from=builder /app /var/www/html

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Start Apache
CMD ["apache2-foreground"]
