function ThoughtFormExtras() {
	this.apply = function() {
		$('textarea').keyup(function() {
        	var text_length = $(this).val().length;
        	$('textarea').next('.characterscount').html(text_length);
        });
	}
}

thoughtFormExtras = new ThoughtFormExtras();
