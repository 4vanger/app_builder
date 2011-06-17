$(function(){
	initTemplates();
	ZeroClipboard.setMoviePath( '3rd/zeroclipboard/ZeroClipboard.swf' );
	var clip = new ZeroClipboard.Client();
	clip.setHandCursor( true );
	clip.addEventListener('mouseDown', function (client) {
		clip.setText($('#generator').val());
	});

	$('#loading').remove();

	var getLeftTop = function(event, ui){
		var canvas = $('.canvas');
		var canvasOffset = canvas.offset();
		var left = ui.offset.left - canvasOffset.left;
		var top = ui.offset.top - canvasOffset.top;
		return {
			left: left - left % 5,
			top: top - top % 5
		}
	};

	var getLibDataByEl = function(el){
		var id = el.attr('data-libId');
		if(id != null){
			return _library[parseInt(id)];
		}
		return null;
	};

	var _library = [];

	var attachMouseenter = function(dd, libData){
		dd = $(dd);
		// put layover element cause Webkit doesn't allow to DND form elements
		dd.mouseenter(function(){
			$('<div></div>')
				.appendTo(document.body)
				.css('position', 'absolute')
				.offset(dd.offset())
				.width(dd.outerWidth())
				.height(dd.outerHeight())
				.mouseleave(function(){$(this).remove();})
				.mousedown(function(){
					_activeObj = libData;
					showProperties();
				})
				.draggable({
					grid: [5, 5],
					helper: function(event){
						// we need to remove cover element with little delay because DND needs to take its position.
						setTimeout(function(){$(this).remove()}, 100);
						dd.unbind("mouseenter");
						return dd;
					},
					containment: '.canvas'
				});
		}).mouseenter()
	};
	
	var _activeObj = null;
	var showProperties = function(){
		if(_activeObj == null){
			return;
		}
		var obj = _activeObj;
		clearProperties();
		_activeObj = obj;
		$.tmpl('properties', {
			properties: controls[_activeObj.typ].properties,
			interfaces: controls[_activeObj.typ].interfaces,
			events: controls[_activeObj.typ].events,
			libData: _activeObj
		}).appendTo('#propertiesContainer')
		.find('button').button().end()
		.find(".interfaceName").click(function(){$(this).next("ul").slideToggle()});
	};

	var clearProperties = function(){
		_activeObj = null;
		clip.destroy();
		$('#propertiesContainer').html('');
	};

	$('#propertiesContainer input').live('change keyup', function(){
		if(_activeObj == null){
			return;
		}
		var el = $(this);
		var propName = el.attr('name');
		var val = el.val();
		_activeObj.control[propName] = val;
	});
	$('#propertiesContainer #highlightActive').live('click', function(){
		$(_activeObj.dom).addClass('ui-state-highlight').css('opacity', 1)
			.animate({'opacity': 0.3}, 300).animate({'opacity': 1}, 300)
			.animate({'opacity': 0.3}, 300, function(){$(_activeObj.dom).removeClass('ui-state-highlight')}).animate({'opacity': 1}, 300);
	});
	$('#propertiesContainer #removeActive').live('click', function(){
		win.remove(_activeObj.control);

		_library[_activeObj.libId] = null;
		clearProperties();
	});

	$.tmpl('main').appendTo(document.body);
	var win = Ti.UI.currentWindow;
	win.dom.className += ' canvas';
	var canvas = $('.canvas');
	canvas.droppable({
//		accept: '[data-libType]',
		tolerance: 'fit',
		activate: function(){
			canvas.addClass('active');
		},
		deactivate: function(){
			canvas.removeClass('active');
		},
		drop: function(event, ui){
			var el = ui.helper;
			var libData = getLibDataByEl(ui.helper);
			var pos = getLeftTop(event, ui);
			var typ = el.attr('data-libType');
			if(libData != null) {
				libData.control.left = libData.args.left = pos.left;
				libData.control.top = libData.args.top = pos.top;
				// need to restore element cause it was removed on drag end
				var parent = ui.helper[0].parentNode;
				setTimeout(function(){
					parent.appendChild(ui.helper[0]);
					attachMouseenter(ui.helper[0], libData);
				}, 0);
			} else {
				// create
				var obj = controls[typ].create(pos.left, pos.top);
				$(obj.control.dom).attr('data-libId', _library.length).attr('data-libType', typ);

				libData = {
					libId: _library.length,
					control: obj.control,
					dom: obj.control.dom,
					typ: typ,
					args: obj.args,
					events: {}
				};
				_library.push(libData);

				Ti.UI.currentWindow.add(obj.control);
				attachMouseenter(obj.control.dom, libData);
				_activeObj = libData;
				showProperties();
			}
			$(libData.dom).addClass("draggable");

		}
	});
	$('.library [data-libType]').draggable({
		grid: [5, 5],
		helper: 'clone',
		containment: '.canvas'
	});

	$("#generate").button().click(function(){
		// clean all counters
		for(var typ in controls){
			controls[typ].counter = 0;
		}

		var res = ["var win = Ti.UI.currentWindow;\n\n"];
		for(var ii = 0; ii < _library.length; ii++){
			var item = _library[ii];
			if(item == null){
				continue;
			}
			res.push(controls[item.typ].generate(item));
		}

		res = res.join('');
		clearProperties();
		$.tmpl('generator')
			.find('textarea').val(res).end()
			.find('button').button().end()
			.appendTo($('#propertiesContainer').html(''));
		clip.glue($('#copyGenerator').get(0));
		clip.show();
	})
});
