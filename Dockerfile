FROM nginx:1.17.8-alpine
COPY dist /app/dist

COPY config/nginx.conf /etc/nginx/nginx.conf
