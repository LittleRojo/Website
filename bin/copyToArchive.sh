#!/bin/sh

#GET VARIABLES
now="$(date +'%m-%d-%Y')"
rootFolder=/usr/share/nginx/html/
archiveFolder=/usr/share/nginx/html/archive/$now

#echo "From: $rootFolder"
#echo "To: $archiveFolder"

#UPDATE SITEMAP
afterSM="<!--AUTO-MARKER-->"
toInsertSM="<!--$now--><url><loc>https://www.littlerojo.com\/archive\/${now}\/<\/loc><lastmod>2016-07-30T19:42:26+00:00<\/lastmod><\/url><url><loc>https://www.littlerojo.com\/archive\/${now}\/gallery.html<\/loc><lastmod>2016-07-30T19:42:26+00:00<\/lastmod><\/url><url><loc>https://www.littlerojo.com\/archive\/${now}\/games.html<\/loc><lastmod>2016-07-30T19:42:26+00:00<\/lastmod><\/url><url><loc>https://www.littlerojo.com\/archive\/${now}\/admin.html<\/loc><lastmod>2016-07-30T19:42:26+00:00<\/lastmod><\/url><url><loc>https://www.littlerojo.com\/archive\/${now}\/about.html<\/loc><lastmod>2016-07-30T19:42:26+00:00<\/lastmod><\/url>"

echo sed -i "/${afterSM}/a ${toInsertSM}" /usr/share/nginx/html/sitemap.xml
sed -i "/${afterSM}/a ${toInsertSM}" /usr/share/nginx/html/sitemap.xml

echo 'SITEMAP UPDATED'

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
#sed -i "/${afterText}/a ${toInsert}" /usr/share/nginx/html/archive.html

echo 'ARCHIVE CREATED'

cd /usr/share/nginx/html
#git add .
#git commit -m "$now Branch"
#git push origin --mirror

echo 'GIT CHECKIN COMPLETE'

#git checkout -b $now
#git push origin $now
#git checkout master

echo 'GIT BRANCH CHECKED IN'
echo 'COMPLETE'
