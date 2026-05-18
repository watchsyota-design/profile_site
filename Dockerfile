# Webサーバー(Nginx)の軽量版イメージをベースにする
FROM nginx:alpine
# 作業ディレクトリを指定する
WORKDIR . /usr/share/nginx/html
# 80番ポートを公開する
EXPOSE 80