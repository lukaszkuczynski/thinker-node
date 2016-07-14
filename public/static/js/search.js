function Search() {
	this.controls = function() {
		$('.datepickerable').datepicker({
			"dateFormat" : "yy-mm-dd"
		});
		$('#get-distinct').click(function(){
			var field = $('#distinct-category').val();
			var from = $('#from').val();
			var to = $('#to').val();			
			dao.getDistinct('bug', field, from, to, function(resp) {				
				var keys = _.pluck(resp, 'key').join(',');
				$('#distinct_values').val(keys);
			});
		});
	}

	this.events = function() {
		$('.datepickerable').change(function() {
			findByDates();
		});
	}

	findByDates = function() {
		var from = $('#from').val();
		var to = $('#to').val();
		dao.findByDates(from, to, 'bug', function(docs) {
			viewer.fillTable('docs', docs);
		});
	}

	this.devsearch = function() {
		$('#from').val('2015-07-01');
		$('#to').val('2015-07-03');
		findByDates()
	}
}

search = new Search();


$(document).ready(function(){

	search.controls();
	search.events();

	setTimeout(function() {
		search.devsearch();
	}, 1000)
});

