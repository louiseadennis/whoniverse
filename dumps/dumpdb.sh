echo "Note password is your user password"
mysqldump -u root -p whogame locations characters character_icons > $1
