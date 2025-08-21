echo "Note password is your user password"
mysqldump -u root -p whogame locations characters character_icons stories story_start_locations story_state > $1
