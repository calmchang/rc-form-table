if [ -d "${HOME}/.nvm/" ]
then
  . ${HOME}/.nvm/nvm.sh
fi
nvm use v6.12.0

npm config delete registry
npm config delete registry -g
npm config rm proxy
npm config rm https-proxy
npm cache clean --force

npm i
npm run build

git add -A
git commit -m "build"

npm version patch
git push

npm publish