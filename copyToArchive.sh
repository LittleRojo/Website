#!/bin/sh

#GET VARIABLES
now="$(date +'%m-%d-%Y')"
rootFolder=/usr/share/nginx/html/
archiveFolder=/usr/share/nginx/html/archive/$now

#echo "From: $rootFolder"
#echo "To: $archiveFolder"

#COPY SITE TO ARCHIVE
mkdir $archiveFolder
cp -r $rootFolder/*.html $archiveFolder
cp -r $rootFolder/*.xml $archiveFolder
cp -r $rootFolder/*.txt $archiveFolder

mkdir $archiveFolder/css
cp -r $rootFolder/css/*.css $archiveFolder/css

mkdir $archiveFolder/js
mkdir $archiveFolder/js/me
cp -r $rootFolder/js/me/*.js $archiveFolder/js/me

#UPDATE ARCHIVE.HTML
afterText="CURRENT<\/font><\/a><\/td><\/tr>"
toInsert="<tr><td><a style=\\\"text-decoration:none;\\\" href=\\\"https://www.littlerojo.com\/archive\/$now\\\"><font size=\\\"5\\\" face=\\\"Arial Black\\\" color=\\\"#00FF00\\\">$now<\/font><\/a><\/td>><\/tr>"
#echo $afterText
#echo $toInsert

echo sed -i "/${afterText}/a ${toInsert}" /usr/share/nginx/html/archive.html
sed -i "/${afterText}/a ${toInsert}" /usr/share/nginx/html/archive.html

echo 'ARCHIVE CREATED'

cd /usr/share/nginx/html
git add .
git commit -m "$now Branch"
git push origin --mirror

echo 'GIT CHECKIN COMPLETE'

git checkout -b $now
git push origin $now
git checkout master

echo 'GIT BRANCH CHECKED IN'
echo 'COMPLETE'
