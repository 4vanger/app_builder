$(function(){
	initTemplates();
	$('#loading').remove();

	var getLeftTop = function(event, ui){
		var canvas = $('.canvas');
		var canvasOffset = canvas.offset();
		return {
			left: ui.offset.left - canvasOffset.left,
			top: ui.offset.top - canvasOffset.top
		}
	};

	var getLibDataByEl = function(el){
		var id = el.attr('data-libId');
		if(id != null){
			return _library[parseInt(id)];
		}
		return null;
	};

	var reposition = function(id, event, ui){

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
			generate: function(){
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
			generate: function(){
				return 'var lb' + controls.Label.counter++ + ' = Ti.UI.createLabel({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
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
			generate: function(){
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
			generate: function(){
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
			generate: function(){
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
			generate: function(){
				return 'var sb' + controls.SearchBar.counter++ + ' = Ti.UI.createSearchBar({\n' +
					args2str(item.args) +
					'\n});\nwin.add(el);\n\n';
			}
		}
	};

	var _library = [];

	$.tmpl('main').appendTo(document.body);
	var win = Ti.UI.currentWindow;
	win.dom.className += " canvas"
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
			var el = ui.draggable;
			var libData = getLibDataByEl(ui.draggable);
			var pos = getLeftTop(event, ui);
			console.log(el, libData)
			if(libData != null){
				libData.control.left = libData.args.left = pos.left;
				libData.control.top = libData.args.top = pos.top;
			} else {
				var typ = el.attr('data-libType');
				// create
				var obj = controls[typ].create(pos.left, pos.top);
				$(obj.control.dom).attr('data-libId', _library.length).attr('data-libType', typ);
				
				_library.push({
					control: obj.control,
					typ: typ,
					args: obj.args
				});

				Ti.UI.currentWindow.add(obj.control);
				$(obj.control.dom).draggable({
					grid: [10, 10],
					containment: '.canvas',
					snap: true,
					snapMode: 'inner'
				});
			}
		}
	});
	$('.library [data-libType]').draggable({
		grid: [10, 10],
		helper: 'clone',
		containment: '.canvas',
		snap: true,
		snapMode: 'inner'
	});

	$("#generate").button().click(function(){
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

		var res = ["var win = Ti.UI.currentWindow;\nvar el;\n\n"];
		for(var ii = 0; ii < _library.length; ii++){
			var item = _library[ii];
			switch (item.typ){
				case "TextField":
					res.push("el = Ti.UI.createTextField({\n");
					res.push(args2str(item.args));
					res.push('\n});\nwin.add(el);\n\n');
					break;
				case "Label":
					res.push("el = Ti.UI.createLabel({\n");
					res.push(args2str(item.args));
					res.push('\n});\nwin.add(el);\n\n');
					break;
				case 'TextArea':
					res.push("el = Ti.UI.createTextArea({\n");
					res.push(args2str(item.args));
					res.push('\n});\nwin.add(el);\n\n');
					break;
				case 'Switch':
					res.push("el = Ti.UI.createSwitch({\n");
					res.push(args2str(item.args));
					res.push('\n});\nwin.add(el);\n\n');
					break;
				case 'Button':
					res.push("el = Ti.UI.createButton({\n");
					res.push(args2str(item.args));
					res.push('\n});\nwin.add(el);\n\n');
					break;
				case 'SearchBar':
					res.push("el = Ti.UI.createSearchBar({\n");
					res.push(args2str(item.args));
					res.push('\n});\nwin.add(el);\n\n');
					break;
			}
		}

		res = res.join('');
		$.tmpl('generator').find('textarea').val(res).end().dialog({
			title: "Get your code",
			closeText: 'Close',
			dialogClass: 'generatorDialog',
			modal: true,
			resizable: false
		});
	})
});
