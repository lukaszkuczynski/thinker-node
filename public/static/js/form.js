$(document).ready(function(){
	$('button#clear').click(function(e){
		e.preventDefault();
		thinkerForm.clear();
	});
	$('button#save').click(function(e){
		e.preventDefault();
		var form = thinkerForm.collectForm();
		var meta = thinkerForm.getMeta();
		viewer.showInfo('saving', 3000);
		dao.send(form, meta);
		setTimeout(function() {
			viewer.refresh();
			viewer.showInfo('saved', 2000);
			thinkerForm.clear();
		}, 2000);
	});
});

_this = this;

function ThinkerForm() {

	var defaultPreset = 'thought';

	this.clear = function() {
		$('form.thinker :input').val('');
	},

	this.collectForm = function() {
		var form = {};
		$('form.thinker .element').each(function() {
			var type = $(this).data('type');
			var id = $(this).attr('id');
			var valueFunctionName = typeToGetValueFunction[type];
			var value = window[valueFunctionName].apply(_this,[$(this)]);
			form[id] = value;
		});
		var preset = $('#preset').val();
		if (preset != defaultPreset) {
			form['type'] = preset;
		}
		return form;
	}

	this.fillFormWithValues = function(record) {
		$('form.thinker .element').each(function() {
			var type = $(this).data('type');
			var id = $(this).attr('id');
			var setValueFunctionName = typeToSetValueFunction[type];
			window[setValueFunctionName].apply(_this,[$(this), record[id]]);
		});
		return form;
	}

	this.fillCell = function(cell) {
		var sel = 'form.thinker #' + cell.key;
		$(sel).val(cell.value);
	}


	this.getMeta = function() {
		var meta = {
			index_name : $('form.thinker').attr('index'),
			type_name : $('form.thinker').attr('type')
		};
		return meta;
	}

	this.buildForm = function(data, containerId, presetName, extras) {
		if (!data.presets) throw "json should contain presets!"
		$('#'+containerId).html('');
		$.each(data.presets, function(k,preset) {
			if (preset.name == presetName) {
				$.each(preset.elements, function(k, element) {
					if (element.type == 'text') {
						var row = getInput(element.label, element.id);
					} 
					if (element.type == 'tags') {
						var row = getTags(element.label, element.id);
					} 
					if (element.type == 'select') {
						var row = getSelect(element.label, element.id, element.options);
					} 
					if (element.type == 'multi') {
						var row = getMulti(element.label, element.id);
					} 
					$('#'+containerId).append(row);
				});
			}
		});
		form = $('#'+containerId).closest('form');
		form.attr('index','thinker');
		form.attr('type',presetName);

		thinker.applyVisualBootstrap();

		if (extras) {
			extras.apply();
		}

	}


	function getInput(label, id) {
		var t = "<div>";
		t += '<label for="'+id+'">'+label+"</label>";
		t += '<input class="element text" data-type="text" type="text" id="'+id+'">';
		t += "</div>";
		return t;
	}


	function getTags(label, id) {
		var t = "<div>";
		t += '<label for="'+id+'">'+label+"</label>";
		t += '<input class="element tags" data-type="tags" type="text" id="'+id+'">';
		t += "</div>";
		return t;
	}

	function getSelect(label, id, options) {
		var t = "<div>";
		t += '<label for="'+id+'">'+label+"</label>";
		t += '<select class="element" data-type="select" id="'+id+'">';
		for (n in options) {
			t += '<option value="' + options[n] +'">' + options[n] +'</option>';
		}
		t += '</select>';
		t += "</div>";
		return t;
	}

	function getMulti(label, id) {
		var t = "<div>";
		t += '<label for="'+id+'">'+label+"</label>";
		t += '<textarea class="element" data-type="multi" id="'+id+'">';
		t += '</textarea>';
		t += '<span class="characterscount"/>';
		t += "</div>";
		return t;
	}

	

}

thinkerForm = new ThinkerForm();

var typeToGetValueFunction = {
	'text' : 'getText',
	'tags' : 'getTags',
	'select' : 'getSelect',
	'multi' : 'getText'
};

var typeToSetValueFunction = {
	'text' : 'setText',
	'tags' : 'setTags',
	'select' : 'setSelect',
	'multi' : 'setText'
};


this.getText = function(el) {
	return el.val();
}

this.setText = function(el, val) {
	el.val(val);
}

this.getTags = function(el) {
	var tags = el.val().split(',');
	var trimmed = _.map(tags, function(a) {return a.trim();});
	var onlynotempty = _.filter(trimmed, function(a) { return (a.length > 0)});
	return onlynotempty;
}

this.setTags = function(el, val) {
	el.val(val);
}

this.getSelect = function(el) {
	return el.val();
}

this.setSelect = function(el, val) {
	el.val(val);
}