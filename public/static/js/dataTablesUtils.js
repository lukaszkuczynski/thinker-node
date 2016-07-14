/**
Util to produce datatable from json
uses
- datatables (wow!)
- underscore
- moment
**/

function DataTablesUtils(){

	function isTimestampField(field) {
		return (field.search('timestamp') > -1);
	}

	function isIdField(field) {
		return (field.search('id') > -1);
	}

	this.makeDatatableFromJson = function(elementId, json, rowValuesfunction, rowClickCallback, cellClickCallback, buttonsEnabled, btnClickCallback) {

		
		if (!json.length) {
			dt.clear().draw();
			throw "json to create datatable is empty";
		}


		var ks = rowValuesfunction(json[0]);
		var keys = _.keys(ks);
		var idTimestamp = 0;
		var idId = -1;

		var cols = _.map(keys, function(k){
			var col = {
				"title" : k,
				"defaultContent" : '[EMPTY]'
			};
			if (isTimestampField(k)) {
				idTimestamp = _.indexOf( keys , k );
				_.extend(col, {
					"render": function(k) {
						return moment(k).format('DD MMM, H:mm:ss');
					},
				});
			}
			if (isIdField(k)) {
				idId = _.indexOf( keys , k );
				_.extend(col, {
					"visible": false
				});
			}
			return col;
		});
		if (buttonsEnabled) {
			cols.push({
				"title": "btn"			
			});
		}


		var dataSet = [];
		$.each(json, function(k,entry){			
			var vals = rowValuesfunction(entry);
			if (buttonsEnabled) {
				vals['btn'] = '';
			}
			dataSet.push(_.values(vals));
		});		

		var tableSel = $('#'+elementId);


		if (window.dt) {
			window.dt.destroy();
			tableSel.html('')
			tableSel.removeClass('no-footer');
			tableSel.removeAttr('aria-describedby');
			tableSel.removeAttr('role');
			tableSel.removeClass('no-footer')
		}
		window.dt = tableSel.DataTable({
			// "dom" : "ft",
			dom: 'T<"clear">frt',
			"columns" : cols,
			"data": dataSet,
			"bDestroy" : true,
			"order" : [idTimestamp, 'desc'],
			"tableTools": {
	            "sRowSelect": "single"
	        },
	        "createdRow": function ( row, data, index ) {
	        	if (buttonsEnabled) {
		        	var id = data[idId];
		        	var delBtnHtml = '<button class="delete-row" id="'+id+'">del</button>';
		        	$('td', row).last().html(delBtnHtml);
		        }
	        }	
		});

		if (btnClickCallback) {
			$('button.delete-row').click(function(e){
				e.preventDefault();
				var id = $(this).attr('id');
				btnClickCallback('delete', id);
			});
		}

		if (rowClickCallback) {
			tableSel.on( 'click', 'tr', function (z) {
				var vals = dt.row( this ).data();
				var keyvals = _.object(keys, vals);
				rowClickCallback(keyvals);
			});
		}
		if (cellClickCallback) {
			tableSel.on( 'click', 'td', function (z) {
				var cellVal = dt.cells( this ).data()[0];
				var columnId = dt.cells( this )[0][0].column;
				var key = keys[columnId];
				var cell = {key : key, value : cellVal};
				cellClickCallback(cell);
			});
		}

	}
}


dataTablesUtils = new DataTablesUtils();