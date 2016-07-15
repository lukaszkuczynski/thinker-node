const 	
	fs = require('fs'),
	cradle = require('cradle'),
	process = require('process')

;

const COUCH_DB_NAME = 'thoughts';

var ThinkerRepo = function() {
	authUsername = process.env.COUCHDB_AUTH_USERNAME || "";
	authPassword = process.env.COUCHDB_AUTH_PASSWORD || "";
	host = process.env.COUCHDB_HOST || 'localhost';
	port = process.env.COUCHDB_PORT || 5984;

	console.log('connecting to couch at '+host)

	if (authUsername && authPassword) {
		this.couchdb = new(cradle.Connection)(
			host, port, {
				auth: {
					username : authUsername,
					password : authPassword
				}
			}
		).database(COUCH_DB_NAME);
	} else {
		this.couchdb = new(cradle.Connection)(
			host, port
		).database(COUCH_DB_NAME);
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

