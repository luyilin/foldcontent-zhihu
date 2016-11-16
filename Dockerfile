FROM nginx

COPY . /usr/share/nginx/html

EXPOSE 80

CMD sed -i "s/ContainerID: /ContainerID: "$(hostname)"/g" /usr/share/nginx/html/main.html && nginx -g "daemon off;"
