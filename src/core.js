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

	var args2str = function(args){
		var str = [];
		for(var arg in args){
			var line = [];
			line.push('\t');
			if(/^\w[\w\d]*$/.test(arg)){
				line.push(arg);
			} else {
				line.push('\'');
				line.push(arg.replace(/'/g, '\\\''));
				line.push('\'');
			}
			line.push(': ');
			var value = args[arg];
			if(typeof value === 'string'){
				line.push('\'');
				line.push(value.replace(/\\/g, '\\\\').replace(/'/g, '\\\''));
				line.push('\'');
			} else if(typeof value === 'number'){
				line.push(value);
			}

			str.push(line.join(''));
		}
		return str.join(',\n');
	};

	var controls = {
		TextField: {
			counter: 0,
			create: function(left, top){
				var args = {
					left: left,
					top: top
				};
				var el = Ti.UI.createTextField(args);
				el.dom.readOnly = true;
				return {
					control: el,
					args: args
				};
			},
			generate: function(item){
				return 'var tf' + controls.TextField.counter++ + ' = Ti.UI.createTextField({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			}
		},
		Label: {
			counter: 0,
			create: function(left, top){
				var args = {
					left: left,
					top: top,
					text: prompt('Label text')
				};

				return {
					control: Ti.UI.createLabel(args),
					args: args
				};
			},
			generate: function(item){
				return 'var lb' + controls.Label.counter++ + ' = Ti.UI.createLabel({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			},
			interfaces: ['DOMView', 'EventDriven', 'Clickable', 'Touchable', 'Styleable', 'Positionable', 'Fontable'],
			properties: {
				'text': 'text',
				'html': 'text',
				'textAlign': 'text',
				'textid': 'text'
			}
		},
		TextArea: {
			counter: 0,
			create: function(left, top){
				var args = {
					left: left,
					top: top
				};
				var el = Ti.UI.createTextArea(args);
				el.dom.readOnly = true;
				return {
					control: el,
					args: args
				};
			},
			generate: function(item){
				return 'var ta' + controls.TextArea.counter++ + ' = Ti.UI.createTextArea({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			}
		},
		Switch: {
			counter: 0,
			create: function(left, top){
				var args = {
					left: left,
					top: top
				};

				var el = Ti.UI.createSwitch(args);
				el.dom.readOnly = true;
				return {
					control: el,
					args: args
				};
			},
			generate: function(item){
				return 'var sw' + controls.Switch.counter++ + ' = Ti.UI.createSwitch({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			}
		},
		Button: {
			counter: 0,
			create: function(left, top){
				var args = {
					title: prompt("Button title"),
					left: left,
					top: top
				};

				return {
					control: Ti.UI.createButton(args),
					args: args
				};
			},
			generate: function(item){
				return 'var bt' + controls.Button.counter++ + ' = Ti.UI.createButton({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			}
		},
		SearchBar: {
			counter: 0,
			create: function(left, top){
				var args = {
					left: left,
					top: top
				};

				var el = Ti.UI.createSearchBar(args);
				el.dom.readOnly = true;
				return {
					control: el,
					args: args
				};
			},
			generate: function(item){
				return 'var sb' + controls.SearchBar.counter++ + ' = Ti.UI.createSearchBar({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			}
		}
	};

	var _library = [];

	var attachMouseenter = function(dd){
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
		}).mouseenter();
	};
	
	var _activeObj = null;
	var showProperties = function(){
		if(_activeObj == null){
			return;
		}
		var obj = _activeObj;
		hideProperties();
		_activeObj = obj;
		$.tmpl('properties', {
			properties: controls[_activeObj.typ].properties,
			interfaces: controls[_activeObj.typ].interfaces,
			control: _activeObj.control
		}).appendTo('#propertiesContainer').find('button').button();
	};

	var hideProperties = function(){
		_activeObj = null;
		clip.destroy();
		$('#propertiesContainer').html('');
	};

	$('#propertiesContainer input').live('change keyup', function(){
		var el = $(this);
		var propName = el.attr('name');
		var val = el.val();
		_activeObj.control[propName] = val;
	});
	$('#propertiesContainer #highlightActive').live('click', function(){
		$(_activeObj.dom).css('opacity', 1)
			.animate({'opacity': 0.3}, 300).animate({'opacity': 1}, 300)
			.animate({'opacity': 0.3}, 300).animate({'opacity': 1}, 300);
	});
	$('#propertiesContainer #removeActive').live('click', function(){
		win.remove(_activeObj.control);
		hideProperties();
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
					attachMouseenter(ui.helper[0]);
				}, 0);
			} else {
				// create
				var obj = controls[typ].create(pos.left, pos.top);
				$(obj.control.dom).attr('data-libId', _library.length).attr('data-libType', typ);

				libData = {
					control: obj.control,
					dom: obj.control.dom,
					typ: typ,
					args: obj.args
				};
				_library.push(libData);

				Ti.UI.currentWindow.add(obj.control);
				attachMouseenter(obj.control.dom);
			}
			$(libData.dom).addClass("draggable");
			_activeObj = libData;
			showProperties();
		}
	});
	$('.library [data-libType]').draggable({
		grid: [5, 5],
		helper: 'clone',
		containment: '.canvas'
	});

	$("#generate").button().click(function(){
		var res = ["var win = Ti.UI.currentWindow;\n\n"];
		for(var ii = 0; ii < _library.length; ii++){
			var item = _library[ii];
			res.push(controls[item.typ].generate(item));
		}

		res = res.join('');
		hideProperties();
		$.tmpl('generator')
			.find('textarea').val(res).end()
			.find('button').button().end()
			.appendTo($('#propertiesContainer').html(''));
		clip.glue($('#copyGenerator').get(0));
		clip.show();
	})
});
