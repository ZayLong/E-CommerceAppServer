php convertToJSON.php 1 
php convertToJSON.php 2
php convertToJSON.php 4
mongo tisRewards --eval "db.dropDatabase()"
mongoimport -d tisRewards -c rewardsLevels --type json --file rewardsLevels.JSON
mongoimport -d tisRewards -c rewardsCoupons --type json --file rewardsCoupons.JSON
mongoimport -d tisRewards -c couponWeMissYou --type json --file couponWeMissYou.JSON
mongoimport -d tisRewards -c storeMap --type json --file stores.JSON
