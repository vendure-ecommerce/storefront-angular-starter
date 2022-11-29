#!/usr/bin/env bash
cd "${0%/*}"
echo Fetching storefront $1...
curl https://vendure-storefront-artifacts.s3.eu-central-1.amazonaws.com/$1/vendure-storefront-build-$1.zip -L -o storefront.zip
unzip -o storefront.zip
