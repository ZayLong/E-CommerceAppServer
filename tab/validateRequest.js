var isNumberValid = function(db, soldto, callback) {
    db.rewardsLevels.findOne({
        soldto: soldto
    }, function(err, user) {
        callback(user);
    });
};

module.exports.validate = function(req, res, db, callback) {
    // if the request dosent have a header with number, reject the request
    if (!req.params.token) {
        res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({
            error: "Invalid Request",
            message: "A Sold To Number Token is required in the header"
        }));
    };

    isNumberValid(db, req.params.token, function(user) {
        if (!user) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "No Data Found",
                message: "Invalid Sold To Number!"
            }));
        } else {
            callback();
        }
    });
};

module.exports.getStores = function(req, res, db, callback) {
	callback();
};

module.exports.getWeMissYou = function(req, res, db, callback) {
	callback();
};

