#!/bin/sh

echo "🧹 Cleaning up temp directory"
rm -rf /tmp/outclimb-lookaside

echo "📦 Downloading the latest"
git clone --branch $2 --depth 1 https://github.com/OutClimb/Outclimb.gay.git /tmp/outclimb-lookaside
cd /tmp/outclimb-lookaside

if [ $1 = "create" ]; then
    docker build --no-cache --build-arg="BRANCH_NAME=$2" --tag outclimbgay_create-lookaside:latest -f scripts/lookaside/create-lookaside.dockerfile .
    docker run --env BRANCH_NAME=$2 --volume outclimb_lookasides:/lookaside --name outclimbgay_create-lookaside outclimbgay_create-lookaside:latest

    echo "🧹 Cleaning up container and image"
    docker container rm outclimbgay_create-lookaside
    docker image rm outclimbgay_create-lookaside:latest
elif [ $1 = "delete" ]; then
    docker build --no-cache --tag outclimbgay_delete-lookaside:latest -f scripts/lookaside/delete-lookaside.dockerfile .
    docker run --env BRANCH_NAME=$2 --volume outclimb_lookasides:/lookaside --name outclimbgay_delete-lookaside outclimbgay_delete-lookaside:latest

    echo "🧹 Cleaning up container and image"
    docker container rm outclimbgay_delete-lookaside
    docker image rm outclimbgay_delete-lookaside:latest
else
  echo "🚨 Invalid command"
  exit 1
fi

echo "🧹 Cleaning up temp directory"
rm -rf /tmp/outclimb-lookaside
