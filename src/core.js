$(function(){
	initTemplates();
	$('#loading').remove();

	var _library = [];

	$.tmpl('main').appendTo(document.body);
	var win = Ti.UI.currentWindow;
	win.dom.className += " canvas"
	var canvas = $('.canvas');
	canvas.droppable({
		accept: '[data-libType]',
		tolerance: 'fit',
		activate: function(){
			$(this).addClass('active');
		},
		deactivate: function(){
			$(this).removeClass('active');
		},
		drop: function(event, ui){
			var absCoords = canvas.offset();
			var canvasLeft = ui.offset.left - absCoords.left;
			var canvasTop = ui.offset.top - absCoords.top;
			var el, args;
			switch (ui.draggable.attr('data-libType')){
				case 'TextField':
					args = {
						left: canvasLeft,
						top: canvasTop
					};
					el = Ti.UI.createTextField(args);
					break;
				case 'Label':
					args = {
						left: canvasLeft,
						top: canvasTop,
						text: prompt('Label text')
					};
					el = Ti.UI.createLabel(args);
					break;
				case 'TextArea':
					args = {
						left: canvasLeft,
						top: canvasTop
					};
					el = Ti.UI.createTextArea(args);
					break;
				case 'Switch':
					args = {
						left: canvasLeft,
						top: canvasTop
					};
					el = Ti.UI.createSwitch(args);
					break;
				case 'Button':
					args = {
						title: prompt("Button title"),
						left: canvasLeft,
						top: canvasTop
					};
					el = Ti.UI.createButton(args);
					break;
				case 'SearchBar':
					args = {
						left: canvasLeft,
						top: canvasTop
					};
					el = Ti.UI.createSearchBar(args);
					break;
			}

			_library.push({
				el: el,
				typ: ui.draggable.attr('data-libType'),
				args: args
			});

			if(el != null){
				Ti.UI.currentWindow.add(el);
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
