var pwdMgr = require('./managePasswords');

module.exports = function (server, db) {
    // unique index
    db.rewardsLevels.ensureIndex({
        soldto: 1
    }, {
        unique: true
    })

    server.post('/api/v1/bucketList/auth/register_old', function (req, res, next) {
        var user = req.params;
console.log(user.email);
        pwdMgr.cryptPassword(user.password, function (err, hash) {
            user.password = hash;
            db.appUsers.insert(user,
                function (err, dbUser) {
                    if (err) { // duplicate key error
                        if (err.code == 11000) /* http://www.mongodb.org/about/contributors/error-codes/*/ {
                            res.writeHead(400, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify({
                                error: err,
                                message: "A user with this email already exists"
                            }));
                        }
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        dbUser.password = "";
                        res.end(JSON.stringify(dbUser));
                    }
                });
        });
        return next();
    });

    server.post('/api/v1/tisRewards/tab/login', function (req, res, next) {
        var user = req.params;

        if (user.soldto.trim().length == 0) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "Invalid Credentials"
            }));
        }
        db.rewardsLevels.findOne({
            soldto: req.params.soldto
        }, function (err, dbUser) {

            pwdMgr.comparePassword(user.soldto, dbUser.soldto, function (err, isPasswordMatch) {
                if (!isPasswordMatch) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    // remove password hash before sending to the client
                    dbUser.soldto = "";
                    res.end(JSON.stringify(dbUser));
                } else {
                    res.writeHead(403, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify({
                        error: "Invalid User"
                    }));
                }

            });
        });
        return next();
    });
};