user=$1
current_dir=$(pwd)
dist_dir=$current_dir/dist
website_dir=/var/www/website

#rm -rf $dist_dir
#mkdir -p $dist_dir

npm run build

ssh $user@smirky-games.com "rm -rf $website_dir"
scp -r $dist_dir $user@smirky-games.com:$website_dir