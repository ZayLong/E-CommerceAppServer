module.exports = function(server, db2) {
var validateRequest = require("../tab/validateRequest");
var validateRequestContent = require("../tab/validateRequestContent");

	server.get('/api/v1/news/data/list', function(req, res, next){

    	db2.news.find({newsblock:req.params.newsblock}, function(err, data) {
			if(err) {
				res.writeHead(400, {
            		'Content-Type': 'application/json; charset=utf-8'
        		});
        		res.end(JSON.stringify({
            		error: "Bad Request",
            		message: "Malformed or incomplete query"
        		}));
			} else {
				res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
			}
		});

    	return next();
	});

	server.get('/api/v1/promo/data/list', function(req, res, next){

    	db2.promo.find({page:req.params.page}, function(err, data) {
			if(err) {
				res.writeHead(400, {
            		'Content-Type': 'application/json; charset=utf-8'
        		});
        		res.end(JSON.stringify({
            		error: "Bad Request",
            		message: "Malformed or incomplete query"
        		}));
			} else {
				res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
			}
		});

    	return next();
	});

//FOR CONTENT MANAGEMENT SYSTEM
//Get all news cards and list em
server.get("/api/v1/bucketList/data/list", function (req, res, next) {
        validateRequestContent.validate(req, res, db2, function () {
console.log(db2);
            db2.news.find({
                user : req.params.token
            },function (err, list) {
console.log(err);
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(list));
            });
        });
        return next();
    });

//Get a specific news card
    server.get('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequestContent.validate(req, res, db2, function () {
            db2.news.find({
                _id: db2.ObjectId(req.params.id)
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });

//Save a new news card
    server.post('/api/v1/bucketList/data/item', function (req, res, next) {
        validateRequestContent.validate(req, res, db2, function () {
            var item = req.params;
            db2.news.save(item,
                function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
        });
        return next();
    });

//Update a news card
    server.put('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequestContent.validate(req, res, db2, function () {
            db2.news.findOne({
                _id: db2.ObjectId(req.params.id)
            }, function (err, data) {
                // merge req.params/product with the server/product

                var updProd = {}; // updated products 
                // logic similar to jQuery.extend(); to merge 2 objects.
                for (var n in data) {
                    updProd[n] = data[n];
                }
                for (var n in req.params) {
                    if (n != "id")
                        updProd[n] = req.params[n];
                }
                db2.news.update({
                    _id: db2.ObjectId(req.params.id)
                }, updProd, {
                    multi: false
                }, function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
            });
        });
        return next();
    });

//Delete a news card
    server.del('/api/v1/bucketList/data/item/:id', function (req, res, next) {
        validateRequestContent.validate(req, res, db2, function () {
            db2.news.remove({
                _id: db2.ObjectId(req.params.id)
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
            return next();
        });
    });

//Update promo url
server.put('/api/v1/content/promo/url/:url', function (req, res, next) {
req.params.url = req.params.url.replace(/@/g, "/");
            db2.promo.findOne({
                page: "dashboard"
            }, function (err, data) {
                db2.promo.update({page:"dashboard"}, 
                {
                    $set:{url:req.params.url},
                },{multi:false}, function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
            });
        return next();
    });
};