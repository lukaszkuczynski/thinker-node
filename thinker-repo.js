const 	
		fs = require('fs'),
		cradle = require('cradle')
		;

var ThinkerRepo = function(config) {
	if (!config.connection.auth) {
		this.couchdb = new(cradle.Connection)(
			config.connection.host, config.connection.port
		).database(config.dbname);
	} else {
		this.couchdb = new(cradle.Connection)(
			config.connection.host, config.connection.port, {
				auth: {
					username : config.connection.auth.user,
					password: config.connection.auth.pass
				}
			}
		).database(config.dbname);
	}	
}


ThinkerRepo.prototype.create = function(document, callback) {
	this.couchdb.save(document, function(err, res) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, res);
		}
	});
}

ThinkerRepo.prototype.readLast = function(lastNumber, callback) {
	this.couchdb.view("time/view", {'descending' : true, 'limit' : lastNumber}, function(err,docs) {
		if (err) {
			console.log('error');
			console.dir(err);
			callback(err, null)
		} else {
			// success
			callback(null, docs);
		}
	});
}

module.exports = ThinkerRepo;

