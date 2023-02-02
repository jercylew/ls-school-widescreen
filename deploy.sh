#!/bin/bash

## File: deploy.sh
## A script for auto deploy current version to web server

Help()
{
   # Display Help
   echo "Deploy the app to server."
   echo
   echo "Syntax: deploy [-g|h|d|v|V]"
   echo "options:"
   echo "g     Print the GPL license notification."
   echo "d     Deploy to local debug server."
   echo "h     Print this Help."
   echo "v     Verbose mode."
   echo "V     Print software version and exit."
   echo
}

DeployLocal()
{
    echo "Deploy to local server"
    # rm -rf /home/tkt/workspace/ls-mesh-server/public/bebebus-cms-center/*
    # cd ./build
    # mv ./* ~/workspace/ls-mesh-server/public/bebebus-cms-center/
}

while getopts 'hdu:p:V' OPTION; do
    case "$OPTION" in
        h)
            # Print hostname
            Help
            exit 0 ;;
        d)
            DeployLocal
            exit 0 ;;
        u)
            # Print username
            echo "The username is $OPTARG" ;;
        p)
            # Print password
            echo "The password is $OPTARG" ;;
        V)
            echo "Version 1.0.0, Copyright(2021)"
            exit 0 ;;
        *)
            # Print helping message for providing wrong options
            echo "Usage: $0 [-h value] [-u value] [-p value]" >&2
            # Terminate from the script
            exit 1 ;;
    esac
done

SERVER_ADDR=118.24.201.167
APP_PATH=/usr/local/ls-apps/ls-mesh-server/public/ls-school-widescreen

echo 'Begin deploying to server'

echo 'Clear old files ...'
ssh root@${SERVER_ADDR} 'cd /usr/local/ls-apps/ls-mesh-server/public/ls-school-widescreen && ls -l && rm -rf ./*'

if [ ! -f ./build/index.html ]; then
  echo 'App not yet built, please run `npm run build`'
  exit 1
fi
echo 'Uploading files ...'

cd build
scp -rv ./* root@${SERVER_ADDR}:${APP_PATH}
