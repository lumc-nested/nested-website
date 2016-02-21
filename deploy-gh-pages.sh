#!/bin/bash
# Update the GitHub Pages website.

set -o nounset
set -o errexit
set -o pipefail

if [ ! -d "dist" ]; then
    echo "Distribution not found in dist/"
    echo "Did you build the distribution (npm run dist)?"
    exit 1
fi

GH_PAGES="$(mktemp -d)"

git clone git@github.com:lumc-nested/lumc-nested.github.io.git "$GH_PAGES"
export GIT_DIR="$GH_PAGES/.git"
export GIT_WORK_TREE="$GH_PAGES"

rm -Rf "$GH_PAGES/dist"
cp -R index.html dist "$GH_PAGES/"
git add --all
git commit --allow-empty -m "Update website"

git push
