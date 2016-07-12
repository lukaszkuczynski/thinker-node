const 	
		fs = require('fs'),
		cradle = require('cradle')
		;

var ThinkerRepo = function(config) {
	this.couchdb = new(cradle.Connection)(
		config.connection.host, config.connection.port, {
			auth: {
				username : config.connection.auth.user,
				password: config.connection.auth.pass
			}
		}
	).database(config.dbname);
}


ThinkerRepo.prototype.create = function(document) {
	console.log('create '+document)
}

ThinkerRepo.prototype.readLast = function(lastNumber) {
	this.couchdb.view("time/view", {'descending' : true, 'limit' : lastNumber}, function(err,doc) {
		if (err) {
			console.log('error');
			console.dir(err);
		} else {
			console.dir(doc);
		}
	});
}

module.exports = ThinkerRepo;

