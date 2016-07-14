function BugFormExtras() {
	this.apply = function() {
		$('#bug_name').on('paste', function(e) {
			// e.preventDefault();
			setTimeout(function() {
				var bug_with_jira_address = $('#bug_name').val();
				bug_name = bug_with_jira_address.replace(/http\:\/\/jira.it.volvo.net\/browse\/|https\:\/\/jira.it.volvo.net\/browse\/|https\:\/\/jira.it.volvo.net:8443\/browse\//,"");

				
				$('#bug_name').val(bug_name)
			}, 100);
		})
	}
}

bugFormExtras = new BugFormExtras();
