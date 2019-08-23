git pull origin master
git checkout master
git merge dev

#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r

if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION 
  # 设置sign-git-tag 为false, 否则会报gpg failed to sign the data
  npm version $VERSION --message "[build: release] $VERSION" --allow-same-version
  npm run build
  npm config set sign-git-tag false
  np --no-cleanup --any-branch --yolo

  # commit
  git add -A
  git commit -m "[build] $VERSION"

  # npm publish

  # publish
  git push origin refs/tags/v$VERSION
  git push origin master
  git checkout dev
  git rebase master
  git push origin dev
fi