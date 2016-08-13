#!/bin/sh

now="$(date +'%m-%d-%Y')"
root=/usr/share/nginx/html/archive/$now

clear;
#echo "/usr/share/nginx/html/archive/$now" + "_TEST"
echo "$root"

mkdir $root
cp -r ** $root

#mkdir/usr/share/nginx/html/archive/$folder/css
#cp -r css/*.* archive/$folder/css

#mkdir /usr/share/nginx/html/archive/$folder/img
#cp -r img/".* archive/$folder/img

#mkdir /usr/share/nginx/html/archive/$folder/js
#cp -r js/".* archive/$folder/js

echo 'COMPLETE'
