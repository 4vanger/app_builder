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
						dd.unbind('mouseenter');
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
			libData: _activeObj,
			propertiesData: properties,
			interfacesData: interfaces
		}).appendTo('#propertiesContainer')
		.find('button').button().end()
		.find('.interfaceName').click(function(){$(this).next('ul').slideToggle()}).end()
		.find('[data-propertyType="color"], .colorPickerIcon').each(function(ii, el){
				$(el).ColorPicker({
					flat: false,
					onShow: function (colpkr) {
						$(colpkr).fadeIn(500);
						return false;
					},
					onHide: function (colpkr) {
						$(colpkr).fadeOut(500);
						return false;
					},
					onChange: function (hsb, hex, rgb) {
						$(el).siblings('input, .colorPickerIcon').andSelf().each(function(ii, el){
							if(el.className == 'colorPickerIcon'){
								$(el).css('backgroundColor', '#' + hex);
							} else {
								$(el).val('#'+hex).change();
							}
						});
					}
				});
			});

	};

	var clearProperties = function(){
		_activeObj = null;
		clip.destroy();
		// cleanup garbage after ColorPicker
		$('.colorpicker').remove();
		$('#propertiesContainer').html('');
	};

	$('#propertiesContainer .property').live('change keyup', function(){
		if(_activeObj == null){
			return;
		}
		var el = $(this);
		var propName = el.attr('name');
		var prop = properties[el.attr('data-propertyType')];
		if(prop == null){
			prop = properties['text'];
		}
		var val = prop.getValue(this);
		_activeObj.control[propName] = val;
		_activeObj.properties[propName] = val;
	});

	$('#propertiesContainer .event').live('blur', function(){
		if(_activeObj == null){
			return;
		}
		var el = $(this);
		var eventName = el.attr('name');
		var val = el.val();
		if(_activeObj.events[eventName] != null){
			_activeObj.control.removeEventListener(eventName, _activeObj.events[eventName].func);
		}
		_activeObj.events[eventName] = {
			text: val,
			func: new Function(val)
		};
		_activeObj.control.addEventListener(eventName, _activeObj.events[eventName].func);
	});

	var highlightEl = function(el){
		$(el).addClass('ui-state-active').css('opacity', 1)
		.animate({'opacity': 0.3}, 300).animate({'opacity': 1}, 300)
		.animate({'opacity': 0.3}, 300, function(){$(this).removeClass('ui-state-active')}).animate({'opacity': 1}, 300);
	};

	$('#propertiesContainer #highlightActive').live('click', function(){
		highlightEl(_activeObj.dom);
	});
	$('#propertiesContainer #removeActive').live('click', function(){
		win.remove(_activeObj.control);
		_library[_activeObj.libId] = null;
		clearProperties();
	});

	$.tmpl('main').appendTo(document.body);
	var win = Ti.UI.currentWindow;
	win.dom.className += ' canvas';
	$('.library [data-libType]').draggable({
		grid: [5, 5],
		helper: 'clone',
		containment: '.canvas'
	});
	var canvas = $('.canvas');
	canvas.droppable({
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
				libData.control.left = libData.properties.left = pos.left;
				libData.control.top = libData.properties.top = pos.top;
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
					events: {},
					properties: obj.args
				};
				_library.push(libData);

				Ti.UI.currentWindow.add(obj.control);
				attachMouseenter(obj.control.dom, libData);
				_activeObj = libData;
				showProperties();
			}
			$(libData.dom).addClass('draggable');

		}
	});

	$('#showLibrary').button().click(function(){
		console.log(_library);
		clearProperties();
		$.tmpl('showLibrary', {library: _library}).appendTo('#propertiesContainer');
	});
	$('#propertiesContainer .libraryItems li').live('mouseenter', function(){
		var el = _library[parseInt($(this).attr('data-libId'))];
		if(el == null){
			return;
		}
		highlightEl(el.dom);
	}).live('click', function(){
		var libData = _library[parseInt($(this).attr('data-libId'))];
		if(libData == null){
			return;
		}
		_activeObj = libData;
		showProperties();
	});

	var generateCode = function(){
		// clean all counters
		for(var typ in controls){
			controls[typ].counter = 0;
		}

		var res = ['var win = Ti.UI.currentWindow;\n\n'];
		for(var ii = 0; ii < _library.length; ii++){
			var item = _library[ii];
			if(item == null){
				continue;
			}
			res.push(generate(item));
		}
		return res.join('');
	};

	$('#generate').button().click(function(){
		clearProperties();
		$.tmpl('generator')
			.find('textarea').val(generateCode()).end()
			.find('button').button().end()
			.appendTo('#propertiesContainer');
		clip.glue($('#copyGenerator').get(0));
		clip.show();
	});

	$('#run').button().click(function(){
		var html = '<body></body><scr'+'ipt type="text/javascript" src="'+document.location.origin + document.location.pathname.replace(/(.*\/).*/, '$1')+'titanium.js"></scr'+'ipt>'+
			'<scr'+'ipt type="text/javascript">'+generateCode()+'</scr'+'ipt>';
		var win = window.open();
		win.document.write(html);
	});
});
