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
			return 'var tf' + controls.TextField.counter + ' = Ti.UI.createTextField({\n' +
				args2str(item.args) +
				'\n});\nwin.add(tf' + controls.TextField.counter++ +');\n\n';
		},
		interfaces: ['DOMView', 'Clickable', 'Interactable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
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
			return 'var lb' + controls.Label.counter + ' = Ti.UI.createLabel({\n' +
				args2str(item.args) +
				'\n});\nwin.add(lb' + controls.Label.counter++ + ');\n\n';
		},
		interfaces: ['DOMView', 'Clickable', 'Touchable', 'Styleable', 'Positionable'],
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
			return 'var ta' + controls.TextArea.counter + ' = Ti.UI.createTextArea({\n' +
				args2str(item.args) +
				'\n});\nwin.add(ta' + controls.TextArea.counter++ + ');\n\n';
		},
		interfaces: ['DOMView', 'Clickable', 'Interactable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
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
			return 'var sw' + controls.Switch.counter + ' = Ti.UI.createSwitch({\n' +
				args2str(item.args) +
				'\n});\nwin.add(sw' + controls.Switch.counter++ + ');\n\n';
		},
		interfaces: ['DOMView', 'Clickable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
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
			return 'var bt' + controls.Button.counter + ' = Ti.UI.createButton({\n' +
				args2str(item.args) +
				'\n});\nwin.add(bt' + controls.Button.counter++ + ');\n\n';
		},
		interfaces: ['DOMView', 'Clickable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
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
			return 'var sb' + controls.SearchBar.counter + ' = Ti.UI.createSearchBar({\n' +
				args2str(item.args) +
				'\n});\nwin.add(sb' + controls.SearchBar.counter++ + ');\n\n';
		},
		interfaces: ['DOMView', 'Clickable', 'Interactable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
		}
	}
};
