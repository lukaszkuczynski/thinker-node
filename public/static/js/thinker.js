function Thinker() {

	_this = this;
	this.containerId = '';
	this.presetSelectId = '';
	this.config = {};

	this.loadApp = function(jsonUrl, containerId, presetSelectId, formBuiltCallback) {
		this.containerId = containerId;
		this.presetSelectId = presetSelectId;
		_this = this;
		$.ajax({
			url: jsonUrl, 
			type: 'GET',
			dataType: 'json',
			success: function(data){
				_this.config = data;
				comboloadPresets(presetSelectId, data);
				_this.loadPreset(data.presets[0].name, formBuiltCallback);
			},
			error: function(e) {
				console.error(e);
			}
		});
	}

	extras = 
	{
		'bug' : bugFormExtras,
		'thought' : thoughtFormExtras
	};

	this.loadPreset = function(presetName, formBuiltCallback) {
		thinkerForm.buildForm(this.config, this.containerId, presetName, extras[presetName]);	
		//fillValues();
		viewer.showLast(presetName);
		viewer.showStats();
		if (formBuiltCallback) {
			formBuiltCallback();
		}
	}

	this.applyVisualBootstrap = function() {
		$('#elements>div').addClass('form-group');
		$('#elements>div :input').addClass('form-control');
	}
	




	function fillValues() {
		$('form.thinker .element').each(function(){
			var randomtext = Math.random().toString(36).substring(15);
			$(this).val(randomtext);
		})
	}



	function comboloadPresets(presetSelectId, data) {
		var combo = $('#'+presetSelectId);
		$.each(data.presets, function(k,preset) {
			combo
	          .append($('<option>', { value : preset.name })
	          .text(preset.name)); 
		});
		
	}


	
}

thinker = new Thinker();

var contextPath = '/mysliciel/';