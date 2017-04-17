tar cvf ./container/ascweb.tar.gz -C ./ ./www/* ./src/config.js index.js
#append the needed files from the ./container directory to root app directory
tar rvf ./container/ascweb.tar.gz -C ./container package.json app.js
