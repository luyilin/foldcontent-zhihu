FROM nginx

COPY . /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT main.html

# CMD sed -i "s/ContainerID: /ContainerID: "$(hostname)"/g" /usr/share/nginx/html/index.html && nginx -g "daemon off;"
