docker stop ascreact
docker rm --force ascreact
docker rmi --force asc/ascreact

npm run build

tar cvf ascweb.tar.gz -C ./ ./www/* ./src/config.js index.js
#append the needed files from the ./container directory to root app directory
tar rvf ascweb.tar.gz -C ./container app.js package.json

docker build -f container/Dockerfile -t asc/ascreact .
docker run -p 8080:8080 -d --name SRV_NAME asc/ascreact
