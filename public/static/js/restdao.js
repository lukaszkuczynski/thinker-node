function RestDao() {

	_this = this;

	this.url = 'undefined_url';

	this.init = function (api_url, errorCallback, okCallback) {
		_this.url = api_url;
		okCallback();
	};

	this.send = function(msg, meta) {
		msg.timestamp = new Date();
		var url = this.url + '/thought';
		$.ajax({
			type : 'POST',
			url : url,
			data : msg,

		});
		// .done(function(data){

		// })
		// .fail(function(xhr,status) {

		// });
	};


	this.findLast = function(count, type, callback) {	
		if (!count) throw 'count has to be number, found '+count;
		var url = this.url + '/thought/last/'+count;
		$.ajax({
			type : 'GET',
			url : url
		})
		.done(function(rows){
			if (!rows) throw 'no rows returned';
			callback(rows);
		})
		// .done(function(data){
		// 	if (!data.rows) throw 'data has not rows';
		// 	callback(data.rows);
		// })
		.fail(function(jqXHR,status) {
			throw 'findlast failed with status '+jqXHR.statusCode;
		});		
	};

	this.findStats = function(callback) {
		var stats = {
			total : 99,
			lastTime : 99
		};
		// $.
		callback(stats);
	}

	
}


dao = new RestDao();