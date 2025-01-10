// FROM node:20-alpine AS build

// WORKDIR /app

// COPY package*.json ./

// RUN npm install

// COPY . .

// RUN npm run build

// FROM nginx:stable-alpine

// COPY --from=build /app/dist /usr/share/nginx/html

// EXPOSE 80

// CMD ["nginx", "-g", "daemon off;"]

// # Secret key for Django project
// SECRET_KEY=django-insecure-hf)i&k$jv^^^^^^^^^^n7%nix4y^v25km6qc*3sf)m

// # Debug mode: set to False in production
// DEBUG=True

// # Allowed hosts: domains/IPs that are allowed to access your app
// ALLOWED_HOSTS=localhost,127.0.0.1

// # Database configuration
// POSTGRES_DB=hosthunt
// DB_USER=postgres
// DB_PASSWORD=123
// DB_HOST=localhost
// DB_PORT=5432

// REDIS_HOST=redis
// REDIS_PORT=6379
// CELERY_BROKER_URL=redis://redis:6379/0

// # Email configuration (example with Gmail)
// EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
// EMAIL_HOST=smtp.gmail.com
// EMAIL_PORT=587
// EMAIL_USE_TLS=True
// EMAIL_HOST_USER=hosthunt000@gmail.com
// EMAIL_HOST_PASSWORD=bwpjv^^^^^^^^^^uwjhq

// # s3 bucket configuration
// AWS_STORAGE_BUCKET_NAME=host-hunt
// AWS_S3_REGION_NAME=eu-north-1
// # AWS_ACCESS_KEY_ID=AKIAVYZHFVP
// # AWS_SECRET_ACCESS_KEY=lDuPuf2tdjv^^^^^^^^^^dbZMJhtSAss
// AWS_ACCESS_KEY_ID=AKIA3FLDY5jv^^^^^^^^^^IFPH2FOOE7
// AWS_SECRET_ACCESS_KEY=jkhSWkjv^^^^^^^^^^QDWrsh

// STRIPE_SECRET_KEY=sk_test_51QPjv^^^^^^^^^^bfRLL1o009BGbpl9w

// OPEN_AI_API_KEY=sk-proj-lZCskl4yfUMjwtHORDdfgdjv^^^^^^^^^^dlbkFJotmiFZz6LFzvDvEN_m4xG3m_0RY2iEBo6QBX-y6_pGEPBC2bnkA8FDdXIA

// # Other API keys or configuration
// # STRIPE_API_KEY=your_stripe_api_key
// # GOOGLE_MAPS_API_KEY=your_google_maps_api_key
