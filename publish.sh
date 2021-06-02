if [ -d "${HOME}/.nvm/" ]
then
  . ${HOME}/.nvm/nvm.sh
fi
nvm use v6.12.0

npm run build

git add -A
git commit -m "build"

npm version patch
git push

npm publish