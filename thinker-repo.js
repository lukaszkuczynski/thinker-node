"use strict";

const NodeCouchDb = require('node-couchdb');
const fs = require('fs');

var ThinkerRepo = function(config) {
	// this.config = config;
	this.couch = new NodeCouchDb(config.connection);
	this.dbname = config.dbname;
}


ThinkerRepo.prototype.create = function(document) {
	console.log('create '+document)
}

ThinkerRepo.prototype.readLast = function(lastNumber) {
	console.log(this.couch);
	this.couch.get(this.dbname, "time/view", {}).then((data, headers, status) => {
	    // data is json response 
	    // headers is an object with all response headers 
	    // status is statusCode number 
	    console.log(data)
	}, err => {
		console.log(err)
	    // either request error occured 
	    // ...or err.code=EDOCMISSING if document is missing 
	    // ...or err.code=EUNKNOWN if statusCode is unexpected 
	});

	return [1,2,3];
}

module.exports = ThinkerRepo;




/**

const couch = new NodeCouchDb({

});

couch.get("thoughts").then((data, headers, status) => {
    // data is json response 
    // headers is an object with all response headers 
    // status is statusCode number 
    console.log(data)
}, err => {
	console.log(err)
    // either request error occured 
    // ...or err.code=EDOCMISSING if document is missing 
    // ...or err.code=EUNKNOWN if statusCode is unexpected 
});

**/