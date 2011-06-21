var args2str = function(item){
	if(item == null){
		return;
	}
//	var args = item.args;
//	_.each(controls[item.typ].interfaces, function(value){
//		_.extend(args, interfaces[value].properties);
//	});
	var args = item.properties;
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
var events2str = function(elId, events){
	var str = [];
	for(var ev in events){
		var line = [];
		line.push(elId);
		line.push('.addEventListener(\'');
		line.push(ev);
		line.push('\', function(ev){\n');
		line.push(events[ev].text);
		line.push('\n});');
		str.push(line.join(''));
	}
	return str.join(',\n');
};

var properties = {
	text: {
		template: "textProperty",
		getValue: function(el){return el.value;}
	},
	int: {
		template: "textProperty",
		getValue: function(el){return parseInt(el.value);}
	},
	bool: {
		template: "boolProperty",
		getValue: function(el){return el.checked;}
	}
};

var interfaces = {
	DOMView: {
		properties: {layout: 'layout'},
		events: []
	},
	Touchable: {
		properties: {touchEnabled: 'bool'},
		events: ['touchstart', 'twofingertap', 'touchmove', 'touchend', 'swipe', 'touchcancel', 'singletap', 'doubletap']
	},
	Clickable: {
		properties: {},
		events: ['click', 'dblclick']
	},
	Styleable: {
		properties: {
			backgroundColor: 'color',
			focusable: 'bool',
			backgroundImage: 'file',
			backgroundSelectedColor: 'color',
			backgroundSelectedImage: 'file',
			backgroundFocusedColor: 'color',
			backgroundFocusedImage: 'color',
			borderWidth: 'int',
			borderColor: 'color',
			borderRadius: 'int',
			fontVariant: 'text',
			fontStyle: 'text',
			fontWeight: 'text',
			fontSize: 'fontSize',
			fontFamily: 'fontFamily',
			opacity: 'opacity',
			zIndex: 'int',
			backgroundGradient: 'backgroundGradient',
			visible: 'bool',
			color: 'color'
		},
		events: []
	},
	Positionable: {
		properties: {
			top: 'int',
			bottom: 'int',
			left: 'int',
			right: 'int',
			width: 'int',
			height: 'int'
		},
		events: []
	},
	Interactable: {
		properties: {},
		events: ['focus', 'blur', 'change', 'return']
	}
};

var controls = {
	TextField: {
		varPrefix: "tf",
		factory: "Ti.UI.createTextField",
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
		interfaces: ['DOMView', 'Clickable', 'Interactable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
		}
	},
	Label: {
		varPrefix: "lb",
		factory: "Ti.UI.createLabel",
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
		interfaces: ['DOMView', 'Clickable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
			'text': 'text',
			'html': 'text',
			'textAlign': 'text',
			'textid': 'text'
		}
	},
	TextArea: {
		varPrefix: "ta",
		factory: "Ti.UI.createTextArea",
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
		interfaces: ['DOMView', 'Clickable', 'Interactable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
		}
	},
	Switch: {
		varPrefix: "sw",
		factory: "Ti.UI.createSwitch",
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
		interfaces: ['DOMView', 'Clickable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
		}
	},
	Button: {
		varPrefix: "bt",
		factory: "Ti.UI.createButton",
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
		interfaces: ['DOMView', 'Clickable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
		}
	},
	SearchBar: {
		varPrefix: "sb",
		factory: "Ti.UI.createSearchBar",
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
		interfaces: ['DOMView', 'Clickable', 'Interactable', 'Touchable', 'Styleable', 'Positionable'],
		properties: {
		}
	}
};

var generate = function(item){
	if(item == null || item.typ == null){
		return;
	}
	var klass = item.typ;
	klass = controls[klass];
	if(klass == null){
		return;
	}

	if(klass.generate != null){
		return klass.generate(item);
	}

	if(klass.counter == null){
		klass.counter = 0;
	}

	var id = klass.varPrefix + klass.counter++;
	return 'var ' + id + ' = ' + klass.factory + '({\n' +
		args2str(item) +
		'\n});\n'+
		events2str(id, item.events)
		+'\nwin.add(' + id + ');\n\n';
};
