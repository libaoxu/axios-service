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
  npm run build

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[build: release] $VERSION"

  if [[ -z $RELEASE_TAG ]]; then
    npm publish
  else
    npm publish --tag $RELEASE_TAG
  fi

  # publish
  git push origin refs/tags/v$VERSION
  git push origin master
  git checkout dev
  git rebase master
  git push origin dev
fi