module.exports = function(server, db) {
//FOR CONTENT MANAGEMENT SYSTEM 
    var validateRequest = require("../tab/validateRequest");

//REWARDS STUFF FOR THE TIS APP 
    server.get("/api/v1/rewardsLevels/data/list", function(req, res, next) {
        validateRequest.validate(req, res, db, function() {
            db.rewardsLevels.find({
                soldto: req.params.token
            }, function(err, list) {

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

                res.end(JSON.stringify(list));

            });
        });

        return next();
    });

    server.get("/api/v1/rewardsCoupons/data/list", function(req, res, next) {
        validateRequest.validate(req, res, db, function() {
console.log(db);
            db.rewardsCoupons.find({
                soldto: req.params.token
            }, function(err, data) {

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });

        return next();
    });

server.get("/api/v1/couponThankYou/data/list", function(req, res, next) {
        validateRequest.validate(req, res, db, function() {
console.log(db);
            db.couponThankYou.find({
                soldto: req.params.token
            }, function(err, data) {

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });

        return next();
    });

server.get("/api/v1/couponWeMissYou/data/list", function(req, res, next) {
        validateRequest.getWeMissYou(req, res, db, function() {
console.log(db);
            db.couponWeMissYou.find({
                soldto: req.params.token
            }, function(err, data) {

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });

        return next();
    });
	

    server.get("/api/v1/rewardsStores/data/list", function(req, res, next) {
         validateRequest.getStores(req, res, db, function() {
            db.storeMap.find(function(err, data) {

                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });

        return next();
    });


}