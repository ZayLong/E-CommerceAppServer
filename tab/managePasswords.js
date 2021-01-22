//To salt and hash passwords
var bcrypt = require('bcrypt');

//crypt password on registration 
module.exports.cryptPassword = function(password, callback){
	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return callback(err);
		}
		bcrypt.hash(password, salt, function(err, hash){
			return callback(err, hash);
		});
	});
};

//compare password on login
module.exports.comparePassword = function(password, userpassword, callback){
	bcrypt.compare(password, userpassword, function(err, isPasswordMatch){
		if(err){
			return callback(err);
		}
		return callback(null, isPasswordMatch);
	});
};
