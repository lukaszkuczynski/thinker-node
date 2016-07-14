function Viewer() {
	this.container = '';	
	this.type = '';
	this.count = '';

	this.init = function(count, container) {
		this.count = count;
		this.container = container;
	}

	this.showLast = function(type) {
		var _this = this;
		this.type = type;
		var containerz = this.container;
		dao.findLast(this.count, type, function(rows){
			_this.fillTable(containerz, rows);	
		});
		
	}

	var elasticRowValuesfunction = function(hit) {
		var rowval = _.extend(hit._source, hit.fields)
		var hit_picked = _.pick(hit, ['_id']);
		var rowvalid = _.extend(rowval, hit_picked);
		return rowvalid;
	}
	var couchRowValuesfunction = function(row) {
		var row_picked = {};
		row_picked['bug_name'] = '';
		row_picked = _.pick(row.value, ['_id','text','timestamp','bug_name','link','tags']);
		// var rowvalid = _.extend(rowval, hit_picked);
		return row_picked;
	}

	this.fillTable = function(container, rows) {
		var _this = this;

		
		btnClickCallback = function(btnType, id) {
			if (btnType == 'delete') {
				_this.showInfo('trwa usuwanie', 2000);
				dao.deleteId(_this.type, id);
				setTimeout(function() {
					_this.refresh(); 
					_this.showInfo('usuniete', 3000);
				}, 1000);
			}			
		}
		dataTablesUtils.makeDatatableFromJson(container, rows, couchRowValuesfunction, rowClickCallback, cellClickCallback, false, btnClickCallback);
	}

	rowClickCallback = function(el) {
	}

	cellClickCallback = function(cell) {
		thinkerForm.fillCell(cell);
	}

	this.refresh = function() {
		this.showLast(this.type);
	}

	this.showStats = function() {
		dao.findStats(function(stats) {
			var total = "??";
			var lastTimeFrom = "??";
			total = stats.total;
			lastTime = stats.lastTime;
			lastTimeFrom = moment(lastTime).fromNow();
			$('#lastTime').html(lastTimeFrom);
			$('#total').html(total);
		});
	}

	this.showError = function(error) {
		$('#error-msg').show();
		$('#error-msg').html(error);
	}

	this.showInfo = function(msg, timeout) {
		$('#info-msg').show().delay(timeout).fadeOut('slow');
		$('#info-msg').html(msg);

	}
}


viewer = new Viewer();