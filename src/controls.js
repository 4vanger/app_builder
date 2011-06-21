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
		line.push(JSON.stringify(args[arg]));
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
	color: {
		template: "colorProperty",
		getValue: function(el){return el.value;}
	},
	bool: {
		template: "boolProperty",
		getValue: function(el){return el.checked;}
	},
	size: {
		template: "sizeProperty",
		getValue: function(el){
			var res = {};
			var els = $(el).siblings('input').andSelf();
			res.height = parseInt(els.filter('[data-size="height"]').val());
			res.width = parseInt(els.filter('[data-size="width"]').val());
			if(isNaN(res.height)){
				res.height = 0;
			}
			if(isNaN(res.width)){
				res.width = 0;
			}
			return res;
		}
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
			autocapitalization: 'bool',
			value: 'text',
			editable: 'bool',
			enabled: 'bool',
			borderStyle: 'borderStyle',
			backgroundDisabledImage: 'url',
			backgroundDisabledColor: 'color',
			clearButtonMode: 'text',
			clearOnEdit: 'bool',
			hintText: 'text',
			keyboardToolbar: 'keyboardToolbar',
			keyboardToolbarColor: 'color',
			keyboardToolbarHeight: 'int',
			leftButton: 'leftButton',
			leftButtonMode: 'leftButtonMode',
			leftButtonPadding: 'int',
			minimumFontSize: 'int',
			paddingLeft: 'int',
			paddingRight: 'int',
			rightButton: 'rightButton',
			rightButtonMode: 'rightButtonMode',
			rightButtonPadding: 'int',
			suppressReturn: 'bool',
			verticalAlign: 'verticalAlign',
			size: 'size'
		},
		events: ['blur', 'change', 'focus', 'return']
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
			backgroundPaddingBottom: 'int',
			backgroundPaddingLeft: 'int',
			backgroundPaddingRight: 'int',
			backgroundPaddingTop: 'int',
			ellipsize: 'ellipsize',
			highlightedColor: 'color',
			html: 'text',
			minimumFontSize: 'int',
			shadowColor: 'color',
			shadowOffset: 'int',
			text: 'text',
			textAlign: 'textAlign',
			textid: 'text',
			wordWrap: 'wordWrap',
			selectedColor: 'color',
			size: 'size'
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
			autoLink: 'autoLink',
			autocapitalization: 'bool',
			value: 'text',
			editable: 'bool',
			enabled: 'bool',
			backgroundDisabledImage: 'url',
			backgroundDisabledColor: 'color',
			keyboardToolbar: 'keyboardToolbar',
			keyboardToolbarColor: 'color',
			keyboardToolbarHeight: 'int',
			suppressReturn: 'bool',
			size: 'size'
		},
		events: ['change']
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
			title: 'text',
			image: 'url',
			enabled: 'bool',
			backgroundDisabledImage: 'url',
			backgroundDisabledColor: 'color',
			size: 'size',
			selectedColor: 'color',
			style: 'text',
			titleid: 'text'
		},
		events: []
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
			autocorrect: 'bool',
			barColor: 'color',
			hintText: 'text',
			hinttextid: 'text',
			keyboardType: 'keyboardType',
			prompt: 'text',
			promptid: 'text',
			showCancel: 'bool',
			value: 'text',
			size: 'size'
		},
		events: ['blur', 'cancel', 'change', 'focus', 'return']
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
