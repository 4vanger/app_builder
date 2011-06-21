/**
 * Appcelerator Titanium HTML5 - http://appcelerator.com
 * This is generated code. Do not modify. Your changes *will* be lost.
 * Generated code is Copyright (c) 2011 by Appcelerator, Inc.
 * All Rights Reserved.
 */
(function($window, args){
/* Appcelerator Titanium HTML5 */
console.info("[INFO] Appcelerator Titanium/1.7.0.RC2 for HTML5");

var Ti = {};
$window.Titanium = Ti; $window.Ti = Ti;

Ti._5 = {};
var loaded = false;
var loaders = [];

// public function for onload notification
$window.onloaded = function(f){
	onload(f);
};

// private function
function onload(f) {
	if (loaded) {
		f();
	} else {
		loaders.push(f);
	}
}

function beforeonload() {
	document.body.style.margin = "0";
	document.body.style.padding = "0";
	$window.scrollTo(0, 1);
}

function afteronload() {
}


/**
 * Helper function for creating getters and setters on APIs
 * @param obj Ti._5.DOMView Object to use
 * @param property String Property name
 * @param setterFunc Function Setter function
 * @param getterFunc Function Getter function
 * @param noAccessor boolean Do not create getters and setters
 */
function createAccessors(obj, property, setterFunc, getterFunc, noAccessor) {
	function setter(val, cb) {
		// does property have a custom function
		if (setterFunc != null) {
			setterFunc(property, val);

			// is there a callback
			if (cb) {
				//TODO: MAKE MORE GENERIC
				// is there a time property (delay callback execution)
				if (val != null && val['duration'] != null) {
					setTimeout(cb, val['duration']);
				} else {
					cb();
				}
			}
		} else {
			obj.dom.style[property] = val;
		}
	}

	// generic getter
	function getter() {
		if (getterFunc != null) {
			return getterFunc();
		} else {
			return obj.dom.style[property];
		}
	}

	// some properties do not support get/set - check for flag
	if (noAccessor) {
		obj[property] = setter;
	} else {
		Object.defineProperty(obj, property, {
			set: setter,
			get: getter
		});
	}
}

// TODO use DOMContentLoaded event instead
$window.onload = function() {
	loaded = true;
	beforeonload();
	for (var c=0 ; c < loaders.length; c++) {
		loaders[c]();
	}
	loaders = null;
	afteronload();
};

$window.onbeforeunload = function() {
	Ti.App.fireEvent('close');
	Ti._5.addAnalyticsEvent('ti.end', 'ti.end');

};

// Generic API initialization - loop through API props and generate getters/setters
Ti._5.init = function(props) {
	if(props == null){
		return;
	}

	var domprops = props['domprops'];
	var obj = props['obj'];
	var complexDomprops = props['complexDomprops'];
	var args = props['args'];

	if (domprops) {
		for (var ii = 0; ii < domprops.length; ii++) {
			// property name
			var domProp = domprops[ii];

			// create accessors
			createAccessors(obj, domProp);

			if (args && 'undefined' != typeof args[domProp]) {
				obj.dom.style[domProp] = args[domProp];
			}
		}
	}

	if (complexDomprops) {
		for (ii = 0; ii < complexDomprops.length; ii++) {
			var propObj = complexDomprops[ii];
			var propKey = null;
			for (var sProp in propObj) {
				propKey = sProp;
				break;
			}
			var propValue = propObj[propKey];

			createAccessors(obj, propKey, propValue.setter, propValue.getter, propValue.noAccessor);
			if (args && 'undefined' != typeof args[propKey]) {
				obj[propKey] = args[propKey];
			}
		}
	}
};

// run onload
Ti._5.run = function(app) {
	onload(app);
};

Ti._5.preset = function(obj, props, values){
	if(!values || !obj || !props){
		return;
	}

	for(var ii = 0; ii < props.length; ii++){
		var prop = props[ii];
		if(typeof values[prop] != 'undefined'){
			obj[prop] = values[prop];
		}
	}
};

Ti._5.presetUserDefinedElements = function(obj, args){
	if(!args){
		return;
	}

	for(prop in args){
		if(typeof obj[prop] == 'undefined'){
			obj[prop] = args[prop];
		}
	}
};

Ti._5.createClass = function(className, value){
	var classes = className.split(".");
	var parent = window;
	for(var ii = 0; ii < classes.length; ii++){
		var klass = classes[ii];
		if(typeof parent[klass] == 'undefined'){
			parent[klass] = ii == classes.length - 1 && typeof value != 'undefined' ? value : new Object();
		}
		parent = parent[klass];
	}
	return parent;
};

// do some actions when framework is loaded
Ti._5.frameworkLoaded = function(){
	if(args.appAnalytics === 'true'){
		// enroll event
		if(localStorage.getItem("html5_enrollSent") == null){
			// setup enroll event
			Ti._5.addAnalyticsEvent('ti.enroll', 'ti.enroll', {
				mac_addr: null,
				oscpu: null,
				app_name: args.appName,
				platform: Ti.Platform.name,
				app_id: args.appId,
				ostype: Ti.Platform.osname,
				osarch: Ti.Platform.architecture,
				model: Ti.Platform.model,
				deploytype: args.deployType
			});
			localStorage.setItem("html5_enrollSent", true)
		}

		// app start event
		Ti._5.addAnalyticsEvent('ti.start', 'ti.start', {
			tz: (new Date()).getTimezoneOffset(),
			deploytype: args.deployType,
			os: Ti.Platform.osname,
			osver: Ti.Platform.ostype,
			version: args.tiVersion,
			un: null,
			app_version: args.appVersion,
			nettype: null
		});

		// try to sent previously sent analytics events on app load
		Ti._5.sendAnalytics();
	}

	Ti.UI.createWindow().open();
};

Ti._5.getAbsolutePath = function(path){
	if(path.indexOf("app://") == 0){
		path = path.substring(6);
	}

	if(path.charAt(0) == "/"){
		path = path.substring(1);
	}

	if(path.indexOf("://") >= 0){
		return path;
	} else {
		return location.pathname.replace(/(.*)\/.*/, "$1") + "/" + path;
	}
};

Ti._5.parseLength = function(val){
	return val + (typeof val == 'number' ? 'px' : '');
};

if(typeof Object.defineProperty == 'undefined'){
	// trying to emulate missing defineProperty
	try{
		Object.defineProperty = function(obj, prop, desc){
			if(obj == null || prop == null){
				throw "Object.defineProperty: object and property name are required parameters";
			}
			if(desc == null){
				desc = {};
			}

			if(desc.set){
				obj.__defineSetter__(prop, desc.set);
			}
			if(desc.get && desc.writable !== false){
				obj.__defineGetter__(prop, desc.get);
			}
		};
	} catch(e){
		console.error(e);
	}
}

	Ti._5.parseLength = function(val){
	return val + (typeof val == 'number' ? 'px' : '');
};

Ti._5.createUUID = function(){
	/*!
	Math.uuid.js (v1.4)
	http://www.broofa.com
	mailto:robert@broofa.com

	Copyright (c) 2010 Robert Kieffer
	Dual licensed under the MIT and GPL licenses.
	*/
	// RFC4122v4 solution:
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	}).toUpperCase();
};

Ti._5.getArguments = function(){
	return args;
};

var _sessionId = sessionStorage.getItem('html5_sessionId');
if(_sessionId == null){
	_sessionId = Ti._5.createUUID();
	sessionStorage.setItem('html5_sessionId', _sessionId);
}

var ANALYTICS_STORAGE = "html5_analyticsEvents";
Ti._5.addAnalyticsEvent = function(eventType, eventEvent, data, isUrgent){
	if(args.appAnalytics !== 'true'){
		return;
	}
	// store event
	var storage = localStorage.getItem(ANALYTICS_STORAGE);
	if(storage == null){
		storage = [];
	} else {
		storage = JSON.parse(storage);
	}
	var now = new Date();
	var ts = "yyyy-MM-dd'T'HH:mm:ss.SSSZ".replace(/\w+/g, function(str){
		switch(str){
			case "yyyy":
				return now.getFullYear();
			case "MM":
				return now.getMonth() + 1;
			case "dd":
				return now.getDate();
			case "HH":
				return now.getHours();
			case "mm":
				return now.getMinutes();
			case "ss":
				return now.getSeconds();
			case "SSSZ":
				var tz = now.getTimezoneOffset();
				var atz = Math.abs(tz);
				tz = (tz < 0 ? "-" : "+") + (atz < 100 ? "00" : (atz < 1000 ? "0" : "")) + atz;
				return now.getMilliseconds() + tz;
			default:
				return str;
		}
	});
	var formatZeros = function(v, n){
		var d = (v+'').length;
		return (d < n ? (new Array(++n - d)).join("0") : "") + v;
	};

	storage.push({
		eventId: Ti._5.createUUID(),
		eventType: eventType,
		eventEvent: eventEvent,
		eventTimestamp: ts,
		eventPayload: data
	});
	localStorage.setItem(ANALYTICS_STORAGE, JSON.stringify(storage));
	Ti._5.sendAnalytics(isUrgent);
};

var ANALYTICS_WAIT = 300000; // 5 minutes
var _analyticsLastSent = null;
var eventSeq = 1;

// collect and send Ti.Analytics notifications
Ti._5.sendAnalytics = function(isUrgent){
	if(args.appAnalytics !== 'true'){
		return;
	}
	// store event
	var storage = localStorage.getItem(ANALYTICS_STORAGE);
	if(storage == null){
		return;
	} else {
		storage = JSON.parse(storage);
	}

	var now = (new Date()).getTime();

	if(isUrgent !== true && _analyticsLastSent != null && now - _analyticsLastSent < ANALYTICS_WAIT){
		return;
	}

	var jsonStrs = [];
	var ids = [];

	for(var ii = 0; ii < storage.length; ii++){
		var ev = storage[ii];
		ids.push(ev.eventId);
		var res = {
			seq: eventSeq++,
			ver: '2',
			id: ev.eventId,
			type: ev.eventType,
			event: ev.eventEvent,
			ts: ev.eventTimestamp,
			mid: Ti.Platform.id,
			sid: _sessionId,
			aguid: args.guid,
			data: typeof ev.eventPayload == 'object' ? JSON.stringify(ev.eventPayload) : ev.eventPayload
		};

		jsonStrs.push(JSON.stringify(res));
	}

	var iframe = document.createElement("iframe");
	iframe.style.display = 'none';
	iframe.id = "analytics" + Math.random();
	var form = document.createElement("form");
	form.style.display = 'none';
	form.target = iframe.id;
	form.method = 'POST';
	var fname = "html5_jsonp"+Math.floor(Math.random() * 1e6);
	form.action = 'https://api.appcelerator.net/p/v2/mobile-track?callback=' + fname;
	document.body.appendChild(iframe);
	document.body.appendChild(form);
	var hidden = document.createElement("input");
	hidden.type = 'hidden';
	hidden.name = 'content';
	hidden.value = jsonStrs.join("\n");
	form.appendChild(hidden);
	$window[fname] = function(response){
		if(response && response.success){
			// remove sent events on successful sent
			var storage = localStorage.getItem(ANALYTICS_STORAGE);
			var evs = [];
			for(var ii = 0; ii < storage.length; ii++){
				var ev = storage[ii];
				var found = false;
				for(var jj = 0; jj < ids.length; jj++){
					if(ev.eventId == ids[jj]){
						found = true;
						ids.splice(jj, 1);
						break;
					}
				}

				if(!found){
					evs.push(ev);
				}
			}

			localStorage.setItem(ANALYTICS_STORAGE, JSON.stringify(evs));
			document.body.removeChild(form);
			document.body.removeChild(iframe);
		}
	};
	form.submit();
};

Ti._5.extend = function(dest, source){
	for(var key in source){
		dest[key] = source[key];
	}

	return dest;
}
}


)(window, {
	projectName: 'Titanium Studio Mobile',
	projectId: 'com.appcelerator.tistudiomobile',
	deployType: 'all',
	appId: 'com.appcelerator.tistudiomobile',
	appAnalytics: 'false',
	appPublisher: 'Appcelerator',
	appUrl: 'http://www.appcelerator.com',
	appName: 'Titanium Studio Mobile',
	appVersion: '0.1',
	appDescription: 'Titanium Studio Mobile',
	appCopyright: '2011 by Appcelerator',
	appGuid: '025a7dd5-a6cc-4a80-adeb-eef8509a1415',
	tiVersion: '1.7.0.RC1'
});
(function(oParentNamespace) {
	// Create interface
	oParentNamespace.Interactable = function(obj, isNotSearch) {
		if ('function' != typeof obj.addEventListener) {
			oParentNamespace.EventDriven(obj);
		}
		
		obj.dom.addEventListener('focus', function(event) {
			var oEvent = {
				source		: obj,
				type		: event.type
			};
			if (obj.dom && 'undefined' != typeof obj.dom.value) {
				oEvent.value = obj.dom.value;
			}
			obj.fireEvent('focus', oEvent);
		}, true);
		
		obj.dom.addEventListener('blur', function(event) {
			var oEvent = {
				source		: obj,
				type		: event.type
			};
			if (obj.dom && 'undefined' != typeof obj.dom.value) {
				oEvent.value = obj.dom.value;
			}
			obj.fireEvent('blur', oEvent);
		}, true);

		var _changeListener = function(event) {
			var oEvent = {
				source		: obj,
				type		: 'change'
			};
			if (obj.dom && 'undefined' != typeof obj.dom.value) {
				oEvent.value = obj.dom.value;
			}
			obj.fireEvent('change', oEvent);
		};
		
		obj.dom.addEventListener('change', _changeListener, false);
		obj.dom.addEventListener('input', _changeListener, false);
		obj.dom.addEventListener('paste', _changeListener, false);

		if (!isNotSearch) {
			obj.dom.addEventListener('keyup', function(event) {
				if (!obj.suppressReturn && !event.altKey && !event.ctrlKeyKey && event.keyCode && 13 == event.keyCode) {
					var oEvent = {
						source		: event.target,
						type		: event.type
					};
					if (obj.dom && 'undefined' != typeof obj.dom.value) {
						oEvent.value = obj.dom.value;
					}
					obj.fireEvent('return', oEvent);
				}
			}, false);
		}
		
	}
	
})(Ti._5);	

;
(function(oParentNamespace) {
	// Create interface
	oParentNamespace.Clickable = function(obj) {
		if ('function' != typeof obj.addEventListener) {
			oParentNamespace.EventDriven(obj);
		}

		obj.dom.addEventListener('click', function(event) {
			var oEvent = {
				globalPoint	: { x:event.pageX, y:event.pageY }, 
				source		: obj,
				type		: event.type,
				x			: event.pageX,
				y			: event.pageY
			};
			obj.fireEvent('click', oEvent);
		}, false);
		
		obj.dom.addEventListener('dblclick', function(event) {
			var oEvent = {
				globalPoint	: { x:event.pageX, y:event.pageY }, 
				source		: obj,
				type		: event.type,
				x			: event.pageX,
				y			: event.pageY
			};
			obj.fireEvent('dblclick', oEvent);
		}, false);
	}
	
})(Ti._5);	
;
(function(oParentNamespace) {

	// Create object
	oParentNamespace.EventDriven = function(obj) {
		var listeners = null;
		
		obj.addEventListener = function(eventName, cb){
			if(listeners == null) {
				listeners = {};
			}
			var events = listeners[eventName];
			if (events == null) {
				listeners[eventName] = events = [];
			}
			events.push(cb);
		};
		
		obj.removeEventListener = function(eventName, cb){
			if (listeners != null) {
				var events = listeners[eventName];
				if (events != null) {
					if ('undefined' != typeof cb) {
						for (var ii = 0; ii < events.length; ii++) {
							if (cb == events[ii]) {
								events.splice(ii, 1);
							} 
						}
					} /*else {
						// If event listener name is empty - remove all listeners
						listeners[eventName] = {};
					}*/
				}
			}
		};
		
		obj.hasListener = function(eventName) {
			return listeners && listeners[eventName];
		};
		
		obj.fireEvent = function(eventName, eventData){
			if (listeners != null) {
				var events = listeners[eventName];
				if (events != null) {
					var ev = eventData || {};
					ev.type = eventName;
					for (var ii = 0; ii < events.length; ii++) {
						events[ii](ev);
					}
				}
			}
		};
	};
})(Ti._5);		
;
(function(oParentNamespace) {
	// Create object
	oParentNamespace.Styleable = function(obj, args) {
		if (!obj.dom) {
			return;
		}
		obj.dom.style.backgroundRepeat = "no-repeat";

		if ('function' != typeof obj.addEventListener) {
			oParentNamespace.EventDriven(obj);
		}

		var _backgroundColor = null;
		Object.defineProperty(obj, 'backgroundColor', {
			get: function() {
				return _backgroundColor ? _backgroundColor : '';
			},
			set: function(val) {
				_backgroundColor = val;
				obj.dom.style.backgroundColor = _backgroundColor;
			}
		});

		var _focusable = false;
		Object.defineProperty(obj, 'focusable', {
			get: function() {
				return _focusable;
			},
			set: function(val) {
				_focusable = val ? true : false;
			}
		});

		/*
		obj.setBackgroundDisabledColor = function(val){
			obj.dom.style['background-color'] = val;
		};
		
		obj.getBackgroundDisabledColor = function(){
			return obj.dom.style['background-color'];
		};
		*/
		var _backgroundImage = null;
		Object.defineProperty(obj, 'backgroundImage', {
			get: function() {
				return _backgroundImage;
			},
			set: function(val) {
				_backgroundImage = val;
				obj.dom.style.backgroundImage = val ? 'url("' + Ti._5.getAbsolutePath(val) + '")' : "";
				obj.dom.style.backgroundRepeat = "no-repeat";
			}
		});
		
		var _backgroundSelectedColor = '', _backgroundSelectedColorLoaded = false,
			_backgroundSelPrevColor = '', _isFocusSelColorFired = false;
		Object.defineProperty(obj, 'backgroundSelectedColor', {
			get: function() {
				return _backgroundSelectedColor ? _backgroundSelectedColor : '';
			},
			set: function(val) {
				_backgroundSelectedColor = val;
				if (!_backgroundSelectedColorLoaded) {
					_backgroundSelectedColorLoaded = true;
					obj.dom.addEventListener('focus', function() {
						if (obj.focusable && !_isFocusSelColorFired) {
							_backgroundSelPrevColor = obj.backgroundColor;
							obj.dom.style.backgroundColor = _backgroundSelectedColor;
						}
						_isFocusSelColorFired = true;
					}, true);
					obj.dom.addEventListener('blur', function() {
						if (obj.focusable) {
							obj.dom.style.backgroundColor = _backgroundSelPrevColor;
						}
						_isFocusSelColorFired = false;
					}, true);
				}
			}
		});
		
		var _backgroundSelectedImage = '', _backgroundSelPrevImage = '', 
			_backgroundSelectedImageLoaded = false, _isFocusSelImgFired = false;
		Object.defineProperty(obj, 'backgroundSelectedImage', {
			get: function() {
				return _backgroundSelectedImage ? _backgroundSelectedImage : '';
			},
			set: function(val) {
				_backgroundSelectedImage = val;
				if (!_backgroundSelectedImageLoaded) {
					_backgroundSelectedImageLoaded = true;
					obj.dom.addEventListener('focus', function() {
						if (_focusable && !_isFocusSelImgFired) {
							_backgroundSelPrevImage = obj.backgroundImage;
							obj.backgroundImage = _backgroundSelectedImage;
						}
						_isFocusSelImgFired = true;
					}, true);
					obj.dom.addEventListener('blur', function() {
						if (_focusable) {
							obj.backgroundImage = _backgroundSelPrevImage;
						}
						_isFocusSelImgFired = false;
					}, true);
				}
			}
		});
		
		var _backgroundFocusedColor = '', _backgroundFocusedColorLoaded = false,
			_backgroundFocPrevColor = '', _isFocusFocColFired = false;
		Object.defineProperty(obj, 'backgroundFocusedColor', {
			get: function() {
				return _backgroundFocusedColor ? _backgroundFocusedColor : '';
			},
			set: function(val) {
				_backgroundFocusedColor = val;
				if (!_backgroundFocusedColorLoaded) {
					_backgroundFocusedColorLoaded = true;
					obj.dom.addEventListener('focus', function() {
						if (_focusable && !_isFocusFocColFired) {
							_backgroundFocPrevColor = obj.backgroundColor;
							obj.dom.style.backgroundColor = _backgroundFocusedColor;
						}
						_isFocusFocColFired = false;
					}, true);
					obj.dom.addEventListener('blur', function() {
						if (_focusable) {
							obj.dom.style.backgroundColor = _backgroundFocPrevColor;
						}
						_isFocusFocColFired = false;
					}, true);
				}
			}
		});
		
		var _backgroundFocusedImage = '', _backgroundFocusedImageLoaded = false, 
			_backgroundFocPrevImage = '', _isFocusFocImgFired = false;
		Object.defineProperty(obj, 'backgroundFocusedImage', {
			get: function() {
				return _backgroundFocusedImage ? _backgroundFocusedImage : '';
			},
			set: function(val) {
				_backgroundFocusedImage = val;
				if (!_backgroundFocusedImageLoaded) {
					_backgroundFocusedImageLoaded = true;
					obj.dom.addEventListener('focus', function() {
						if (_focusable && !_isFocusFocImgFired) {
							_backgroundFocPrevImage = obj.backgroundImage;
							obj.backgroundImage = _backgroundFocusedImage;
						}
						_isFocusFocImgFired = false;
					}, true);
					obj.dom.addEventListener('blur', function() {
						if (_focusable) {
							obj.backgroundImage = _backgroundFocPrevImage;
						}
						_isFocusFocImgFired = false;
					}, true);
				}
			}
		});
		
		var _borderWidth = null;
		Object.defineProperty(obj, 'borderWidth', {
			get: function() {
				return _borderWidth;
			},
			set: function(val) {
				_borderWidth = val;
				obj.dom.style.borderWidth = val + "px";
				if(_borderColor == null){
					obj.dom.style.borderColor = "black";
				}
				obj.dom.style.borderStyle = "solid";
			}
		});
		
		var _borderColor;
		Object.defineProperty(obj, 'borderColor', {
			get: function() {
				return _borderColor;
			},
			set: function(val) {
				_borderColor = val;
				obj.dom.style.borderColor = _borderColor;
				if(_borderWidth == null){
					obj.dom.style.borderWidth = "1px";
				}
				obj.dom.style.borderStyle = "solid";
			}
		});

		Object.defineProperty(obj, 'borderRadius', {
			get: function() {
				return obj.dom.style.borderRadius ? parseInt(obj.dom.style.borderRadius) : '';
			},
			set: function(val) {
				obj.dom.style.borderRadius = parseInt(val)+'px';
			}
		});
		
		Object.defineProperty(obj, 'font', {
			get: function() {
				return {'fontVariant':_fontVariant, 'fontStyle':_fontStyle, 'fontWeight':_fontWeight, 'fontSize':_fontSize, 'fontFamily':_fontFamily};
			},
			set: function(val) {
				if(val == null){
					return;
				}

				if(val.fontVariant){
					obj.fontVariant = val.fontVariant;
				}
				if(val.fontStyle){
					obj.fontStyle = val.fontStyle;
				}
				if(val.fontWeight){
					obj.fontWeight = val.fontWeight;
				}
				if(val.fontSize){
					obj.fontSize = val.fontSize;
				}
				if(val.fontFamily){
					obj.fontFamily = val.fontFamily;
				}
			}
		});
		
		var _fontVariant;
		Object.defineProperty(obj, 'fontVariant', {
			get: function() {
				return _fontVariant;
			},
			set: function(val) {
				_fontVariant = val;
				obj.dom.style.fontVariant = val;
			}
		});

		var _fontStyle;
		Object.defineProperty(obj, 'fontStyle', {
			get: function() {
				return _fontStyle;
			},
			set: function(val) {
				_fontStyle = val;
				obj.dom.style.fontStyle = val;
			}
		});

		var _fontWeight;
		Object.defineProperty(obj, 'fontWeight', {
			get: function() {
				return _fontWeight;
			},
			set: function(val) {
				_fontWeight = val;
				obj.dom.style.fontWeight = val;
			}
		});

		var _fontSize;
		Object.defineProperty(obj, 'fontSize', {
			get: function() {
				return _fontSize;
			},
			set: function(val) {
				_fontSize = val;
				obj.dom.style.fontSize = val;
			}
		});

		var _fontFamily;
		Object.defineProperty(obj, 'fontFamily', {
			get: function() {
				return _fontFamily;
			},
			set: function(val) {
				_fontFamily = val;
				obj.dom.style.fontFamily = val;
			}
		});
		
		Object.defineProperty(obj, 'opacity', {
			get: function() {
				return obj.dom.style.opacity ? parseInt(obj.dom.style.opacity) : '';
			},
			set: function(val) {
				obj.dom.style.opacity = val;
			}
		});
		
		Object.defineProperty(obj, 'zIndex', {
			get: function() {
				return obj.dom.style.zIndex;
			},
			set: function(val) {
				if (val != obj.zIndex) {
					obj.dom.style.position = 'absolute';
					obj.dom.style.zIndex = val;
				}
			}
		});
		
		var _gradient = {};
		Object.defineProperty(obj, 'backgroundGradient', {
			get: function() {
				return _gradient ? _gradient : obj.dom.style['background'];
			},
			set: function(val) {
				if (!val) {
					return;
				}
				var type = val['type'] ? val['type']+',' : 'linear,';
				if ('Firefox' == Titanium.Platform.name) {
					var startPoint = val['startPoint'] ? val['startPoint'].x+'%' : '0%';
				} else {
					startPoint = val['startPoint'] ? val['startPoint'].x+' '+val['startPoint'].y+',' : '0% 0%,';
				}
				if ('Firefox' == Titanium.Platform.name) {
					var endPoint = val['endPoint'] ? val['endPoint'].y+'%,' : '100%';
				} else {
					endPoint = val['endPoint'] ? val['endPoint'].x+' '+val['endPoint'].y+',' : '100% 100%,';
				}
				var startRadius = val['startRadius'] ? val['startRadius']+',' : '';
				var endRadius = val['endRadius'] ? val['endRadius']+',' : '';
				var colors = '';
				if (val['colors']) {
					var iStep = 0;
					for (var iCounter=0; iCounter < val['colors'].length; iCounter++) {
						if ('Firefox' == Titanium.Platform.name) {
							colors += 0 < colors.length ? ','+val['colors'][iCounter] : val['colors'][iCounter];
						} else {
							if ('undefined' != typeof val['colors'][iCounter]['position']) {
								colors += 'color-stop('+val['colors'][iCounter]['position']+','+val['colors'][iCounter]['color']+'), ';
							} else {
								iStep = 1 < val['colors'].length ? iCounter/(val['colors'].length-1) : 0;
								colors += 'color-stop('+iStep+','+val['colors'][iCounter]+'), ';
							}
						}
					}
					_gradient = {colors : val['colors']};
				}
				_gradient.type = type;
				_gradient.startPoint = startPoint;
				_gradient.endPoint = endPoint;
				_gradient.startRadius = null;
				_gradient.endRadius = null;
				if ('linear,' == type) {
					_gradient = {
						type		: type,
						startPoint	: startPoint,
						endPoint	: endPoint,
						startRadius	: startRadius,
						endRadius	: endRadius,
						
					}
					var sStyle = [type, startPoint, endPoint, colors].join(' ').replace(/,\s$/g, '');
				} else {
					_gradient.startRadius = startRadius;
					_gradient.endRadius = endRadius;
					var sStyle = [type, startPoint, startRadius, endPoint, endRadius, colors].join(' ').replace(/,\s$/g, '');
				}
				
				if ('Firefox' == Titanium.Platform.name) {
					if (-1 < type.indexOf('linear')) {
						sStyle = [startPoint, endPoint, colors].join(' ').replace(/,\s$/g, '');
						obj.dom.style['background'] = '-moz-linear-gradient(' + sStyle + ')';
					} else {
						sStyle = [startRadius.replace(/,$/g, ''), endRadius, colors].join(' ').replace(/,\s$/g, '');
						obj.dom.style['background'] = '-moz-radial-gradient(' + sStyle + ')';
					}
				} else {
					obj.dom.style['background'] = '-webkit-gradient(' + sStyle + ')';
				}
				// If gradient removed, we need to return background color and image
				if (
					'linear,' == type && '0% 0%,' == startPoint && '100% 100%,' == endPoint &&
					'' == colors
				) {
					obj.backgroundColor = _backgroundColor;
					obj.backgroundImage = _backgroundImage;
				}
			}
		});
		
		Object.defineProperty(obj, 'visible', {
			get: function() {
				return 'none' != obj.dom.style.display;
			},
			set: function(val) {
				val ? obj.show() : obj.hide();
			}
		});
		
		Object.defineProperty(obj, 'color', {
			get: function() {return obj.dom.style.color ? obj.dom.style.color : '';},
			set: function(val) {obj.dom.style.color = val;},
			configurable: true
		});
	
		//
		// API Methods
		//
		obj.add = function(view) {
			obj._children = obj._children || [];

			// creating cross-link
			obj._children.push(view);
			obj._parent = view;
			view._parents.push(obj);
			// if we have been rendered and add is called - re-render
			if (obj._rendered){
				obj.render(null);
				/*
				obj._refresh({
					'domprops': domprops,
					'complexDomprops': complexDomprops,
					'obj':obj,
					'args':args
				});
				*/
			}
		};
		obj.remove = function(view) {
			if(obj.dom != null){
				obj.dom.removeChild(view.dom);
			}
			for(var ii = 0; ii < obj._children.length; ii++){
				if(view === obj._children[ii]){
					obj._children.splice(ii, 1);
				}
			}
			if (obj._rendered){
				obj.render(null);
			}
		};
		var _prevDisplay = '';
		obj.show = function() {
			obj.dom.style.display = _prevDisplay ? _prevDisplay : '';
		};
		obj.hide = function() {
			if ('none' != obj.dom.style.display) {
				_prevDisplay = obj.dom.style.display;
				obj.dom.style.display = 'none';
			}
		};
		obj.animate = function(val) {
			var duration = null;
			var props = [];
			for (prop in val) {
				if (prop == 'duration') {
					duration = val[prop]
				} else {
					props.push(prop);
				}
			}
			obj.dom.style['transition-property'] = props;
			if (duration != null) {
				obj.dom.style['transition-duration'] = duration;
			}
			for (prop in val) {
				if (prop != 'duration') {
					obj.dom.style[prop] = val[prop];
				}
			}
		};
		
		// 
		// setup getters/setters
		//
		oParentNamespace.preset(obj, [
			"color", "backgroundColor", "backgroundImage", "backgroundGradient", 
			"backgroundSelectedColor", "backgroundFocusedColor", 
			"backgroundSelectedImage", "backgroundFocusedImage", 
			"border", "borderWidth", "borderColor", "borderRadius", "font", "fontStyle", 
			"fontWeight", "fontSize", "fontFamily", "opacity", "zIndex", "visible", "focusable"
		], args);
	};
})(Ti._5);	

;
(function(oParentNamespace) {
	// Create interface
	oParentNamespace.Touchable = function(obj, args, bEmulate) {
		if ('function' != typeof obj.addEventListener) {
			oParentNamespace.EventDriven(obj);
		}
		
		// Check for OS that does not support touch events
		if (
			-1 < Titanium.Platform.ostype.indexOf('Win') || 
			-1 < Titanium.Platform.ostype.indexOf('Linux') ||
			-1 < Titanium.Platform.ostype.indexOf('Mac')
		) {
			bEmulate = true;
		}
		
		// Android support touch events
		if (-1 < Titanium.Platform.osname.indexOf('android')) {
			bEmulate = false;
		}
		
		var _touchEnabled = true;
		Object.defineProperty(obj, 'touchEnabled', {
			get: function() {
				return _touchEnabled ? _touchEnabled : '';
			},
			set: function(val) {
				_touchEnabled = val;
			},
			configurable: true
		});
		
		//
		// setup getters/setters
		//
		oParentNamespace.preset(obj, ["touchEnabled"], args);
		
		var _startPoint = null;
		function _fTouchStart (event) {
			if (!_touchEnabled) {
				return true;
			}
			var xCoord = event.touches ? event.touches[0].pageX : event.pageX;
			var yCoord = event.touches ? event.touches[0].pageY : event.pageY;
			var oEvent = {
				globalPoint	: { x:xCoord, y:yCoord }, 
				source		: obj,
				type		: 'touchstart',
				x			: xCoord,
				y			: yCoord
			};
			_startPoint = oEvent.globalPoint;
			_startPoint.source = event.target;
			_endPoint = oEvent.globalPoint;
			obj.fireEvent('touchstart', oEvent);
			if (event.touches && 2 == event.touches.length) {
				obj.fireEvent('twofingertap',  {
					globalPoint	: { x:xCoord, y:yCoord }, 
					source		: obj,
					type		: 'twofingertap',
					x			: xCoord,
					y			: yCoord
				});
			}
		};
		if (bEmulate) {
			obj.dom.addEventListener('mousedown', _fTouchStart, false);
		} else {
			obj.dom.addEventListener('touchstart',_fTouchStart, false);
		}
		
		var _endPoint = null;
		function _fTouchMove (event) {
			if (!_touchEnabled || bEmulate && !_startPoint) {
				return true;
			}
			var xCoord = event.touches ? event.touches[0].pageX : event.pageX;
			var yCoord = event.touches ? event.touches[0].pageY : event.pageY;
			var oEvent = {
				globalPoint	: { x:xCoord, y:yCoord }, 
				source		: obj,
				type		: 'touchmove',
				x			: xCoord,
				y			: yCoord
			};
			_endPoint = oEvent.globalPoint;
			obj.fireEvent('touchmove', oEvent);
		}
		if (bEmulate) {
			obj.dom.addEventListener('mousemove', _fTouchMove, false);
		} else {
			obj.dom.addEventListener('touchmove', _fTouchMove, false);
		}
		
		function _fTouchEnd (event) {
			if (!_touchEnabled) {
				return true;
			}
			if (!_endPoint) {
				_endPoint = {
					x: event.pageX, 
					y: event.pageY 
				}
			}
			var oEvent = {
				globalPoint	: { x:_endPoint.x, y:_endPoint.y }, 
				source		: obj,
				type		: 'touchend',
				x			: _endPoint.x,
				y			: _endPoint.y
			};
			obj.fireEvent('touchend', oEvent);
			if (_startPoint && _startPoint.source) {
				if (_startPoint.source == event.target && 50 <= Math.abs(_endPoint.x - _startPoint.x)) {
					oEvent.direction = _endPoint.x > _startPoint.x ? 'right' : 'left';
					obj.fireEvent('swipe', oEvent);
				}
			}
			_startPoint = null;
			_endPoint = null;
		}
		if (bEmulate) {
			obj.dom.addEventListener('mouseup', _fTouchEnd, false);
		} else {
			obj.dom.addEventListener('touchend', _fTouchEnd, false);
		}
	
		obj.dom.addEventListener('touchcancel', function(event) {
			if (!_touchEnabled) {
				return true;
			}
			var oEvent = {
				globalPoint	: { x:event.pageX, y:event.pageY }, 
				source		: obj,
				type		: 'touchcancel',
				x			: event.pageX,
				y			: event.pageY
			};
			obj.fireEvent('touchcancel', oEvent);
		}, false);
		
		var _isDoubleTap = false;
		obj.dom.addEventListener('click', function(event) {
			if (!_touchEnabled) {
				return true;
			}
			var oEvent = {
				globalPoint	: { x:event.pageX, y:event.pageY }, 
				source		: obj,
				type		: 'singletap',
				x			: event.pageX,
				y			: event.pageY
			};
			obj.fireEvent('singletap', oEvent);
			if (_isDoubleTap) {
				_isDoubleTap = false;
				obj.fireEvent('doubletap', {
					globalPoint	: { x:event.pageX, y:event.pageY }, 
					source		: obj,
					type		: 'doubletap',
					x			: event.pageX,
					y			: event.pageY
				});
			} else {
				_isDoubleTap = true;
				setTimeout(function() { 
					_isDoubleTap = false;
				}, 400);
			}
		}, false);
	}
})(Ti._5);	

;
(function(oParentNamespace) {
	// Create interface
	oParentNamespace.Positionable = function(obj, args) {
		if ('function' != typeof obj.addEventListener) {
			oParentNamespace.EventDriven(obj);
		}
		
		var _position = function(p, val) {
			obj.dom.style['position'] = 'absolute';
			obj.dom.style[p] = Ti._5.parseLength(val);
		};
		
		Object.defineProperty(obj, 'top', {
			get: function() {
				return obj.dom.style.top ? parseInt(obj.dom.style.top): '';
			},
			set: function(val) {
				if (obj.dom.style['bottom']) {
					obj.dom.style['bottom'] = '';
				}
				_position('top', val);
			},
			configurable: true
		});
		
		Object.defineProperty(obj, 'bottom', {
			get: function() {
				return obj.dom.style.bottom ? parseInt(obj.dom.style.bottom) : '';
			},
			set: function(val) {
				if (obj.dom.style['top']) {
					obj.dom.style['top'] = '';
				}
				_position('bottom', val);
			},
			configurable: true
		});
		
		Object.defineProperty(obj, 'left', {
			get: function() {
				return obj.dom.style.left ? parseInt(obj.dom.style.left) : '';
			},
			set: function(val) {
				if (obj.dom.style['right']) {
					obj.dom.style['right'] = '';
				}
				_position('left', val);
			},
			configurable: true
		});		
		
		Object.defineProperty(obj, 'right', {
			get: function() {
				return obj.dom.style.right ? parseInt(obj.dom.style.right) : '';
			},
			set: function(val) {
				if (obj.dom.style['left']) {
					obj.dom.style['left'] = '';
				}
				_position('right', val);
			},
			configurable: true
		});	
		
		Object.defineProperty(obj, 'width', {
			get: function() {
				if (!obj.dom.style.width) {
					return '';
				}
				return /%/g.test(obj.dom.style.width) ? parseInt(obj.dom.style.width)+'%' : parseInt(obj.dom.style.width);
			},
			set: function(val) {
				obj.dom.style.width = /%/g.test(val+'') ? parseInt(val) + '%' : parseInt(val) + 'px';
			},
			configurable: true
		});	
		
		var _height;
		Object.defineProperty(obj, 'height', {
			get: function() {
				return _height;
			},
			set: function(val) {
				_height = val;
				obj.dom.style.height =  val + (/^\d+$/.test(val) ? 'px' : "");
			},
			configurable: true
		});
		
		//
		// setup getters/setters
		//
		oParentNamespace.preset(obj, ["top", "bottom", "left", "right", "width", "height"], args);
	}
	
})(Ti._5);	
;
(function(oParentNamespace) {
	if ('function' != typeof oParentNamespace.init || !oParentNamespace.EventDriven) {
		return false;
	}
	// create a generic DOM view 
	oParentNamespace.DOMView = function(obj, type, args, typename) {
		if ('function' != typeof obj.addEventListener) {
			oParentNamespace.EventDriven(obj);
		}
		obj.dom = document.createElement(type);
		obj.args = args;
		// Object for previous style rules
		obj.prevStyle = {};
		obj._parents = [];
		
		typename = typename || '';

		obj.toString = function() {
			return "[object " + typename + "View]";
		};
		
		obj._refresh = function(props) {
			if(props == null){
				return;
			}
			
			var domprops = props['domprops'];
			var obj = props['obj'];
			var complexDomprops = props['complexDomprops'];
			var args = props['args'];

			if (domprops) {
				for (var ii = 0; ii < domprops.length; ii++) {
					// property name
					var domProp = domprops[ii];

					if (args && 'undefined' != typeof args[domProp]) {
						obj.dom.style[domProp] = args[domProp];
					}
				}
			}

			if (complexDomprops) {
				for (ii = 0; ii < complexDomprops.length; ii++) {
					var propObj = complexDomprops[ii];
					var propKey = null;
					for (var sProp in propObj) {
						propKey = sProp;
						break;
					}
					var propValue = propObj[propKey];

					if (args && 'undefined' != typeof args[propKey]) {
						obj[propKey] = args[propKey];
					}
				}
			}
		};
		
		Object.defineProperty(obj, 'layout', {
			get: function() {
				return obj['layoutStyle'];
			},
			set: function(val) {
				obj['layoutStyle'] = val;
				// If layout option setted out of the constructor, we need to redraw object 
				if ('function' == typeof obj.render) { 
					obj.innerHTML = '';
					obj.render(null);
				}
			},
			configurable: true
		});
		
		//
		// setup getters/setters
		//
		Ti._5.preset(obj, ["layout"], args);
		
			
		// API Methods
		obj.render = function(parent) {
			obj._parent = parent;
			if (parent) {
				// handle horizontal layout
				if (parent['layoutStyle']=='horizontal') {
					obj.dom.style.cssFloat = 'left';
					obj.dom.style.position = 'relative';
					obj.dom.style.marginLeft = (obj.args) ? obj.args['left'] : '';
					obj.dom.style.left = '';
					obj.dom.style.marginTop = '';
				}
				// handle vertical layout
				else if (parent['layoutStyle'] == 'vertical') {
					parent.dom.style.clear = 'both';
					obj.dom.style.cssFloat = '';
					obj.dom.style.position = 'relative';
					obj.dom.style.marginLeft = '';
					obj.dom.style.marginTop = (obj.args) ? obj.args['top'] : '';
					obj.dom.style.display = 'block';
					obj.dom.style.top = '';
				}
				parent._getAddContainer().appendChild(obj.dom);
			} 
			if (obj._children) {
				for (var c=0;c<obj._children.length;c++) {
					obj._children[c].render(obj);
					//obj._children[c].render(obj._innerContainer ? obj._innerContainer : obj);
				}
			}
			obj._rendered = true;
		};
		obj._getAddContainer = function(){
			return obj.dom;
		};
	};
	
})(Ti._5);

;
(function(api){
	Ti._5.EventDriven(api);
	delete(this.removeEventListener);
	api.version = "1.7.0.RC2";
	api.buildDate = "06/21/11 15:33";
	api.buildHash = "facc025";
	api.userAgent = "Appcelerator Titanium/"+api.version+" ("+navigator.userAgent+")";
	var _loadedScripts = {};
	function _execScript(code) {
		var head = document.getElementsByTagName('head')[0];
		if(head == null){
			head = document;
		}
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = code;
		head.appendChild(script);
	}
	function _loadSynchScript(_location) {
		if ('undefined' != typeof _loadedScripts[_location]) {
            return _execScript(_loadedScripts[_location]);
        }
		var _xhr = new XMLHttpRequest(); 
		_xhr.onreadystatechange = function() {
			if (_xhr.readyState == 4) {
				if (_xhr.status == 200) {
					_loadedScripts[_location] = _xhr.responseText;
					_execScript(_xhr.responseText);
				} 
			}
		};
		_xhr.open("POST",_location,true);
		_xhr.setRequestHeader("Access-Control-Allow-Origin","*");
		_xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		_xhr.send(null);
	}

	// Methods
	api.createBlob = function(){
		console.debug('Method "Titanium.createBlob" is not implemented yet.');
	};
	
	api.include = function(files){
		var head = document.getElementsByTagName('head')[0];
		if(head == null){
			head = document;
		}

		for (var i = 0; i < arguments.length; i++){
			_loadSynchScript(Ti._5.getAbsolutePath(arguments[i]));
		}
	};
})(Ti);

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	var STORAGE = "html5_localStorage";
	var _getProp = function(prop, def, transform){
		if(prop == null){
			return;
		}
		var storage = localStorage.getItem(STORAGE);
		if(storage == null){
			storage = [];
		} else {
			storage = JSON.parse(storage);
		}
		var val =  storage[prop];
		if(val != null){
			return typeof transform !== 'undefined' ? transform(val) : val;
		} else if (typeof def !== 'undefined'){
			return def;
		}

		return val;
	};

	var _setProp = function(prop, val, transform){
		if(prop == null || typeof val === 'undefined'){
			return;
		}
		val = typeof transform !== 'undefined' ? transform(val) : val;
		var storage = localStorage.getItem(STORAGE);
		if(storage == null){
			storage = {};
		} else {
			storage = JSON.parse(storage);
		}
		if(prop != null){
			storage[prop] = val;
		}
		localStorage.setItem(STORAGE, JSON.stringify(storage));
	};

	var _parseBoolean = function(val){return Boolean(val);};
	// Methods
	api.getBool = function(prop, def){
		return _getProp(prop, def, _parseBoolean);
	};
	api.getDouble = function(prop, def){
		return _getProp(prop, def, parseFloat);
	};
	api.getInt = function(prop, def){
		return _getProp(prop, def, parseInt);
	};
	api.getList = function(prop, def){
		return _getProp(prop, def, function(val){
			if(val instanceof Array){
				return val;
			}
			return [val];
		});
	};
	api.getString = function(prop, def){
		return _getProp(prop, def, function(val){
			if(typeof val === 'string'){
				return val;
			}
			return val.toString();
		});
	};
	api.hasProperty = function(prop){
		return typeof _getProp(prop) !== 'undefined';
	};
	api.listProperties = function(){
		var storage = localStorage.getItem(STORAGE);
		if(storage == null){
			return [];
		} else {
			storage = JSON.parse(storage);
		}
		var props = [];
		for(var key in storage){
			props.push(key);
		}

		return props;
	};
	api.removeProperty = function(prop){
		var storage = localStorage.getItem(STORAGE);
		if(storage == null){
			return;
		} else {
			storage = JSON.parse(storage);
		}
		
		delete storage[prop];

		localStorage.setItem(STORAGE, JSON.stringify(storage));
	};
	api.setBool = function(prop, val){
		_setProp(prop, val, _parseBoolean);
	};
	api.setDouble = function(prop, val){
		_setProp(prop, val, parseFloat);
	};
	api.setInt = function(prop, val){
		_setProp(prop, val, parseInt);
	};
	api.setList = function(prop, val){
		_setProp(prop, val, function(val){
			if(val instanceof Array){
				return val;
			}
			return [val];
		});
	};
	api.setString = function(prop, val){
		_setProp(prop, val, function(val){
			if(typeof val === 'string'){
				return val;
			}
			return val.toString();
		});
	};
})(Ti._5.createClass('Titanium.App.Properties'));

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _currentCountry = null;
	Object.defineProperty(api, 'currentCountry', {
		get: function(){return _currentCountry;},
		set: function(val){return _currentCountry = val;}
	});

	var _currentLanguage = null;
	Object.defineProperty(api, 'currentLanguage', {
		get: function(){return _currentLanguage;},
		set: function(val){return _currentLanguage = val;}
	});

	var _currentLocale = null;
	Object.defineProperty(api, 'currentLocale', {
		get: function(){return _currentLocale;},
		set: function(val){return _currentLocale = val;}
	});

	// Methods
	api.formatTelephoneNumber = function(){
		console.debug('Method "Titanium.Locale.formatTelephoneNumber" is not implemented yet.');
	};
	api.getCurrencyCode = function(){
		console.debug('Method "Titanium.Locale.getCurrencyCode" is not implemented yet.');
	};
	api.getCurrencySymbol = function(){
		console.debug('Method "Titanium.Locale.getCurrencySymbol" is not implemented yet.');
	};
	api.getLocaleCurrencySymbol = function(){
		console.debug('Method "Titanium.Locale.getLocaleCurrencySymbol" is not implemented yet.');
	};
	api.getString = function(str){
		console.debug('Method "Titanium.Locale.getString" is not implemented yet.');
		return str;
	};
})(Ti._5.createClass('Titanium.Locale'));
L=Titanium.Locale.getString;

(function(api){
	api.format = function(){
			console.debug('Method "String.format" is not implemented yet.');
	};

	api.formatDate = function(){
			console.debug('Method "String.formatDate" is not implemented yet.');
	};

	api.formatTime = function(){
			console.debug('Method "String.formatTime" is not implemented yet.');
	};

	api.formatCurrency = function(){
			console.debug('Method "String.formatCurrency" is not implemented yet.');
	};

	api.formatDecimal = function(){
			console.debug('Method "String.formatDecimal" is not implemented yet.');
	};
})(String);

;
(function(api){
	/** Browser detect is from http://www.quirksmode.org/js/detect.html **/
	
	var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{	// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 	// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iphone"
		    	},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			},
			{
				string: navigator.userAgent,
				subString: "Android",
				identity: "android"
			},
			{
				string: navigator.userAgent,
				subString: "iPod",
				identity: "ipod"
			},
			{
				string: navigator.userAgent,
				subString: "Symbian",
				identity: "symbian"
			},
			{
				string: navigator.userAgent,
				subString: "Blackberry",
				identity: "blackberry"
			},
			{
				string: navigator.userAgent,
				subString: "iPad",
				identity: "ipad"
			}
		]
		
	};
	
	BrowserDetect.init();

	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	api.isBrowser = true;

	api.BATTERY_STATE_CHARGING = 1;
	api.BATTERY_STATE_FULL = 2;
	api.BATTERY_STATE_UNKNOWN = -1;
	api.BATTERY_STATE_UNPLUGGED = 0;
	
	var _address = null;
	Object.defineProperty(api, 'address', {
		get: function(){return _address;},
		set: function(val){return _address = val;}
	});

	var _architecture = null;
	Object.defineProperty(api, 'architecture', {
		get: function(){return _architecture;},
		set: function(val){return _architecture = val;}
	});

	var _availableMemory = null;
	Object.defineProperty(api, 'availableMemory', {
		get: function(){return _availableMemory;},
		set: function(val){return _availableMemory = val;}
	});

	var _batteryLevel = null;
	Object.defineProperty(api, 'batteryLevel', {
		get: function(){return _batteryLevel;},
		set: function(val){return _batteryLevel = val;}
	});

	var _batteryMonitoring = false;
	Object.defineProperty(api, 'batteryMonitoring', {
		get: function(){return _batteryMonitoring;},
		set: function(val){return _batteryMonitoring=val ? true : false;}
	});
	
	var _batteryState = api.BATTERY_STATE_UNKNOWN;
	Object.defineProperty(api, 'batteryState', {
		get: function(){return _batteryState;},
		set: function(val){return false;}
	});

	Object.defineProperty(api, 'displayCaps', {
		get: function(){return Titanium.Platform.DisplayCaps;},
		set: function(val){return false;}
	});

	Object.defineProperty(api, 'locale', {
		get: function(){return navigator.language;},
		set: function(val){return false;}
	});

	var _macaddress = null;
	Object.defineProperty(api, 'macaddress', {
		get: function(){return _macaddress;},
		set: function(val){return _macaddress = val;}
	});

	var _model = null;
	Object.defineProperty(api, 'model', {
		get: function(){return _model;},
		set: function(val){return false;}
	});

	Object.defineProperty(api, 'name', {
		get: function(){return BrowserDetect.browser;},
		set: function(val){return false;}
	});

	var _netmask = null;
	Object.defineProperty(api, 'netmask', {
		get: function(){return _netmask;},
		set: function(val){return _netmask = val;}
	});

	Object.defineProperty(api, 'osname', {
		get: function(){return BrowserDetect.OS;},
		set: function(val){return false;}
	});

	Object.defineProperty(api, 'ostype', {
		get: function(){return navigator.platform;},
		set: function(val){return false;}
	});

	var _processorCount = null;
	Object.defineProperty(api, 'processorCount', {
		get: function(){return _processorCount;},
		set: function(val){return _processorCount = val;}
	});

	var _username = null;
	Object.defineProperty(api, 'username', {
		get: function(){return _username;},
		set: function(val){return _username = val;}
	});

	Object.defineProperty(api, 'version', {
		get: function(){return Ti.version;},
		set: function(val){return false;}
	});

	// Methods
	api.canOpenURL = function(url){
		var _xhr = new XMLHttpRequest(); 
		try {
			_xhr.open('GET',url,false);
			_xhr.setRequestHeader("Access-Control-Allow-Origin","*");
			_xhr.send(null);
			return parseInt(_xhr.status) == 200 ? true : false;
		} catch (error) {
			return parseInt(error.code) == 101 ? true : false;
		}
	};
	api.createUUID = function(){
		return Ti._5.createUUID();
	};

	api.openURL = function(url){
		window.open(url);
	};
	
	var _id = localStorage && localStorage.getItem("html5_titaniumPlatformId") ?
		localStorage.getItem("html5_titaniumPlatformId") : api.createUUID();
	localStorage.setItem("html5_titaniumPlatformId", _id);
	Object.defineProperty(api, 'id', {
		get: function(){return _id;},
		set: function(val){return false;}
	});

	// Events
	api.addEventListener('battery', function(){
		console.debug('Event "battery" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Platform'));


;

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	
	var _tLastShake = new Date(), _lastAccel = {}; 
	// need some delta for coordinates changed
	var _delta = 20;
	function _checkShake (ev) {
		var accel = {
			x: ev.acceleration.x || ev.accelerationIncludingGravity.x || ev.x,
			y: ev.acceleration.y || ev.accelerationIncludingGravity.y || ev.y,
			z: ev.acceleration.z || ev.accelerationIncludingGravity.z || ev.z
		};
		
		if (_lastAccel.x || _lastAccel.y || _lastAccel.z) {
			if (
				((Math.abs(_lastAccel.x - accel.x) > _delta) && (Math.abs(_lastAccel.y - accel.y) > _delta)) || 
				((Math.abs(_lastAccel.x - accel.x) > _delta) && (Math.abs(_lastAccel.z - accel.z) > _delta)) || 
				((Math.abs(_lastAccel.y - accel.y) > _delta) && (Math.abs(_lastAccel.z - accel.z) > _delta))
			) {
				var currentTime = new Date();
				var timeDifference = currentTime.getTime() - _tLastShake.getTime();
				if (timeDifference > 300) {
					_tLastShake = new Date();
					
					api.fireEvent('update', {
						source: ev.source,
						timestamp: timeDifference,
						type: 'update',
						x: accel.x,
						y: accel.y,
						z: accel.z
					})
				}
			}
		}
		_lastAccel = accel;
	}
	window.addEventListener("devicemotion", _checkShake, false);
	window.addEventListener("MozOrientation", _checkShake, false);
	
})(Ti._5.createClass('Titanium.Accelerometer'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Methods
	api.addEvent = function(typ, name, data){
		Ti._5.addAnalyticsEvent(typ, name, data);
	};
	api.featureEvent = function(name, data){
		Ti._5.addAnalyticsEvent('app.feature', name, data);
	};
	api.navEvent = function(from, to, name, data){
		Ti._5.addAnalyticsEvent('app.nav', name, data);
	};
	api.settingsEvent = function(name, data){
		Ti._5.addAnalyticsEvent('app.settings', name, data);
	};
	api.timedEvent = function(name, start, stop, duration, data){
		if(data == null){
			data = {};
		}
		data.start = start;
		data.stop = stop;
		data.duration = duration;

		Ti._5.addAnalyticsEvent('app.timed', name, data);
	};
	api.userEvent = function(name, data){
		Ti._5.addAnalyticsEvent('app.user', name, data);
	};
})(Ti._5.createClass('Titanium.Analytics'));

;
(function(api){
	Ti._5.EventDriven(api);

	// Properties
	var _intent = null;
	Object.defineProperty(api, 'intent', {
		get: function(){return _intent;},
		set: function(val){return _intent = val;}
	});

	var _onCreateOptionsMenu = null;
	Object.defineProperty(api, 'onCreateOptionsMenu', {
		get: function(){return _onCreateOptionsMenu;},
		set: function(val){return _onCreateOptionsMenu = val;}
	});

	var _onPrepareOptionsMenu = null;
	Object.defineProperty(api, 'onPrepareOptionsMenu', {
		get: function(){return _onPrepareOptionsMenu;},
		set: function(val){return _onPrepareOptionsMenu = val;}
	});

	var _requestedOrientation = null;
	Object.defineProperty(api, 'requestedOrientation', {
		get: function(){return _requestedOrientation;},
		set: function(val){return _requestedOrientation = val;}
	});

	// Methods
	api.finish = function(){
		console.debug('Method "Titanium.Android.Activity..finish" is not implemented yet.');
	};
	api.getIntent = function(){
		console.debug('Method "Titanium.Android.Activity..getIntent" is not implemented yet.');
	};
	api.getString = function(){
		console.debug('Method "Titanium.Android.Activity..getString" is not implemented yet.');
	};
	api.setRequestedOrientation = function(){
		console.debug('Method "Titanium.Android.Activity..setRequestedOrientation" is not implemented yet.');
	};
	api.setResult = function(){
		console.debug('Method "Titanium.Android.Activity..setResult" is not implemented yet.');
	};
	api.startActivity = function(){
		console.debug('Method "Titanium.Android.Activity..startActivity" is not implemented yet.');
	};
	api.startActivityForResult = function(){
		console.debug('Method "Titanium.Android.Activity..startActivityForResult" is not implemented yet.');
	};

	// Events
	api.addEventListener('create', function(){
		console.debug('Event "create" is not implemented yet.');
	});
	api.addEventListener('destroy', function(){
		console.debug('Event "destroy" is not implemented yet.');
	});
	api.addEventListener('pause', function(){
		console.debug('Event "pause" is not implemented yet.');
	});
	api.addEventListener('resume', function(){
		console.debug('Event "resume" is not implemented yet.');
	});
	api.addEventListener('start', function(){
		console.debug('Event "start" is not implemented yet.');
	});
	api.addEventListener('stop', function(){
		console.debug('Event "stop" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Android.Activity'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _ACTION_AIRPLANE_MODE_CHANGED = null;
	Object.defineProperty(api, 'ACTION_AIRPLANE_MODE_CHANGED', {
		get: function(){return _ACTION_AIRPLANE_MODE_CHANGED;},
		set: function(val){return _ACTION_AIRPLANE_MODE_CHANGED = val;}
	});

	var _ACTION_ALL_APPS = null;
	Object.defineProperty(api, 'ACTION_ALL_APPS', {
		get: function(){return _ACTION_ALL_APPS;},
		set: function(val){return _ACTION_ALL_APPS = val;}
	});

	var _ACTION_ANSWER = null;
	Object.defineProperty(api, 'ACTION_ANSWER', {
		get: function(){return _ACTION_ANSWER;},
		set: function(val){return _ACTION_ANSWER = val;}
	});

	var _ACTION_ATTACH_DATA = null;
	Object.defineProperty(api, 'ACTION_ATTACH_DATA', {
		get: function(){return _ACTION_ATTACH_DATA;},
		set: function(val){return _ACTION_ATTACH_DATA = val;}
	});

	var _ACTION_BATTERY_CHANGED = null;
	Object.defineProperty(api, 'ACTION_BATTERY_CHANGED', {
		get: function(){return _ACTION_BATTERY_CHANGED;},
		set: function(val){return _ACTION_BATTERY_CHANGED = val;}
	});

	var _ACTION_BATTERY_LOW = null;
	Object.defineProperty(api, 'ACTION_BATTERY_LOW', {
		get: function(){return _ACTION_BATTERY_LOW;},
		set: function(val){return _ACTION_BATTERY_LOW = val;}
	});

	var _ACTION_BATTERY_OKAY = null;
	Object.defineProperty(api, 'ACTION_BATTERY_OKAY', {
		get: function(){return _ACTION_BATTERY_OKAY;},
		set: function(val){return _ACTION_BATTERY_OKAY = val;}
	});

	var _ACTION_BOOT_COMPLETED = null;
	Object.defineProperty(api, 'ACTION_BOOT_COMPLETED', {
		get: function(){return _ACTION_BOOT_COMPLETED;},
		set: function(val){return _ACTION_BOOT_COMPLETED = val;}
	});

	var _ACTION_BUG_REPORT = null;
	Object.defineProperty(api, 'ACTION_BUG_REPORT', {
		get: function(){return _ACTION_BUG_REPORT;},
		set: function(val){return _ACTION_BUG_REPORT = val;}
	});

	var _ACTION_CALL = null;
	Object.defineProperty(api, 'ACTION_CALL', {
		get: function(){return _ACTION_CALL;},
		set: function(val){return _ACTION_CALL = val;}
	});

	var _ACTION_CALL_BUTTON = null;
	Object.defineProperty(api, 'ACTION_CALL_BUTTON', {
		get: function(){return _ACTION_CALL_BUTTON;},
		set: function(val){return _ACTION_CALL_BUTTON = val;}
	});

	var _ACTION_CAMERA_BUTTON = null;
	Object.defineProperty(api, 'ACTION_CAMERA_BUTTON', {
		get: function(){return _ACTION_CAMERA_BUTTON;},
		set: function(val){return _ACTION_CAMERA_BUTTON = val;}
	});

	var _ACTION_CHOOSER = null;
	Object.defineProperty(api, 'ACTION_CHOOSER', {
		get: function(){return _ACTION_CHOOSER;},
		set: function(val){return _ACTION_CHOOSER = val;}
	});

	var _ACTION_CLOSE_SYSTEM_DIALOGS = null;
	Object.defineProperty(api, 'ACTION_CLOSE_SYSTEM_DIALOGS', {
		get: function(){return _ACTION_CLOSE_SYSTEM_DIALOGS;},
		set: function(val){return _ACTION_CLOSE_SYSTEM_DIALOGS = val;}
	});

	var _ACTION_CONFIGURATION_CHANGED = null;
	Object.defineProperty(api, 'ACTION_CONFIGURATION_CHANGED', {
		get: function(){return _ACTION_CONFIGURATION_CHANGED;},
		set: function(val){return _ACTION_CONFIGURATION_CHANGED = val;}
	});

	var _ACTION_CREATE_SHORTCUT = null;
	Object.defineProperty(api, 'ACTION_CREATE_SHORTCUT', {
		get: function(){return _ACTION_CREATE_SHORTCUT;},
		set: function(val){return _ACTION_CREATE_SHORTCUT = val;}
	});

	var _ACTION_DATE_CHANGED = null;
	Object.defineProperty(api, 'ACTION_DATE_CHANGED', {
		get: function(){return _ACTION_DATE_CHANGED;},
		set: function(val){return _ACTION_DATE_CHANGED = val;}
	});

	var _ACTION_DEFAULT = null;
	Object.defineProperty(api, 'ACTION_DEFAULT', {
		get: function(){return _ACTION_DEFAULT;},
		set: function(val){return _ACTION_DEFAULT = val;}
	});

	var _ACTION_DELETE = null;
	Object.defineProperty(api, 'ACTION_DELETE', {
		get: function(){return _ACTION_DELETE;},
		set: function(val){return _ACTION_DELETE = val;}
	});

	var _ACTION_DEVICE_STORAGE_LOW = null;
	Object.defineProperty(api, 'ACTION_DEVICE_STORAGE_LOW', {
		get: function(){return _ACTION_DEVICE_STORAGE_LOW;},
		set: function(val){return _ACTION_DEVICE_STORAGE_LOW = val;}
	});

	var _ACTION_DIAL = null;
	Object.defineProperty(api, 'ACTION_DIAL', {
		get: function(){return _ACTION_DIAL;},
		set: function(val){return _ACTION_DIAL = val;}
	});

	var _ACTION_EDIT = null;
	Object.defineProperty(api, 'ACTION_EDIT', {
		get: function(){return _ACTION_EDIT;},
		set: function(val){return _ACTION_EDIT = val;}
	});

	var _ACTION_GET_CONTENT = null;
	Object.defineProperty(api, 'ACTION_GET_CONTENT', {
		get: function(){return _ACTION_GET_CONTENT;},
		set: function(val){return _ACTION_GET_CONTENT = val;}
	});

	var _ACTION_GTALK_SERVICE_CONNECTED = null;
	Object.defineProperty(api, 'ACTION_GTALK_SERVICE_CONNECTED', {
		get: function(){return _ACTION_GTALK_SERVICE_CONNECTED;},
		set: function(val){return _ACTION_GTALK_SERVICE_CONNECTED = val;}
	});

	var _ACTION_GTALK_SERVICE_DISCONNECTED = null;
	Object.defineProperty(api, 'ACTION_GTALK_SERVICE_DISCONNECTED', {
		get: function(){return _ACTION_GTALK_SERVICE_DISCONNECTED;},
		set: function(val){return _ACTION_GTALK_SERVICE_DISCONNECTED = val;}
	});

	var _ACTION_HEADSET_PLUG = null;
	Object.defineProperty(api, 'ACTION_HEADSET_PLUG', {
		get: function(){return _ACTION_HEADSET_PLUG;},
		set: function(val){return _ACTION_HEADSET_PLUG = val;}
	});

	var _ACTION_INPUT_METHOD_CHANGED = null;
	Object.defineProperty(api, 'ACTION_INPUT_METHOD_CHANGED', {
		get: function(){return _ACTION_INPUT_METHOD_CHANGED;},
		set: function(val){return _ACTION_INPUT_METHOD_CHANGED = val;}
	});

	var _ACTION_INSERT = null;
	Object.defineProperty(api, 'ACTION_INSERT', {
		get: function(){return _ACTION_INSERT;},
		set: function(val){return _ACTION_INSERT = val;}
	});

	var _ACTION_INSERT_OR_EDIT = null;
	Object.defineProperty(api, 'ACTION_INSERT_OR_EDIT', {
		get: function(){return _ACTION_INSERT_OR_EDIT;},
		set: function(val){return _ACTION_INSERT_OR_EDIT = val;}
	});

	var _ACTION_MAIN = null;
	Object.defineProperty(api, 'ACTION_MAIN', {
		get: function(){return _ACTION_MAIN;},
		set: function(val){return _ACTION_MAIN = val;}
	});

	var _ACTION_MANAGE_PACKAGE_STORAGE = null;
	Object.defineProperty(api, 'ACTION_MANAGE_PACKAGE_STORAGE', {
		get: function(){return _ACTION_MANAGE_PACKAGE_STORAGE;},
		set: function(val){return _ACTION_MANAGE_PACKAGE_STORAGE = val;}
	});

	var _ACTION_MEDIA_BAD_REMOVAL = null;
	Object.defineProperty(api, 'ACTION_MEDIA_BAD_REMOVAL', {
		get: function(){return _ACTION_MEDIA_BAD_REMOVAL;},
		set: function(val){return _ACTION_MEDIA_BAD_REMOVAL = val;}
	});

	var _ACTION_MEDIA_BUTTON = null;
	Object.defineProperty(api, 'ACTION_MEDIA_BUTTON', {
		get: function(){return _ACTION_MEDIA_BUTTON;},
		set: function(val){return _ACTION_MEDIA_BUTTON = val;}
	});

	var _ACTION_MEDIA_CHECKING = null;
	Object.defineProperty(api, 'ACTION_MEDIA_CHECKING', {
		get: function(){return _ACTION_MEDIA_CHECKING;},
		set: function(val){return _ACTION_MEDIA_CHECKING = val;}
	});

	var _ACTION_MEDIA_EJECT = null;
	Object.defineProperty(api, 'ACTION_MEDIA_EJECT', {
		get: function(){return _ACTION_MEDIA_EJECT;},
		set: function(val){return _ACTION_MEDIA_EJECT = val;}
	});

	var _ACTION_MEDIA_MOUNTED = null;
	Object.defineProperty(api, 'ACTION_MEDIA_MOUNTED', {
		get: function(){return _ACTION_MEDIA_MOUNTED;},
		set: function(val){return _ACTION_MEDIA_MOUNTED = val;}
	});

	var _ACTION_MEDIA_NOFS = null;
	Object.defineProperty(api, 'ACTION_MEDIA_NOFS', {
		get: function(){return _ACTION_MEDIA_NOFS;},
		set: function(val){return _ACTION_MEDIA_NOFS = val;}
	});

	var _ACTION_MEDIA_REMOVED = null;
	Object.defineProperty(api, 'ACTION_MEDIA_REMOVED', {
		get: function(){return _ACTION_MEDIA_REMOVED;},
		set: function(val){return _ACTION_MEDIA_REMOVED = val;}
	});

	var _ACTION_MEDIA_SCANNER_FINISHED = null;
	Object.defineProperty(api, 'ACTION_MEDIA_SCANNER_FINISHED', {
		get: function(){return _ACTION_MEDIA_SCANNER_FINISHED;},
		set: function(val){return _ACTION_MEDIA_SCANNER_FINISHED = val;}
	});

	var _ACTION_MEDIA_SCANNER_SCAN_FILE = null;
	Object.defineProperty(api, 'ACTION_MEDIA_SCANNER_SCAN_FILE', {
		get: function(){return _ACTION_MEDIA_SCANNER_SCAN_FILE;},
		set: function(val){return _ACTION_MEDIA_SCANNER_SCAN_FILE = val;}
	});

	var _ACTION_MEDIA_SCANNER_STARTED = null;
	Object.defineProperty(api, 'ACTION_MEDIA_SCANNER_STARTED', {
		get: function(){return _ACTION_MEDIA_SCANNER_STARTED;},
		set: function(val){return _ACTION_MEDIA_SCANNER_STARTED = val;}
	});

	var _ACTION_MEDIA_SHARED = null;
	Object.defineProperty(api, 'ACTION_MEDIA_SHARED', {
		get: function(){return _ACTION_MEDIA_SHARED;},
		set: function(val){return _ACTION_MEDIA_SHARED = val;}
	});

	var _ACTION_MEDIA_UNMOUNTABLE = null;
	Object.defineProperty(api, 'ACTION_MEDIA_UNMOUNTABLE', {
		get: function(){return _ACTION_MEDIA_UNMOUNTABLE;},
		set: function(val){return _ACTION_MEDIA_UNMOUNTABLE = val;}
	});

	var _ACTION_MEDIA_UNMOUNTED = null;
	Object.defineProperty(api, 'ACTION_MEDIA_UNMOUNTED', {
		get: function(){return _ACTION_MEDIA_UNMOUNTED;},
		set: function(val){return _ACTION_MEDIA_UNMOUNTED = val;}
	});

	var _ACTION_NEW_OUTGOING_CALL = null;
	Object.defineProperty(api, 'ACTION_NEW_OUTGOING_CALL', {
		get: function(){return _ACTION_NEW_OUTGOING_CALL;},
		set: function(val){return _ACTION_NEW_OUTGOING_CALL = val;}
	});

	var _ACTION_PACKAGE_ADDED = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_ADDED', {
		get: function(){return _ACTION_PACKAGE_ADDED;},
		set: function(val){return _ACTION_PACKAGE_ADDED = val;}
	});

	var _ACTION_PACKAGE_CHANGED = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_CHANGED', {
		get: function(){return _ACTION_PACKAGE_CHANGED;},
		set: function(val){return _ACTION_PACKAGE_CHANGED = val;}
	});

	var _ACTION_PACKAGE_DATA_CLEARED = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_DATA_CLEARED', {
		get: function(){return _ACTION_PACKAGE_DATA_CLEARED;},
		set: function(val){return _ACTION_PACKAGE_DATA_CLEARED = val;}
	});

	var _ACTION_PACKAGE_INSTALL = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_INSTALL', {
		get: function(){return _ACTION_PACKAGE_INSTALL;},
		set: function(val){return _ACTION_PACKAGE_INSTALL = val;}
	});

	var _ACTION_PACKAGE_REMOVED = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_REMOVED', {
		get: function(){return _ACTION_PACKAGE_REMOVED;},
		set: function(val){return _ACTION_PACKAGE_REMOVED = val;}
	});

	var _ACTION_PACKAGE_REPLACED = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_REPLACED', {
		get: function(){return _ACTION_PACKAGE_REPLACED;},
		set: function(val){return _ACTION_PACKAGE_REPLACED = val;}
	});

	var _ACTION_PACKAGE_RESTARTED = null;
	Object.defineProperty(api, 'ACTION_PACKAGE_RESTARTED', {
		get: function(){return _ACTION_PACKAGE_RESTARTED;},
		set: function(val){return _ACTION_PACKAGE_RESTARTED = val;}
	});

	var _ACTION_PICK = null;
	Object.defineProperty(api, 'ACTION_PICK', {
		get: function(){return _ACTION_PICK;},
		set: function(val){return _ACTION_PICK = val;}
	});

	var _ACTION_PICK_ACTIVITY = null;
	Object.defineProperty(api, 'ACTION_PICK_ACTIVITY', {
		get: function(){return _ACTION_PICK_ACTIVITY;},
		set: function(val){return _ACTION_PICK_ACTIVITY = val;}
	});

	var _ACTION_POWER_CONNECTED = null;
	Object.defineProperty(api, 'ACTION_POWER_CONNECTED', {
		get: function(){return _ACTION_POWER_CONNECTED;},
		set: function(val){return _ACTION_POWER_CONNECTED = val;}
	});

	var _ACTION_POWER_DISCONNECTED = null;
	Object.defineProperty(api, 'ACTION_POWER_DISCONNECTED', {
		get: function(){return _ACTION_POWER_DISCONNECTED;},
		set: function(val){return _ACTION_POWER_DISCONNECTED = val;}
	});

	var _ACTION_POWER_USAGE_SUMMARY = null;
	Object.defineProperty(api, 'ACTION_POWER_USAGE_SUMMARY', {
		get: function(){return _ACTION_POWER_USAGE_SUMMARY;},
		set: function(val){return _ACTION_POWER_USAGE_SUMMARY = val;}
	});

	var _ACTION_PROVIDER_CHANGED = null;
	Object.defineProperty(api, 'ACTION_PROVIDER_CHANGED', {
		get: function(){return _ACTION_PROVIDER_CHANGED;},
		set: function(val){return _ACTION_PROVIDER_CHANGED = val;}
	});

	var _ACTION_REBOOT = null;
	Object.defineProperty(api, 'ACTION_REBOOT', {
		get: function(){return _ACTION_REBOOT;},
		set: function(val){return _ACTION_REBOOT = val;}
	});

	var _ACTION_RUN = null;
	Object.defineProperty(api, 'ACTION_RUN', {
		get: function(){return _ACTION_RUN;},
		set: function(val){return _ACTION_RUN = val;}
	});

	var _ACTION_SCREEN_OFF = null;
	Object.defineProperty(api, 'ACTION_SCREEN_OFF', {
		get: function(){return _ACTION_SCREEN_OFF;},
		set: function(val){return _ACTION_SCREEN_OFF = val;}
	});

	var _ACTION_SCREEN_ON = null;
	Object.defineProperty(api, 'ACTION_SCREEN_ON', {
		get: function(){return _ACTION_SCREEN_ON;},
		set: function(val){return _ACTION_SCREEN_ON = val;}
	});

	var _ACTION_SEARCH = null;
	Object.defineProperty(api, 'ACTION_SEARCH', {
		get: function(){return _ACTION_SEARCH;},
		set: function(val){return _ACTION_SEARCH = val;}
	});

	var _ACTION_SEARCH_LONG_PRESS = null;
	Object.defineProperty(api, 'ACTION_SEARCH_LONG_PRESS', {
		get: function(){return _ACTION_SEARCH_LONG_PRESS;},
		set: function(val){return _ACTION_SEARCH_LONG_PRESS = val;}
	});

	var _ACTION_SEND = null;
	Object.defineProperty(api, 'ACTION_SEND', {
		get: function(){return _ACTION_SEND;},
		set: function(val){return _ACTION_SEND = val;}
	});

	var _ACTION_SENDTO = null;
	Object.defineProperty(api, 'ACTION_SENDTO', {
		get: function(){return _ACTION_SENDTO;},
		set: function(val){return _ACTION_SENDTO = val;}
	});

	var _ACTION_SEND_MULTIPLE = null;
	Object.defineProperty(api, 'ACTION_SEND_MULTIPLE', {
		get: function(){return _ACTION_SEND_MULTIPLE;},
		set: function(val){return _ACTION_SEND_MULTIPLE = val;}
	});

	var _ACTION_SET_WALLPAPER = null;
	Object.defineProperty(api, 'ACTION_SET_WALLPAPER', {
		get: function(){return _ACTION_SET_WALLPAPER;},
		set: function(val){return _ACTION_SET_WALLPAPER = val;}
	});

	var _ACTION_SHUTDOWN = null;
	Object.defineProperty(api, 'ACTION_SHUTDOWN', {
		get: function(){return _ACTION_SHUTDOWN;},
		set: function(val){return _ACTION_SHUTDOWN = val;}
	});

	var _ACTION_SYNC = null;
	Object.defineProperty(api, 'ACTION_SYNC', {
		get: function(){return _ACTION_SYNC;},
		set: function(val){return _ACTION_SYNC = val;}
	});

	var _ACTION_SYSTEM_TUTORIAL = null;
	Object.defineProperty(api, 'ACTION_SYSTEM_TUTORIAL', {
		get: function(){return _ACTION_SYSTEM_TUTORIAL;},
		set: function(val){return _ACTION_SYSTEM_TUTORIAL = val;}
	});

	var _ACTION_TIME_CHANGED = null;
	Object.defineProperty(api, 'ACTION_TIME_CHANGED', {
		get: function(){return _ACTION_TIME_CHANGED;},
		set: function(val){return _ACTION_TIME_CHANGED = val;}
	});

	var _ACTION_TIME_TICK = null;
	Object.defineProperty(api, 'ACTION_TIME_TICK', {
		get: function(){return _ACTION_TIME_TICK;},
		set: function(val){return _ACTION_TIME_TICK = val;}
	});

	var _ACTION_UID_REMOVED = null;
	Object.defineProperty(api, 'ACTION_UID_REMOVED', {
		get: function(){return _ACTION_UID_REMOVED;},
		set: function(val){return _ACTION_UID_REMOVED = val;}
	});

	var _ACTION_UMS_CONNECTED = null;
	Object.defineProperty(api, 'ACTION_UMS_CONNECTED', {
		get: function(){return _ACTION_UMS_CONNECTED;},
		set: function(val){return _ACTION_UMS_CONNECTED = val;}
	});

	var _ACTION_UMS_DISCONNECTED = null;
	Object.defineProperty(api, 'ACTION_UMS_DISCONNECTED', {
		get: function(){return _ACTION_UMS_DISCONNECTED;},
		set: function(val){return _ACTION_UMS_DISCONNECTED = val;}
	});

	var _ACTION_USER_PRESENT = null;
	Object.defineProperty(api, 'ACTION_USER_PRESENT', {
		get: function(){return _ACTION_USER_PRESENT;},
		set: function(val){return _ACTION_USER_PRESENT = val;}
	});

	var _ACTION_VIEW = null;
	Object.defineProperty(api, 'ACTION_VIEW', {
		get: function(){return _ACTION_VIEW;},
		set: function(val){return _ACTION_VIEW = val;}
	});

	var _ACTION_VOICE_COMMAND = null;
	Object.defineProperty(api, 'ACTION_VOICE_COMMAND', {
		get: function(){return _ACTION_VOICE_COMMAND;},
		set: function(val){return _ACTION_VOICE_COMMAND = val;}
	});

	var _ACTION_WALLPAPER_CHANGED = null;
	Object.defineProperty(api, 'ACTION_WALLPAPER_CHANGED', {
		get: function(){return _ACTION_WALLPAPER_CHANGED;},
		set: function(val){return _ACTION_WALLPAPER_CHANGED = val;}
	});

	var _ACTION_WEB_SEARCH = null;
	Object.defineProperty(api, 'ACTION_WEB_SEARCH', {
		get: function(){return _ACTION_WEB_SEARCH;},
		set: function(val){return _ACTION_WEB_SEARCH = val;}
	});

	var _CATEGORY_ALTERNATIVE = null;
	Object.defineProperty(api, 'CATEGORY_ALTERNATIVE', {
		get: function(){return _CATEGORY_ALTERNATIVE;},
		set: function(val){return _CATEGORY_ALTERNATIVE = val;}
	});

	var _CATEGORY_BROWSABLE = null;
	Object.defineProperty(api, 'CATEGORY_BROWSABLE', {
		get: function(){return _CATEGORY_BROWSABLE;},
		set: function(val){return _CATEGORY_BROWSABLE = val;}
	});

	var _CATEGORY_DEFAULT = null;
	Object.defineProperty(api, 'CATEGORY_DEFAULT', {
		get: function(){return _CATEGORY_DEFAULT;},
		set: function(val){return _CATEGORY_DEFAULT = val;}
	});

	var _CATEGORY_DEVELOPMENT_PREFERENCE = null;
	Object.defineProperty(api, 'CATEGORY_DEVELOPMENT_PREFERENCE', {
		get: function(){return _CATEGORY_DEVELOPMENT_PREFERENCE;},
		set: function(val){return _CATEGORY_DEVELOPMENT_PREFERENCE = val;}
	});

	var _CATEGORY_EMBED = null;
	Object.defineProperty(api, 'CATEGORY_EMBED', {
		get: function(){return _CATEGORY_EMBED;},
		set: function(val){return _CATEGORY_EMBED = val;}
	});

	var _CATEGORY_FRAMEWORK_INSTRUMENTATION_TEST = null;
	Object.defineProperty(api, 'CATEGORY_FRAMEWORK_INSTRUMENTATION_TEST', {
		get: function(){return _CATEGORY_FRAMEWORK_INSTRUMENTATION_TEST;},
		set: function(val){return _CATEGORY_FRAMEWORK_INSTRUMENTATION_TEST = val;}
	});

	var _CATEGORY_HOME = null;
	Object.defineProperty(api, 'CATEGORY_HOME', {
		get: function(){return _CATEGORY_HOME;},
		set: function(val){return _CATEGORY_HOME = val;}
	});

	var _CATEGORY_INFO = null;
	Object.defineProperty(api, 'CATEGORY_INFO', {
		get: function(){return _CATEGORY_INFO;},
		set: function(val){return _CATEGORY_INFO = val;}
	});

	var _CATEGORY_LAUNCHER = null;
	Object.defineProperty(api, 'CATEGORY_LAUNCHER', {
		get: function(){return _CATEGORY_LAUNCHER;},
		set: function(val){return _CATEGORY_LAUNCHER = val;}
	});

	var _CATEGORY_MONKEY = null;
	Object.defineProperty(api, 'CATEGORY_MONKEY', {
		get: function(){return _CATEGORY_MONKEY;},
		set: function(val){return _CATEGORY_MONKEY = val;}
	});

	var _CATEGORY_OPENABLE = null;
	Object.defineProperty(api, 'CATEGORY_OPENABLE', {
		get: function(){return _CATEGORY_OPENABLE;},
		set: function(val){return _CATEGORY_OPENABLE = val;}
	});

	var _CATEGORY_PREFERENCE = null;
	Object.defineProperty(api, 'CATEGORY_PREFERENCE', {
		get: function(){return _CATEGORY_PREFERENCE;},
		set: function(val){return _CATEGORY_PREFERENCE = val;}
	});

	var _CATEGORY_SAMPLE_CODE = null;
	Object.defineProperty(api, 'CATEGORY_SAMPLE_CODE', {
		get: function(){return _CATEGORY_SAMPLE_CODE;},
		set: function(val){return _CATEGORY_SAMPLE_CODE = val;}
	});

	var _CATEGORY_SELECTED_ALTERNATIVE = null;
	Object.defineProperty(api, 'CATEGORY_SELECTED_ALTERNATIVE', {
		get: function(){return _CATEGORY_SELECTED_ALTERNATIVE;},
		set: function(val){return _CATEGORY_SELECTED_ALTERNATIVE = val;}
	});

	var _CATEGORY_TAB = null;
	Object.defineProperty(api, 'CATEGORY_TAB', {
		get: function(){return _CATEGORY_TAB;},
		set: function(val){return _CATEGORY_TAB = val;}
	});

	var _CATEGORY_TEST = null;
	Object.defineProperty(api, 'CATEGORY_TEST', {
		get: function(){return _CATEGORY_TEST;},
		set: function(val){return _CATEGORY_TEST = val;}
	});

	var _CATEGORY_UNIT_TEST = null;
	Object.defineProperty(api, 'CATEGORY_UNIT_TEST', {
		get: function(){return _CATEGORY_UNIT_TEST;},
		set: function(val){return _CATEGORY_UNIT_TEST = val;}
	});

	var _DEFAULT_ALL = null;
	Object.defineProperty(api, 'DEFAULT_ALL', {
		get: function(){return _DEFAULT_ALL;},
		set: function(val){return _DEFAULT_ALL = val;}
	});

	var _DEFAULT_LIGHTS = null;
	Object.defineProperty(api, 'DEFAULT_LIGHTS', {
		get: function(){return _DEFAULT_LIGHTS;},
		set: function(val){return _DEFAULT_LIGHTS = val;}
	});

	var _DEFAULT_SOUND = null;
	Object.defineProperty(api, 'DEFAULT_SOUND', {
		get: function(){return _DEFAULT_SOUND;},
		set: function(val){return _DEFAULT_SOUND = val;}
	});

	var _DEFAULT_VIBRATE = null;
	Object.defineProperty(api, 'DEFAULT_VIBRATE', {
		get: function(){return _DEFAULT_VIBRATE;},
		set: function(val){return _DEFAULT_VIBRATE = val;}
	});

	var _EXTRA_ALARM_COUNT = null;
	Object.defineProperty(api, 'EXTRA_ALARM_COUNT', {
		get: function(){return _EXTRA_ALARM_COUNT;},
		set: function(val){return _EXTRA_ALARM_COUNT = val;}
	});

	var _EXTRA_BCC = null;
	Object.defineProperty(api, 'EXTRA_BCC', {
		get: function(){return _EXTRA_BCC;},
		set: function(val){return _EXTRA_BCC = val;}
	});

	var _EXTRA_CC = null;
	Object.defineProperty(api, 'EXTRA_CC', {
		get: function(){return _EXTRA_CC;},
		set: function(val){return _EXTRA_CC = val;}
	});

	var _EXTRA_DATA_REMOVED = null;
	Object.defineProperty(api, 'EXTRA_DATA_REMOVED', {
		get: function(){return _EXTRA_DATA_REMOVED;},
		set: function(val){return _EXTRA_DATA_REMOVED = val;}
	});

	var _EXTRA_DONT_KILL_APP = null;
	Object.defineProperty(api, 'EXTRA_DONT_KILL_APP', {
		get: function(){return _EXTRA_DONT_KILL_APP;},
		set: function(val){return _EXTRA_DONT_KILL_APP = val;}
	});

	var _EXTRA_EMAIL = null;
	Object.defineProperty(api, 'EXTRA_EMAIL', {
		get: function(){return _EXTRA_EMAIL;},
		set: function(val){return _EXTRA_EMAIL = val;}
	});

	var _EXTRA_INTENT = null;
	Object.defineProperty(api, 'EXTRA_INTENT', {
		get: function(){return _EXTRA_INTENT;},
		set: function(val){return _EXTRA_INTENT = val;}
	});

	var _EXTRA_KEY_EVENT = null;
	Object.defineProperty(api, 'EXTRA_KEY_EVENT', {
		get: function(){return _EXTRA_KEY_EVENT;},
		set: function(val){return _EXTRA_KEY_EVENT = val;}
	});

	var _EXTRA_PHONE_NUMBER = null;
	Object.defineProperty(api, 'EXTRA_PHONE_NUMBER', {
		get: function(){return _EXTRA_PHONE_NUMBER;},
		set: function(val){return _EXTRA_PHONE_NUMBER = val;}
	});

	var _EXTRA_REPLACING = null;
	Object.defineProperty(api, 'EXTRA_REPLACING', {
		get: function(){return _EXTRA_REPLACING;},
		set: function(val){return _EXTRA_REPLACING = val;}
	});

	var _EXTRA_SHORTCUT_ICON = null;
	Object.defineProperty(api, 'EXTRA_SHORTCUT_ICON', {
		get: function(){return _EXTRA_SHORTCUT_ICON;},
		set: function(val){return _EXTRA_SHORTCUT_ICON = val;}
	});

	var _EXTRA_SHORTCUT_ICON_RESOURCE = null;
	Object.defineProperty(api, 'EXTRA_SHORTCUT_ICON_RESOURCE', {
		get: function(){return _EXTRA_SHORTCUT_ICON_RESOURCE;},
		set: function(val){return _EXTRA_SHORTCUT_ICON_RESOURCE = val;}
	});

	var _EXTRA_SHORTCUT_INTENT = null;
	Object.defineProperty(api, 'EXTRA_SHORTCUT_INTENT', {
		get: function(){return _EXTRA_SHORTCUT_INTENT;},
		set: function(val){return _EXTRA_SHORTCUT_INTENT = val;}
	});

	var _EXTRA_SHORTCUT_NAME = null;
	Object.defineProperty(api, 'EXTRA_SHORTCUT_NAME', {
		get: function(){return _EXTRA_SHORTCUT_NAME;},
		set: function(val){return _EXTRA_SHORTCUT_NAME = val;}
	});

	var _EXTRA_STREAM = null;
	Object.defineProperty(api, 'EXTRA_STREAM', {
		get: function(){return _EXTRA_STREAM;},
		set: function(val){return _EXTRA_STREAM = val;}
	});

	var _EXTRA_SUBJECT = null;
	Object.defineProperty(api, 'EXTRA_SUBJECT', {
		get: function(){return _EXTRA_SUBJECT;},
		set: function(val){return _EXTRA_SUBJECT = val;}
	});

	var _EXTRA_TEMPLATE = null;
	Object.defineProperty(api, 'EXTRA_TEMPLATE', {
		get: function(){return _EXTRA_TEMPLATE;},
		set: function(val){return _EXTRA_TEMPLATE = val;}
	});

	var _EXTRA_TEXT = null;
	Object.defineProperty(api, 'EXTRA_TEXT', {
		get: function(){return _EXTRA_TEXT;},
		set: function(val){return _EXTRA_TEXT = val;}
	});

	var _EXTRA_TITLE = null;
	Object.defineProperty(api, 'EXTRA_TITLE', {
		get: function(){return _EXTRA_TITLE;},
		set: function(val){return _EXTRA_TITLE = val;}
	});

	var _EXTRA_UID = null;
	Object.defineProperty(api, 'EXTRA_UID', {
		get: function(){return _EXTRA_UID;},
		set: function(val){return _EXTRA_UID = val;}
	});

	var _FILL_IN_ACTION = null;
	Object.defineProperty(api, 'FILL_IN_ACTION', {
		get: function(){return _FILL_IN_ACTION;},
		set: function(val){return _FILL_IN_ACTION = val;}
	});

	var _FILL_IN_CATEGORIES = null;
	Object.defineProperty(api, 'FILL_IN_CATEGORIES', {
		get: function(){return _FILL_IN_CATEGORIES;},
		set: function(val){return _FILL_IN_CATEGORIES = val;}
	});

	var _FILL_IN_COMPONENT = null;
	Object.defineProperty(api, 'FILL_IN_COMPONENT', {
		get: function(){return _FILL_IN_COMPONENT;},
		set: function(val){return _FILL_IN_COMPONENT = val;}
	});

	var _FILL_IN_DATA = null;
	Object.defineProperty(api, 'FILL_IN_DATA', {
		get: function(){return _FILL_IN_DATA;},
		set: function(val){return _FILL_IN_DATA = val;}
	});

	var _FILL_IN_PACKAGE = null;
	Object.defineProperty(api, 'FILL_IN_PACKAGE', {
		get: function(){return _FILL_IN_PACKAGE;},
		set: function(val){return _FILL_IN_PACKAGE = val;}
	});

	var _FLAG_ACTIVITY_BROUGHT_TO_FRONT = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_BROUGHT_TO_FRONT', {
		get: function(){return _FLAG_ACTIVITY_BROUGHT_TO_FRONT;},
		set: function(val){return _FLAG_ACTIVITY_BROUGHT_TO_FRONT = val;}
	});

	var _FLAG_ACTIVITY_CLEAR_TOP = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_CLEAR_TOP', {
		get: function(){return _FLAG_ACTIVITY_CLEAR_TOP;},
		set: function(val){return _FLAG_ACTIVITY_CLEAR_TOP = val;}
	});

	var _FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET', {
		get: function(){return _FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET;},
		set: function(val){return _FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET = val;}
	});

	var _FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS', {
		get: function(){return _FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS;},
		set: function(val){return _FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS = val;}
	});

	var _FLAG_ACTIVITY_FORWARD_RESULT = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_FORWARD_RESULT', {
		get: function(){return _FLAG_ACTIVITY_FORWARD_RESULT;},
		set: function(val){return _FLAG_ACTIVITY_FORWARD_RESULT = val;}
	});

	var _FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY', {
		get: function(){return _FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY;},
		set: function(val){return _FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY = val;}
	});

	var _FLAG_ACTIVITY_MULTIPLE_TASK = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_MULTIPLE_TASK', {
		get: function(){return _FLAG_ACTIVITY_MULTIPLE_TASK;},
		set: function(val){return _FLAG_ACTIVITY_MULTIPLE_TASK = val;}
	});

	var _FLAG_ACTIVITY_NEW_TASK = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_NEW_TASK', {
		get: function(){return _FLAG_ACTIVITY_NEW_TASK;},
		set: function(val){return _FLAG_ACTIVITY_NEW_TASK = val;}
	});

	var _FLAG_ACTIVITY_NO_HISTORY = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_NO_HISTORY', {
		get: function(){return _FLAG_ACTIVITY_NO_HISTORY;},
		set: function(val){return _FLAG_ACTIVITY_NO_HISTORY = val;}
	});

	var _FLAG_ACTIVITY_NO_USER_ACTION = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_NO_USER_ACTION', {
		get: function(){return _FLAG_ACTIVITY_NO_USER_ACTION;},
		set: function(val){return _FLAG_ACTIVITY_NO_USER_ACTION = val;}
	});

	var _FLAG_ACTIVITY_PREVIOUS_IS_TOP = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_PREVIOUS_IS_TOP', {
		get: function(){return _FLAG_ACTIVITY_PREVIOUS_IS_TOP;},
		set: function(val){return _FLAG_ACTIVITY_PREVIOUS_IS_TOP = val;}
	});

	var _FLAG_ACTIVITY_REORDER_TO_FRONT = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_REORDER_TO_FRONT', {
		get: function(){return _FLAG_ACTIVITY_REORDER_TO_FRONT;},
		set: function(val){return _FLAG_ACTIVITY_REORDER_TO_FRONT = val;}
	});

	var _FLAG_ACTIVITY_RESET_TASK_IF_NEEDED = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_RESET_TASK_IF_NEEDED', {
		get: function(){return _FLAG_ACTIVITY_RESET_TASK_IF_NEEDED;},
		set: function(val){return _FLAG_ACTIVITY_RESET_TASK_IF_NEEDED = val;}
	});

	var _FLAG_ACTIVITY_SINGLE_TOP = null;
	Object.defineProperty(api, 'FLAG_ACTIVITY_SINGLE_TOP', {
		get: function(){return _FLAG_ACTIVITY_SINGLE_TOP;},
		set: function(val){return _FLAG_ACTIVITY_SINGLE_TOP = val;}
	});

	var _FLAG_AUTO_CANCEL = null;
	Object.defineProperty(api, 'FLAG_AUTO_CANCEL', {
		get: function(){return _FLAG_AUTO_CANCEL;},
		set: function(val){return _FLAG_AUTO_CANCEL = val;}
	});

	var _FLAG_CANCEL_CURRENT = null;
	Object.defineProperty(api, 'FLAG_CANCEL_CURRENT', {
		get: function(){return _FLAG_CANCEL_CURRENT;},
		set: function(val){return _FLAG_CANCEL_CURRENT = val;}
	});

	var _FLAG_DEBUG_LOG_RESOLUTION = null;
	Object.defineProperty(api, 'FLAG_DEBUG_LOG_RESOLUTION', {
		get: function(){return _FLAG_DEBUG_LOG_RESOLUTION;},
		set: function(val){return _FLAG_DEBUG_LOG_RESOLUTION = val;}
	});

	var _FLAG_FROM_BACKGROUND = null;
	Object.defineProperty(api, 'FLAG_FROM_BACKGROUND', {
		get: function(){return _FLAG_FROM_BACKGROUND;},
		set: function(val){return _FLAG_FROM_BACKGROUND = val;}
	});

	var _FLAG_GRANT_READ_URI_PERMISSION = null;
	Object.defineProperty(api, 'FLAG_GRANT_READ_URI_PERMISSION', {
		get: function(){return _FLAG_GRANT_READ_URI_PERMISSION;},
		set: function(val){return _FLAG_GRANT_READ_URI_PERMISSION = val;}
	});

	var _FLAG_GRANT_WRITE_URI_PERMISSION = null;
	Object.defineProperty(api, 'FLAG_GRANT_WRITE_URI_PERMISSION', {
		get: function(){return _FLAG_GRANT_WRITE_URI_PERMISSION;},
		set: function(val){return _FLAG_GRANT_WRITE_URI_PERMISSION = val;}
	});

	var _FLAG_INSISTENT = null;
	Object.defineProperty(api, 'FLAG_INSISTENT', {
		get: function(){return _FLAG_INSISTENT;},
		set: function(val){return _FLAG_INSISTENT = val;}
	});

	var _FLAG_NO_CLEAR = null;
	Object.defineProperty(api, 'FLAG_NO_CLEAR', {
		get: function(){return _FLAG_NO_CLEAR;},
		set: function(val){return _FLAG_NO_CLEAR = val;}
	});

	var _FLAG_NO_CREATE = null;
	Object.defineProperty(api, 'FLAG_NO_CREATE', {
		get: function(){return _FLAG_NO_CREATE;},
		set: function(val){return _FLAG_NO_CREATE = val;}
	});

	var _FLAG_ONE_SHOT = null;
	Object.defineProperty(api, 'FLAG_ONE_SHOT', {
		get: function(){return _FLAG_ONE_SHOT;},
		set: function(val){return _FLAG_ONE_SHOT = val;}
	});

	var _FLAG_ONGOING_EVENT = null;
	Object.defineProperty(api, 'FLAG_ONGOING_EVENT', {
		get: function(){return _FLAG_ONGOING_EVENT;},
		set: function(val){return _FLAG_ONGOING_EVENT = val;}
	});

	var _FLAG_ONLY_ALERT_ONCE = null;
	Object.defineProperty(api, 'FLAG_ONLY_ALERT_ONCE', {
		get: function(){return _FLAG_ONLY_ALERT_ONCE;},
		set: function(val){return _FLAG_ONLY_ALERT_ONCE = val;}
	});

	var _FLAG_RECEIVER_REGISTERED_ONLY = null;
	Object.defineProperty(api, 'FLAG_RECEIVER_REGISTERED_ONLY', {
		get: function(){return _FLAG_RECEIVER_REGISTERED_ONLY;},
		set: function(val){return _FLAG_RECEIVER_REGISTERED_ONLY = val;}
	});

	var _FLAG_SHOW_LIGHTS = null;
	Object.defineProperty(api, 'FLAG_SHOW_LIGHTS', {
		get: function(){return _FLAG_SHOW_LIGHTS;},
		set: function(val){return _FLAG_SHOW_LIGHTS = val;}
	});

	var _FLAG_UPDATE_CURRENT = null;
	Object.defineProperty(api, 'FLAG_UPDATE_CURRENT', {
		get: function(){return _FLAG_UPDATE_CURRENT;},
		set: function(val){return _FLAG_UPDATE_CURRENT = val;}
	});

	var _PENDING_INTENT_FOR_ACTIVITY = null;
	Object.defineProperty(api, 'PENDING_INTENT_FOR_ACTIVITY', {
		get: function(){return _PENDING_INTENT_FOR_ACTIVITY;},
		set: function(val){return _PENDING_INTENT_FOR_ACTIVITY = val;}
	});

	var _PENDING_INTENT_FOR_BROADCAST = null;
	Object.defineProperty(api, 'PENDING_INTENT_FOR_BROADCAST', {
		get: function(){return _PENDING_INTENT_FOR_BROADCAST;},
		set: function(val){return _PENDING_INTENT_FOR_BROADCAST = val;}
	});

	var _PENDING_INTENT_FOR_SERVICE = null;
	Object.defineProperty(api, 'PENDING_INTENT_FOR_SERVICE', {
		get: function(){return _PENDING_INTENT_FOR_SERVICE;},
		set: function(val){return _PENDING_INTENT_FOR_SERVICE = val;}
	});

	var _PENDING_INTENT_MAX_VALUE = null;
	Object.defineProperty(api, 'PENDING_INTENT_MAX_VALUE', {
		get: function(){return _PENDING_INTENT_MAX_VALUE;},
		set: function(val){return _PENDING_INTENT_MAX_VALUE = val;}
	});

	var _RESULT_CANCELED = null;
	Object.defineProperty(api, 'RESULT_CANCELED', {
		get: function(){return _RESULT_CANCELED;},
		set: function(val){return _RESULT_CANCELED = val;}
	});

	var _RESULT_FIRST_USER = null;
	Object.defineProperty(api, 'RESULT_FIRST_USER', {
		get: function(){return _RESULT_FIRST_USER;},
		set: function(val){return _RESULT_FIRST_USER = val;}
	});

	var _RESULT_OK = null;
	Object.defineProperty(api, 'RESULT_OK', {
		get: function(){return _RESULT_OK;},
		set: function(val){return _RESULT_OK = val;}
	});

	var _SCREEN_ORIENTATION_BEHIND = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_BEHIND', {
		get: function(){return _SCREEN_ORIENTATION_BEHIND;},
		set: function(val){return _SCREEN_ORIENTATION_BEHIND = val;}
	});

	var _SCREEN_ORIENTATION_LANDSCAPE = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_LANDSCAPE', {
		get: function(){return _SCREEN_ORIENTATION_LANDSCAPE;},
		set: function(val){return _SCREEN_ORIENTATION_LANDSCAPE = val;}
	});

	var _SCREEN_ORIENTATION_NOSENSOR = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_NOSENSOR', {
		get: function(){return _SCREEN_ORIENTATION_NOSENSOR;},
		set: function(val){return _SCREEN_ORIENTATION_NOSENSOR = val;}
	});

	var _SCREEN_ORIENTATION_PORTRAIT = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_PORTRAIT', {
		get: function(){return _SCREEN_ORIENTATION_PORTRAIT;},
		set: function(val){return _SCREEN_ORIENTATION_PORTRAIT = val;}
	});

	var _SCREEN_ORIENTATION_SENSOR = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_SENSOR', {
		get: function(){return _SCREEN_ORIENTATION_SENSOR;},
		set: function(val){return _SCREEN_ORIENTATION_SENSOR = val;}
	});

	var _SCREEN_ORIENTATION_UNSPECIFIED = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_UNSPECIFIED', {
		get: function(){return _SCREEN_ORIENTATION_UNSPECIFIED;},
		set: function(val){return _SCREEN_ORIENTATION_UNSPECIFIED = val;}
	});

	var _SCREEN_ORIENTATION_USER = null;
	Object.defineProperty(api, 'SCREEN_ORIENTATION_USER', {
		get: function(){return _SCREEN_ORIENTATION_USER;},
		set: function(val){return _SCREEN_ORIENTATION_USER = val;}
	});

	var _STREAM_DEFAULT = null;
	Object.defineProperty(api, 'STREAM_DEFAULT', {
		get: function(){return _STREAM_DEFAULT;},
		set: function(val){return _STREAM_DEFAULT = val;}
	});

	var _URI_INTENT_SCHEME = null;
	Object.defineProperty(api, 'URI_INTENT_SCHEME', {
		get: function(){return _URI_INTENT_SCHEME;},
		set: function(val){return _URI_INTENT_SCHEME = val;}
	});

	// Methods
	api.createBroadcastIntent = function(){
		console.debug('Method "Titanium.Android..createBroadcastIntent" is not implemented yet.');
	};
	api.createIntent = function(){
		console.debug('Method "Titanium.Android..createIntent" is not implemented yet.');
	};
	api.createIntentChooser = function(){
		console.debug('Method "Titanium.Android..createIntentChooser" is not implemented yet.');
	};
	api.createNotification = function(){
		console.debug('Method "Titanium.Android..createNotification" is not implemented yet.');
	};
	api.createPendingIntent = function(){
		console.debug('Method "Titanium.Android..createPendingIntent" is not implemented yet.');
	};
	api.createService = function(){
		console.debug('Method "Titanium.Android..createService" is not implemented yet.');
	};
	api.createServiceIntent = function(){
		console.debug('Method "Titanium.Android..createServiceIntent" is not implemented yet.');
	};
	api.isServiceRunning = function(){
		console.debug('Method "Titanium.Android..isServiceRunning" is not implemented yet.');
	};
	api.startService = function(){
		console.debug('Method "Titanium.Android..startService" is not implemented yet.');
	};
	api.stopService = function(){
		console.debug('Method "Titanium.Android..stopService" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android'));
;
(function(api){
	// Properties
	var _alarmTime = null;
	Object.defineProperty(api, 'alarmTime', {
		get: function(){return _alarmTime;},
		set: function(val){return _alarmTime = val;}
	});

	var _begin = null;
	Object.defineProperty(api, 'begin', {
		get: function(){return _begin;},
		set: function(val){return _begin = val;}
	});

	var _end = null;
	Object.defineProperty(api, 'end', {
		get: function(){return _end;},
		set: function(val){return _end = val;}
	});

	var _eventId = null;
	Object.defineProperty(api, 'eventId', {
		get: function(){return _eventId;},
		set: function(val){return _eventId = val;}
	});

	var _id = null;
	Object.defineProperty(api, 'id', {
		get: function(){return _id;},
		set: function(val){return _id = val;}
	});

	var _minutes = null;
	Object.defineProperty(api, 'minutes', {
		get: function(){return _minutes;},
		set: function(val){return _minutes = val;}
	});

	var _state = null;
	Object.defineProperty(api, 'state', {
		get: function(){return _state;},
		set: function(val){return _state = val;}
	});

})(Ti._5.createClass('Titanium.Android.Calendar.Alert'));
;
(function(api){
	// Properties
	var _hidden = null;
	Object.defineProperty(api, 'hidden', {
		get: function(){return _hidden;},
		set: function(val){return _hidden = val;}
	});

	var _id = null;
	Object.defineProperty(api, 'id', {
		get: function(){return _id;},
		set: function(val){return _id = val;}
	});

	var _name = null;
	Object.defineProperty(api, 'name', {
		get: function(){return _name;},
		set: function(val){return _name = val;}
	});

	var _selected = null;
	Object.defineProperty(api, 'selected', {
		get: function(){return _selected;},
		set: function(val){return _selected = val;}
	});

	// Methods
	api.createEvent = function(){
		console.debug('Method "Titanium.Android.Calendar.Calendar..createEvent" is not implemented yet.');
	};
	api.getEventById = function(){
		console.debug('Method "Titanium.Android.Calendar.Calendar..getEventById" is not implemented yet.');
	};
	api.getEventsBetweenDates = function(){
		console.debug('Method "Titanium.Android.Calendar.Calendar..getEventsBetweenDates" is not implemented yet.');
	};
	api.getEventsInDate = function(){
		console.debug('Method "Titanium.Android.Calendar.Calendar..getEventsInDate" is not implemented yet.');
	};
	api.getEventsInMonth = function(){
		console.debug('Method "Titanium.Android.Calendar.Calendar..getEventsInMonth" is not implemented yet.');
	};
	api.getEventsInYear = function(){
		console.debug('Method "Titanium.Android.Calendar.Calendar..getEventsInYear" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Calendar.Calendar'));
;
(function(api){
	// Properties
	var _alerts = null;
	Object.defineProperty(api, 'alerts', {
		get: function(){return _alerts;},
		set: function(val){return _alerts = val;}
	});

	var _allDay = null;
	Object.defineProperty(api, 'allDay', {
		get: function(){return _allDay;},
		set: function(val){return _allDay = val;}
	});

	var _begin = null;
	Object.defineProperty(api, 'begin', {
		get: function(){return _begin;},
		set: function(val){return _begin = val;}
	});

	var _description = null;
	Object.defineProperty(api, 'description', {
		get: function(){return _description;},
		set: function(val){return _description = val;}
	});

	var _end = null;
	Object.defineProperty(api, 'end', {
		get: function(){return _end;},
		set: function(val){return _end = val;}
	});

	var _extendedProperties = null;
	Object.defineProperty(api, 'extendedProperties', {
		get: function(){return _extendedProperties;},
		set: function(val){return _extendedProperties = val;}
	});

	var _hasAlarm = null;
	Object.defineProperty(api, 'hasAlarm', {
		get: function(){return _hasAlarm;},
		set: function(val){return _hasAlarm = val;}
	});

	var _hasExtendedProperties = null;
	Object.defineProperty(api, 'hasExtendedProperties', {
		get: function(){return _hasExtendedProperties;},
		set: function(val){return _hasExtendedProperties = val;}
	});

	var _id = null;
	Object.defineProperty(api, 'id', {
		get: function(){return _id;},
		set: function(val){return _id = val;}
	});

	var _location = null;
	Object.defineProperty(api, 'location', {
		get: function(){return _location;},
		set: function(val){return _location = val;}
	});

	var _reminders = null;
	Object.defineProperty(api, 'reminders', {
		get: function(){return _reminders;},
		set: function(val){return _reminders = val;}
	});

	var _status = null;
	Object.defineProperty(api, 'status', {
		get: function(){return _status;},
		set: function(val){return _status = val;}
	});

	var _title = null;
	Object.defineProperty(api, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

	var _visibility = null;
	Object.defineProperty(api, 'visibility', {
		get: function(){return _visibility;},
		set: function(val){return _visibility = val;}
	});

	// Methods
	api.createAlert = function(){
		console.debug('Method "Titanium.Android.Calendar.Event..createAlert" is not implemented yet.');
	};
	api.createReminder = function(){
		console.debug('Method "Titanium.Android.Calendar.Event..createReminder" is not implemented yet.');
	};
	api.getExtendedProperty = function(){
		console.debug('Method "Titanium.Android.Calendar.Event..getExtendedProperty" is not implemented yet.');
	};
	api.setExtendedProperty = function(){
		console.debug('Method "Titanium.Android.Calendar.Event..setExtendedProperty" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Calendar.Event'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _METHOD_ALERT = null;
	Object.defineProperty(api, 'METHOD_ALERT', {
		get: function(){return _METHOD_ALERT;},
		set: function(val){return _METHOD_ALERT = val;}
	});

	var _METHOD_DEFAULT = null;
	Object.defineProperty(api, 'METHOD_DEFAULT', {
		get: function(){return _METHOD_DEFAULT;},
		set: function(val){return _METHOD_DEFAULT = val;}
	});

	var _METHOD_EMAIL = null;
	Object.defineProperty(api, 'METHOD_EMAIL', {
		get: function(){return _METHOD_EMAIL;},
		set: function(val){return _METHOD_EMAIL = val;}
	});

	var _METHOD_SMS = null;
	Object.defineProperty(api, 'METHOD_SMS', {
		get: function(){return _METHOD_SMS;},
		set: function(val){return _METHOD_SMS = val;}
	});

	var _STATE_DISMISSED = null;
	Object.defineProperty(api, 'STATE_DISMISSED', {
		get: function(){return _STATE_DISMISSED;},
		set: function(val){return _STATE_DISMISSED = val;}
	});

	var _STATE_FIRED = null;
	Object.defineProperty(api, 'STATE_FIRED', {
		get: function(){return _STATE_FIRED;},
		set: function(val){return _STATE_FIRED = val;}
	});

	var _STATE_SCHEDULED = null;
	Object.defineProperty(api, 'STATE_SCHEDULED', {
		get: function(){return _STATE_SCHEDULED;},
		set: function(val){return _STATE_SCHEDULED = val;}
	});

	var _STATUS_CANCELED = null;
	Object.defineProperty(api, 'STATUS_CANCELED', {
		get: function(){return _STATUS_CANCELED;},
		set: function(val){return _STATUS_CANCELED = val;}
	});

	var _STATUS_CONFIRMED = null;
	Object.defineProperty(api, 'STATUS_CONFIRMED', {
		get: function(){return _STATUS_CONFIRMED;},
		set: function(val){return _STATUS_CONFIRMED = val;}
	});

	var _STATUS_TENTATIVE = null;
	Object.defineProperty(api, 'STATUS_TENTATIVE', {
		get: function(){return _STATUS_TENTATIVE;},
		set: function(val){return _STATUS_TENTATIVE = val;}
	});

	var _VISIBILITY_CONFIDENTIAL = null;
	Object.defineProperty(api, 'VISIBILITY_CONFIDENTIAL', {
		get: function(){return _VISIBILITY_CONFIDENTIAL;},
		set: function(val){return _VISIBILITY_CONFIDENTIAL = val;}
	});

	var _VISIBILITY_DEFAULT = null;
	Object.defineProperty(api, 'VISIBILITY_DEFAULT', {
		get: function(){return _VISIBILITY_DEFAULT;},
		set: function(val){return _VISIBILITY_DEFAULT = val;}
	});

	var _VISIBILITY_PRIVATE = null;
	Object.defineProperty(api, 'VISIBILITY_PRIVATE', {
		get: function(){return _VISIBILITY_PRIVATE;},
		set: function(val){return _VISIBILITY_PRIVATE = val;}
	});

	var _VISIBILITY_PUBLIC = null;
	Object.defineProperty(api, 'VISIBILITY_PUBLIC', {
		get: function(){return _VISIBILITY_PUBLIC;},
		set: function(val){return _VISIBILITY_PUBLIC = val;}
	});

	var _allAlerts = null;
	Object.defineProperty(api, 'allAlerts', {
		get: function(){return _allAlerts;},
		set: function(val){return _allAlerts = val;}
	});

	var _allCalendars = null;
	Object.defineProperty(api, 'allCalendars', {
		get: function(){return _allCalendars;},
		set: function(val){return _allCalendars = val;}
	});

	var _selectableCalendars = null;
	Object.defineProperty(api, 'selectableCalendars', {
		get: function(){return _selectableCalendars;},
		set: function(val){return _selectableCalendars = val;}
	});

	// Methods
	api.createAlert = function(){
		console.debug('Method "Titanium.Android.Calendar..createAlert" is not implemented yet.');
	};
	api.createCalendar = function(){
		console.debug('Method "Titanium.Android.Calendar..createCalendar" is not implemented yet.');
	};
	api.createEvent = function(){
		console.debug('Method "Titanium.Android.Calendar..createEvent" is not implemented yet.');
	};
	api.createReminder = function(){
		console.debug('Method "Titanium.Android.Calendar..createReminder" is not implemented yet.');
	};
	api.getCalendarById = function(){
		console.debug('Method "Titanium.Android.Calendar..getCalendarById" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Calendar'));
;
(function(api){
	// Properties
	var _id = null;
	Object.defineProperty(api, 'id', {
		get: function(){return _id;},
		set: function(val){return _id = val;}
	});

	var _method = null;
	Object.defineProperty(api, 'method', {
		get: function(){return _method;},
		set: function(val){return _method = val;}
	});

	var _minutes = null;
	Object.defineProperty(api, 'minutes', {
		get: function(){return _minutes;},
		set: function(val){return _minutes = val;}
	});

})(Ti._5.createClass('Titanium.Android.Calendar.Reminder'));
;
(function(api){
	// Properties
	var _action = null;
	Object.defineProperty(api, 'action', {
		get: function(){return _action;},
		set: function(val){return _action = val;}
	});

	var _className = null;
	Object.defineProperty(api, 'className', {
		get: function(){return _className;},
		set: function(val){return _className = val;}
	});

	var _data = null;
	Object.defineProperty(api, 'data', {
		get: function(){return _data;},
		set: function(val){return _data = val;}
	});

	var _flags = null;
	Object.defineProperty(api, 'flags', {
		get: function(){return _flags;},
		set: function(val){return _flags = val;}
	});

	var _packageName = null;
	Object.defineProperty(api, 'packageName', {
		get: function(){return _packageName;},
		set: function(val){return _packageName = val;}
	});

	var _type = null;
	Object.defineProperty(api, 'type', {
		get: function(){return _type;},
		set: function(val){return _type = val;}
	});

	var _url = null;
	Object.defineProperty(api, 'url', {
		get: function(){return _url;},
		set: function(val){return _url = val;}
	});

	// Methods
	api.addCategory = function(){
		console.debug('Method "Titanium.Android.Intent..addCategory" is not implemented yet.');
	};
	api.addFlags = function(){
		console.debug('Method "Titanium.Android.Intent..addFlags" is not implemented yet.');
	};
	api.getBooleanExtra = function(){
		console.debug('Method "Titanium.Android.Intent..getBooleanExtra" is not implemented yet.');
	};
	api.getData = function(){
		console.debug('Method "Titanium.Android.Intent..getData" is not implemented yet.');
	};
	api.getDoubleExtra = function(){
		console.debug('Method "Titanium.Android.Intent..getDoubleExtra" is not implemented yet.');
	};
	api.getIntExtra = function(){
		console.debug('Method "Titanium.Android.Intent..getIntExtra" is not implemented yet.');
	};
	api.getLongExtra = function(){
		console.debug('Method "Titanium.Android.Intent..getLongExtra" is not implemented yet.');
	};
	api.getStringExtra = function(){
		console.debug('Method "Titanium.Android.Intent..getStringExtra" is not implemented yet.');
	};
	api.hasExtra = function(){
		console.debug('Method "Titanium.Android.Intent..hasExtra" is not implemented yet.');
	};
	api.putExtra = function(){
		console.debug('Method "Titanium.Android.Intent..putExtra" is not implemented yet.');
	};
	api.putExtraUri = function(){
		console.debug('Method "Titanium.Android.Intent..putExtraUri" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Intent'));
;
(function(api){
	// Properties
	var _items = null;
	Object.defineProperty(api, 'items', {
		get: function(){return _items;},
		set: function(val){return _items = val;}
	});

	// Methods
	api.add = function(){
		console.debug('Method "Titanium.Android.Menu..add" is not implemented yet.');
	};
	api.clear = function(){
		console.debug('Method "Titanium.Android.Menu..clear" is not implemented yet.');
	};
	api.close = function(){
		console.debug('Method "Titanium.Android.Menu..close" is not implemented yet.');
	};
	api.findItem = function(){
		console.debug('Method "Titanium.Android.Menu..findItem" is not implemented yet.');
	};
	api.getItem = function(){
		console.debug('Method "Titanium.Android.Menu..getItem" is not implemented yet.');
	};
	api.hasVisibleItems = function(){
		console.debug('Method "Titanium.Android.Menu..hasVisibleItems" is not implemented yet.');
	};
	api.removeGroup = function(){
		console.debug('Method "Titanium.Android.Menu..removeGroup" is not implemented yet.');
	};
	api.removeItem = function(){
		console.debug('Method "Titanium.Android.Menu..removeItem" is not implemented yet.');
	};
	api.setGroupEnabled = function(){
		console.debug('Method "Titanium.Android.Menu..setGroupEnabled" is not implemented yet.');
	};
	api.setGroupVisible = function(){
		console.debug('Method "Titanium.Android.Menu..setGroupVisible" is not implemented yet.');
	};
	api.size = function(){
		console.debug('Method "Titanium.Android.Menu..size" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Menu'));
;
(function(api){
	Ti._5.EventDriven(api);
	// Properties
	var _enabled = null;
	Object.defineProperty(api, 'enabled', {
		get: function(){return _enabled;},
		set: function(val){return _enabled = val;}
	});

	var _groupId = null;
	Object.defineProperty(api, 'groupId', {
		get: function(){return _groupId;},
		set: function(val){return _groupId = val;}
	});

	var _itemId = null;
	Object.defineProperty(api, 'itemId', {
		get: function(){return _itemId;},
		set: function(val){return _itemId = val;}
	});

	var _order = null;
	Object.defineProperty(api, 'order', {
		get: function(){return _order;},
		set: function(val){return _order = val;}
	});

	var _title = null;
	Object.defineProperty(api, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

	var _titleCondensed = null;
	Object.defineProperty(api, 'titleCondensed', {
		get: function(){return _titleCondensed;},
		set: function(val){return _titleCondensed = val;}
	});

	var _visible = null;
	Object.defineProperty(api, 'visible', {
		get: function(){return _visible;},
		set: function(val){return _visible = val;}
	});

	// Methods
	api.getCondensedTitle = function(){
		console.debug('Method "Titanium.Android.MenuItem..getCondensedTitle" is not implemented yet.');
	};
	api.getGroupId = function(){
		console.debug('Method "Titanium.Android.MenuItem..getGroupId" is not implemented yet.');
	};
	api.getItemId = function(){
		console.debug('Method "Titanium.Android.MenuItem..getItemId" is not implemented yet.');
	};
	api.getOrder = function(){
		console.debug('Method "Titanium.Android.MenuItem..getOrder" is not implemented yet.');
	};
	api.getTitle = function(){
		console.debug('Method "Titanium.Android.MenuItem..getTitle" is not implemented yet.');
	};
	api.isEnabled = function(){
		console.debug('Method "Titanium.Android.MenuItem..isEnabled" is not implemented yet.');
	};
	api.isVisible = function(){
		console.debug('Method "Titanium.Android.MenuItem..isVisible" is not implemented yet.');
	};
	api.setCondensedTitle = function(){
		console.debug('Method "Titanium.Android.MenuItem..setCondensedTitle" is not implemented yet.');
	};
	api.setEnabled = function(){
		console.debug('Method "Titanium.Android.MenuItem..setEnabled" is not implemented yet.');
	};
	api.setIcon = function(){
		console.debug('Method "Titanium.Android.MenuItem..setIcon" is not implemented yet.');
	};
	api.setTitle = function(){
		console.debug('Method "Titanium.Android.MenuItem..setTitle" is not implemented yet.');
	};
	api.setVisible = function(){
		console.debug('Method "Titanium.Android.MenuItem..setVisible" is not implemented yet.');
	};

	// Events
	api.addEventListener('click', function(){
		console.debug('Event "click" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Android.MenuItem'));
;
(function(api){
	// Properties
	var _audioStreamType = null;
	Object.defineProperty(api, 'audioStreamType', {
		get: function(){return _audioStreamType;},
		set: function(val){return _audioStreamType = val;}
	});

	var _contentIntent = null;
	Object.defineProperty(api, 'contentIntent', {
		get: function(){return _contentIntent;},
		set: function(val){return _contentIntent = val;}
	});

	var _contentText = null;
	Object.defineProperty(api, 'contentText', {
		get: function(){return _contentText;},
		set: function(val){return _contentText = val;}
	});

	var _contentTitle = null;
	Object.defineProperty(api, 'contentTitle', {
		get: function(){return _contentTitle;},
		set: function(val){return _contentTitle = val;}
	});

	var _defaults = null;
	Object.defineProperty(api, 'defaults', {
		get: function(){return _defaults;},
		set: function(val){return _defaults = val;}
	});

	var _deleteIntent = null;
	Object.defineProperty(api, 'deleteIntent', {
		get: function(){return _deleteIntent;},
		set: function(val){return _deleteIntent = val;}
	});

	var _flags = null;
	Object.defineProperty(api, 'flags', {
		get: function(){return _flags;},
		set: function(val){return _flags = val;}
	});

	var _icon = null;
	Object.defineProperty(api, 'icon', {
		get: function(){return _icon;},
		set: function(val){return _icon = val;}
	});

	var _ledARGB = null;
	Object.defineProperty(api, 'ledARGB', {
		get: function(){return _ledARGB;},
		set: function(val){return _ledARGB = val;}
	});

	var _ledOffMS = null;
	Object.defineProperty(api, 'ledOffMS', {
		get: function(){return _ledOffMS;},
		set: function(val){return _ledOffMS = val;}
	});

	var _ledOnMS = null;
	Object.defineProperty(api, 'ledOnMS', {
		get: function(){return _ledOnMS;},
		set: function(val){return _ledOnMS = val;}
	});

	var _number = null;
	Object.defineProperty(api, 'number', {
		get: function(){return _number;},
		set: function(val){return _number = val;}
	});

	var _sound = null;
	Object.defineProperty(api, 'sound', {
		get: function(){return _sound;},
		set: function(val){return _sound = val;}
	});

	var _tickerText = null;
	Object.defineProperty(api, 'tickerText', {
		get: function(){return _tickerText;},
		set: function(val){return _tickerText = val;}
	});

	var _when = null;
	Object.defineProperty(api, 'when', {
		get: function(){return _when;},
		set: function(val){return _when = val;}
	});

	// Methods
	api.setLatestEventInfo = function(){
		console.debug('Method "Titanium.Android.Notification..setLatestEventInfo" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Notification'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _DEFAULT_ALL = null;
	Object.defineProperty(api, 'DEFAULT_ALL', {
		get: function(){return _DEFAULT_ALL;},
		set: function(val){return _DEFAULT_ALL = val;}
	});

	var _DEFAULT_LIGHTS = null;
	Object.defineProperty(api, 'DEFAULT_LIGHTS', {
		get: function(){return _DEFAULT_LIGHTS;},
		set: function(val){return _DEFAULT_LIGHTS = val;}
	});

	var _DEFAULT_SOUND = null;
	Object.defineProperty(api, 'DEFAULT_SOUND', {
		get: function(){return _DEFAULT_SOUND;},
		set: function(val){return _DEFAULT_SOUND = val;}
	});

	var _DEFAULT_VIBRATE = null;
	Object.defineProperty(api, 'DEFAULT_VIBRATE', {
		get: function(){return _DEFAULT_VIBRATE;},
		set: function(val){return _DEFAULT_VIBRATE = val;}
	});

	var _FLAG_AUTO_CANCEL = null;
	Object.defineProperty(api, 'FLAG_AUTO_CANCEL', {
		get: function(){return _FLAG_AUTO_CANCEL;},
		set: function(val){return _FLAG_AUTO_CANCEL = val;}
	});

	var _FLAG_INSISTENT = null;
	Object.defineProperty(api, 'FLAG_INSISTENT', {
		get: function(){return _FLAG_INSISTENT;},
		set: function(val){return _FLAG_INSISTENT = val;}
	});

	var _FLAG_NO_CLEAR = null;
	Object.defineProperty(api, 'FLAG_NO_CLEAR', {
		get: function(){return _FLAG_NO_CLEAR;},
		set: function(val){return _FLAG_NO_CLEAR = val;}
	});

	var _FLAG_ONGOING_EVENT = null;
	Object.defineProperty(api, 'FLAG_ONGOING_EVENT', {
		get: function(){return _FLAG_ONGOING_EVENT;},
		set: function(val){return _FLAG_ONGOING_EVENT = val;}
	});

	var _FLAG_ONLY_ALERT_ONCE = null;
	Object.defineProperty(api, 'FLAG_ONLY_ALERT_ONCE', {
		get: function(){return _FLAG_ONLY_ALERT_ONCE;},
		set: function(val){return _FLAG_ONLY_ALERT_ONCE = val;}
	});

	var _FLAG_SHOW_LIGHTS = null;
	Object.defineProperty(api, 'FLAG_SHOW_LIGHTS', {
		get: function(){return _FLAG_SHOW_LIGHTS;},
		set: function(val){return _FLAG_SHOW_LIGHTS = val;}
	});

	var _STREAM_DEFAULT = null;
	Object.defineProperty(api, 'STREAM_DEFAULT', {
		get: function(){return _STREAM_DEFAULT;},
		set: function(val){return _STREAM_DEFAULT = val;}
	});

	// Methods
	api.cancel = function(){
		console.debug('Method "Titanium.Android.NotificationManager..cancel" is not implemented yet.');
	};
	api.cancelAll = function(){
		console.debug('Method "Titanium.Android.NotificationManager..cancelAll" is not implemented yet.');
	};
	api.notify = function(){
		console.debug('Method "Titanium.Android.NotificationManager..notify" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.NotificationManager'));
;
(function(api){
	// Properties
	var _flags = null;
	Object.defineProperty(api, 'flags', {
		get: function(){return _flags;},
		set: function(val){return _flags = val;}
	});

	var _intent = null;
	Object.defineProperty(api, 'intent', {
		get: function(){return _intent;},
		set: function(val){return _intent = val;}
	});

})(Ti._5.createClass('Titanium.Android.PendingIntent'));
;
(function(api){
	// Properties
	var _anim = null;
	Object.defineProperty(api, 'anim', {
		get: function(){return _anim;},
		set: function(val){return _anim = val;}
	});

	var _array = null;
	Object.defineProperty(api, 'array', {
		get: function(){return _array;},
		set: function(val){return _array = val;}
	});

	var _attr = null;
	Object.defineProperty(api, 'attr', {
		get: function(){return _attr;},
		set: function(val){return _attr = val;}
	});

	var _color = null;
	Object.defineProperty(api, 'color', {
		get: function(){return _color;},
		set: function(val){return _color = val;}
	});

	var _dimen = null;
	Object.defineProperty(api, 'dimen', {
		get: function(){return _dimen;},
		set: function(val){return _dimen = val;}
	});

	var _drawable = null;
	Object.defineProperty(api, 'drawable', {
		get: function(){return _drawable;},
		set: function(val){return _drawable = val;}
	});

	var _id = null;
	Object.defineProperty(api, 'id', {
		get: function(){return _id;},
		set: function(val){return _id = val;}
	});

	var _integer = null;
	Object.defineProperty(api, 'integer', {
		get: function(){return _integer;},
		set: function(val){return _integer = val;}
	});

	var _layout = null;
	Object.defineProperty(api, 'layout', {
		get: function(){return _layout;},
		set: function(val){return _layout = val;}
	});

	var _string = null;
	Object.defineProperty(api, 'string', {
		get: function(){return _string;},
		set: function(val){return _string = val;}
	});

	var _style = null;
	Object.defineProperty(api, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});

	var _styleable = null;
	Object.defineProperty(api, 'styleable', {
		get: function(){return _styleable;},
		set: function(val){return _styleable = val;}
	});

})(Ti._5.createClass('Titanium.Android.R'));
;
(function(api){	// Methods
	api.setBoolean = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setBoolean" is not implemented yet.');
	};
	api.setChronometer = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setChronometer" is not implemented yet.');
	};
	api.setDouble = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setDouble" is not implemented yet.');
	};
	api.setImageViewResource = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setImageViewResource" is not implemented yet.');
	};
	api.setImageViewUri = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setImageViewUri" is not implemented yet.');
	};
	api.setInt = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setInt" is not implemented yet.');
	};
	api.setOnClickPendingIntent = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setOnClickPendingIntent" is not implemented yet.');
	};
	api.setProgressBar = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setProgressBar" is not implemented yet.');
	};
	api.setString = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setString" is not implemented yet.');
	};
	api.setTextColor = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setTextColor" is not implemented yet.');
	};
	api.setTextViewText = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setTextViewText" is not implemented yet.');
	};
	api.setUri = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setUri" is not implemented yet.');
	};
	api.setViewVisibility = function(){
		console.debug('Method "Titanium.Android.RemoteViews..setViewVisibility" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.RemoteViews'));
;
(function(api){
	// Properties
	var _intent = null;
	Object.defineProperty(api, 'intent', {
		get: function(){return _intent;},
		set: function(val){return _intent = val;}
	});

	var _serviceInstanceId = null;
	Object.defineProperty(api, 'serviceInstanceId', {
		get: function(){return _serviceInstanceId;},
		set: function(val){return _serviceInstanceId = val;}
	});

	var _pause = null;
	Object.defineProperty(api, 'pause', {
		get: function(){return _pause;},
		set: function(val){return _pause = val;}
	});

	var _resume = null;
	Object.defineProperty(api, 'resume', {
		get: function(){return _resume;},
		set: function(val){return _resume = val;}
	});

	var _start = null;
	Object.defineProperty(api, 'start', {
		get: function(){return _start;},
		set: function(val){return _start = val;}
	});

	var _stop = null;
	Object.defineProperty(api, 'stop', {
		get: function(){return _stop;},
		set: function(val){return _stop = val;}
	});

	// Methods
	api.start = function(){
		console.debug('Method "Titanium.Android.Service..start" is not implemented yet.');
	};
	api.stop = function(){
		console.debug('Method "Titanium.Android.Service..stop" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Android.Service'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Methods
	api.debug = function(msg) {
		console.debug("[DEBUG] " + msg);
	};

	api.error = function(msg) {
		console.error("[ERROR] " + msg);
	};

	api.info = function(msg) {
		console.info("[INFO] " + msg);
	};	

	api.log = function(msg) {
		console.log("[LOG] " + msg);
	};

	api.warn = function(msg) {
		console.warn("[WARN] " + msg);
	};
})(Ti._5.createClass('Titanium.API'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
})(Ti._5.createClass('Titanium.App.Android'));
;
(function(api){
	// Properties
	var _class = null;
	Object.defineProperty(api, 'class', {
		get: function(){return _class;},
		set: function(val){return _class = val;}
	});

})(Ti._5.createClass('Titanium.App.Android.R'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	api.id = "com.appcelerator.tistudiomobile";
	api.name = "Titanium Studio Mobile";
	api.version = "0.1";
	api.publisher = "Appcelerator";
	api.description = "Titanium Studio Mobile";
	api.copyright = "2011 by Appcelerator";
	api.url = "http://www.appcelerator.com";
	api.guid = "025a7dd5-a6cc-4a80-adeb-eef8509a1415";
	api.idleTimerDisabled = true;
	api.proximityDetection = false;
	api.proximityState = 0;
		
	var analytics = "false";

	// Methods
	api.getArguments = function(){
		console.debug('Method "Titanium.App.getArguments" is not implemented yet.');
	};
})(Ti._5.createClass('Ti.App'));

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	// Methods
	api.stop = function(){
		console.debug('Method "Titanium.App.iOS.BackgroundService..stop" is not implemented yet.');
	};
	api.unregister = function(){
		console.debug('Method "Titanium.App.iOS.BackgroundService..unregister" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.App.iOS.BackgroundService'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _cancelAllLocalNotifications = null;
	Object.defineProperty(api, 'cancelAllLocalNotifications', {
		get: function(){return _cancelAllLocalNotifications;},
		set: function(val){return _cancelAllLocalNotifications = val;}
	});

	var _cancelLocalNotification = null;
	Object.defineProperty(api, 'cancelLocalNotification', {
		get: function(){return _cancelLocalNotification;},
		set: function(val){return _cancelLocalNotification = val;}
	});

	var _registerBackgroundService = null;
	Object.defineProperty(api, 'registerBackgroundService', {
		get: function(){return _registerBackgroundService;},
		set: function(val){return _registerBackgroundService = val;}
	});

	var _scheduleLocalNotification = null;
	Object.defineProperty(api, 'scheduleLocalNotification', {
		get: function(){return _scheduleLocalNotification;},
		set: function(val){return _scheduleLocalNotification = val;}
	});

	// Methods
	api.createBackgroundService = function(){
		console.debug('Method "Titanium.App.iOS..createBackgroundService" is not implemented yet.');
	};
	api.createLocalNotification = function(){
		console.debug('Method "Titanium.App.iOS..createLocalNotification" is not implemented yet.');
	};

	// Events
	api.addEventListener('notification', function(){
		console.debug('Event "notification" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.App.iOS'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	// Methods
	api.cancel = function(){
		console.debug('Method "Titanium.App.iOS.LocalNotification..cancel" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.App.iOS.LocalNotification'));
;
(function(api){	// Methods
	api.imageAsThumbnail = function(){
		console.debug('Method "Titanium.Blob..imageAsThumbnail" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Blob'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _CONTACTS_KIND_ORGANIZATION = null;
	Object.defineProperty(api, 'CONTACTS_KIND_ORGANIZATION', {
		get: function(){return _CONTACTS_KIND_ORGANIZATION;},
		set: function(val){return _CONTACTS_KIND_ORGANIZATION = val;}
	});

	var _CONTACTS_KIND_PERSON = null;
	Object.defineProperty(api, 'CONTACTS_KIND_PERSON', {
		get: function(){return _CONTACTS_KIND_PERSON;},
		set: function(val){return _CONTACTS_KIND_PERSON = val;}
	});

	var _CONTACTS_SORT_FIRST_NAME = null;
	Object.defineProperty(api, 'CONTACTS_SORT_FIRST_NAME', {
		get: function(){return _CONTACTS_SORT_FIRST_NAME;},
		set: function(val){return _CONTACTS_SORT_FIRST_NAME = val;}
	});

	var _CONTACTS_SORT_LAST_NAME = null;
	Object.defineProperty(api, 'CONTACTS_SORT_LAST_NAME', {
		get: function(){return _CONTACTS_SORT_LAST_NAME;},
		set: function(val){return _CONTACTS_SORT_LAST_NAME = val;}
	});

	// Methods
	api.createGroup = function(){
		console.debug('Method "Titanium.Contacts..createGroup" is not implemented yet.');
	};
	api.createPerson = function(){
		console.debug('Method "Titanium.Contacts..createPerson" is not implemented yet.');
	};
	api.getAllGroups = function(){
		console.debug('Method "Titanium.Contacts..getAllGroups" is not implemented yet.');
	};
	api.getAllPeople = function(){
		console.debug('Method "Titanium.Contacts..getAllPeople" is not implemented yet.');
	};
	api.getGroupByID = function(){
		console.debug('Method "Titanium.Contacts..getGroupByID" is not implemented yet.');
	};
	api.getPeopleWithName = function(){
		console.debug('Method "Titanium.Contacts..getPeopleWithName" is not implemented yet.');
	};
	api.getPersonByID = function(){
		console.debug('Method "Titanium.Contacts..getPersonByID" is not implemented yet.');
	};
	api.removeGroup = function(){
		console.debug('Method "Titanium.Contacts..removeGroup" is not implemented yet.');
	};
	api.removePerson = function(){
		console.debug('Method "Titanium.Contacts..removePerson" is not implemented yet.');
	};
	api.revert = function(){
		console.debug('Method "Titanium.Contacts..revert" is not implemented yet.');
	};
	api.save = function(){
		console.debug('Method "Titanium.Contacts..save" is not implemented yet.');
	};
	api.showContacts = function(){
		console.debug('Method "Titanium.Contacts..showContacts" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Contacts'));
;
(function(api){
	// Properties
	var _name = null;
	Object.defineProperty(api, 'name', {
		get: function(){return _name;},
		set: function(val){return _name = val;}
	});

	// Methods
	api.add = function(){
		console.debug('Method "Titanium.Contacts.Group..add" is not implemented yet.');
	};
	api.members = function(){
		console.debug('Method "Titanium.Contacts.Group..members" is not implemented yet.');
	};
	api.remove = function(){
		console.debug('Method "Titanium.Contacts.Group..remove" is not implemented yet.');
	};
	api.sortedMembers = function(){
		console.debug('Method "Titanium.Contacts.Group..sortedMembers" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Contacts.Group'));
;
(function(api){
	// Properties
	var _URL = null;
	Object.defineProperty(api, 'URL', {
		get: function(){return _URL;},
		set: function(val){return _URL = val;}
	});

	var _address = null;
	Object.defineProperty(api, 'address', {
		get: function(){return _address;},
		set: function(val){return _address = val;}
	});

	var _birthday = null;
	Object.defineProperty(api, 'birthday', {
		get: function(){return _birthday;},
		set: function(val){return _birthday = val;}
	});

	var _created = null;
	Object.defineProperty(api, 'created', {
		get: function(){return _created;},
		set: function(val){return _created = val;}
	});

	var _date = null;
	Object.defineProperty(api, 'date', {
		get: function(){return _date;},
		set: function(val){return _date = val;}
	});

	var _department = null;
	Object.defineProperty(api, 'department', {
		get: function(){return _department;},
		set: function(val){return _department = val;}
	});

	var _email = null;
	Object.defineProperty(api, 'email', {
		get: function(){return _email;},
		set: function(val){return _email = val;}
	});

	var _firstName = null;
	Object.defineProperty(api, 'firstName', {
		get: function(){return _firstName;},
		set: function(val){return _firstName = val;}
	});

	var _firstPhonetic = null;
	Object.defineProperty(api, 'firstPhonetic', {
		get: function(){return _firstPhonetic;},
		set: function(val){return _firstPhonetic = val;}
	});

	var _fullName = null;
	Object.defineProperty(api, 'fullName', {
		get: function(){return _fullName;},
		set: function(val){return _fullName = val;}
	});

	var _image = null;
	Object.defineProperty(api, 'image', {
		get: function(){return _image;},
		set: function(val){return _image = val;}
	});

	var _instantMessage = null;
	Object.defineProperty(api, 'instantMessage', {
		get: function(){return _instantMessage;},
		set: function(val){return _instantMessage = val;}
	});

	var _jobTitle = null;
	Object.defineProperty(api, 'jobTitle', {
		get: function(){return _jobTitle;},
		set: function(val){return _jobTitle = val;}
	});

	var _kind = null;
	Object.defineProperty(api, 'kind', {
		get: function(){return _kind;},
		set: function(val){return _kind = val;}
	});

	var _lastName = null;
	Object.defineProperty(api, 'lastName', {
		get: function(){return _lastName;},
		set: function(val){return _lastName = val;}
	});

	var _lastPhonetic = null;
	Object.defineProperty(api, 'lastPhonetic', {
		get: function(){return _lastPhonetic;},
		set: function(val){return _lastPhonetic = val;}
	});

	var _middleName = null;
	Object.defineProperty(api, 'middleName', {
		get: function(){return _middleName;},
		set: function(val){return _middleName = val;}
	});

	var _middlePhonetic = null;
	Object.defineProperty(api, 'middlePhonetic', {
		get: function(){return _middlePhonetic;},
		set: function(val){return _middlePhonetic = val;}
	});

	var _modified = null;
	Object.defineProperty(api, 'modified', {
		get: function(){return _modified;},
		set: function(val){return _modified = val;}
	});

	var _nickname = null;
	Object.defineProperty(api, 'nickname', {
		get: function(){return _nickname;},
		set: function(val){return _nickname = val;}
	});

	var _note = null;
	Object.defineProperty(api, 'note', {
		get: function(){return _note;},
		set: function(val){return _note = val;}
	});

	var _organization = null;
	Object.defineProperty(api, 'organization', {
		get: function(){return _organization;},
		set: function(val){return _organization = val;}
	});

	var _phone = null;
	Object.defineProperty(api, 'phone', {
		get: function(){return _phone;},
		set: function(val){return _phone = val;}
	});

	var _prefix = null;
	Object.defineProperty(api, 'prefix', {
		get: function(){return _prefix;},
		set: function(val){return _prefix = val;}
	});

	var _relatedNames = null;
	Object.defineProperty(api, 'relatedNames', {
		get: function(){return _relatedNames;},
		set: function(val){return _relatedNames = val;}
	});

	var _suffix = null;
	Object.defineProperty(api, 'suffix', {
		get: function(){return _suffix;},
		set: function(val){return _suffix = val;}
	});

})(Ti._5.createClass('Titanium.Contacts.Person'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	// Methods
	api.install = function(){
		console.debug('Method "Titanium.Database.install" is not implemented yet.');
	};
	api.open = function(name, version, desc, size) {
		return new api.DB({
			name: name,
			version: version,
			desc: desc,
			size: size
		});
	};
})(Ti._5.createClass('Ti.Database'));

;
Ti._5.createClass('Titanium.Database.DB', function(args){
	var obj = this;
	args = Ti._5.extend({}, args);

	args.desc = args.desc || args.name;
	args.size = args.size || 65536;
	args.version = args.version || "1.0";
	
	var _db = openDatabase(args.name, args.version, args.desc, args.size);

	// Properties
	this.lastInsertRowId = null;
	this.name = args.name;
	this.rowsAffected = null;

	// Methods
	this.close = function() {
		_db = null;
	};
	this.execute = function(sql){
		if (!_db) {
			return;
		}
		var values = arguments[1] instanceof Array ? arguments[1] : [];
		var callback = null;
		for (var i = 1; i < arguments.length; i++){
			var val = arguments[i];

			if (typeof val == 'function'){
				callback = val;
			} else if(!(val instanceof Array)){
				values.push(val);
			}
		}
		var tiResults = {};
		_db.transaction(function(tx){
			tx.executeSql(sql, values, function(tx, results){
				obj.rowsAffected = results.rowsAffected;
				
				try {
					obj.lastInsertRowId = results.insertId;
				} catch (e) {
					obj.lastInsertRowId = null;
				}
				
				if (callback) {
					callback(new Titanium.Database.ResultSet(results));
				}
			}, 
			// error callback
			function(tx, error){
				if (callback){
					tiResults['error'] = error;
					callback(tiResults);
				}
			});
		});
	};
	this.remove = function(){
		console.debug('Method "Titanium.Database.DB.remove" is not implemented yet.');
	};
});

;
Ti._5.createClass('Titanium.Database.ResultSet', function(args){
	var obj = this;
	
	var _currentRow = 0;
	var results = args;
	var aRows = args.rows;
	
	// Properties
	var _rowCount = null;
	Object.defineProperty(this, 'rowCount', {
		get: function() {return aRows.length;},
		set: function(val) {return null;}
	});

	Object.defineProperty(this, 'validRow', {
		get: function() {return _currentRow >= aRows.length ? false : true;},
		set: function(val) {return null;}
	});

	// Methods
	this.close = function(){
		results.close();
	};
	this.getRowCount = function() {
		return obj.rowCount;
	};
	this.field = function(index){
		var row = aRows.item(_currentRow);
		var count = 0;
		for (v in row){
			if (count==index){
				return row[v];
			}
			count++;
		}
	};
	this.fieldByName = function(name) {
		var row = aRows.item(_currentRow);
		return row[name.toUpperCase()];	
	};
	this.fieldCount = function(){
		var row = aRows.item(_currentRow);
		var count = 0;
		for (v in row){
			count++;
		}
		console.log(row.length, count);
		return count; 
	};
	this.fieldName = function(index) {
		var row = aRows.item(_currentRow);
		var count = 0;
		for (v in row){
			if (count==index){
				return v;
			}
			count++;
		}
	};
	this.isValidRow = function(){
		return obj.validRow;
	};
	this.next = function(){
		_currentRow++;
	};
	this.close = function() {
		delete this;
	}
});
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _accessToken = null;
	Object.defineProperty(api, 'accessToken', {
		get: function(){return _accessToken;},
		set: function(val){return _accessToken = val;}
	});

	var _appid = null;
	Object.defineProperty(api, 'appid', {
		get: function(){return _appid;},
		set: function(val){return _appid = val;}
	});

	var _expirationDate = null;
	Object.defineProperty(api, 'expirationDate', {
		get: function(){return _expirationDate;},
		set: function(val){return _expirationDate = val;}
	});

	var _forceDialogAuth = null;
	Object.defineProperty(api, 'forceDialogAuth', {
		get: function(){return _forceDialogAuth;},
		set: function(val){return _forceDialogAuth = val;}
	});

	var _loggedIn = null;
	Object.defineProperty(api, 'loggedIn', {
		get: function(){return _loggedIn;},
		set: function(val){return _loggedIn = val;}
	});

	var _permissions = null;
	Object.defineProperty(api, 'permissions', {
		get: function(){return _permissions;},
		set: function(val){return _permissions = val;}
	});

	var _uid = null;
	Object.defineProperty(api, 'uid', {
		get: function(){return _uid;},
		set: function(val){return _uid = val;}
	});

	// Methods
	api.authorize = function(){
		console.debug('Method "Titanium.Facebook..authorize" is not implemented yet.');
	};
	api.createLoginButton = function(){
		console.debug('Method "Titanium.Facebook..createLoginButton" is not implemented yet.');
	};
	api.dialog = function(){
		console.debug('Method "Titanium.Facebook..dialog" is not implemented yet.');
	};
	api.logout = function(){
		console.debug('Method "Titanium.Facebook..logout" is not implemented yet.');
	};
	api.request = function(){
		console.debug('Method "Titanium.Facebook..request" is not implemented yet.');
	};
	api.requestWithGraphPath = function(){
		console.debug('Method "Titanium.Facebook..requestWithGraphPath" is not implemented yet.');
	};

	// Events
	api.addEventListener('login', function(){
		console.debug('Event "login" is not implemented yet.');
	});
	api.addEventListener('logout', function(){
		console.debug('Event "logout" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Facebook'));
;
Ti._5.createClass('Titanium.Facebook.LoginButton', function(args){
    var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'button', args, 'LoginButton');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _style = null;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});

	var _click = null;
	Object.defineProperty(this, 'click', {
		get: function(){return _click;},
		set: function(val){return _click = val;}
	});


	// Events
	this.addEventListener('globalPoint', function(){
		console.debug('Event "globalPoint" is not implemented yet.');
	});
	this.addEventListener('dblclick', function(){
		console.debug('Event "dblclick" is not implemented yet.');
	});
});
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	// Methods
	api.createDirectory = function(){
		console.debug('Method "Titanium.Filesystem.File..createDirectory" is not implemented yet.');
	};
	api.createFile = function(){
		console.debug('Method "Titanium.Filesystem.File..createFile" is not implemented yet.');
	};
	api.createTimestamp = function(){
		console.debug('Method "Titanium.Filesystem.File..createTimestamp" is not implemented yet.');
	};
	api.deleteDirectory = function(){
		console.debug('Method "Titanium.Filesystem.File..deleteDirectory" is not implemented yet.');
	};
	api.deleteFile = function(){
		console.debug('Method "Titanium.Filesystem.File..deleteFile" is not implemented yet.');
	};
	api.executable = function(){
		console.debug('Method "Titanium.Filesystem.File..executable" is not implemented yet.');
	};
	api.exists = function(){
		console.debug('Method "Titanium.Filesystem.File..exists" is not implemented yet.');
	};
	api.extension = function(){
		console.debug('Method "Titanium.Filesystem.File..extension" is not implemented yet.');
	};
	api.getDirectoryListing = function(){
		console.debug('Method "Titanium.Filesystem.File..getDirectoryListing" is not implemented yet.');
	};
	api.getParent = function(){
		console.debug('Method "Titanium.Filesystem.File..getParent" is not implemented yet.');
	};
	api.hidden = function(){
		console.debug('Method "Titanium.Filesystem.File..hidden" is not implemented yet.');
	};
	api.modificationTimestamp = function(){
		console.debug('Method "Titanium.Filesystem.File..modificationTimestamp" is not implemented yet.');
	};
	api.move = function(){
		console.debug('Method "Titanium.Filesystem.File..move" is not implemented yet.');
	};
	api.name = function(){
		console.debug('Method "Titanium.Filesystem.File..name" is not implemented yet.');
	};
	api.nativePath = function(){
		console.debug('Method "Titanium.Filesystem.File..nativePath" is not implemented yet.');
	};
	api.read = function(){
		console.debug('Method "Titanium.Filesystem.File..read" is not implemented yet.');
	};
	api.readonly = function(){
		console.debug('Method "Titanium.Filesystem.File..readonly" is not implemented yet.');
	};
	api.rename = function(){
		console.debug('Method "Titanium.Filesystem.File..rename" is not implemented yet.');
	};
	api.setExecutable = function(){
		console.debug('Method "Titanium.Filesystem.File..setExecutable" is not implemented yet.');
	};
	api.setHidden = function(){
		console.debug('Method "Titanium.Filesystem.File..setHidden" is not implemented yet.');
	};
	api.setReadonly = function(){
		console.debug('Method "Titanium.Filesystem.File..setReadonly" is not implemented yet.');
	};
	api.spaceAvailable = function(){
		console.debug('Method "Titanium.Filesystem.File..spaceAvailable" is not implemented yet.');
	};
	api.symbolicLink = function(){
		console.debug('Method "Titanium.Filesystem.File..symbolicLink" is not implemented yet.');
	};
	api.write = function(){
		console.debug('Method "Titanium.Filesystem.File..write" is not implemented yet.');
	};
	api.writeable = function(){
		console.debug('Method "Titanium.Filesystem.File..writeable" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Filesystem.File'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _MODE_APPEND = null;
	Object.defineProperty(api, 'MODE_APPEND', {
		get: function(){return _MODE_APPEND;},
		set: function(val){return _MODE_APPEND = val;}
	});

	var _MODE_READ = null;
	Object.defineProperty(api, 'MODE_READ', {
		get: function(){return _MODE_READ;},
		set: function(val){return _MODE_READ = val;}
	});

	var _MODE_WRITE = null;
	Object.defineProperty(api, 'MODE_WRITE', {
		get: function(){return _MODE_WRITE;},
		set: function(val){return _MODE_WRITE = val;}
	});

	var _applicationDataDirectory = null;
	Object.defineProperty(api, 'applicationDataDirectory', {
		get: function(){return _applicationDataDirectory;},
		set: function(val){return _applicationDataDirectory = val;}
	});

	var _applicationDirectory = null;
	Object.defineProperty(api, 'applicationDirectory', {
		get: function(){return _applicationDirectory;},
		set: function(val){return _applicationDirectory = val;}
	});

	var _lineEnding = null;
	Object.defineProperty(api, 'lineEnding', {
		get: function(){return _lineEnding;},
		set: function(val){return _lineEnding = val;}
	});

	var _resourcesDirectory = null;
	Object.defineProperty(api, 'resourcesDirectory', {
		get: function(){return _resourcesDirectory;},
		set: function(val){return _resourcesDirectory = val;}
	});

	var _separator = null;
	Object.defineProperty(api, 'separator', {
		get: function(){return _separator;},
		set: function(val){return _separator = val;}
	});

	var _tempDirectory = null;
	Object.defineProperty(api, 'tempDirectory', {
		get: function(){return _tempDirectory;},
		set: function(val){return _tempDirectory = val;}
	});

	// Methods
	api.createFile = function(){
		console.debug('Method "Titanium.Filesystem..createFile" is not implemented yet.');
	};
	api.createTempDirectory = function(){
		console.debug('Method "Titanium.Filesystem..createTempDirectory" is not implemented yet.');
	};
	api.createTempFile = function(){
		console.debug('Method "Titanium.Filesystem..createTempFile" is not implemented yet.');
	};
	api.getFile = function(){
		console.debug('Method "Titanium.Filesystem..getFile" is not implemented yet.');
	};
	api.isExternalStoragePresent = function(){
		console.debug('Method "Titanium.Filesystem..isExternalStoragePresent" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Filesystem'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	api.ACCURACY_BEST = 0;
	api.ACCURACY_HUNDRED_METERS = 2;
	api.ACCURACY_KILOMETER = 3;
	api.ACCURACY_NEAREST_TEN_METERS = 1;
	api.ACCURACY_THREE_KILOMETERS = 4;

	api.AUTHORIZATION_AUTHORIZED = 4;
	api.AUTHORIZATION_DENIED = 1;
	api.AUTHORIZATION_RESTRICTED = 2;
	api.AUTHORIZATION_UNKNOWN = 0;

	api.ERROR_DENIED = 1;
	api.ERROR_HEADING_FAILURE = 2;
	api.ERROR_LOCATION_UNKNOWN = 3;
	api.ERROR_NETWORK = 0;
	api.ERROR_REGION_MONITORING_DELAYED = 4;
	api.ERROR_REGION_MONITORING_DENIED = 5;
	api.ERROR_REGION_MONITORING_FAILURE = 6;

	api.PROVIDER_GPS = 1;
	api.PROVIDER_NETWORK = 2;

	var _accuracy = api.ACCURACY_BEST;
	Object.defineProperty(api, 'accuracy', {
		get: function(){return _accuracy;},
		set: function(val){return _accuracy = val;}
	});

	var _locationServicesAuthorization = null;
	Object.defineProperty(api, 'locationServicesAuthorization', {
		get: function(){return _locationServicesAuthorization;},
		set: function(val){return _locationServicesAuthorization = val;}
	});

	var _locationServicesEnabled = null;
	Object.defineProperty(api, 'locationServicesEnabled', {
		get: function(){return _locationServicesEnabled;},
		set: function(val){return _locationServicesEnabled = val;}
	});

	var _preferredProvider = null;
	Object.defineProperty(api, 'preferredProvider', {
		get: function(){return _preferredProvider;},
		set: function(val){return _preferredProvider = val;}
	});

	var _purpose = null;
	Object.defineProperty(api, 'purpose', {
		get: function(){return _purpose;},
		set: function(val){return _purpose = val;}
	});

	var _showCalibration = null;
	Object.defineProperty(api, 'showCalibration', {
		get: function(){return _showCalibration;},
		set: function(val){return _showCalibration = val;}
	});

	// Methods
	api.getCurrentPosition = function(callbackFunc) {
		if (_lastPosition && 'function' == typeof callbackFunc) {
			callbackFunc(_lastPosition);
			return;
		}
		if (_lastError) {
			if ('function' == typeof callbackFunc) {
				callbackFunc(_lastError);
			}
			return;
		}
		navigator.geolocation.getCurrentPosition(
			function(oPos){
				var oResult = {
					coords : {
						latitude : oPos.coords.latitude,
						longitude : oPos.coords.longitude,
						altitude : oPos.coords.altitude,
						heading : oPos.coords.heading,
						accuracy : oPos.coords.accuracy,
						speed : oPos.coords.speed,
						altitudeAccuracy : oPos.coords.altitudeAccuracy,
						timestamp : oPos.timestamp
					}
				};
				oResult.code = 0;
				oResult.error = '';
				oResult.success = true;

				if ('function' == typeof callbackFunc) {
					callbackFunc(oResult);
				}
			},
			function(oError){
				var oResult = {
					message : oError.message
				};
				oResult.coords = null;
				oResult.error = oError.message;
				oResult.success = false;

				if ('function' == typeof callbackFunc) {
					callbackFunc(oResult);
				}
			},
			{
				enableHighAccuracy : _accuracy < 3 || api.ACCURACY_BEST == _accuracy ? true : false
			}
		);
	};

	var _watchId;
	var _oldAddEventListener = api.addEventListener, _lastPosition = null, _lastError = null;
	api.addEventListener = function(eventType, callback){
		_oldAddEventListener(eventType, callback);
		if(eventType == 'location'){
			_watchId = navigator.geolocation.watchPosition(
				function(oPos){
					var oResult = {
						coords : {
							latitude : oPos.coords.latitude,
							longitude : oPos.coords.longitude,
							altitude : oPos.coords.altitude,
							heading : oPos.coords.heading,
							accuracy : oPos.coords.accuracy,
							speed : oPos.coords.speed,
							altitudeAccuracy : oPos.coords.altitudeAccuracy,
							timestamp : oPos.timestamp
						}
					};
					oResult.code = 0;
					oResult.error = '';
					oResult.success = true;
					oResult.provider = null;
					oResult.source = api;
					oResult.type = 'location';
					_lastPosition = oResult;
					_lastError = null;

					api.fireEvent('location', oResult);
					/*
					if (oPos.heading) {
						api.fireEvent('heading', oPos);
					}
					*/
				},
				function(oError){
					var oResult = {
						message : oError.message
					};
					oResult.coords = null;
					oResult.error = oError.message;
					oResult.success = false;
					oResult.provider = null;
					oResult.source = api;
					oResult.type = 'location';
					_lastPosition = null;
					_lastError = oResult;

					api.fireEvent('location', oResult);
					/*
					if (oPos.heading) {
						api.fireEvent('heading', oPos);
					}
					*/
				},
				{
					enableHighAccuracy : _accuracy < 3 || api.ACCURACY_BEST == _accuracy ? true : false
				}
			);
		}
	};
	var _oldRemoveEventlistener = api.removeEventListener;
	api.removeEventListener = function(eventName, cb){
		_oldRemoveEventlistener(eventName, cb);
		if(eventName == 'location'){
			navigator.geolocation.clearWatch(_watchId);
		}
	};

	api.forwardGeocoder = function(address, callbackFunc) {};
	api.getCurrentHeading = function(callbackFunc) {};
	api.reverseGeocoder = function(latitude, longitude, callbackFunc) {};
	api.setShowCalibration = function() {};
})(Ti._5.createClass('Ti.Geolocation'));

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	function _checkOrientation(ev){
		var orientation = window.orientation;
		var o = Ti.UI.UNKNOWN;
		switch(orientation) {
			case 0:
				o = Ti.UI.PORTRAIT;
				break;
			case 90:
				o = Ti.UI.LANDSCAPE_LEFT;
				break;
			case -90:
				o = Ti.UI.LANDSCAPE_RIGHT;
				break;
		}

		api.fireEvent('orientationchange', {
			orientation: o,
			source: ev.source,
			type: 'orientationchange'
		})
	}
	window.addEventListener("orientationchange", _checkOrientation, false);
	
	var _tLastShake = new Date(), _lastAccel = {}; 
	// need some delta for coordinates changed
	var _delta = 20;
	function _checkShake (ev) {
		var accel = {
			x: ev.acceleration.x || ev.accelerationIncludingGravity.x || ev.x,
			y: ev.acceleration.y || ev.accelerationIncludingGravity.y || ev.y,
			z: ev.acceleration.z || ev.accelerationIncludingGravity.z || ev.z
		};
		
		if (_lastAccel.x || _lastAccel.y || _lastAccel.z) {
			if (
				((Math.abs(_lastAccel.x - accel.x) > _delta) && (Math.abs(_lastAccel.y - accel.y) > _delta)) || 
				((Math.abs(_lastAccel.x - accel.x) > _delta) && (Math.abs(_lastAccel.z - accel.z) > _delta)) || 
				((Math.abs(_lastAccel.y - accel.y) > _delta) && (Math.abs(_lastAccel.z - accel.z) > _delta))
			) {
				var currentTime = new Date();
				var timeDifference = currentTime.getTime() - _tLastShake.getTime();
				if (timeDifference > 300) {
					_tLastShake = new Date();
					
					api.fireEvent('shake', {
						source: ev.source,
						timestamp: timeDifference,
						type: 'shake'
					})
				}
			}
		}
		_lastAccel = accel;
	}
	window.addEventListener("devicemotion", _checkShake, false);
	window.addEventListener("MozOrientation", _checkShake, false);
		
})(Ti._5.createClass('Titanium.Gesture'));

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _animate = null;
	Object.defineProperty(api, 'animate', {
		get: function(){return _animate;},
		set: function(val){return _animate = val;}
	});

	var _image = null;
	Object.defineProperty(api, 'image', {
		get: function(){return _image;},
		set: function(val){return _image = val;}
	});

	var _leftButton = null;
	Object.defineProperty(api, 'leftButton', {
		get: function(){return _leftButton;},
		set: function(val){return _leftButton = val;}
	});

	var _leftView = null;
	Object.defineProperty(api, 'leftView', {
		get: function(){return _leftView;},
		set: function(val){return _leftView = val;}
	});

	var _pincolor = null;
	Object.defineProperty(api, 'pincolor', {
		get: function(){return _pincolor;},
		set: function(val){return _pincolor = val;}
	});

	var _rightButton = null;
	Object.defineProperty(api, 'rightButton', {
		get: function(){return _rightButton;},
		set: function(val){return _rightButton = val;}
	});

	var _rightView = null;
	Object.defineProperty(api, 'rightView', {
		get: function(){return _rightView;},
		set: function(val){return _rightView = val;}
	});

	var _subtitle = null;
	Object.defineProperty(api, 'subtitle', {
		get: function(){return _subtitle;},
		set: function(val){return _subtitle = val;}
	});

	var _subtitleid = null;
	Object.defineProperty(api, 'subtitleid', {
		get: function(){return _subtitleid;},
		set: function(val){return _subtitleid = val;}
	});

	var _title = null;
	Object.defineProperty(api, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

	var _titleid = null;
	Object.defineProperty(api, 'titleid', {
		get: function(){return _titleid;},
		set: function(val){return _titleid = val;}
	});

})(Ti._5.createClass('Titanium.Map.Annotation'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _HYBRID_TYPE = null;
	Object.defineProperty(api, 'HYBRID_TYPE', {
		get: function(){return _HYBRID_TYPE;},
		set: function(val){return _HYBRID_TYPE = val;}
	});

	var _SATELLITE_TYPE = null;
	Object.defineProperty(api, 'SATELLITE_TYPE', {
		get: function(){return _SATELLITE_TYPE;},
		set: function(val){return _SATELLITE_TYPE = val;}
	});

	var _STANDARD_TYPE = null;
	Object.defineProperty(api, 'STANDARD_TYPE', {
		get: function(){return _STANDARD_TYPE;},
		set: function(val){return _STANDARD_TYPE = val;}
	});

	// Methods
	api.createAnnotation = function(){
		console.debug('Method "Titanium.Map..createAnnotation" is not implemented yet.');
	};
	api.createMapView = function(){
		console.debug('Method "Titanium.Map..createMapView" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Map'));
;
Ti._5.createClass('Titanium.Map.MapView', function(api){
    var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'MapView');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _animate = null;
	Object.defineProperty(this, 'animate', {
		get: function(){return _animate;},
		set: function(val){return _animate = val;}
	});

	var _annotations = null;
	Object.defineProperty(this, 'annotations', {
		get: function(){return _annotations;},
		set: function(val){return _annotations = val;}
	});

	var _location = null;
	Object.defineProperty(this, 'location', {
		get: function(){return _location;},
		set: function(val){return _location = val;}
	});

	var _mapType = null;
	Object.defineProperty(this, 'mapType', {
		get: function(){return _mapType;},
		set: function(val){return _mapType = val;}
	});

	var _region = null;
	Object.defineProperty(this, 'region', {
		get: function(){return _region;},
		set: function(val){return _region = val;}
	});

	var _regionFit = null;
	Object.defineProperty(this, 'regionFit', {
		get: function(){return _regionFit;},
		set: function(val){return _regionFit = val;}
	});

	var _userLocation = null;
	Object.defineProperty(this, 'userLocation', {
		get: function(){return _userLocation;},
		set: function(val){return _userLocation = val;}
	});

	// Methods
	this.addAnnotation = function(){
		console.debug('Method "Titanium.Map.MapView..addAnnotation" is not implemented yet.');
	};
	this.addAnnotations = function(){
		console.debug('Method "Titanium.Map.MapView..addAnnotations" is not implemented yet.');
	};
	this.addRoute = function(){
		console.debug('Method "Titanium.Map.MapView..addRoute" is not implemented yet.');
	};
	this.deselectAnnotation = function(){
		console.debug('Method "Titanium.Map.MapView..deselectAnnotation" is not implemented yet.');
	};
	this.removeAllAnnotations = function(){
		console.debug('Method "Titanium.Map.MapView..removeAllAnnotations" is not implemented yet.');
	};
	this.removeAnnotation = function(){
		console.debug('Method "Titanium.Map.MapView..removeAnnotation" is not implemented yet.');
	};
	this.removeAnnotations = function(){
		console.debug('Method "Titanium.Map.MapView..removeAnnotations" is not implemented yet.');
	};
	this.removeRoute = function(){
		console.debug('Method "Titanium.Map.MapView..removeRoute" is not implemented yet.');
	};
	this.selectAnnotation = function(){
		console.debug('Method "Titanium.Map.MapView..selectAnnotation" is not implemented yet.');
	};
	this.setLocation = function(){
		console.debug('Method "Titanium.Map.MapView..setLocation" is not implemented yet.');
	};
	this.setMapType = function(){
		console.debug('Method "Titanium.Map.MapView..setMapType" is not implemented yet.');
	};
	this.zoom = function(){
		console.debug('Method "Titanium.Map.MapView..zoom" is not implemented yet.');
	};

	// Events
	this.addEventListener('complete', function(){
		console.debug('Event "complete" is not implemented yet.');
	});
	this.addEventListener('error', function(){
		console.debug('Event "error" is not implemented yet.');
	});
	this.addEventListener('loading', function(){
		console.debug('Event "loading" is not implemented yet.');
	});
	this.addEventListener('regionChanged', function(){
		console.debug('Event "regionChanged" is not implemented yet.');
	});
});
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _STATE_PAUSED = null;
	Object.defineProperty(api, 'STATE_PAUSED', {
		get: function(){return _STATE_PAUSED;},
		set: function(val){return _STATE_PAUSED = val;}
	});

	var _STATE_PLAYING = null;
	Object.defineProperty(api, 'STATE_PLAYING', {
		get: function(){return _STATE_PLAYING;},
		set: function(val){return _STATE_PLAYING = val;}
	});

	var _STATE_STARTING = null;
	Object.defineProperty(api, 'STATE_STARTING', {
		get: function(){return _STATE_STARTING;},
		set: function(val){return _STATE_STARTING = val;}
	});

	var _STATE_STOPPED = null;
	Object.defineProperty(api, 'STATE_STOPPED', {
		get: function(){return _STATE_STOPPED;},
		set: function(val){return _STATE_STOPPED = val;}
	});

	var _STATE_STOPPING = null;
	Object.defineProperty(api, 'STATE_STOPPING', {
		get: function(){return _STATE_STOPPING;},
		set: function(val){return _STATE_STOPPING = val;}
	});

	var _STATE_WAITING_FOR_DATA = null;
	Object.defineProperty(api, 'STATE_WAITING_FOR_DATA', {
		get: function(){return _STATE_WAITING_FOR_DATA;},
		set: function(val){return _STATE_WAITING_FOR_DATA = val;}
	});

	var _STATE_WAITING_FOR_QUEUE = null;
	Object.defineProperty(api, 'STATE_WAITING_FOR_QUEUE', {
		get: function(){return _STATE_WAITING_FOR_QUEUE;},
		set: function(val){return _STATE_WAITING_FOR_QUEUE = val;}
	});

	var _allowBackground = null;
	Object.defineProperty(api, 'allowBackground', {
		get: function(){return _allowBackground;},
		set: function(val){return _allowBackground = val;}
	});

	var _bitRate = null;
	Object.defineProperty(api, 'bitRate', {
		get: function(){return _bitRate;},
		set: function(val){return _bitRate = val;}
	});

	var _idle = null;
	Object.defineProperty(api, 'idle', {
		get: function(){return _idle;},
		set: function(val){return _idle = val;}
	});

	var _paused = null;
	Object.defineProperty(api, 'paused', {
		get: function(){return _paused;},
		set: function(val){return _paused = val;}
	});

	var _playing = null;
	Object.defineProperty(api, 'playing', {
		get: function(){return _playing;},
		set: function(val){return _playing = val;}
	});

	var _progress = null;
	Object.defineProperty(api, 'progress', {
		get: function(){return _progress;},
		set: function(val){return _progress = val;}
	});

	var _state = null;
	Object.defineProperty(api, 'state', {
		get: function(){return _state;},
		set: function(val){return _state = val;}
	});

	var _url = null;
	Object.defineProperty(api, 'url', {
		get: function(){return _url;},
		set: function(val){return _url = val;}
	});

	var _waiting = null;
	Object.defineProperty(api, 'waiting', {
		get: function(){return _waiting;},
		set: function(val){return _waiting = val;}
	});

	// Methods
	api.pause = function(){
		console.debug('Method "Titanium.Media.AudioPlayer..pause" is not implemented yet.');
	};
	api.setPaused = function(){
		console.debug('Method "Titanium.Media.AudioPlayer..setPaused" is not implemented yet.');
	};
	api.setUrl = function(){
		console.debug('Method "Titanium.Media.AudioPlayer..setUrl" is not implemented yet.');
	};
	api.start = function(){
		console.debug('Method "Titanium.Media.AudioPlayer..start" is not implemented yet.');
	};
	api.stateDescription = function(){
		console.debug('Method "Titanium.Media.AudioPlayer..stateDescription" is not implemented yet.');
	};
	api.stop = function(){
		console.debug('Method "Titanium.Media.AudioPlayer..stop" is not implemented yet.');
	};

	// Events
	api.addEventListener('change', function(){
		console.debug('Event "change" is not implemented yet.');
	});
	api.addEventListener('progress', function(){
		console.debug('Event "progress" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Media.AudioPlayer'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _compression = null;
	Object.defineProperty(api, 'compression', {
		get: function(){return _compression;},
		set: function(val){return _compression = val;}
	});

	var _format = null;
	Object.defineProperty(api, 'format', {
		get: function(){return _format;},
		set: function(val){return _format = val;}
	});

	var _paused = null;
	Object.defineProperty(api, 'paused', {
		get: function(){return _paused;},
		set: function(val){return _paused = val;}
	});

	var _recording = null;
	Object.defineProperty(api, 'recording', {
		get: function(){return _recording;},
		set: function(val){return _recording = val;}
	});

	var _stopped = null;
	Object.defineProperty(api, 'stopped', {
		get: function(){return _stopped;},
		set: function(val){return _stopped = val;}
	});

	// Methods
	api.pause = function(){
		console.debug('Method "Titanium.Media.AudioRecorder..pause" is not implemented yet.');
	};
	api.resume = function(){
		console.debug('Method "Titanium.Media.AudioRecorder..resume" is not implemented yet.');
	};
	api.start = function(){
		console.debug('Method "Titanium.Media.AudioRecorder..start" is not implemented yet.');
	};
	api.stop = function(){
		console.debug('Method "Titanium.Media.AudioRecorder..stop" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Media.AudioRecorder'));
;
(function(api){
	// Properties
	var _albumArtist = null;
	Object.defineProperty(api, 'albumArtist', {
		get: function(){return _albumArtist;},
		set: function(val){return _albumArtist = val;}
	});

	var _albumTitle = null;
	Object.defineProperty(api, 'albumTitle', {
		get: function(){return _albumTitle;},
		set: function(val){return _albumTitle = val;}
	});

	var _albumTrackCount = null;
	Object.defineProperty(api, 'albumTrackCount', {
		get: function(){return _albumTrackCount;},
		set: function(val){return _albumTrackCount = val;}
	});

	var _albumTrackNumber = null;
	Object.defineProperty(api, 'albumTrackNumber', {
		get: function(){return _albumTrackNumber;},
		set: function(val){return _albumTrackNumber = val;}
	});

	var _artist = null;
	Object.defineProperty(api, 'artist', {
		get: function(){return _artist;},
		set: function(val){return _artist = val;}
	});

	var _artwork = null;
	Object.defineProperty(api, 'artwork', {
		get: function(){return _artwork;},
		set: function(val){return _artwork = val;}
	});

	var _composer = null;
	Object.defineProperty(api, 'composer', {
		get: function(){return _composer;},
		set: function(val){return _composer = val;}
	});

	var _discCount = null;
	Object.defineProperty(api, 'discCount', {
		get: function(){return _discCount;},
		set: function(val){return _discCount = val;}
	});

	var _discNumber = null;
	Object.defineProperty(api, 'discNumber', {
		get: function(){return _discNumber;},
		set: function(val){return _discNumber = val;}
	});

	var _genre = null;
	Object.defineProperty(api, 'genre', {
		get: function(){return _genre;},
		set: function(val){return _genre = val;}
	});

	var _isCompilation = null;
	Object.defineProperty(api, 'isCompilation', {
		get: function(){return _isCompilation;},
		set: function(val){return _isCompilation = val;}
	});

	var _lyrics = null;
	Object.defineProperty(api, 'lyrics', {
		get: function(){return _lyrics;},
		set: function(val){return _lyrics = val;}
	});

	var _mediaType = null;
	Object.defineProperty(api, 'mediaType', {
		get: function(){return _mediaType;},
		set: function(val){return _mediaType = val;}
	});

	var _playCount = null;
	Object.defineProperty(api, 'playCount', {
		get: function(){return _playCount;},
		set: function(val){return _playCount = val;}
	});

	var _playbackDuration = null;
	Object.defineProperty(api, 'playbackDuration', {
		get: function(){return _playbackDuration;},
		set: function(val){return _playbackDuration = val;}
	});

	var _podcastTitle = null;
	Object.defineProperty(api, 'podcastTitle', {
		get: function(){return _podcastTitle;},
		set: function(val){return _podcastTitle = val;}
	});

	var _rating = null;
	Object.defineProperty(api, 'rating', {
		get: function(){return _rating;},
		set: function(val){return _rating = val;}
	});

	var _skipCount = null;
	Object.defineProperty(api, 'skipCount', {
		get: function(){return _skipCount;},
		set: function(val){return _skipCount = val;}
	});

	var _title = null;
	Object.defineProperty(api, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

})(Ti._5.createClass('Titanium.Media.Item'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _AUDIO_FILEFORMAT_3GP2 = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_3GP2', {
		get: function(){return _AUDIO_FILEFORMAT_3GP2;},
		set: function(val){return _AUDIO_FILEFORMAT_3GP2 = val;}
	});

	var _AUDIO_FILEFORMAT_3GPP = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_3GPP', {
		get: function(){return _AUDIO_FILEFORMAT_3GPP;},
		set: function(val){return _AUDIO_FILEFORMAT_3GPP = val;}
	});

	var _AUDIO_FILEFORMAT_AIFF = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_AIFF', {
		get: function(){return _AUDIO_FILEFORMAT_AIFF;},
		set: function(val){return _AUDIO_FILEFORMAT_AIFF = val;}
	});

	var _AUDIO_FILEFORMAT_AMR = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_AMR', {
		get: function(){return _AUDIO_FILEFORMAT_AMR;},
		set: function(val){return _AUDIO_FILEFORMAT_AMR = val;}
	});

	var _AUDIO_FILEFORMAT_CAF = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_CAF', {
		get: function(){return _AUDIO_FILEFORMAT_CAF;},
		set: function(val){return _AUDIO_FILEFORMAT_CAF = val;}
	});

	var _AUDIO_FILEFORMAT_MP3 = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_MP3', {
		get: function(){return _AUDIO_FILEFORMAT_MP3;},
		set: function(val){return _AUDIO_FILEFORMAT_MP3 = val;}
	});

	var _AUDIO_FILEFORMAT_MP4 = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_MP4', {
		get: function(){return _AUDIO_FILEFORMAT_MP4;},
		set: function(val){return _AUDIO_FILEFORMAT_MP4 = val;}
	});

	var _AUDIO_FILEFORMAT_MP4A = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_MP4A', {
		get: function(){return _AUDIO_FILEFORMAT_MP4A;},
		set: function(val){return _AUDIO_FILEFORMAT_MP4A = val;}
	});

	var _AUDIO_FILEFORMAT_WAVE = null;
	Object.defineProperty(api, 'AUDIO_FILEFORMAT_WAVE', {
		get: function(){return _AUDIO_FILEFORMAT_WAVE;},
		set: function(val){return _AUDIO_FILEFORMAT_WAVE = val;}
	});

	var _AUDIO_FORMAT_AAC = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_AAC', {
		get: function(){return _AUDIO_FORMAT_AAC;},
		set: function(val){return _AUDIO_FORMAT_AAC = val;}
	});

	var _AUDIO_FORMAT_ALAW = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_ALAW', {
		get: function(){return _AUDIO_FORMAT_ALAW;},
		set: function(val){return _AUDIO_FORMAT_ALAW = val;}
	});

	var _AUDIO_FORMAT_APPLE_LOSSLESS = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_APPLE_LOSSLESS', {
		get: function(){return _AUDIO_FORMAT_APPLE_LOSSLESS;},
		set: function(val){return _AUDIO_FORMAT_APPLE_LOSSLESS = val;}
	});

	var _AUDIO_FORMAT_ILBC = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_ILBC', {
		get: function(){return _AUDIO_FORMAT_ILBC;},
		set: function(val){return _AUDIO_FORMAT_ILBC = val;}
	});

	var _AUDIO_FORMAT_IMA4 = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_IMA4', {
		get: function(){return _AUDIO_FORMAT_IMA4;},
		set: function(val){return _AUDIO_FORMAT_IMA4 = val;}
	});

	var _AUDIO_FORMAT_LINEAR_PCM = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_LINEAR_PCM', {
		get: function(){return _AUDIO_FORMAT_LINEAR_PCM;},
		set: function(val){return _AUDIO_FORMAT_LINEAR_PCM = val;}
	});

	var _AUDIO_FORMAT_ULAW = null;
	Object.defineProperty(api, 'AUDIO_FORMAT_ULAW', {
		get: function(){return _AUDIO_FORMAT_ULAW;},
		set: function(val){return _AUDIO_FORMAT_ULAW = val;}
	});

	var _AUDIO_HEADPHONES = null;
	Object.defineProperty(api, 'AUDIO_HEADPHONES', {
		get: function(){return _AUDIO_HEADPHONES;},
		set: function(val){return _AUDIO_HEADPHONES = val;}
	});

	var _AUDIO_HEADPHONES_AND_MIC = null;
	Object.defineProperty(api, 'AUDIO_HEADPHONES_AND_MIC', {
		get: function(){return _AUDIO_HEADPHONES_AND_MIC;},
		set: function(val){return _AUDIO_HEADPHONES_AND_MIC = val;}
	});

	var _AUDIO_HEADSET_INOUT = null;
	Object.defineProperty(api, 'AUDIO_HEADSET_INOUT', {
		get: function(){return _AUDIO_HEADSET_INOUT;},
		set: function(val){return _AUDIO_HEADSET_INOUT = val;}
	});

	var _AUDIO_LINEOUT = null;
	Object.defineProperty(api, 'AUDIO_LINEOUT', {
		get: function(){return _AUDIO_LINEOUT;},
		set: function(val){return _AUDIO_LINEOUT = val;}
	});

	var _AUDIO_MICROPHONE = null;
	Object.defineProperty(api, 'AUDIO_MICROPHONE', {
		get: function(){return _AUDIO_MICROPHONE;},
		set: function(val){return _AUDIO_MICROPHONE = val;}
	});

	var _AUDIO_MUTED = null;
	Object.defineProperty(api, 'AUDIO_MUTED', {
		get: function(){return _AUDIO_MUTED;},
		set: function(val){return _AUDIO_MUTED = val;}
	});

	var _AUDIO_RECEIVER_AND_MIC = null;
	Object.defineProperty(api, 'AUDIO_RECEIVER_AND_MIC', {
		get: function(){return _AUDIO_RECEIVER_AND_MIC;},
		set: function(val){return _AUDIO_RECEIVER_AND_MIC = val;}
	});

	var _AUDIO_SESSION_MODE_AMBIENT = null;
	Object.defineProperty(api, 'AUDIO_SESSION_MODE_AMBIENT', {
		get: function(){return _AUDIO_SESSION_MODE_AMBIENT;},
		set: function(val){return _AUDIO_SESSION_MODE_AMBIENT = val;}
	});

	var _AUDIO_SESSION_MODE_PLAYBACK = null;
	Object.defineProperty(api, 'AUDIO_SESSION_MODE_PLAYBACK', {
		get: function(){return _AUDIO_SESSION_MODE_PLAYBACK;},
		set: function(val){return _AUDIO_SESSION_MODE_PLAYBACK = val;}
	});

	var _AUDIO_SESSION_MODE_PLAY_AND_RECORD = null;
	Object.defineProperty(api, 'AUDIO_SESSION_MODE_PLAY_AND_RECORD', {
		get: function(){return _AUDIO_SESSION_MODE_PLAY_AND_RECORD;},
		set: function(val){return _AUDIO_SESSION_MODE_PLAY_AND_RECORD = val;}
	});

	var _AUDIO_SESSION_MODE_RECORD = null;
	Object.defineProperty(api, 'AUDIO_SESSION_MODE_RECORD', {
		get: function(){return _AUDIO_SESSION_MODE_RECORD;},
		set: function(val){return _AUDIO_SESSION_MODE_RECORD = val;}
	});

	var _AUDIO_SESSION_MODE_SOLO_AMBIENT = null;
	Object.defineProperty(api, 'AUDIO_SESSION_MODE_SOLO_AMBIENT', {
		get: function(){return _AUDIO_SESSION_MODE_SOLO_AMBIENT;},
		set: function(val){return _AUDIO_SESSION_MODE_SOLO_AMBIENT = val;}
	});

	var _AUDIO_SPEAKER = null;
	Object.defineProperty(api, 'AUDIO_SPEAKER', {
		get: function(){return _AUDIO_SPEAKER;},
		set: function(val){return _AUDIO_SPEAKER = val;}
	});

	var _AUDIO_UNAVAILABLE = null;
	Object.defineProperty(api, 'AUDIO_UNAVAILABLE', {
		get: function(){return _AUDIO_UNAVAILABLE;},
		set: function(val){return _AUDIO_UNAVAILABLE = val;}
	});

	var _AUDIO_UNKNOWN = null;
	Object.defineProperty(api, 'AUDIO_UNKNOWN', {
		get: function(){return _AUDIO_UNKNOWN;},
		set: function(val){return _AUDIO_UNKNOWN = val;}
	});

	var _DEVICE_BUSY = null;
	Object.defineProperty(api, 'DEVICE_BUSY', {
		get: function(){return _DEVICE_BUSY;},
		set: function(val){return _DEVICE_BUSY = val;}
	});

	var _MEDIA_TYPE_PHOTO = null;
	Object.defineProperty(api, 'MEDIA_TYPE_PHOTO', {
		get: function(){return _MEDIA_TYPE_PHOTO;},
		set: function(val){return _MEDIA_TYPE_PHOTO = val;}
	});

	var _MEDIA_TYPE_VIDEO = null;
	Object.defineProperty(api, 'MEDIA_TYPE_VIDEO', {
		get: function(){return _MEDIA_TYPE_VIDEO;},
		set: function(val){return _MEDIA_TYPE_VIDEO = val;}
	});

	var _MUSIC_MEDIA_TYPE_ALL = null;
	Object.defineProperty(api, 'MUSIC_MEDIA_TYPE_ALL', {
		get: function(){return _MUSIC_MEDIA_TYPE_ALL;},
		set: function(val){return _MUSIC_MEDIA_TYPE_ALL = val;}
	});

	var _MUSIC_MEDIA_TYPE_ANY_AUDIO = null;
	Object.defineProperty(api, 'MUSIC_MEDIA_TYPE_ANY_AUDIO', {
		get: function(){return _MUSIC_MEDIA_TYPE_ANY_AUDIO;},
		set: function(val){return _MUSIC_MEDIA_TYPE_ANY_AUDIO = val;}
	});

	var _MUSIC_MEDIA_TYPE_AUDIOBOOK = null;
	Object.defineProperty(api, 'MUSIC_MEDIA_TYPE_AUDIOBOOK', {
		get: function(){return _MUSIC_MEDIA_TYPE_AUDIOBOOK;},
		set: function(val){return _MUSIC_MEDIA_TYPE_AUDIOBOOK = val;}
	});

	var _MUSIC_MEDIA_TYPE_MUSIC = null;
	Object.defineProperty(api, 'MUSIC_MEDIA_TYPE_MUSIC', {
		get: function(){return _MUSIC_MEDIA_TYPE_MUSIC;},
		set: function(val){return _MUSIC_MEDIA_TYPE_MUSIC = val;}
	});

	var _MUSIC_MEDIA_TYPE_PODCAST = null;
	Object.defineProperty(api, 'MUSIC_MEDIA_TYPE_PODCAST', {
		get: function(){return _MUSIC_MEDIA_TYPE_PODCAST;},
		set: function(val){return _MUSIC_MEDIA_TYPE_PODCAST = val;}
	});

	var _MUSIC_PLAYER_REPEAT_ALL = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_REPEAT_ALL', {
		get: function(){return _MUSIC_PLAYER_REPEAT_ALL;},
		set: function(val){return _MUSIC_PLAYER_REPEAT_ALL = val;}
	});

	var _MUSIC_PLAYER_REPEAT_DEFAULT = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_REPEAT_DEFAULT', {
		get: function(){return _MUSIC_PLAYER_REPEAT_DEFAULT;},
		set: function(val){return _MUSIC_PLAYER_REPEAT_DEFAULT = val;}
	});

	var _MUSIC_PLAYER_REPEAT_NONE = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_REPEAT_NONE', {
		get: function(){return _MUSIC_PLAYER_REPEAT_NONE;},
		set: function(val){return _MUSIC_PLAYER_REPEAT_NONE = val;}
	});

	var _MUSIC_PLAYER_REPEAT_ONE = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_REPEAT_ONE', {
		get: function(){return _MUSIC_PLAYER_REPEAT_ONE;},
		set: function(val){return _MUSIC_PLAYER_REPEAT_ONE = val;}
	});

	var _MUSIC_PLAYER_SHUFFLE_ALBUMS = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_SHUFFLE_ALBUMS', {
		get: function(){return _MUSIC_PLAYER_SHUFFLE_ALBUMS;},
		set: function(val){return _MUSIC_PLAYER_SHUFFLE_ALBUMS = val;}
	});

	var _MUSIC_PLAYER_SHUFFLE_DEFAULT = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_SHUFFLE_DEFAULT', {
		get: function(){return _MUSIC_PLAYER_SHUFFLE_DEFAULT;},
		set: function(val){return _MUSIC_PLAYER_SHUFFLE_DEFAULT = val;}
	});

	var _MUSIC_PLAYER_SHUFFLE_NONE = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_SHUFFLE_NONE', {
		get: function(){return _MUSIC_PLAYER_SHUFFLE_NONE;},
		set: function(val){return _MUSIC_PLAYER_SHUFFLE_NONE = val;}
	});

	var _MUSIC_PLAYER_SHUFFLE_SONGS = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_SHUFFLE_SONGS', {
		get: function(){return _MUSIC_PLAYER_SHUFFLE_SONGS;},
		set: function(val){return _MUSIC_PLAYER_SHUFFLE_SONGS = val;}
	});

	var _MUSIC_PLAYER_STATE_INTERRUPTED = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_STATE_INTERRUPTED', {
		get: function(){return _MUSIC_PLAYER_STATE_INTERRUPTED;},
		set: function(val){return _MUSIC_PLAYER_STATE_INTERRUPTED = val;}
	});

	var _MUSIC_PLAYER_STATE_PAUSED = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_STATE_PAUSED', {
		get: function(){return _MUSIC_PLAYER_STATE_PAUSED;},
		set: function(val){return _MUSIC_PLAYER_STATE_PAUSED = val;}
	});

	var _MUSIC_PLAYER_STATE_PLAYING = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_STATE_PLAYING', {
		get: function(){return _MUSIC_PLAYER_STATE_PLAYING;},
		set: function(val){return _MUSIC_PLAYER_STATE_PLAYING = val;}
	});

	var _MUSIC_PLAYER_STATE_SEEK_BACKWARD = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_STATE_SEEK_BACKWARD', {
		get: function(){return _MUSIC_PLAYER_STATE_SEEK_BACKWARD;},
		set: function(val){return _MUSIC_PLAYER_STATE_SEEK_BACKWARD = val;}
	});

	var _MUSIC_PLAYER_STATE_SKEEK_FORWARD = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_STATE_SKEEK_FORWARD', {
		get: function(){return _MUSIC_PLAYER_STATE_SKEEK_FORWARD;},
		set: function(val){return _MUSIC_PLAYER_STATE_SKEEK_FORWARD = val;}
	});

	var _MUSIC_PLAYER_STATE_STOPPED = null;
	Object.defineProperty(api, 'MUSIC_PLAYER_STATE_STOPPED', {
		get: function(){return _MUSIC_PLAYER_STATE_STOPPED;},
		set: function(val){return _MUSIC_PLAYER_STATE_STOPPED = val;}
	});

	var _NO_CAMERA = null;
	Object.defineProperty(api, 'NO_CAMERA', {
		get: function(){return _NO_CAMERA;},
		set: function(val){return _NO_CAMERA = val;}
	});

	var _NO_VIDEO = null;
	Object.defineProperty(api, 'NO_VIDEO', {
		get: function(){return _NO_VIDEO;},
		set: function(val){return _NO_VIDEO = val;}
	});

	var _QUALITY_HIGH = null;
	Object.defineProperty(api, 'QUALITY_HIGH', {
		get: function(){return _QUALITY_HIGH;},
		set: function(val){return _QUALITY_HIGH = val;}
	});

	var _QUALITY_LOW = null;
	Object.defineProperty(api, 'QUALITY_LOW', {
		get: function(){return _QUALITY_LOW;},
		set: function(val){return _QUALITY_LOW = val;}
	});

	var _QUALITY_MEDIUM = null;
	Object.defineProperty(api, 'QUALITY_MEDIUM', {
		get: function(){return _QUALITY_MEDIUM;},
		set: function(val){return _QUALITY_MEDIUM = val;}
	});

	var _UNKNOWN_ERROR = null;
	Object.defineProperty(api, 'UNKNOWN_ERROR', {
		get: function(){return _UNKNOWN_ERROR;},
		set: function(val){return _UNKNOWN_ERROR = val;}
	});

	var _VIDEO_CONTROL_DEFAULT = null;
	Object.defineProperty(api, 'VIDEO_CONTROL_DEFAULT', {
		get: function(){return _VIDEO_CONTROL_DEFAULT;},
		set: function(val){return _VIDEO_CONTROL_DEFAULT = val;}
	});

	var _VIDEO_CONTROL_EMBEDDED = null;
	Object.defineProperty(api, 'VIDEO_CONTROL_EMBEDDED', {
		get: function(){return _VIDEO_CONTROL_EMBEDDED;},
		set: function(val){return _VIDEO_CONTROL_EMBEDDED = val;}
	});

	var _VIDEO_CONTROL_FULLSCREEN = null;
	Object.defineProperty(api, 'VIDEO_CONTROL_FULLSCREEN', {
		get: function(){return _VIDEO_CONTROL_FULLSCREEN;},
		set: function(val){return _VIDEO_CONTROL_FULLSCREEN = val;}
	});

	var _VIDEO_CONTROL_HIDDEN = null;
	Object.defineProperty(api, 'VIDEO_CONTROL_HIDDEN', {
		get: function(){return _VIDEO_CONTROL_HIDDEN;},
		set: function(val){return _VIDEO_CONTROL_HIDDEN = val;}
	});

	var _VIDEO_CONTROL_NONE = null;
	Object.defineProperty(api, 'VIDEO_CONTROL_NONE', {
		get: function(){return _VIDEO_CONTROL_NONE;},
		set: function(val){return _VIDEO_CONTROL_NONE = val;}
	});

	var _VIDEO_CONTROL_VOLUME_ONLY = null;
	Object.defineProperty(api, 'VIDEO_CONTROL_VOLUME_ONLY', {
		get: function(){return _VIDEO_CONTROL_VOLUME_ONLY;},
		set: function(val){return _VIDEO_CONTROL_VOLUME_ONLY = val;}
	});

	var _VIDEO_FINISH_REASON_PLAYBACK_ENDED = null;
	Object.defineProperty(api, 'VIDEO_FINISH_REASON_PLAYBACK_ENDED', {
		get: function(){return _VIDEO_FINISH_REASON_PLAYBACK_ENDED;},
		set: function(val){return _VIDEO_FINISH_REASON_PLAYBACK_ENDED = val;}
	});

	var _VIDEO_FINISH_REASON_PLAYBACK_ERROR = null;
	Object.defineProperty(api, 'VIDEO_FINISH_REASON_PLAYBACK_ERROR', {
		get: function(){return _VIDEO_FINISH_REASON_PLAYBACK_ERROR;},
		set: function(val){return _VIDEO_FINISH_REASON_PLAYBACK_ERROR = val;}
	});

	var _VIDEO_FINISH_REASON_USER_EXITED = null;
	Object.defineProperty(api, 'VIDEO_FINISH_REASON_USER_EXITED', {
		get: function(){return _VIDEO_FINISH_REASON_USER_EXITED;},
		set: function(val){return _VIDEO_FINISH_REASON_USER_EXITED = val;}
	});

	var _VIDEO_LOAD_STATE_PLAYABLE = null;
	Object.defineProperty(api, 'VIDEO_LOAD_STATE_PLAYABLE', {
		get: function(){return _VIDEO_LOAD_STATE_PLAYABLE;},
		set: function(val){return _VIDEO_LOAD_STATE_PLAYABLE = val;}
	});

	var _VIDEO_LOAD_STATE_PLAYTHROUGH_OK = null;
	Object.defineProperty(api, 'VIDEO_LOAD_STATE_PLAYTHROUGH_OK', {
		get: function(){return _VIDEO_LOAD_STATE_PLAYTHROUGH_OK;},
		set: function(val){return _VIDEO_LOAD_STATE_PLAYTHROUGH_OK = val;}
	});

	var _VIDEO_LOAD_STATE_STALLED = null;
	Object.defineProperty(api, 'VIDEO_LOAD_STATE_STALLED', {
		get: function(){return _VIDEO_LOAD_STATE_STALLED;},
		set: function(val){return _VIDEO_LOAD_STATE_STALLED = val;}
	});

	var _VIDEO_LOAD_STATE_UNKNOWN = null;
	Object.defineProperty(api, 'VIDEO_LOAD_STATE_UNKNOWN', {
		get: function(){return _VIDEO_LOAD_STATE_UNKNOWN;},
		set: function(val){return _VIDEO_LOAD_STATE_UNKNOWN = val;}
	});

	var _VIDEO_MEDIA_TYPE_AUDIO = null;
	Object.defineProperty(api, 'VIDEO_MEDIA_TYPE_AUDIO', {
		get: function(){return _VIDEO_MEDIA_TYPE_AUDIO;},
		set: function(val){return _VIDEO_MEDIA_TYPE_AUDIO = val;}
	});

	var _VIDEO_MEDIA_TYPE_NONE = null;
	Object.defineProperty(api, 'VIDEO_MEDIA_TYPE_NONE', {
		get: function(){return _VIDEO_MEDIA_TYPE_NONE;},
		set: function(val){return _VIDEO_MEDIA_TYPE_NONE = val;}
	});

	var _VIDEO_MEDIA_TYPE_VIDEO = null;
	Object.defineProperty(api, 'VIDEO_MEDIA_TYPE_VIDEO', {
		get: function(){return _VIDEO_MEDIA_TYPE_VIDEO;},
		set: function(val){return _VIDEO_MEDIA_TYPE_VIDEO = val;}
	});

	var _VIDEO_PLAYBACK_STATE_INTERRUPTED = null;
	Object.defineProperty(api, 'VIDEO_PLAYBACK_STATE_INTERRUPTED', {
		get: function(){return _VIDEO_PLAYBACK_STATE_INTERRUPTED;},
		set: function(val){return _VIDEO_PLAYBACK_STATE_INTERRUPTED = val;}
	});

	var _VIDEO_PLAYBACK_STATE_PAUSED = null;
	Object.defineProperty(api, 'VIDEO_PLAYBACK_STATE_PAUSED', {
		get: function(){return _VIDEO_PLAYBACK_STATE_PAUSED;},
		set: function(val){return _VIDEO_PLAYBACK_STATE_PAUSED = val;}
	});

	var _VIDEO_PLAYBACK_STATE_PLAYING = null;
	Object.defineProperty(api, 'VIDEO_PLAYBACK_STATE_PLAYING', {
		get: function(){return _VIDEO_PLAYBACK_STATE_PLAYING;},
		set: function(val){return _VIDEO_PLAYBACK_STATE_PLAYING = val;}
	});

	var _VIDEO_PLAYBACK_STATE_SEEKING_BACKWARD = null;
	Object.defineProperty(api, 'VIDEO_PLAYBACK_STATE_SEEKING_BACKWARD', {
		get: function(){return _VIDEO_PLAYBACK_STATE_SEEKING_BACKWARD;},
		set: function(val){return _VIDEO_PLAYBACK_STATE_SEEKING_BACKWARD = val;}
	});

	var _VIDEO_PLAYBACK_STATE_SEEKING_FORWARD = null;
	Object.defineProperty(api, 'VIDEO_PLAYBACK_STATE_SEEKING_FORWARD', {
		get: function(){return _VIDEO_PLAYBACK_STATE_SEEKING_FORWARD;},
		set: function(val){return _VIDEO_PLAYBACK_STATE_SEEKING_FORWARD = val;}
	});

	var _VIDEO_PLAYBACK_STATE_STOPPED = null;
	Object.defineProperty(api, 'VIDEO_PLAYBACK_STATE_STOPPED', {
		get: function(){return _VIDEO_PLAYBACK_STATE_STOPPED;},
		set: function(val){return _VIDEO_PLAYBACK_STATE_STOPPED = val;}
	});

	var _VIDEO_REPEAT_MODE_NONE = null;
	Object.defineProperty(api, 'VIDEO_REPEAT_MODE_NONE', {
		get: function(){return _VIDEO_REPEAT_MODE_NONE;},
		set: function(val){return _VIDEO_REPEAT_MODE_NONE = val;}
	});

	var _VIDEO_REPEAT_MODE_ONE = null;
	Object.defineProperty(api, 'VIDEO_REPEAT_MODE_ONE', {
		get: function(){return _VIDEO_REPEAT_MODE_ONE;},
		set: function(val){return _VIDEO_REPEAT_MODE_ONE = val;}
	});

	var _VIDEO_SCALING_ASPECT_FILL = null;
	Object.defineProperty(api, 'VIDEO_SCALING_ASPECT_FILL', {
		get: function(){return _VIDEO_SCALING_ASPECT_FILL;},
		set: function(val){return _VIDEO_SCALING_ASPECT_FILL = val;}
	});

	var _VIDEO_SCALING_ASPECT_FIT = null;
	Object.defineProperty(api, 'VIDEO_SCALING_ASPECT_FIT', {
		get: function(){return _VIDEO_SCALING_ASPECT_FIT;},
		set: function(val){return _VIDEO_SCALING_ASPECT_FIT = val;}
	});

	var _VIDEO_SCALING_MODE_FILL = null;
	Object.defineProperty(api, 'VIDEO_SCALING_MODE_FILL', {
		get: function(){return _VIDEO_SCALING_MODE_FILL;},
		set: function(val){return _VIDEO_SCALING_MODE_FILL = val;}
	});

	var _VIDEO_SCALING_NONE = null;
	Object.defineProperty(api, 'VIDEO_SCALING_NONE', {
		get: function(){return _VIDEO_SCALING_NONE;},
		set: function(val){return _VIDEO_SCALING_NONE = val;}
	});

	var _VIDEO_SOURCE_TYPE_FILE = null;
	Object.defineProperty(api, 'VIDEO_SOURCE_TYPE_FILE', {
		get: function(){return _VIDEO_SOURCE_TYPE_FILE;},
		set: function(val){return _VIDEO_SOURCE_TYPE_FILE = val;}
	});

	var _VIDEO_SOURCE_TYPE_STREAMING = null;
	Object.defineProperty(api, 'VIDEO_SOURCE_TYPE_STREAMING', {
		get: function(){return _VIDEO_SOURCE_TYPE_STREAMING;},
		set: function(val){return _VIDEO_SOURCE_TYPE_STREAMING = val;}
	});

	var _VIDEO_SOURCE_TYPE_UNKNOWN = null;
	Object.defineProperty(api, 'VIDEO_SOURCE_TYPE_UNKNOWN', {
		get: function(){return _VIDEO_SOURCE_TYPE_UNKNOWN;},
		set: function(val){return _VIDEO_SOURCE_TYPE_UNKNOWN = val;}
	});

	var _VIDEO_TIME_OPTION_EXACT = null;
	Object.defineProperty(api, 'VIDEO_TIME_OPTION_EXACT', {
		get: function(){return _VIDEO_TIME_OPTION_EXACT;},
		set: function(val){return _VIDEO_TIME_OPTION_EXACT = val;}
	});

	var _VIDEO_TIME_OPTION_NEAREST_KEYFRAME = null;
	Object.defineProperty(api, 'VIDEO_TIME_OPTION_NEAREST_KEYFRAME', {
		get: function(){return _VIDEO_TIME_OPTION_NEAREST_KEYFRAME;},
		set: function(val){return _VIDEO_TIME_OPTION_NEAREST_KEYFRAME = val;}
	});

	var _appMusicPlayer = null;
	Object.defineProperty(api, 'appMusicPlayer', {
		get: function(){return _appMusicPlayer;},
		set: function(val){return _appMusicPlayer = val;}
	});

	var _audioLineType = null;
	Object.defineProperty(api, 'audioLineType', {
		get: function(){return _audioLineType;},
		set: function(val){return _audioLineType = val;}
	});

	var _audioPlaying = null;
	Object.defineProperty(api, 'audioPlaying', {
		get: function(){return _audioPlaying;},
		set: function(val){return _audioPlaying = val;}
	});

	var _audioSessionMode = null;
	Object.defineProperty(api, 'audioSessionMode', {
		get: function(){return _audioSessionMode;},
		set: function(val){return _audioSessionMode = val;}
	});

	var _availableCameraMediaTypes = null;
	Object.defineProperty(api, 'availableCameraMediaTypes', {
		get: function(){return _availableCameraMediaTypes;},
		set: function(val){return _availableCameraMediaTypes = val;}
	});

	var _availablePhotoGalleryMediaTypes = null;
	Object.defineProperty(api, 'availablePhotoGalleryMediaTypes', {
		get: function(){return _availablePhotoGalleryMediaTypes;},
		set: function(val){return _availablePhotoGalleryMediaTypes = val;}
	});

	var _availablePhotoMediaTypes = null;
	Object.defineProperty(api, 'availablePhotoMediaTypes', {
		get: function(){return _availablePhotoMediaTypes;},
		set: function(val){return _availablePhotoMediaTypes = val;}
	});

	var _averageMicrophonePower = null;
	Object.defineProperty(api, 'averageMicrophonePower', {
		get: function(){return _averageMicrophonePower;},
		set: function(val){return _averageMicrophonePower = val;}
	});

	var _canRecord = null;
	Object.defineProperty(api, 'canRecord', {
		get: function(){return _canRecord;},
		set: function(val){return _canRecord = val;}
	});

	var _isCameraSupported = null;
	Object.defineProperty(api, 'isCameraSupported', {
		get: function(){return _isCameraSupported;},
		set: function(val){return _isCameraSupported = val;}
	});

	var _peakMicrophonePower = null;
	Object.defineProperty(api, 'peakMicrophonePower', {
		get: function(){return _peakMicrophonePower;},
		set: function(val){return _peakMicrophonePower = val;}
	});

	var _systemMusicPlayer = null;
	Object.defineProperty(api, 'systemMusicPlayer', {
		get: function(){return _systemMusicPlayer;},
		set: function(val){return _systemMusicPlayer = val;}
	});

	var _volume = null;
	Object.defineProperty(api, 'volume', {
		get: function(){return _volume;},
		set: function(val){return _volume = val;}
	});

	// Methods
	api.beep = function(){
		console.debug('Method "Titanium.Media..beep" is not implemented yet.');
	};
	api.createAudioPlayer = function(){
		console.debug('Method "Titanium.Media..createAudioPlayer" is not implemented yet.');
	};
	api.createAudioRecorder = function(){
		console.debug('Method "Titanium.Media..createAudioRecorder" is not implemented yet.');
	};
	api.createItem = function(){
		console.debug('Method "Titanium.Media..createItem" is not implemented yet.');
	};
	api.createMusicPlayer = function(){
		console.debug('Method "Titanium.Media..createMusicPlayer" is not implemented yet.');
	};
	api.createSound = function(){
		console.debug('Method "Titanium.Media..createSound" is not implemented yet.');
	};
	api.createVideoPlayer = function(){
		console.debug('Method "Titanium.Media..createVideoPlayer" is not implemented yet.');
	};
	api.hideCamera = function(){
		console.debug('Method "Titanium.Media..hideCamera" is not implemented yet.');
	};
	api.hideMusicLibrary = function(){
		console.debug('Method "Titanium.Media..hideMusicLibrary" is not implemented yet.');
	};
	api.isMediaTypeSupported = function(){
		console.debug('Method "Titanium.Media..isMediaTypeSupported" is not implemented yet.');
	};
	api.openPhotoGallery = function(){
		console.debug('Method "Titanium.Media..openPhotoGallery" is not implemented yet.');
	};
	api.saveToPhotoGallery = function(){
		console.debug('Method "Titanium.Media..saveToPhotoGallery" is not implemented yet.');
	};
	api.showCamera = function(){
		console.debug('Method "Titanium.Media..showCamera" is not implemented yet.');
	};
	api.showMusicLibrary = function(){
		console.debug('Method "Titanium.Media..showMusicLibrary" is not implemented yet.');
	};
	api.startMicrophoneMonitor = function(){
		console.debug('Method "Titanium.Media..startMicrophoneMonitor" is not implemented yet.');
	};
	api.stopMicrophoneMonitor = function(){
		console.debug('Method "Titanium.Media..stopMicrophoneMonitor" is not implemented yet.');
	};
	api.takePicture = function(){
		console.debug('Method "Titanium.Media..takePicture" is not implemented yet.');
	};
	api.takeScreenshot = function(){
		console.debug('Method "Titanium.Media..takeScreenshot" is not implemented yet.');
	};
	api.vibrate = function(){
		console.debug('Method "Titanium.Media..vibrate" is not implemented yet.');
	};

	// Events
	api.addEventListener('linechange', function(){
		console.debug('Event "linechange" is not implemented yet.');
	});
	api.addEventListener('recordinginput', function(){
		console.debug('Event "recordinginput" is not implemented yet.');
	});
	api.addEventListener('volume', function(){
		console.debug('Event "volume" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Media'));
;
(function(api){
	Ti._5.EventDriven(api);
	// Properties
	var _currentPlaybackTime = null;
	Object.defineProperty(api, 'currentPlaybackTime', {
		get: function(){return _currentPlaybackTime;},
		set: function(val){return _currentPlaybackTime = val;}
	});

	var _nowPlaying = null;
	Object.defineProperty(api, 'nowPlaying', {
		get: function(){return _nowPlaying;},
		set: function(val){return _nowPlaying = val;}
	});

	var _playbackState = null;
	Object.defineProperty(api, 'playbackState', {
		get: function(){return _playbackState;},
		set: function(val){return _playbackState = val;}
	});

	var _repeatMode = null;
	Object.defineProperty(api, 'repeatMode', {
		get: function(){return _repeatMode;},
		set: function(val){return _repeatMode = val;}
	});

	var _shuffleMode = null;
	Object.defineProperty(api, 'shuffleMode', {
		get: function(){return _shuffleMode;},
		set: function(val){return _shuffleMode = val;}
	});

	var _volume = null;
	Object.defineProperty(api, 'volume', {
		get: function(){return _volume;},
		set: function(val){return _volume = val;}
	});

	// Methods
	api.pause = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..pause" is not implemented yet.');
	};
	api.play = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..play" is not implemented yet.');
	};
	api.seekBackward = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..seekBackward" is not implemented yet.');
	};
	api.seekForward = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..seekForward" is not implemented yet.');
	};
	api.setQueue = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..setQueue" is not implemented yet.');
	};
	api.skipToBeginning = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..skipToBeginning" is not implemented yet.');
	};
	api.skipToNext = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..skipToNext" is not implemented yet.');
	};
	api.skipToPrevious = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..skipToPrevious" is not implemented yet.');
	};
	api.stop = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..stop" is not implemented yet.');
	};
	api.stopSeeking = function(){
		console.debug('Method "Titanium.Media.MusicPlayer..stopSeeking" is not implemented yet.');
	};

	// Events
	api.addEventListener('playingChange', function(){
		console.debug('Event "playingChange" is not implemented yet.');
	});
	api.addEventListener('stateChange', function(){
		console.debug('Event "stateChange" is not implemented yet.');
	});
	api.addEventListener('volumeChange', function(){
		console.debug('Event "volumeChange" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Media.MusicPlayer'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _allowBackground = null;
	Object.defineProperty(api, 'allowBackground', {
		get: function(){return _allowBackground;},
		set: function(val){return _allowBackground = val;}
	});

	var _duration = null;
	Object.defineProperty(api, 'duration', {
		get: function(){return _duration;},
		set: function(val){return _duration = val;}
	});

	var _looping = null;
	Object.defineProperty(api, 'looping', {
		get: function(){return _looping;},
		set: function(val){return _looping = val;}
	});

	var _paused = null;
	Object.defineProperty(api, 'paused', {
		get: function(){return _paused;},
		set: function(val){return _paused = val;}
	});

	var _playing = null;
	Object.defineProperty(api, 'playing', {
		get: function(){return _playing;},
		set: function(val){return _playing = val;}
	});

	var _time = null;
	Object.defineProperty(api, 'time', {
		get: function(){return _time;},
		set: function(val){return _time = val;}
	});

	var _url = null;
	Object.defineProperty(api, 'url', {
		get: function(){return _url;},
		set: function(val){return _url = val;}
	});

	var _volume = null;
	Object.defineProperty(api, 'volume', {
		get: function(){return _volume;},
		set: function(val){return _volume = val;}
	});

	// Methods
	api.getTime = function(){
		console.debug('Method "Titanium.Media.Sound..getTime" is not implemented yet.');
	};
	api.getVolume = function(){
		console.debug('Method "Titanium.Media.Sound..getVolume" is not implemented yet.');
	};
	api.isLooping = function(){
		console.debug('Method "Titanium.Media.Sound..isLooping" is not implemented yet.');
	};
	api.isPaused = function(){
		console.debug('Method "Titanium.Media.Sound..isPaused" is not implemented yet.');
	};
	api.isPlaying = function(){
		console.debug('Method "Titanium.Media.Sound..isPlaying" is not implemented yet.');
	};
	api.pause = function(){
		console.debug('Method "Titanium.Media.Sound..pause" is not implemented yet.');
	};
	api.play = function(){
		console.debug('Method "Titanium.Media.Sound..play" is not implemented yet.');
	};
	api.release = function(){
		console.debug('Method "Titanium.Media.Sound..release" is not implemented yet.');
	};
	api.reset = function(){
		console.debug('Method "Titanium.Media.Sound..reset" is not implemented yet.');
	};
	api.setLooping = function(){
		console.debug('Method "Titanium.Media.Sound..setLooping" is not implemented yet.');
	};
	api.setPaused = function(){
		console.debug('Method "Titanium.Media.Sound..setPaused" is not implemented yet.');
	};
	api.setTime = function(){
		console.debug('Method "Titanium.Media.Sound..setTime" is not implemented yet.');
	};
	api.setVolume = function(){
		console.debug('Method "Titanium.Media.Sound..setVolume" is not implemented yet.');
	};
	api.stop = function(){
		console.debug('Method "Titanium.Media.Sound..stop" is not implemented yet.');
	};

	// Events
	api.addEventListener('complete', function(){
		console.debug('Event "complete" is not implemented yet.');
	});
	api.addEventListener('error', function(){
		console.debug('Event "error" is not implemented yet.');
	});
	api.addEventListener('interrupted', function(){
		console.debug('Event "interrupted" is not implemented yet.');
	});
	api.addEventListener('resume', function(){
		console.debug('Event "resume" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Media.Sound'));
;
Ti._5.createClass('Titanium.Media.VideoPlayer', function(api){
    var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'VideoPlayer');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _autoplay = null;
	Object.defineProperty(this, 'autoplay', {
		get: function(){return _autoplay;},
		set: function(val){return _autoplay = val;}
	});

	var _contentURL = null;
	Object.defineProperty(this, 'contentURL', {
		get: function(){return _contentURL;},
		set: function(val){return _contentURL = val;}
	});

	var _duration = null;
	Object.defineProperty(this, 'duration', {
		get: function(){return _duration;},
		set: function(val){return _duration = val;}
	});

	var _endPlaybackTime = null;
	Object.defineProperty(this, 'endPlaybackTime', {
		get: function(){return _endPlaybackTime;},
		set: function(val){return _endPlaybackTime = val;}
	});

	var _fullscreen = null;
	Object.defineProperty(this, 'fullscreen', {
		get: function(){return _fullscreen;},
		set: function(val){return _fullscreen = val;}
	});

	var _initialPlaybackTime = null;
	Object.defineProperty(this, 'initialPlaybackTime', {
		get: function(){return _initialPlaybackTime;},
		set: function(val){return _initialPlaybackTime = val;}
	});

	var _loadState = null;
	Object.defineProperty(this, 'loadState', {
		get: function(){return _loadState;},
		set: function(val){return _loadState = val;}
	});

	var _media = null;
	Object.defineProperty(this, 'media', {
		get: function(){return _media;},
		set: function(val){return _media = val;}
	});

	var _mediaControlStyle = null;
	Object.defineProperty(this, 'mediaControlStyle', {
		get: function(){return _mediaControlStyle;},
		set: function(val){return _mediaControlStyle = val;}
	});

	var _mediaTypes = null;
	Object.defineProperty(this, 'mediaTypes', {
		get: function(){return _mediaTypes;},
		set: function(val){return _mediaTypes = val;}
	});

	var _movieControlMode = null;
	Object.defineProperty(this, 'movieControlMode', {
		get: function(){return _movieControlMode;},
		set: function(val){return _movieControlMode = val;}
	});

	var _naturalSize = null;
	Object.defineProperty(this, 'naturalSize', {
		get: function(){return _naturalSize;},
		set: function(val){return _naturalSize = val;}
	});

	var _playableDuration = null;
	Object.defineProperty(this, 'playableDuration', {
		get: function(){return _playableDuration;},
		set: function(val){return _playableDuration = val;}
	});

	var _playbackState = null;
	Object.defineProperty(this, 'playbackState', {
		get: function(){return _playbackState;},
		set: function(val){return _playbackState = val;}
	});

	var _playing = null;
	Object.defineProperty(this, 'playing', {
		get: function(){return _playing;},
		set: function(val){return _playing = val;}
	});

	var _repeatMode = null;
	Object.defineProperty(this, 'repeatMode', {
		get: function(){return _repeatMode;},
		set: function(val){return _repeatMode = val;}
	});

	var _scalingMode = null;
	Object.defineProperty(this, 'scalingMode', {
		get: function(){return _scalingMode;},
		set: function(val){return _scalingMode = val;}
	});

	var _sourceType = null;
	Object.defineProperty(this, 'sourceType', {
		get: function(){return _sourceType;},
		set: function(val){return _sourceType = val;}
	});

	var _url = null;
	Object.defineProperty(this, 'url', {
		get: function(){return _url;},
		set: function(val){return _url = val;}
	});

	var _useApplicationAudioSession = null;
	Object.defineProperty(this, 'useApplicationAudioSession', {
		get: function(){return _useApplicationAudioSession;},
		set: function(val){return _useApplicationAudioSession = val;}
	});

	// Methods
	this.cancelAllThumbnailImageRequests = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..cancelAllThumbnailImageRequests" is not implemented yet.');
	};
	this.pause = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..pause" is not implemented yet.');
	};
	this.play = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..play" is not implemented yet.');
	};
	this.release = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..release" is not implemented yet.');
	};
	this.requestThumbnailImagesAtTimes = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..requestThumbnailImagesAtTimes" is not implemented yet.');
	};
	this.setBackgroundView = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..setBackgroundView" is not implemented yet.');
	};
	this.setMedia = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..setMedia" is not implemented yet.');
	};
	this.setUrl = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..setUrl" is not implemented yet.');
	};
	this.stop = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..stop" is not implemented yet.');
	};
	this.thumbnailImageAtTime = function(){
		console.debug('Method "Titanium.Media.VideoPlayer..thumbnailImageAtTime" is not implemented yet.');
	};

	// Events
	this.addEventListener('complete', function(){
		console.debug('Event "complete" is not implemented yet.');
	});
	this.addEventListener('durationAvailable', function(){
		console.debug('Event "durationAvailable" is not implemented yet.');
	});
	this.addEventListener('error', function(){
		console.debug('Event "error" is not implemented yet.');
	});
	this.addEventListener('fullscreen', function(){
		console.debug('Event "fullscreen" is not implemented yet.');
	});
	this.addEventListener('load', function(){
		console.debug('Event "load" is not implemented yet.');
	});
	this.addEventListener('loadstate', function(){
		console.debug('Event "loadstate" is not implemented yet.');
	});
	this.addEventListener('mediaTypesAvailable', function(){
		console.debug('Event "mediaTypesAvailable" is not implemented yet.');
	});
	this.addEventListener('naturalSizeAvailable', function(){
		console.debug('Event "naturalSizeAvailable" is not implemented yet.');
	});
	this.addEventListener('playbackState', function(){
		console.debug('Event "playbackState" is not implemented yet.');
	});
	this.addEventListener('playing', function(){
		console.debug('Event "playing" is not implemented yet.');
	});
	this.addEventListener('preload', function(){
		console.debug('Event "preload" is not implemented yet.');
	});
	this.addEventListener('resize', function(){
		console.debug('Event "resize" is not implemented yet.');
	});
	this.addEventListener('sourceChange', function(){
		console.debug('Event "sourceChange" is not implemented yet.');
	});
	this.addEventListener('thumbnail', function(){
		console.debug('Event "thumbnail" is not implemented yet.');
	});
});
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	var _domain = null;
	Object.defineProperty(api, 'domain', {
		get: function(){return _domain;},
		set: function(val){return _domain = val;}
	});

	var _isSearching = null;
	Object.defineProperty(api, 'isSearching', {
		get: function(){return _isSearching;},
		set: function(val){return _isSearching = val;}
	});

	var _serviceType = null;
	Object.defineProperty(api, 'serviceType', {
		get: function(){return _serviceType;},
		set: function(val){return _serviceType = val;}
	});

	// Methods
	api.search = function(){
		console.debug('Method "Titanium.Network.BonjourBrowser..search" is not implemented yet.');
	};
	api.stopSearch = function(){
		console.debug('Method "Titanium.Network.BonjourBrowser..stopSearch" is not implemented yet.');
	};

	// Events
	api.addEventListener('event', function(){
		console.debug('Event "event" is not implemented yet.');
	});
	api.addEventListener('services', function(){
		console.debug('Event "services" is not implemented yet.');
	});
	api.addEventListener('updatedServices', function(){
		console.debug('Event "updatedServices" is not implemented yet.');
	});
})(Ti._5.createClass('Titanium.Network.BonjourBrowser'));
;
(function(api){
	// Properties
	var _domain = null;
	Object.defineProperty(api, 'domain', {
		get: function(){return _domain;},
		set: function(val){return _domain = val;}
	});

	var _isLocal = null;
	Object.defineProperty(api, 'isLocal', {
		get: function(){return _isLocal;},
		set: function(val){return _isLocal = val;}
	});

	var _name = null;
	Object.defineProperty(api, 'name', {
		get: function(){return _name;},
		set: function(val){return _name = val;}
	});

	var _socket = null;
	Object.defineProperty(api, 'socket', {
		get: function(){return _socket;},
		set: function(val){return _socket = val;}
	});

	var _type = null;
	Object.defineProperty(api, 'type', {
		get: function(){return _type;},
		set: function(val){return _type = val;}
	});

	// Methods
	api.publish = function(){
		console.debug('Method "Titanium.Network.BonjourService..publish" is not implemented yet.');
	};
	api.resolve = function(){
		console.debug('Method "Titanium.Network.BonjourService..resolve" is not implemented yet.');
	};
	api.stop = function(){
		console.debug('Method "Titanium.Network.BonjourService..stop" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Network.BonjourService'));
;
Ti._5.createClass('Titanium.Network.HTTPClient', function(args){
	var obj = this;
	// Interfaces
	var _xhr = new XMLHttpRequest(); 
	//_xhr.overrideMimeType('text/xml');
	var _requestComplete = false;
	
	var _callErrorFunc = function(error) {
		_responseText = '';
		_responseXML = '';
		_responseData = '';
		if ('object' != typeof error) {
			error = {message : error};
		}
		if (!error.error) {
			error.error = error.message ? error.message : _xhr.status;
		}
		if (0 == parseInt(error.error)) {
			error.error = "Can`t reach host";
		}
		if ('function' == typeof _onerror) {
			_onerror(error);
		}
	};
	_xhr.ontimeout = function(error) {
		_callErrorFunc(error);
	};
	_xhr.onreadystatechange = function() {
		_readyState = _xhr.readyState;
		_status = null;
		
		if ('function' == typeof _onreadystatechange) {
			_onreadystatechange();
		}
		if (_xhr.readyState == 4) {
			_status = _xhr.status;
			if (_xhr.status == 200) {
				_connected = true;
				_responseText = _xhr.responseText;
				_responseXML = _xhr.responseXML;
				_responseData = _xhr.responceHeader;
				if ('function' == typeof _onload) {
					_onload();
				}
			} else {
				_connected = false;
			}
			_requestComplete = true;
		}
	};
	//*
	_xhr.addEventListener("error", function(error) {
		_callErrorFunc(error);
	}, false);
	/*
	_xhr.upload.addEventListener("error", function(error) {
		_callErrorFunc(error);
	});
	//*/
	_xhr.addEventListener("progress", function(evt) {
		if (evt.lengthComputable) {
			evt.progress = evt.loaded / evt.total;
		} else {
			// Unable to compute progress information since the total size is unknown
			evt.progress = false;
		}
		if ('function' == typeof _onsendstream) {
			_ondatastream(evt);
		}
	}, false);
	_xhr.upload.addEventListener("progress", function(evt) {
		if (evt.lengthComputable) {
			evt.progress = evt.loaded / evt.total;
		} else {
			// Unable to compute progress information since the total size is unknown
			evt.progress = false;
		}
		if ('function' == typeof _onsendstream) {
			_onsendstream(evt);
		}
	}, false);
	
	// Properties
	Object.defineProperty(this, 'DONE', {
		get: function() {return _xml.DONE;},
		set: function(val) { ; /* Do nothing  */ }
	});

	Object.defineProperty(this, 'HEADERS_RECEIVED', {
		get: function(){return _xml.HEADERS_RECEIVED;},
		set: function(val) { ; /* Do nothing  */ }
	});

	Object.defineProperty(this, 'LOADING', {
		get: function(){return _xml.LOADING;},
		set: function(val) { ; /* Do nothing  */ }
	});

	Object.defineProperty(this, 'OPENED', {
		get: function(){return _xml.OPENED;},
		set: function(val) { ; /* Do nothing  */ }
	});

	Object.defineProperty(this, 'UNSENT', {
		get: function(){return _xml.UNSENT;},
		_set: function(val) { ; /* Do nothing  */ }
	});

	var _connected = false;
	Object.defineProperty(this, 'connected', {
		get: function() {return _connected;},
		set: function(val) {return _connected = val;}
	});

	var _connectionType = null;
	Object.defineProperty(this, 'connectionType', {
		get: function() {return _connectionType;},
		set: function(val) {return _connectionType = val;}
	});

	var _file = null;
	Object.defineProperty(this, 'file', { 
		get: function() {return _file;},
		set: function(val) {return _file = val;}
	});

	var _location = null;
	Object.defineProperty(this, 'location', {
		get: function(){return _location;},
		set: function(val){return _location = val;}
	});

	var _ondatastream = null;
	Object.defineProperty(this, 'ondatastream', {
		get: function() {return _ondatastream;},
		set: function(val) {return _ondatastream = val;}
	});

	var _onerror = null;
	Object.defineProperty(this, 'onerror', {
		get: function() {return _onerror;},
		set: function(val) {return _onerror = val;}
	});

	var _onload = null;
	Object.defineProperty(this, 'onload', {
		get: function() {return _onload;},
		set: function(val) {return _onload = val;}
	});

	var _onreadystatechange = null;
	Object.defineProperty(this, 'onreadystatechange', {
		get: function() {return _onreadystatechange;},
		set: function(val) {return _onreadystatechange = val;}
	});

	var _onsendstream = null;
	Object.defineProperty(this, 'onsendstream', {
		get: function() {return _onsendstream;},
		set: function(val) {return _onsendstream = val;}
	});

	var _readyState = null;
	Object.defineProperty(this, 'readyState', {
		get: function()  {return _readyState;},
		set: function(val) {return _readyState = val;}
	});

	var _responseHeader = null;
	Object.defineProperty(this, 'responseData', {
		get: function(){return _responseHeader;},
		set: function(val){return _responseHeader = val;}
	});

	var _responseText = null;
	Object.defineProperty(this, 'responseText', {
		get: function() {return _responseText;},
		set: function(val) {return _responseText = val;}
	});

	var _responseXML = null;
	Object.defineProperty(this, 'responseXML', {
		get: function() {return _responseXML;},
		set: function(val) {return _responseXML = val;}
	});

	var _status = null;
	Object.defineProperty(this, 'status', {
		get: function() {return _status;},
		set: function(val) {return _status = val;}
	});

	_xhr.timeout = 60000; // Default timeout = 1 minute
	Object.defineProperty(this, 'timeout', {
		get: function() {return _xhr.timeout;},
		set: function(val) {return _xhr.timeout = val;}
	});

	var _validatesSecureCertificate = false; 
	Object.defineProperty(this, 'validatesSecureCertificate', {
		get: function() {return _validatesSecureCertificate;},
		set: function(val) {return _validatesSecureCertificate = val;}
	});

	// Methods
	this.abort = function() {
		_xhr.abort();
	};
	this.getResponseHeader = function(name) {
		return _xhr.getResponseHeader(name);
	};
	this.open = function(method, url, async) {
		_requestComplete = false;
		_connectionType = method;
		_location = Ti._5.getAbsolutePath(url);
		if ('undefined' == typeof async) {
			async = true;
		}
		_xhr.open(_connectionType,_location,async);
		_xhr.setRequestHeader("UserAgent","Appcelerator Titanium/__TI_VERSION__ ("+navigator.userAgent+")");
		_xhr.setRequestHeader("Access-Control-Allow-Origin","*");
		_xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	};
	this.send = function(args){
		_requestComplete = false;
		_responseText = '';
		_responseXML = '';
		_responseData = '';
		try {
			_xhr.send(args ? args : null);
		} catch (error) {
			_callErrorFunc(error);
		}
	};
	this.setRequestHeader = function(label,value) {
		_xhr.setRequestHeader(label,value);
	};
	this.setTimeout = function(timeout) {
		if ('undefined' == typeof timeout) {
			timeout = _timeout;
		}
		setTimeout(function(){
			if (!_requestComplete){
				_xhr.abort();
				_callErrorFunc("Request was aborted");
			}
		}, timeout);
	};
});

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);

	// Properties
	api.INADDR_ANY = null;
	api.NETWORK_LAN = 1;
	api.NETWORK_MOBILE = 3;
	api.NETWORK_NONE = 0;
	api.NETWORK_UNKNOWN = -1;
	api.NETWORK_WIFI = 2;
	api.NOTIFICATION_TYPE_ALERT = null;
	api.NOTIFICATION_TYPE_BADGE = null;
	api.NOTIFICATION_TYPE_SOUND = null;
	api.READ_MODE = 0;
	api.READ_WRITE_MODE = 2;
	api.WRITE_MODE = 1;
	
	var _networkType = navigator.onLine ? api.NETWORK_UNKNOWN : api.NETWORK_NONE;
	Object.defineProperty(api, 'networkType', {
		get: function() {return _networkType},
		set: function(val) {
			_networkType = val;
		}
	});
	
	var _networkTypeName = '';
	Object.defineProperty(api, 'networkTypeName', {
		get: function() {return _networkTypeName},
		set: function(val) {
			_networkTypeName = val;
		}
	});
		
	var _online = navigator.onLine;
	Object.defineProperty(api, 'online', {
		get: function() {return _online},
		set: function(val) {
			_online = val;
		}
	});
	// IPhone
	api.remoteDeviceUUID = null;
	// IPhone
	api.remoteNotificationTypes = null;
	// IPhone
	api.remoteNotificationsEnabled = null;

	// Methods
	api.createHTTPClient = function(args) {
		return new Ti.Network.HTTPClient(args);
	};
	// Deprecated
	api.addConnectivityListener = function(){
		console.debug('Method "Titanium.Network.addConnectivityListener" is not implemented yet.');
	};
	api.createBonjourBrowser = function(args) {
		console.debug('Method "Titanium.Network.createBonjourBrowser" is not implemented yet.');
	};
	api.createBonjourService = function(args) {
		console.debug('Method "Titanium.Network.createBonjourService" is not implemented yet.');
	};
	api.createTCPSocket = function(args){
		return new Ti.Network.TCPSocket(args);
	};
	api.decodeURIComponent = function(value) {
		return decodeURIComponent(value);
	};
	api.encodeURIComponent = function(value) {
		return encodeURIComponent(value);
	};
	
	// IPhone only
	api.registerForPushNotifications = function(){
		console.debug('Method "Titanium.Network.registerForPushNotifications" is not implemented yet.');
	};
	// Deprecated
	api.removeConnectivityListener = function(){
		console.debug('Method "Titanium.Network.removeConnectivityListener" is not implemented yet.');
	};

	// Events
	window.addEventListener('online', function(event) {
		var oEvent = {
			networkType		: api.networkType,
			networkTypeName	: api.networkTypeName,
			online			: true,
			source			: event.target,
			type			: event.type
		};
		if (!api.online) {
			api.fireEvent('change', oEvent);
		}
		api.online = true;
	}, false);
	
	window.addEventListener('offline', function(event) {
		var oEvent = {
			networkType		: api.networkType,
			networkTypeName	: api.networkTypeName,
			online			: false,
			source			: event.target,
			type			: event.type
		};
		if (!api.online) {
			api.fireEvent('change', oEvent);
		}
		if (api.online) {
			api.fireEvent('change', oEvent);
		}
		api.online = false;
	}, false);
})(Ti._5.createClass('Ti.Network'));

;
Ti._5.createClass('Titanium.Network.TCPSocket', function(args){
	var obj = this;
	var _socket = null;
	
	// Properties
	var _hostName = '';
	Object.defineProperty(api, 'hostName', {
		get: function(){return _hostName;},
		set: function(val){_hostName = val;}
	});
	obj.hostName = args && args[0] ? args[0] : '';

	Object.defineProperty(api, 'isValid', {
		get: function() {return _socket && _socket.close ? true : false;},
		set: function(val){ ; /* Do nothing  */}
	});

	var _mode = 0;
	Object.defineProperty(api, 'mode', {
		get: function(){return _mode;},
		set: function(val){_mode = val ? val : Titanium.Network.READ_WRITE_MODE;}
	});
	obj.mode =  args && args[2] ? args[2] : 0;

	var _port = 0;
	Object.defineProperty(api, 'port', {
		get: function(){return _port;},
		set: function(val){_port = val ? val : 81;}
	});
	obj.port =  args && args[1] ? args[1] : 0;

	var _stripTerminator = false;
	Object.defineProperty(api, 'stripTerminator', {
		get: function(){return _stripTerminator;},
		set: function(val){return _stripTerminator = val;}
	});

	// Methods
	api.close = function(){
		_socket.close();
	};
	api.connect = function(){
		var full = obj.hostName.split('/');
		var host = full[0], path = [];
		for (var iCounter = 1; iCounter < full.length; iCounter++) {
			path.push(full[iCounter]);
		}
		_socket = new WebSocket("ws://"+host+":"+obj.port+"/"+path.join("/"));
	};
	api.listen = function(){
		_socket.addEventListener("message", function(event) {
			var oEvent = {
				data		: event && event.data ? event.data : null, 
				from		: _socket,
				source		: event.target,
				type		: event.type
			};
			obj.fireEvent('read', oEvent);
		}, false);
	};
	api.write = function(val){
		if (_socket && _socket.send) {
			_socket.send(val); 
		} else {
			obj.fireEvent("writeError", {
				code		: 0, 
				error		: 'Sockets does not supported',
				source		: obj,
				type		: ''
			});
		}
	};

	// Events
	var _errorSet = false;
	api.addEventListener('error', function(event){
		var oEvent = {
			code		: 0, 
			error		: event.description, 
			source		: event.target,
			type		: event.type
		};
		obj.fireEvent('readError', oEvent);
		obj.fireEvent('writeError', oEvent);
	});
});
;
(function(api){
	// Properties
	var _density = null;
	Object.defineProperty(api, 'density', {
		get: function(){
			switch (navigator.userAgent.toLowerCase()) {
				case 'iphone':
					return 'medium';
				case 'ipad':
					return 'medium';
				default:
					return '';
			}
		},
		set: function(val){return false;}
	});

	var _dpi = null;
	Object.defineProperty(api, 'dpi', {
		get: function(){
			switch (navigator.userAgent.toLowerCase()) {
				case 'iphone':
					return 160;
				case 'ipad':
					return 130;
				default:
					return 0;
			}
		},
		set: function(val){return false;}
	});

	Object.defineProperty(api, 'platformHeight', {
		get: function(){return window.innerHeight;},
		set: function(val){return false;}
	});

	Object.defineProperty(api, 'platformWidth', {
		get: function(){return window.innerWidth;},
		set: function(val){return false;}
	});

})(Ti._5.createClass('Titanium.Platform.DisplayCaps'));
;
Ti._5.createClass('Titanium.UI.2DMatrix', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, '2dmatrix', args, '2DMatrix');
	// Methods
	this.invert = function(){
		console.debug('Method "Titanium.UI.2DMatrix#.invert" is not implemented yet.');
	};
	this.multiply = function(){
		console.debug('Method "Titanium.UI.2DMatrix#.multiply" is not implemented yet.');
	};
	this.rotate = function(){
		console.debug('Method "Titanium.UI.2DMatrix#.rotate" is not implemented yet.');
	};
	this.scale = function(){
		console.debug('Method "Titanium.UI.2DMatrix#.scale" is not implemented yet.');
	};
	this.translate = function(){
		console.debug('Method "Titanium.UI.2DMatrix#.translate" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.3DMatrix', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, '3dmatrix', args, '3DMatrix');
	// Methods
	this.invert = function(){
		console.debug('Method "Titanium.UI.3DMatrix#.invert" is not implemented yet.');
	};
	this.multiply = function(){
		console.debug('Method "Titanium.UI.3DMatrix#.multiply" is not implemented yet.');
	};
	this.rotate = function(){
		console.debug('Method "Titanium.UI.3DMatrix#.rotate" is not implemented yet.');
	};
	this.scale = function(){
		console.debug('Method "Titanium.UI.3DMatrix#.scale" is not implemented yet.');
	};
	this.translate = function(){
		console.debug('Method "Titanium.UI.3DMatrix#.translate" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.ActivityIndicator', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'activityindicator', args, 'ActivityIndicator');

	// Properties
	var _color = null;
	Object.defineProperty(this, 'color', {
		get: function(){return _color;},
		set: function(val){return _color = val;}
	});

	var _message = null;
	Object.defineProperty(this, 'message', {
		get: function(){return _message;},
		set: function(val){return _message = val;}
	});

	var _messageid = null;
	Object.defineProperty(this, 'messageid', {
		get: function(){return _messageid;},
		set: function(val){return _messageid = val;}
	});

	var _style = null;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});

	// Methods
	this.hide = function(){
		console.debug('Method "Titanium.UI.ActivityIndicator#.hide" is not implemented yet.');
	};
	this.show = function(){
		console.debug('Method "Titanium.UI.ActivityIndicator#.show" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.AlertDialog', function(args){
	var obj = this;
	var _type = 'alert';
	// Interfaces
	//Ti._5.DOMView(this, 'alertdialog', args, 'AlertDialog');
	Ti._5.EventDriven(this);
	this.add = function (arg) { ; };
	this.render = function(parent) { ; };
	this.layout = null;

	// Properties
	var _buttonNames = null;
	Object.defineProperty(this, 'buttonNames', {
		get: function(){return _buttonNames;},
		set: function(val) {
			if(val) {
				_type = 'dialog';	
				_buttonNames = val;
			}
		}
	});

	var _cancel = null;
	Object.defineProperty(this, 'cancel', {
		get: function(){return _cancel;},
		set: function(val){
			if(parseInt(val) == val) {
				_type = 'dialog';	
				_cancel = val;
			}
		}
	});

	var _message = '';
	Object.defineProperty(this, 'message', {
		get: function(){return _message;},
		set: function(val){return _message = val;}
	});

	var _messageid = null;
	Object.defineProperty(this, 'messageid', {
		get: function(){return _messageid;},
		set: function(val){return _messageid = val;}
	});

	var _title = null;
	Object.defineProperty(this, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});
	
	Ti._5.preset(this, ["buttonNames", "cancel", "message"], args);
	Ti._5.presetUserDefinedElements(this, args);

	// Methods
	this.hide = function(){
		console.debug('Method "Titanium.UI.AlertDialog#.hide" is not implemented yet.');
	};
	this.show = function(){
		var isConfirm = true;
		if ('alert' == _type) {
			alert(obj.message);
		} else {
			isConfirm = confirm(obj.message);
		}
		obj.fireEvent('click', {
			cancel	: isConfirm,
			index	: isConfirm ? 0 : 1,
			source	: obj,
			type	: 'click'
		});
	};
});
;
Ti._5.createClass('Titanium.UI.Android', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'android', args, 'Android');

	// Properties
	api.SWITCH_STYLE_CHECKBOX = 1;
	api.SWITCH_STYLE_TOGGLEBUTTON = 2;

	var _LINKIFY_ALL = null;
	Object.defineProperty(this, 'LINKIFY_ALL', {
		get: function(){return _LINKIFY_ALL;},
		set: function(val){return _LINKIFY_ALL = val;}
	});

	var _LINKIFY_EMAIL_ADDRESSES = null;
	Object.defineProperty(this, 'LINKIFY_EMAIL_ADDRESSES', {
		get: function(){return _LINKIFY_EMAIL_ADDRESSES;},
		set: function(val){return _LINKIFY_EMAIL_ADDRESSES = val;}
	});

	var _LINKIFY_MAP_ADDRESSES = null;
	Object.defineProperty(this, 'LINKIFY_MAP_ADDRESSES', {
		get: function(){return _LINKIFY_MAP_ADDRESSES;},
		set: function(val){return _LINKIFY_MAP_ADDRESSES = val;}
	});

	var _LINKIFY_MAP_LINKS = null;
	Object.defineProperty(this, 'LINKIFY_MAP_LINKS', {
		get: function(){return _LINKIFY_MAP_LINKS;},
		set: function(val){return _LINKIFY_MAP_LINKS = val;}
	});

	var _LINKIFY_PHONE_NUMBERS = null;
	Object.defineProperty(this, 'LINKIFY_PHONE_NUMBERS', {
		get: function(){return _LINKIFY_PHONE_NUMBERS;},
		set: function(val){return _LINKIFY_PHONE_NUMBERS = val;}
	});

	var _LINKIFY_WEB_URLS = null;
	Object.defineProperty(this, 'LINKIFY_WEB_URLS', {
		get: function(){return _LINKIFY_WEB_URLS;},
		set: function(val){return _LINKIFY_WEB_URLS = val;}
	});

	var _SOFT_INPUT_ADJUST_PAN = null;
	Object.defineProperty(this, 'SOFT_INPUT_ADJUST_PAN', {
		get: function(){return _SOFT_INPUT_ADJUST_PAN;},
		set: function(val){return _SOFT_INPUT_ADJUST_PAN = val;}
	});

	var _SOFT_INPUT_ADJUST_RESIZE = null;
	Object.defineProperty(this, 'SOFT_INPUT_ADJUST_RESIZE', {
		get: function(){return _SOFT_INPUT_ADJUST_RESIZE;},
		set: function(val){return _SOFT_INPUT_ADJUST_RESIZE = val;}
	});

	var _SOFT_INPUT_ADJUST_UNSPECIFIED = null;
	Object.defineProperty(this, 'SOFT_INPUT_ADJUST_UNSPECIFIED', {
		get: function(){return _SOFT_INPUT_ADJUST_UNSPECIFIED;},
		set: function(val){return _SOFT_INPUT_ADJUST_UNSPECIFIED = val;}
	});

	var _SOFT_INPUT_STATE_HIDDEN = null;
	Object.defineProperty(this, 'SOFT_INPUT_STATE_HIDDEN', {
		get: function(){return _SOFT_INPUT_STATE_HIDDEN;},
		set: function(val){return _SOFT_INPUT_STATE_HIDDEN = val;}
	});

	var _SOFT_INPUT_STATE_UNSPECIFIED = null;
	Object.defineProperty(this, 'SOFT_INPUT_STATE_UNSPECIFIED', {
		get: function(){return _SOFT_INPUT_STATE_UNSPECIFIED;},
		set: function(val){return _SOFT_INPUT_STATE_UNSPECIFIED = val;}
	});

	var _SOFT_INPUT_STATE_VISIBLE = null;
	Object.defineProperty(this, 'SOFT_INPUT_STATE_VISIBLE', {
		get: function(){return _SOFT_INPUT_STATE_VISIBLE;},
		set: function(val){return _SOFT_INPUT_STATE_VISIBLE = val;}
	});

	var _SOFT_KEYBOARD_DEFAULT_ON_FOCUS = null;
	Object.defineProperty(this, 'SOFT_KEYBOARD_DEFAULT_ON_FOCUS', {
		get: function(){return _SOFT_KEYBOARD_DEFAULT_ON_FOCUS;},
		set: function(val){return _SOFT_KEYBOARD_DEFAULT_ON_FOCUS = val;}
	});

	var _SOFT_KEYBOARD_HIDE_ON_FOCUS = null;
	Object.defineProperty(this, 'SOFT_KEYBOARD_HIDE_ON_FOCUS', {
		get: function(){return _SOFT_KEYBOARD_HIDE_ON_FOCUS;},
		set: function(val){return _SOFT_KEYBOARD_HIDE_ON_FOCUS = val;}
	});

	var _SOFT_KEYBOARD_SHOW_ON_FOCUS = null;
	Object.defineProperty(this, 'SOFT_KEYBOARD_SHOW_ON_FOCUS', {
		get: function(){return _SOFT_KEYBOARD_SHOW_ON_FOCUS;},
		set: function(val){return _SOFT_KEYBOARD_SHOW_ON_FOCUS = val;}
	});

	// Methods
	this.hideSoftKeyboard = function(){
		console.debug('Method "Titanium.UI.Android#.hideSoftKeyboard" is not implemented yet.');
	};
	this.openPreferences = function(){
		console.debug('Method "Titanium.UI.Android#.openPreferences" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.Animation', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'animation', args, 'Animation');
	Ti._5.Positionable(this, args);

	// Properties
	var _autoreverse = null;
	Object.defineProperty(this, 'autoreverse', {
		get: function(){return _autoreverse;},
		set: function(val){return _autoreverse = val;}
	});

	var _backgroundColor = null;
	Object.defineProperty(this, 'backgroundColor', {
		get: function(){return _backgroundColor;},
		set: function(val){return _backgroundColor = val;}
	});

	var _color = null;
	Object.defineProperty(this, 'color', {
		get: function(){return _color;},
		set: function(val){return _color = val;}
	});

	var _curve = null;
	Object.defineProperty(this, 'curve', {
		get: function(){return _curve;},
		set: function(val){return _curve = val;}
	});

	var _delay = null;
	Object.defineProperty(this, 'delay', {
		get: function(){return _delay;},
		set: function(val){return _delay = val;}
	});

	var _duration = null;
	Object.defineProperty(this, 'duration', {
		get: function(){return _duration;},
		set: function(val){return _duration = val;}
	});

	var _opacity = null;
	Object.defineProperty(this, 'opacity', {
		get: function(){return _opacity;},
		set: function(val){return _opacity = val;}
	});

	var _opaque = null;
	Object.defineProperty(this, 'opaque', {
		get: function(){return _opaque;},
		set: function(val){return _opaque = val;}
	});

	var _repeat = null;
	Object.defineProperty(this, 'repeat', {
		get: function(){return _repeat;},
		set: function(val){return _repeat = val;}
	});

	var _transform = null;
	Object.defineProperty(this, 'transform', {
		get: function(){return _transform;},
		set: function(val){return _transform = val;}
	});

	var _transition = null;
	Object.defineProperty(this, 'transition', {
		get: function(){return _transition;},
		set: function(val){return _transition = val;}
	});

	var _visible = null;
	Object.defineProperty(this, 'visible', {
		get: function(){return _visible;},
		set: function(val){return _visible = val;}
	});

	var _zIndex = null;
	Object.defineProperty(this, 'zIndex', {
		get: function(){return _zIndex;},
		set: function(val){return _zIndex = val;}
	});


	// Events
	this.addEventListener('complete', function(){
		console.debug('Event "complete" is not implemented yet.');
	});
	this.addEventListener('start', function(){
		console.debug('Event "start" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
(function(api){
	api.setBackgroundColor = function(args) {
		onloaded(function()
		{
			document.body.style.backgroundColor = args;
		});
	};
})(Ti.UI);

;
Ti._5.createClass('Titanium.UI.Button', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'button', args, 'Button');
	Ti._5.Clickable(this);
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _title = '';
	Object.defineProperty(this, 'title', {
		get: function() {return _title ? _title : obj.dom.innerHTML;},
		set: function(val) {
			//obj._innerContainer.dom.innerHTML = val;
			var sImg = obj.image;
			_title = val;
			if (sImg) {
				obj.dom.innerHTML = '';
				//obj._image = null;
				obj.image = sImg;
				obj.dom.innerHTML += val;
			} else {
				obj.dom.innerHTML = val;
			}
			obj.render(null);
		}
	});
	
	var _image = null;
	Object.defineProperty(this, 'image', {
		get: function() {return _image;},
		set: function(val){
			if ('object' == typeof _image && _image) {
				obj.dom.firstChild.src = Ti._5.getAbsolutePath(val);
			} else {
				var oImg = document.createElement('img');
				oImg.src = Ti._5.getAbsolutePath(val);
				_image = val;
				obj.dom.appendChild(oImg);
			}
		}
	});
	
	var _backgroundDisabledImage = '', _backgroundImage = ''; 
	var	_backgroundDisabledColor = '', _backgroundColor = '';
	Object.defineProperty(this, 'enabled', {
		get: function(){return !obj.dom.disabled;},
		set: function(val) {
			if (!_backgroundImage && obj.backgroundImage) {
				_backgroundImage = obj.backgroundImage;
			}
			if (!_backgroundColor && obj.backgroundColor) {
				_backgroundColor = obj.backgroundColor;
			}
			if (!val) {
				obj.dom.disabled = 'disabled';
				if (_backgroundDisabledImage) {
					obj.backgroundImage = _backgroundDisabledImage;
				}
				if (_backgroundDisabledColor) {
					obj.backgroundColor = _backgroundDisabledColor;
				}
			} else {
				obj.dom.disabled = '';
				obj.backgroundImage = _backgroundImage;
				obj.backgroundColor = _backgroundColor;
			}
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledImage', {
		get: function() {
			return _backgroundDisabledImage ? _backgroundDisabledImage : '';
		},
		set: function(val) {
			_backgroundDisabledImage = val;
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledColor', {
		get: function() {
			return _backgroundDisabledColor ? _backgroundDisabledColor : '';
		},
		set: function(val) {
			_backgroundDisabledColor = val;
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = val.width;
			}
			if (val.height) {
				obj.height = val.height;
			}
		}
	});

	var _selectedColor = null, _prevTextColor = null, _selectedColorLoaded = false;
	Object.defineProperty(this, 'selectedColor', {
		get: function(){return _selectedColor;},
		set: function(val) {
			_selectedColor = val;
			if (!_selectedColorLoaded) {
				_selectedColorLoaded = true;
				obj.dom.addEventListener('focus', function() {
					_prevTextColor = obj.color;
					obj.color = _selectedColor;
				}, false);
				obj.dom.addEventListener('blur', function() {
					if (_prevTextColor) {
						obj.color = _prevTextColor;
					}
				}, false);
			}
		}
	});
	
	var _style = null;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});

	var _titleid = null;
	Object.defineProperty(this, 'titleid', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});
		
	this.add = function(view) {
		obj._children = obj._children || [];
		obj._children.push(view);
		
		// if we have been rendered and add is called - re-render
		if (obj._rendered){
			obj.render(null);
		}
	};

	Ti._5.preset(this, [
		"image", "title", "size", "selectedColor", "backgroundDisabledImage",
		"backgroundDisabledColor", "enabled"
	], args);
	
	Ti._5.presetUserDefinedElements(this, args);
});

;
Ti._5.createClass('Titanium.UI.ButtonBar', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'buttonbar', args, 'ButtonBar');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _index = null;
	Object.defineProperty(this, 'index', {
		get: function(){return _index;},
		set: function(val){return _index = val;}
	});

	var _labels = null;
	Object.defineProperty(this, 'labels', {
		get: function(){return _labels;},
		set: function(val){return _labels = val;}
	});

	var _style = null;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});

;
(function(api) {
	
	api._capitalizeValue = function (_autocapitalization, sValue) {
		if (!sValue) {
			return;
		}
		var resultValue = '';
		switch (_autocapitalization) {
			case Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE:  
				resultValue = sValue;
				break;
			case Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS:
				var sTemp = sValue;
				var sEnd = '', iIndex = sValue.length-1;
				while (/[\s,\.!?]/gi.test(sValue.charAt(iIndex)) && 0 <= iIndex) {
					sEnd += sValue.charAt(iIndex);
					iIndex--;
				}
				sEnd = sEnd.split("").reverse().join("");
				if (!sValue.match(/^[\s,\.!?]/i)) {
					sTemp = ' '+sValue;
				}
				sTemp = sTemp.match(/[\s,\.!]+\w+/gi);
				if (sTemp) {
					for (var iCounter=0; iCounter < sTemp.length; iCounter++) {
						// Found first letter
						for (var jCounter=0; jCounter < sTemp[iCounter].length; jCounter++) {
							if (/\w/gi.test(sTemp[iCounter].charAt(jCounter))) {
								break;
							}
						}
						sTemp[iCounter] = sTemp[iCounter].replace(
							sTemp[iCounter].charAt(jCounter),
							sTemp[iCounter].charAt(jCounter).toUpperCase()
						);
					}
					if (!sValue.match(/^[\s,\.!?]/i)) {
						sTemp[0] = sTemp[0].replace(sTemp[0].charAt(0), '');
					}
					resultValue = sTemp.join('')+sEnd;
				} else {
					resultValue = _prevVal+sEnd;
				}
				break;
			case Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES:
				var sTemp = sValue;
				var sEnd = '', iIndex = sValue.length-1;
				while (/[\.!?]/gi.test(sValue.charAt(iIndex)) && 0 <= iIndex) {
					sEnd += sValue.charAt(iIndex);
					iIndex--;
				}
				sEnd = sEnd.split("").reverse().join("");
				if (sValue.match(/^\w/i)) {
					sTemp = '!'+sValue;
				}
				sTemp = sTemp.match(/[\.!?]+[\s]*[^\.!?]+/gi);
				if (sTemp) {
					var iIndex = 0;
					for (var iCounter=0; iCounter < sTemp.length; iCounter++) {
						iIndex=0; 
						while (false == /\w/.test(sTemp[iCounter][iIndex])) {
							iIndex++;
						}
						sTemp[iCounter] = sTemp[iCounter].substr(0,iIndex) +
							sTemp[iCounter][iIndex].toUpperCase() +
							sTemp[iCounter].substr(iIndex+1);
					}
					if (sValue.match(/^\w/i)) {
						sTemp[0] = sTemp[0].replace(sTemp[0].charAt(0), '');
					}
					resultValue = sTemp.join('')+sEnd;
				} else {
					resultValue = sEnd;
				}
				break;
			case Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL:
				resultValue = sValue.toUpperCase();
				break;
		}
		
		return resultValue;
	}		
	
	api._updateText = function(obj) {
		var _selectionStart = obj.dom.selectionStart;
		var _selectionEnd = obj.dom.selectionEnd;
		obj.value = api._capitalizeValue(obj.autocapitalization, obj.value);
		obj.dom.selectionStart = _selectionStart;
		obj.dom.selectionEnd = _selectionEnd;
	};
	
})(Titanium.UI);
;
Ti._5.createClass('Titanium.UI.Clipboard', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'clipboard', args, 'Clipboard');
	// Methods
	this.clearData = function(){
		console.debug('Method "Titanium.UI.Clipboard#.clearData" is not implemented yet.');
	};
	this.clearText = function(){
		console.debug('Method "Titanium.UI.Clipboard#.clearText" is not implemented yet.');
	};
	this.getData = function(){
		console.debug('Method "Titanium.UI.Clipboard#.getData" is not implemented yet.');
	};
	this.getText = function(){
		console.debug('Method "Titanium.UI.Clipboard#.getText" is not implemented yet.');
	};
	this.hasData = function(){
		console.debug('Method "Titanium.UI.Clipboard#.hasData" is not implemented yet.');
	};
	this.hasText = function(){
		console.debug('Method "Titanium.UI.Clipboard#.hasText" is not implemented yet.');
	};
	this.setData = function(){
		console.debug('Method "Titanium.UI.Clipboard#.setData" is not implemented yet.');
	};
	this.setText = function(){
		console.debug('Method "Titanium.UI.Clipboard#.setText" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.CoverFlowView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'coverflowview', args, 'CoverFlowView');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _images = null;
	Object.defineProperty(this, 'images', {
		get: function(){return _images;},
		set: function(val){return _images = val;}
	});

	var _selected = null;
	Object.defineProperty(this, 'selected', {
		get: function(){return _selected;},
		set: function(val){return _selected = val;}
	});

	// Methods
	this.setImage = function(){
		console.debug('Method "Titanium.UI.CoverFlowView#.setImage" is not implemented yet.');
	};

	// Events
	this.addEventListener('change', function(){
		console.debug('Event "change" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.DashboardItem', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'dashboarditem', args, 'DashboardItem');

	// Properties
	var _badge = null;
	Object.defineProperty(this, 'badge', {
		get: function(){return _badge;},
		set: function(val){return _badge = val;}
	});

	var _canDelete = null;
	Object.defineProperty(this, 'canDelete', {
		get: function(){return _canDelete;},
		set: function(val){return _canDelete = val;}
	});

	var _image = null;
	Object.defineProperty(this, 'image', {
		get: function(){return _image;},
		set: function(val){return _image = val;}
	});

	var _selectedImage = null;
	Object.defineProperty(this, 'selectedImage', {
		get: function(){return _selectedImage;},
		set: function(val){return _selectedImage = val;}
	});


	// Events
	this.addEventListener('click', function(){
		console.debug('Event "click" is not implemented yet.');
	});
	this.addEventListener('delete', function(){
		console.debug('Event "delete" is not implemented yet.');
	});
	this.addEventListener('move', function(){
		console.debug('Event "move" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.DashboardView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'dashboardview', args, 'DashboardView');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _data = null;
	Object.defineProperty(this, 'data', {
		get: function(){return _data;},
		set: function(val){return _data = val;}
	});

	var _wobble = null;
	Object.defineProperty(this, 'wobble', {
		get: function(){return _wobble;},
		set: function(val){return _wobble = val;}
	});

	// Methods
	this.startEditing = function(){
		console.debug('Method "Titanium.UI.DashboardView#.startEditing" is not implemented yet.');
	};
	this.stopEditing = function(){
		console.debug('Method "Titanium.UI.DashboardView#.stopEditing" is not implemented yet.');
	};

	// Events
	this.addEventListener('commit', function(){
		console.debug('Event "commit" is not implemented yet.');
	});
	this.addEventListener('delete', function(){
		console.debug('Event "delete" is not implemented yet.');
	});
	this.addEventListener('edit', function(){
		console.debug('Event "edit" is not implemented yet.');
	});
	this.addEventListener('move', function(){
		console.debug('Event "move" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.EmailDialog', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'emaildialog', args, 'EmailDialog');

	// Properties
	var _CANCELLED = null;
	Object.defineProperty(this, 'CANCELLED', {
		get: function(){return _CANCELLED;},
		set: function(val){return _CANCELLED = val;}
	});

	var _FAILED = null;
	Object.defineProperty(this, 'FAILED', {
		get: function(){return _FAILED;},
		set: function(val){return _FAILED = val;}
	});

	var _SAVED = null;
	Object.defineProperty(this, 'SAVED', {
		get: function(){return _SAVED;},
		set: function(val){return _SAVED = val;}
	});

	var _SENT = null;
	Object.defineProperty(this, 'SENT', {
		get: function(){return _SENT;},
		set: function(val){return _SENT = val;}
	});

	var _barColor = null;
	Object.defineProperty(this, 'barColor', {
		get: function(){return _barColor;},
		set: function(val){return _barColor = val;}
	});

	var _bccRecipients = null;
	Object.defineProperty(this, 'bccRecipients', {
		get: function(){return _bccRecipients;},
		set: function(val){return _bccRecipients = val;}
	});

	var _ccRecipients = null;
	Object.defineProperty(this, 'ccRecipients', {
		get: function(){return _ccRecipients;},
		set: function(val){return _ccRecipients = val;}
	});

	var _html = null;
	Object.defineProperty(this, 'html', {
		get: function(){return _html;},
		set: function(val){return _html = val;}
	});

	var _messageBody = null;
	Object.defineProperty(this, 'messageBody', {
		get: function(){return _messageBody;},
		set: function(val){return _messageBody = val;}
	});

	var _subject = null;
	Object.defineProperty(this, 'subject', {
		get: function(){return _subject;},
		set: function(val){return _subject = val;}
	});

	var _toRecipients = null;
	Object.defineProperty(this, 'toRecipients', {
		get: function(){return _toRecipients;},
		set: function(val){return _toRecipients = val;}
	});

	// Methods
	this.addAttachment = function(){
		console.debug('Method "Titanium.UI.EmailDialog#.addAttachment" is not implemented yet.');
	};
	this.isSupported = function(){
		console.debug('Method "Titanium.UI.EmailDialog#.isSupported" is not implemented yet.');
	};
	this.open = function(){
		console.debug('Method "Titanium.UI.EmailDialog#.open" is not implemented yet.');
	};

	// Events
	this.addEventListener('complete', function(){
		console.debug('Event "complete" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.ImageView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'img', args, 'ImageView');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	Ti._5.Clickable(this, args);
	
	var _isError = false;
	function _loadImages (aImages) {
		_isError = false;
		if (!_preventDefaultImage) {
			obj.dom.src = Ti._5.getAbsolutePath(_defaultImage);
		}
		// create object
		oImage = new Image();
		var _loaded = function () {
			if (iCounter < aImages.length) return true;
			obj.dom.src = Ti._5.getAbsolutePath(aImages[0]);
			oImage.removeEventListener('load', _loaded, false);
			obj.fireEvent('load', {
				source	: obj,
				state	: 2 < aImages.length ? obj.image : obj.images,
				type	: 'load'
			});
		}
		oImage.addEventListener('error',  function () {
			_isError = true;
			oImage.removeEventListener('load', _loaded, false);
		}, false);
		oImage.addEventListener('load', _loaded, false);

		// start preloading
		for(var iCounter=0; iCounter < aImages.length; iCounter++) {
			oImage.src = Ti._5.getAbsolutePath(aImages[iCounter]);
		}
	}

	// Properties
	var _animating = null;
	Object.defineProperty(this, 'animating', {
		get: function(){return _animating;},
		set: function(val){return _animating = val;}
	});

	var _duration = null;
	Object.defineProperty(this, 'duration', {
		get: function(){return _duration;},
		set: function(val){return _duration = val;}
	});
	
	var _paused = null;
	Object.defineProperty(this, 'paused', {
		get: function(){return _paused;},
		set: function(val){return _paused = val;}
	});
	
	var _repeatCount = 0;
	Object.defineProperty(this, 'repeatCount', {
		get: function(){return _repeatCount;},
		set: function(val){return _repeatCount = val;}
	});

	var _reverse = false;
	Object.defineProperty(this, 'reverse', {
		get: function(){return _reverse;},
		set: function(val){return _reverse = val ? true : false;}
	});

	var _enableZoomControls = true;
	Object.defineProperty(this, 'enableZoomControls', {
		get: function(){return _enableZoomControls;},
		set: function(val){return _enableZoomControls = val;}
	});

	// indicates whether or not the source image is in 2x resolution for retina displays. 
	// Use for remote images ONLY. (iOS)
	var _hires = null;
	Object.defineProperty(this, 'hires', {
		get: function(){return _hires;},
		set: function(val){return false;}
	});
	
	var _canScale = true;
	Object.defineProperty(this, 'canScale', {
		get: function(){return _canScale;},
		set: function(val){
			_canScale = val ? true : false;
			if (!_canScale) {
				obj.dom.style.width = 'auto';
				obj.dom.style.height = 'auto';
			}
		}
	});

	var _defaultImage = "";
	Object.defineProperty(this, 'defaultImage', {
		get: function(){return _defaultImage;},
		set: function(val){return _defaultImage = val;}
	});
	
	var _src = "";
	Object.defineProperty(this, 'image', {
		get: function(){return _src;},
		set: function(val){_src = val; _loadImages([val]);}
	});

	var _images = [];
	Object.defineProperty(this, 'images', {
		get: function(){return _images;},
		set: function(val){
			_images = -1 != val.constructor.toString().indexOf('Array') ? val : [val];
			_loadImages(_images);
		}
	});

	var _preventDefaultImage = false;
	Object.defineProperty(this, 'preventDefaultImage', {
		get: function(){return _preventDefaultImage;},
		set: function(val){return _preventDefaultImage = val ? true : false;}
	});

	Object.defineProperty(this, 'url', {
		get: function(){return obj.image;},
		set: function(val){obj.image = val;}
	});
   
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});
	
	Object.defineProperty(this, 'width', {
		get: function() {
			if (!obj.dom.style.width || !obj.canScale) {
				return '';
			}
			return /%/g.test(obj.dom.style.width) ? parseInt(obj.dom.style.width)+'%' : parseInt(obj.dom.style.width);
		},
		set: function(val) {
			if (obj.canScale) {
				obj.dom.style.width = /%/g.test(val+'') ? parseInt(val) + '%' : parseInt(val) + 'px';
			}
		}
	});	
	
	var _height;
	Object.defineProperty(this, 'height', {
		get: function() {
			return _height;
		},
		set: function(val) {
			_height = val;
			obj.dom.style.height =  val + (/^\d+$/.test(val) ? 'px' : "");
		}
	});
	
	Ti._5.preset(this, ["preventDefaultImage", "defaultImage", "image", "images", "url", "size",
		"canScale", "height", "width"], args);	
	Ti._5.presetUserDefinedElements(this, args);

	// Methods
	this.pause = function(){
		console.debug('Method "Titanium.UI.ImageView#.pause" is not implemented yet.');
	};
	this.start = function(){
		console.debug('Method "Titanium.UI.ImageView#.start" is not implemented yet.');
	};
	this.stop = function(){
		console.debug('Method "Titanium.UI.ImageView#.stop" is not implemented yet.');
	};
	this.toBlob = function(){
		console.debug('Method "Titanium.UI.ImageView#.toBlob" is not implemented yet.');
	};

	// Events
	this.addEventListener('change', function(){
		console.debug('Event "change" is not implemented yet.');
	});
	this.addEventListener('start', function(){
		console.debug('Event "start" is not implemented yet.');
	});
	this.addEventListener('stop', function(){
		console.debug('Event "stop" is not implemented yet.');
	});
});
;
Ti._5.createClass('Titanium.UI.iOS.AdView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'ios.adview', args, 'iOS.AdView');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _SIZE_320x50 = null;
	Object.defineProperty(this, 'SIZE_320x50', {
		get: function(){return _SIZE_320x50;},
		set: function(val){return _SIZE_320x50 = val;}
	});

	var _SIZE_480x32 = null;
	Object.defineProperty(this, 'SIZE_480x32', {
		get: function(){return _SIZE_480x32;},
		set: function(val){return _SIZE_480x32 = val;}
	});

	// Methods
	this.cancelAction = function(){
		console.debug('Method "Titanium.UI.iOS.AdView#.cancelAction" is not implemented yet.');
	};

	// Events
	this.addEventListener('action', function(){
		console.debug('Event "action" is not implemented yet.');
	});
	this.addEventListener('error', function(){
		console.debug('Event "error" is not implemented yet.');
	});
	this.addEventListener('load', function(){
		console.debug('Event "load" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iOS', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'ios', args, 'iOS');
	// Methods
	this.createAdView = function(){
		console.debug('Method "Titanium.UI.iOS#.createAdView" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPad', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'ipad', args, 'iPad');

	// Properties
	var _POPOVER_ARROW_DIRECTION_ANY = null;
	Object.defineProperty(this, 'POPOVER_ARROW_DIRECTION_ANY', {
		get: function(){return _POPOVER_ARROW_DIRECTION_ANY;},
		set: function(val){return _POPOVER_ARROW_DIRECTION_ANY = val;}
	});

	var _POPOVER_ARROW_DIRECTION_DOWN = null;
	Object.defineProperty(this, 'POPOVER_ARROW_DIRECTION_DOWN', {
		get: function(){return _POPOVER_ARROW_DIRECTION_DOWN;},
		set: function(val){return _POPOVER_ARROW_DIRECTION_DOWN = val;}
	});

	var _POPOVER_ARROW_DIRECTION_LEFT = null;
	Object.defineProperty(this, 'POPOVER_ARROW_DIRECTION_LEFT', {
		get: function(){return _POPOVER_ARROW_DIRECTION_LEFT;},
		set: function(val){return _POPOVER_ARROW_DIRECTION_LEFT = val;}
	});

	var _POPOVER_ARROW_DIRECTION_RIGHT = null;
	Object.defineProperty(this, 'POPOVER_ARROW_DIRECTION_RIGHT', {
		get: function(){return _POPOVER_ARROW_DIRECTION_RIGHT;},
		set: function(val){return _POPOVER_ARROW_DIRECTION_RIGHT = val;}
	});

	var _POPOVER_ARROW_DIRECTION_UNKNOWN = null;
	Object.defineProperty(this, 'POPOVER_ARROW_DIRECTION_UNKNOWN', {
		get: function(){return _POPOVER_ARROW_DIRECTION_UNKNOWN;},
		set: function(val){return _POPOVER_ARROW_DIRECTION_UNKNOWN = val;}
	});

	var _POPOVER_ARROW_DIRECTION_UP = null;
	Object.defineProperty(this, 'POPOVER_ARROW_DIRECTION_UP', {
		get: function(){return _POPOVER_ARROW_DIRECTION_UP;},
		set: function(val){return _POPOVER_ARROW_DIRECTION_UP = val;}
	});

	// Methods
	this.createPopover = function(){
		console.debug('Method "Titanium.UI.iPad#.createPopover" is not implemented yet.');
	};
	this.createSplitWindow = function(){
		console.debug('Method "Titanium.UI.iPad#.createSplitWindow" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPad.Popover', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'ipad.popover', args, 'iPad.Popover');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _arrowDirection = null;
	Object.defineProperty(this, 'arrowDirection', {
		get: function(){return _arrowDirection;},
		set: function(val){return _arrowDirection = val;}
	});

	var _leftNavButton = null;
	Object.defineProperty(this, 'leftNavButton', {
		get: function(){return _leftNavButton;},
		set: function(val){return _leftNavButton = val;}
	});

	var _title = null;
	Object.defineProperty(this, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

	// Methods
	this.setHeight = function(){
		console.debug('Method "Titanium.UI.iPad.Popover#.setHeight" is not implemented yet.');
	};
	this.setWidth = function(){
		console.debug('Method "Titanium.UI.iPad.Popover#.setWidth" is not implemented yet.');
	};

	// Events
	this.addEventListener('hide', function(){
		console.debug('Event "hide" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPad.SplitWindow', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'ipad.splitwindow', args, 'iPad.SplitWindow');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _detailView = null;
	Object.defineProperty(this, 'detailView', {
		get: function(){return _detailView;},
		set: function(val){return _detailView = val;}
	});

	var _masterView = null;
	Object.defineProperty(this, 'masterView', {
		get: function(){return _masterView;},
		set: function(val){return _masterView = val;}
	});


	// Events
	this.addEventListener('visible', function(){
		console.debug('Event "visible" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.ActivityIndicatorStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.activityindicatorstyle', args, 'iPhone.ActivityIndicatorStyle');

	// Properties
	var _BIG = null;
	Object.defineProperty(this, 'BIG', {
		get: function(){return _BIG;},
		set: function(val){return _BIG = val;}
	});

	var _DARK = null;
	Object.defineProperty(this, 'DARK', {
		get: function(){return _DARK;},
		set: function(val){return _DARK = val;}
	});

	var _PLAIN = null;
	Object.defineProperty(this, 'PLAIN', {
		get: function(){return _PLAIN;},
		set: function(val){return _PLAIN = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.AnimationStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.animationstyle', args, 'iPhone.AnimationStyle');

	// Properties
	var _CURL_DOWN = null;
	Object.defineProperty(this, 'CURL_DOWN', {
		get: function(){return _CURL_DOWN;},
		set: function(val){return _CURL_DOWN = val;}
	});

	var _CURL_UP = null;
	Object.defineProperty(this, 'CURL_UP', {
		get: function(){return _CURL_UP;},
		set: function(val){return _CURL_UP = val;}
	});

	var _FLIP_FROM_LEFT = null;
	Object.defineProperty(this, 'FLIP_FROM_LEFT', {
		get: function(){return _FLIP_FROM_LEFT;},
		set: function(val){return _FLIP_FROM_LEFT = val;}
	});

	var _FLIP_FROM_RIGHT = null;
	Object.defineProperty(this, 'FLIP_FROM_RIGHT', {
		get: function(){return _FLIP_FROM_RIGHT;},
		set: function(val){return _FLIP_FROM_RIGHT = val;}
	});

	var _NONE = null;
	Object.defineProperty(this, 'NONE', {
		get: function(){return _NONE;},
		set: function(val){return _NONE = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
(function(api){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone', null, 'iPhone');

	// Properties
	var _MODAL_PRESENTATION_CURRENT_CONTEXT = null;
	Object.defineProperty(this, 'MODAL_PRESENTATION_CURRENT_CONTEXT', {
		get: function(){return _MODAL_PRESENTATION_CURRENT_CONTEXT;},
		set: function(val){return _MODAL_PRESENTATION_CURRENT_CONTEXT = val;}
	});

	var _MODAL_PRESENTATION_FORMSHEET = null;
	Object.defineProperty(this, 'MODAL_PRESENTATION_FORMSHEET', {
		get: function(){return _MODAL_PRESENTATION_FORMSHEET;},
		set: function(val){return _MODAL_PRESENTATION_FORMSHEET = val;}
	});

	var _MODAL_PRESENTATION_FULLSCREEN = null;
	Object.defineProperty(this, 'MODAL_PRESENTATION_FULLSCREEN', {
		get: function(){return _MODAL_PRESENTATION_FULLSCREEN;},
		set: function(val){return _MODAL_PRESENTATION_FULLSCREEN = val;}
	});

	var _MODAL_PRESENTATION_PAGESHEET = null;
	Object.defineProperty(this, 'MODAL_PRESENTATION_PAGESHEET', {
		get: function(){return _MODAL_PRESENTATION_PAGESHEET;},
		set: function(val){return _MODAL_PRESENTATION_PAGESHEET = val;}
	});

	var _MODAL_TRANSITION_STYLE_COVER_VERTICAL = null;
	Object.defineProperty(this, 'MODAL_TRANSITION_STYLE_COVER_VERTICAL', {
		get: function(){return _MODAL_TRANSITION_STYLE_COVER_VERTICAL;},
		set: function(val){return _MODAL_TRANSITION_STYLE_COVER_VERTICAL = val;}
	});

	var _MODAL_TRANSITION_STYLE_CROSS_DISSOLVE = null;
	Object.defineProperty(this, 'MODAL_TRANSITION_STYLE_CROSS_DISSOLVE', {
		get: function(){return _MODAL_TRANSITION_STYLE_CROSS_DISSOLVE;},
		set: function(val){return _MODAL_TRANSITION_STYLE_CROSS_DISSOLVE = val;}
	});

	var _MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL = null;
	Object.defineProperty(this, 'MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL', {
		get: function(){return _MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL;},
		set: function(val){return _MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL = val;}
	});

	var _MODAL_TRANSITION_STYLE_PARTIAL_CURL = null;
	Object.defineProperty(this, 'MODAL_TRANSITION_STYLE_PARTIAL_CURL', {
		get: function(){return _MODAL_TRANSITION_STYLE_PARTIAL_CURL;},
		set: function(val){return _MODAL_TRANSITION_STYLE_PARTIAL_CURL = val;}
	});

	var _appBadge = null;
	Object.defineProperty(this, 'appBadge', {
		get: function(){return _appBadge;},
		set: function(val){return _appBadge = val;}
	});

	var _appSupportsShakeToEdit = null;
	Object.defineProperty(this, 'appSupportsShakeToEdit', {
		get: function(){return _appSupportsShakeToEdit;},
		set: function(val){return _appSupportsShakeToEdit = val;}
	});

	var _statusBarHidden = null;
	Object.defineProperty(this, 'statusBarHidden', {
		get: function(){return _statusBarHidden;},
		set: function(val){return _statusBarHidden = val;}
	});

	var _statusBarStyle = null;
	Object.defineProperty(this, 'statusBarStyle', {
		get: function(){return _statusBarStyle;},
		set: function(val){return _statusBarStyle = val;}
	});

	// Methods
	this.createNavigationGroup = function(){
		console.debug('Method "Titanium.UI.iPhone#.createNavigationGroup" is not implemented yet.');
	};
	this.hideStatusBar = function(){
		console.debug('Method "Titanium.UI.iPhone#.hideStatusBar" is not implemented yet.');
	};
	this.showStatusBar = function(){
		console.debug('Method "Titanium.UI.iPhone#.showStatusBar" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, null);

})(Ti._5.createClass('Titanium.UI.iPhone'));
;
Ti._5.createClass('Titanium.UI.iPhone.NavigationGroup', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.navigationgroup', args, 'iPhone.NavigationGroup');
	Ti._5.Touchable(this);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	// Methods
	this.close = function(){
		console.debug('Method "Titanium.UI.iPhone.NavigationGroup#.close" is not implemented yet.');
	};
	this.open = function(){
		console.debug('Method "Titanium.UI.iPhone.NavigationGroup#.open" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.ProgressBarStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.progressbarstyle', args, 'iPhone.ProgressBarStyle');

	// Properties
	var _BAR = null;
	Object.defineProperty(this, 'BAR', {
		get: function(){return _BAR;},
		set: function(val){return _BAR = val;}
	});

	var _DEFAULT = null;
	Object.defineProperty(this, 'DEFAULT', {
		get: function(){return _DEFAULT;},
		set: function(val){return _DEFAULT = val;}
	});

	var _PLAIN = null;
	Object.defineProperty(this, 'PLAIN', {
		get: function(){return _PLAIN;},
		set: function(val){return _PLAIN = val;}
	});


	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.RowAnimationStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.rowanimationstyle', args, 'iPhone.RowAnimationStyle');

	// Properties
	var _BOTTOM = null;
	Object.defineProperty(this, 'BOTTOM', {
		get: function(){return _BOTTOM;},
		set: function(val){return _BOTTOM = val;}
	});

	var _FADE = null;
	Object.defineProperty(this, 'FADE', {
		get: function(){return _FADE;},
		set: function(val){return _FADE = val;}
	});

	var _LEFT = null;
	Object.defineProperty(this, 'LEFT', {
		get: function(){return _LEFT;},
		set: function(val){return _LEFT = val;}
	});

	var _NONE = null;
	Object.defineProperty(this, 'NONE', {
		get: function(){return _NONE;},
		set: function(val){return _NONE = val;}
	});

	var _RIGHT = null;
	Object.defineProperty(this, 'RIGHT', {
		get: function(){return _RIGHT;},
		set: function(val){return _RIGHT = val;}
	});

	var _TOP = null;
	Object.defineProperty(this, 'TOP', {
		get: function(){return _TOP;},
		set: function(val){return _TOP = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.ScrollIndicatorStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.scrollindicatorstyle', args, 'iPhone.ScrollIndicatorStyle');

	// Properties
	var _BLACK = null;
	Object.defineProperty(this, 'BLACK', {
		get: function(){return _BLACK;},
		set: function(val){return _BLACK = val;}
	});

	var _DEFAULT = null;
	Object.defineProperty(this, 'DEFAULT', {
		get: function(){return _DEFAULT;},
		set: function(val){return _DEFAULT = val;}
	});

	var _WHITE = null;
	Object.defineProperty(this, 'WHITE', {
		get: function(){return _WHITE;},
		set: function(val){return _WHITE = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.StatusBar', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.statusbar', args, 'iPhone.StatusBar');

	// Properties
	var _DEFAULT = null;
	Object.defineProperty(this, 'DEFAULT', {
		get: function(){return _DEFAULT;},
		set: function(val){return _DEFAULT = val;}
	});

	var _GRAY = null;
	Object.defineProperty(this, 'GRAY', {
		get: function(){return _GRAY;},
		set: function(val){return _GRAY = val;}
	});

	var _OPAQUE_BLACK = null;
	Object.defineProperty(this, 'OPAQUE_BLACK', {
		get: function(){return _OPAQUE_BLACK;},
		set: function(val){return _OPAQUE_BLACK = val;}
	});

	var _TRANSLUCENT_BLACK = null;
	Object.defineProperty(this, 'TRANSLUCENT_BLACK', {
		get: function(){return _TRANSLUCENT_BLACK;},
		set: function(val){return _TRANSLUCENT_BLACK = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.SystemButton', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.systembutton', args, 'iPhone.SystemButton');

	// Properties
	var _ACTION = null;
	Object.defineProperty(this, 'ACTION', {
		get: function(){return _ACTION;},
		set: function(val){return _ACTION = val;}
	});

	var _ACTIVITY = null;
	Object.defineProperty(this, 'ACTIVITY', {
		get: function(){return _ACTIVITY;},
		set: function(val){return _ACTIVITY = val;}
	});

	var _ADD = null;
	Object.defineProperty(this, 'ADD', {
		get: function(){return _ADD;},
		set: function(val){return _ADD = val;}
	});

	var _BOOKMARKS = null;
	Object.defineProperty(this, 'BOOKMARKS', {
		get: function(){return _BOOKMARKS;},
		set: function(val){return _BOOKMARKS = val;}
	});

	var _CAMERA = null;
	Object.defineProperty(this, 'CAMERA', {
		get: function(){return _CAMERA;},
		set: function(val){return _CAMERA = val;}
	});

	var _CANCEL = null;
	Object.defineProperty(this, 'CANCEL', {
		get: function(){return _CANCEL;},
		set: function(val){return _CANCEL = val;}
	});

	var _COMPOSE = null;
	Object.defineProperty(this, 'COMPOSE', {
		get: function(){return _COMPOSE;},
		set: function(val){return _COMPOSE = val;}
	});

	var _CONTACT_ADD = null;
	Object.defineProperty(this, 'CONTACT_ADD', {
		get: function(){return _CONTACT_ADD;},
		set: function(val){return _CONTACT_ADD = val;}
	});

	var _DISCLOSURE = null;
	Object.defineProperty(this, 'DISCLOSURE', {
		get: function(){return _DISCLOSURE;},
		set: function(val){return _DISCLOSURE = val;}
	});

	var _DONE = null;
	Object.defineProperty(this, 'DONE', {
		get: function(){return _DONE;},
		set: function(val){return _DONE = val;}
	});

	var _EDIT = null;
	Object.defineProperty(this, 'EDIT', {
		get: function(){return _EDIT;},
		set: function(val){return _EDIT = val;}
	});

	var _FAST_FORWARD = null;
	Object.defineProperty(this, 'FAST_FORWARD', {
		get: function(){return _FAST_FORWARD;},
		set: function(val){return _FAST_FORWARD = val;}
	});

	var _FIXED_SPACE = null;
	Object.defineProperty(this, 'FIXED_SPACE', {
		get: function(){return _FIXED_SPACE;},
		set: function(val){return _FIXED_SPACE = val;}
	});

	var _FLEXIBLE_SPACE = null;
	Object.defineProperty(this, 'FLEXIBLE_SPACE', {
		get: function(){return _FLEXIBLE_SPACE;},
		set: function(val){return _FLEXIBLE_SPACE = val;}
	});

	var _INFO_DARK = null;
	Object.defineProperty(this, 'INFO_DARK', {
		get: function(){return _INFO_DARK;},
		set: function(val){return _INFO_DARK = val;}
	});

	var _INFO_LIGHT = null;
	Object.defineProperty(this, 'INFO_LIGHT', {
		get: function(){return _INFO_LIGHT;},
		set: function(val){return _INFO_LIGHT = val;}
	});

	var _ORGANIZE = null;
	Object.defineProperty(this, 'ORGANIZE', {
		get: function(){return _ORGANIZE;},
		set: function(val){return _ORGANIZE = val;}
	});

	var _PAUSE = null;
	Object.defineProperty(this, 'PAUSE', {
		get: function(){return _PAUSE;},
		set: function(val){return _PAUSE = val;}
	});

	var _PLAY = null;
	Object.defineProperty(this, 'PLAY', {
		get: function(){return _PLAY;},
		set: function(val){return _PLAY = val;}
	});

	var _REFRESH = null;
	Object.defineProperty(this, 'REFRESH', {
		get: function(){return _REFRESH;},
		set: function(val){return _REFRESH = val;}
	});

	var _REPLY = null;
	Object.defineProperty(this, 'REPLY', {
		get: function(){return _REPLY;},
		set: function(val){return _REPLY = val;}
	});

	var _REWIND = null;
	Object.defineProperty(this, 'REWIND', {
		get: function(){return _REWIND;},
		set: function(val){return _REWIND = val;}
	});

	var _SAVE = null;
	Object.defineProperty(this, 'SAVE', {
		get: function(){return _SAVE;},
		set: function(val){return _SAVE = val;}
	});

	var _SPINNER = null;
	Object.defineProperty(this, 'SPINNER', {
		get: function(){return _SPINNER;},
		set: function(val){return _SPINNER = val;}
	});

	var _STOP = null;
	Object.defineProperty(this, 'STOP', {
		get: function(){return _STOP;},
		set: function(val){return _STOP = val;}
	});

	var _TRASH = null;
	Object.defineProperty(this, 'TRASH', {
		get: function(){return _TRASH;},
		set: function(val){return _TRASH = val;}
	});


	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.SystemButtonStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.systembuttonstyle', args, 'iPhone.SystemButtonStyle');

	// Properties
	var _BAR = null;
	Object.defineProperty(this, 'BAR', {
		get: function(){return _BAR;},
		set: function(val){return _BAR = val;}
	});

	var _BORDERED = null;
	Object.defineProperty(this, 'BORDERED', {
		get: function(){return _BORDERED;},
		set: function(val){return _BORDERED = val;}
	});

	var _DONE = null;
	Object.defineProperty(this, 'DONE', {
		get: function(){return _DONE;},
		set: function(val){return _DONE = val;}
	});

	var _PLAIN = null;
	Object.defineProperty(this, 'PLAIN', {
		get: function(){return _PLAIN;},
		set: function(val){return _PLAIN = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.SystemIcon', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.systemicon', args, 'iPhone.SystemIcon');

	// Properties
	var _BOOKMARKS = null;
	Object.defineProperty(this, 'BOOKMARKS', {
		get: function(){return _BOOKMARKS;},
		set: function(val){return _BOOKMARKS = val;}
	});

	var _CONTACTS = null;
	Object.defineProperty(this, 'CONTACTS', {
		get: function(){return _CONTACTS;},
		set: function(val){return _CONTACTS = val;}
	});

	var _DOWNLOADS = null;
	Object.defineProperty(this, 'DOWNLOADS', {
		get: function(){return _DOWNLOADS;},
		set: function(val){return _DOWNLOADS = val;}
	});

	var _FAVORITES = null;
	Object.defineProperty(this, 'FAVORITES', {
		get: function(){return _FAVORITES;},
		set: function(val){return _FAVORITES = val;}
	});

	var _FEATURED = null;
	Object.defineProperty(this, 'FEATURED', {
		get: function(){return _FEATURED;},
		set: function(val){return _FEATURED = val;}
	});

	var _HISTORY = null;
	Object.defineProperty(this, 'HISTORY', {
		get: function(){return _HISTORY;},
		set: function(val){return _HISTORY = val;}
	});

	var _MORE = null;
	Object.defineProperty(this, 'MORE', {
		get: function(){return _MORE;},
		set: function(val){return _MORE = val;}
	});

	var _MOST_RECENT = null;
	Object.defineProperty(this, 'MOST_RECENT', {
		get: function(){return _MOST_RECENT;},
		set: function(val){return _MOST_RECENT = val;}
	});

	var _MOST_VIEWED = null;
	Object.defineProperty(this, 'MOST_VIEWED', {
		get: function(){return _MOST_VIEWED;},
		set: function(val){return _MOST_VIEWED = val;}
	});

	var _RECENTS = null;
	Object.defineProperty(this, 'RECENTS', {
		get: function(){return _RECENTS;},
		set: function(val){return _RECENTS = val;}
	});

	var _SEARCH = null;
	Object.defineProperty(this, 'SEARCH', {
		get: function(){return _SEARCH;},
		set: function(val){return _SEARCH = val;}
	});

	var _TOP_RATED = null;
	Object.defineProperty(this, 'TOP_RATED', {
		get: function(){return _TOP_RATED;},
		set: function(val){return _TOP_RATED = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
(function(api){
	// Properties
	Object.defineProperty(api, 'BLUE', {
		value: {selectedBackgroundColor: 'blue'},
		writable: false
	});
	Object.defineProperty(api, 'GRAY', {
		value: {selectedBackgroundColor: 'gray'},
		writable: false
	});
	Object.defineProperty(api, 'NONE', {
		value: {selectedColor: '', selectedBackgroundImage: '', selectedBackgroundColor: ''},
		writable: false
	});

})(Ti._5.createClass('Titanium.UI.iPhone.TableViewCellSelectionStyle'));
;
Ti._5.createClass('Titanium.UI.iPhone.TableViewScrollPosition', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.tableviewscrollposition', args, 'iPhone.TableViewScrollPosition');

	// Properties
	var _BOTTOM = null;
	Object.defineProperty(this, 'BOTTOM', {
		get: function(){return _BOTTOM;},
		set: function(val){return _BOTTOM = val;}
	});

	var _MIDDLE = null;
	Object.defineProperty(this, 'MIDDLE', {
		get: function(){return _MIDDLE;},
		set: function(val){return _MIDDLE = val;}
	});

	var _NONE = null;
	Object.defineProperty(this, 'NONE', {
		get: function(){return _NONE;},
		set: function(val){return _NONE = val;}
	});

	var _TOP = null;
	Object.defineProperty(this, 'TOP', {
		get: function(){return _TOP;},
		set: function(val){return _TOP = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.TableViewSeparatorStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.tableviewseparatorstyle', args, 'iPhone.TableViewSeparatorStyle');

	// Properties
	var _NONE = null;
	Object.defineProperty(this, 'NONE', {
		get: function(){return _NONE;},
		set: function(val){return _NONE = val;}
	});

	var _SINGLE_LINE = null;
	Object.defineProperty(this, 'SINGLE_LINE', {
		get: function(){return _SINGLE_LINE;},
		set: function(val){return _SINGLE_LINE = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.iPhone.TableViewStyle', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iphone.tableviewstyle', args, 'iPhone.TableViewStyle');

	// Properties
	var _GROUPED = null;
	Object.defineProperty(this, 'GROUPED', {
		get: function(){return _GROUPED;},
		set: function(val){return _GROUPED = val;}
	});

	var _PLAIN = null;
	Object.defineProperty(this, 'PLAIN', {
		get: function(){return _PLAIN;},
		set: function(val){return _PLAIN = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.Label', function(args){
	var obj = this;
	
	// Set some default values to label for prevent inheriting style  
	args = Ti._5.extend({}, args);
	args.backgroundColor = args.backgroundColor || 'none'; 
	args.font = args.font || {}; 
	args.fontFamily = args.fontFamily || ''; 
	args.fontSize = args.fontSize || ''; 
	args.fontStyle = args.fontStyle || 'normal'; 
	args.fontWeight = args.fontWeight || 'normal'; 
	args.minimumFontSize = args.minimumFontSize || ''; 
	args.opacity = args.opacity || 1; 
	args.textAlign = args.textAlign || '-webkit-auto'; 

	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'Label');
	Ti._5.Clickable(this);
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	args.backgroundPaddingLeft = args.backgroundPaddingLeft || '0';
	args.backgroundPaddingTop = args.backgroundPaddingTop || '0';
	this.dom.style.overflow = 'hidden';

	// Properties
	this.autoLink = null;

	var _setBGPosition = function(){
	};

	Object.defineProperty(this, 'backgroundPaddingBottom', {});

	Object.defineProperty(this, 'backgroundPaddingLeft', {
		get: function(){return obj.dom.style.backgroundPositionX;},
		set: function(val){obj.dom.style.backgroundPositionX = val + "px"}
	});

	Object.defineProperty(this, 'backgroundPaddingRight', {});

	Object.defineProperty(this, 'backgroundPaddingTop', {
		get: function(){return obj.dom.style.backgroundPositionY;},
		set: function(val){obj.dom.style.backgroundPositionY = val + "px";}
	});

	Object.defineProperty(this, 'ellipsize', {
		get: function(){return false;}
	});

	Object.defineProperty(this, 'highlightedColor', {
		get: function(){return null;}
	});

	Object.defineProperty(this, 'html', {
		get: function(){return;}
	});

	Object.defineProperty(this, 'minimumFontSize', {
		get: function(){return null;}
	});

	var _setShadow = function(){
		obj.dom.style["-webkit-box-shadow"] = (_shadowColor || "#000") + " " + 
			(_shadowOffset && _shadowOffset.x || 0) + "px " + 
			(_shadowOffset && _shadowOffset.y || 0) + "px ";
	};

	var _shadowColor = null;
	Object.defineProperty(this, 'shadowColor', {
		get: function(){return _shadowColor;},
		set: function(val){_shadowColor = val;_setShadow();}
	});

	var _shadowOffset = null;
	Object.defineProperty(this, 'shadowOffset', {
		get: function(){return _shadowOffset;},
		set: function(val){_shadowOffset = val;_setShadow();}
	});

	var _title = '';
	Object.defineProperty(this, 'text', {
		get: function(){return _title ? _title : obj.dom.innerHTML;},
		set: function(val){_title = val; obj.dom.innerHTML = val.replace(/\n/g, '<br />'); obj.render(null);}
	});

	Object.defineProperty(this, 'textAlign', {
		get: function(){return obj.dom.style.textAlign;},
		set: function(val){return obj.dom.style.textAlign = val;}
	});

	var _textid = null;
	Object.defineProperty(this, 'textid', {
		get: function(){return _textid;},
		set: function(val){_textid = val; text = L(textid);}
	});

	Object.defineProperty(this, 'wordWrap', {
		get: function(){return true;}
	});
	
	var _selectedColor = null, _prevTextColor = null, _selectedColorLoaded = false;
	Object.defineProperty(this, 'selectedColor', {
		get: function(){return _selectedColor;},
		set: function(val) {
			_selectedColor = val;
			if (!_selectedColorLoaded) {
				_selectedColorLoaded = true;
				obj.dom.addEventListener('focus', function() {
					_prevTextColor = obj.color;
					obj.color = _selectedColor;
				}, false);
				obj.dom.addEventListener('blur', function() {
					if (_prevTextColor) {
						obj.color = _prevTextColor;
					}
				}, false);
			}
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});

	Ti._5.preset(this, ["backgroundPaddingBottom", "backgroundPaddingLeft", "backgroundPaddingRight", "backgroundPaddingTop", "shadowColor", "shadowOffset", "textAlign", "text", "textid", "size", "selectedColor"], args);
	
	Ti._5.presetUserDefinedElements(this, args);
});

;
Ti._5.createClass('Titanium.UI.OptionDialog', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'optiondialog', args, 'OptionDialog');

	// Properties
	var _androidView = null;
	Object.defineProperty(this, 'androidView', {
		get: function(){return _androidView;},
		set: function(val){return _androidView = val;}
	});

	var _cancel = null;
	Object.defineProperty(this, 'cancel', {
		get: function(){return _cancel;},
		set: function(val){return _cancel = val;}
	});

	var _destructive = null;
	Object.defineProperty(this, 'destructive', {
		get: function(){return _destructive;},
		set: function(val){return _destructive = val;}
	});

	var _options = null;
	Object.defineProperty(this, 'options', {
		get: function(){return _options;},
		set: function(val){return _options = val;}
	});

	var _selectedIndex = null;
	Object.defineProperty(this, 'selectedIndex', {
		get: function(){return _selectedIndex;},
		set: function(val){return _selectedIndex = val;}
	});

	var _title = null;
	Object.defineProperty(this, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

	var _titleid = null;
	Object.defineProperty(this, 'titleid', {
		get: function(){return _titleid;},
		set: function(val){return _titleid = val;}
	});

	// Methods
	this.show = function(){
		console.debug('Method "Titanium.UI.OptionDialog#.show" is not implemented yet.');
	};

	// Events
	this.addEventListener('click', function(){
		console.debug('Event "click" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.Picker', function(args){
	var obj = this;
	var _columnIndex = 0;
	// Interfaces
	var _type = args && args.type ? args.type : Titanium.UI.PICKER_TYPE_PLAIN;
	switch (_type) {
		case Titanium.UI.PICKER_TYPE_DATE_AND_TIME:
			Ti._5.DOMView(this, 'input', args, 'Picker');
			this.dom.type = 'datetime';
			break;
		case Titanium.UI.PICKER_TYPE_DATE:
			Ti._5.DOMView(this, 'input', args, 'Picker');
			this.dom.type = 'date';
			break;
		case Titanium.UI.PICKER_TYPE_COUNT_DOWN_TIMER:
		case Titanium.UI.PICKER_TYPE_TIME:
			Ti._5.DOMView(this, 'input', args, 'Picker');
			this.dom.type = 'date';
			break;
		case Titanium.UI.PICKER_TYPE_PLAIN:
		default:
			Ti._5.DOMView(this, 'select', args, 'Picker');
	}
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	
	// Properties
	Object.defineProperty(this, 'type', {
		get: function(){return _type;},
		set: function(val){_type = val;}
	});

	var _columns = [];
	Object.defineProperty(this, 'columns', {
		get: function(){return _columns;},
		set: function(val){return _columns = val;}
	});

	var _countDownDuration = 0;
	Object.defineProperty(this, 'countDownDuration', {
		get: function(){return _countDownDuration;},
		set: function(val){return _countDownDuration = val;}
	});

	var _locale = null;
	Object.defineProperty(this, 'locale', {
		get: function(){return _locale;},
		set: function(val){return _locale = val;}
	});

	var _minDate = null;
	Object.defineProperty(this, 'minDate', {
		get: function(){return _minDate;},
		set: function(val){return _minDate = val;}
	});

	var _minuteInterval = 1;
	Object.defineProperty(this, 'minuteInterval', {
		get: function(){return _minuteInterval;},
		set: function(val){_minuteInterval = 30 < val ? 30 : 1 > val ? 1 : val;}
	});

	var _selectionIndicator = false;
	Object.defineProperty(this, 'selectionIndicator', {
		get: function(){return _selectionIndicator;},
		set: function(val){return _selectionIndicator = val;}
	});

	var _useSpinner = false;
	Object.defineProperty(this, 'useSpinner', {
		get: function(){return _useSpinner;},
		set: function(val){return _useSpinner = val;}
	});

	var _value = null;
	Object.defineProperty(this, 'value', {
		get: function(){return _value;},
		set: function(val){return _value = val;}
	});

	var _visibleItems = null;
	Object.defineProperty(this, 'visibleItems', {
		get: function(){return obj.dom.size;},
		set: function(val){ 
			// We need this for setting 'size' property in constructor
			setTimeout(
				function() {
					obj.dom.size = parseInt(val);
			}, 10);
		}
	});
	
	Ti._5.preset(obj, ["columns", "countDownDuration", "visibleItems"], args);
	Ti._5.presetUserDefinedElements(this, args);
	
	// API Methods
	obj.render = function(parent) {
		obj._parent = parent;
		if (parent) {
			// handle horizontal layout
			if (parent['layoutStyle']=='horizontal') {
				obj.dom.style.cssFloat = 'left';
				obj.dom.style.position = 'relative';
				obj.dom.style.marginLeft = (obj.args) ? obj.args['left'] : '';
				obj.dom.style.left = '';
				obj.dom.style.marginTop = '';
			}
			// handle vertical layout
			else if (parent['layoutStyle']=='vertical') {
				parent.dom.style.clear = 'both';
				obj.dom.style.cssFloat = '';
				obj.dom.style.position = 'relative';
				obj.dom.style.marginLeft = '';
				obj.dom.style.marginTop = (obj.args) ? obj.args['top'] : '';
				obj.dom.style.display = 'block';
				obj.dom.style.top = '';					
			}
			parent._getAddContainer().appendChild(obj.dom);
		} 
		if (obj._children) {
			for (var c=0;c<obj._children.length;c++) {
				if (obj._children[c].visible) {
					obj._children[c].render(obj);
				}
				//obj._children[c].render(obj._innerContainer ? obj._innerContainer : obj);
			}
		}
		obj._rendered = true;
	};

	// Methods
	var _rows = null;
	this.add = function(rows){
		if (-1 == rows.constructor.toString().indexOf('Array')) {
			rows = [rows];
		}
		if (!_rows) {
			_rows = [];
		}
		obj._children = obj._children || [];
		for (var iCounter = 0; iCounter < rows.length; iCounter++) {
			obj._children.push(rows[iCounter]);
			_rows.push(rows[iCounter]);
		}

		obj.render(null);
	};
	this.getSelectedRow = function(col){
		return _rows[obj.dom.selectedIndex];
	};
	this.reloadColumn = function(){
		console.debug('Method "Titanium.UI.Picker#.reloadColumn" is not implemented yet.');
	};
	this.setSelectedRow = function(col, row, animated){
		if (Titanium.UI.PICKER_TYPE_PLAIN != obj.type) {
			return;
		}
		/*
		if (animated) {
			obj.animate({"props": "opacity", "duration": "2s"});
		}
		*/
		obj.dom.selectedIndex = row;
		// The onchange event does not fire when the selected option of the
		// select object is changed programatically
		var oEvent = {
			source			: obj,
			type			: "change",
			value			: _value,
			column			: _columns[_columnIndex], 
			columnIndex		: _columnIndex,
			selectedValue	: _rows[obj.dom.selectedIndex].title,
			rowIndex		: obj.dom.selectedIndex,
			row				: _rows[obj.dom.selectedIndex]
		};
		obj.fireEvent('change', oEvent);
	};

	// Events
	obj.dom.addEventListener('change', function(event) {
		var selectedRow = _rows[obj.dom.selectedIndex];
		// Copy some style rules
		//*
		if (_rows[obj.dom.selectedIndex].dom.style.backgroundColor) {
			obj.backgroundColor = _rows[obj.dom.selectedIndex].backgroundColor;
		}
		if (selectedRow.dom.style.color) {
			obj.color = selectedRow.color;
		}
		obj.font = selectedRow.font;
		obj.opacity = selectedRow.opacity;
		obj.borderRadius = selectedRow.borderRadius;
		obj.borderColor = selectedRow.borderColor;
		obj.borderWidth = selectedRow.borderWidth;
		if (selectedRow.dom.style.backgroundImage) {
			obj.backgroundImage = selectedRow.backgroundImage;
		}
		if (selectedRow.dom.style.backgroundGradient) {
			obj.backgroundGradient = selectedRow.backgroundGradient;
		}
		//*/

		var oEvent = {
			source			: obj,
			type			: event.type,
			value			: _value,
			column			: _columns[_columnIndex], 
			columnIndex		: _columnIndex,
			selectedValue	: 'undefined' != typeof obj.dom.selectedIndex ? _rows[obj.dom.selectedIndex].title : obj.dom.value,
			rowIndex		: obj.dom.selectedIndex,
			row				: 'undefined' != typeof obj.dom.selectedIndex ? _rows[obj.dom.selectedIndex] : null
		};
		obj.fireEvent('change', oEvent);
	}, false);
});

;
Ti._5.createClass('Titanium.UI.PickerColumn', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'pickercolumn', args, 'PickerColumn');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _rowCount = null;
	Object.defineProperty(this, 'rowCount', {
		get: function(){return _rowCount;},
		set: function(val){return _rowCount = val;}
	});

	var _rows = null;
	Object.defineProperty(this, 'rows', {
		get: function(){return _rows;},
		set: function(val){return _rows = val;}
	});

	// Methods
	this.addRow = function(){
		console.debug('Method "Titanium.UI.PickerColumn#.addRow" is not implemented yet.');
	};
	this.removeRow = function(){
		console.debug('Method "Titanium.UI.PickerColumn#.removeRow" is not implemented yet.');
	};

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.PickerRow', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'option', args, 'PickerRow');
	Ti._5.Touchable(this, args);
	args = Ti._5.extend({}, args);
	args.backgroundColor = args.backgroundColor || 'white';
	args.fontSize = args.font && args.font.size ? args.font.size : args.fontSize || '13px';
	args.fontWeight = args.font && args.font.weight ? args.font.weight : args.fontWeight || 'normal';
	args.fontStyle = args.font && args.font.style ? args.font.syle : args.fontStyle || 'normal';
	args.fontVariant = args.font && args.font.variant ? args.font.variant : args.fontVariant || 'normal';
	args.fontFamily = args.font && args.font.family ? args.font.family : args.fontFamily || 'Arial';
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	Object.defineProperty(this, 'selected', {
		get: function(){return obj.dom.selected;},
		set: function(val){obj.dom.selected = val ? true: false;}
	});

	var _title = null;
	Object.defineProperty(this, 'title', {
		get: function(){return _title;},
		set: function(val){_title = val; obj.dom.innerHTML = _title; obj.render(null);}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = val.width;
			}
			if (val.height) {
				obj.height = val.height;
			}
		}
	});
	
	var _prevDisplay = '';
	obj.show = function() {
		obj.dom.style.display = _prevDisplay ? _prevDisplay : '';
		if (obj._parent) {
			obj._parent.dom.innerHTML = '';
			obj._parent.render(null);
		}
	};
	obj.hide = function() {
		if ('none' != obj.dom.style.display) {
			_prevDisplay = obj.dom.style.display;
			obj.dom.style.display = 'none';
			if (obj._parent) {
				if (obj.dom.selected && 1 < obj._parent._children.length) {
				obj._parent._children.length > obj._parent.dom.selectedIndex ? 
					obj._parent.setSelectedRow(0, obj._parent.dom.selectedIndex+1) :
					obj._parent.setSelectedRow(0, obj._parent.dom.selectedIndex-1);
				}
				obj._parent.dom.innerHTML = '';
				obj._parent.render(null);
			}
		}
	};
	
	Ti._5.preset(obj, ["selected", "title", "size"], args);
	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.ProgressBar', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'progressbar', args, 'ProgressBar');
	// Methods
	this.color = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.color" is not implemented yet.');
	};
	this.font = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.font" is not implemented yet.');
	};
	this.max = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.max" is not implemented yet.');
	};
	this.message = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.message" is not implemented yet.');
	};
	this.min = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.min" is not implemented yet.');
	};
	this.style = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.style" is not implemented yet.');
	};
	this.value = function(){
		console.debug('Method "Titanium.UI.ProgressBar#.value" is not implemented yet.');
	};
	
	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.ScrollableView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'scrollableview', args, 'ScrollableView');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _currentPage = null;
	Object.defineProperty(this, 'currentPage', {
		get: function(){return _currentPage;},
		set: function(val){return _currentPage = val;}
	});

	var _maxZoomScale = null;
	Object.defineProperty(this, 'maxZoomScale', {
		get: function(){return _maxZoomScale;},
		set: function(val){return _maxZoomScale = val;}
	});

	var _minZoomScale = null;
	Object.defineProperty(this, 'minZoomScale', {
		get: function(){return _minZoomScale;},
		set: function(val){return _minZoomScale = val;}
	});

	var _pagingControlColor = null;
	Object.defineProperty(this, 'pagingControlColor', {
		get: function(){return _pagingControlColor;},
		set: function(val){return _pagingControlColor = val;}
	});

	var _pagingControlHeight = null;
	Object.defineProperty(this, 'pagingControlHeight', {
		get: function(){return _pagingControlHeight;},
		set: function(val){return _pagingControlHeight = val;}
	});

	var _showPagingControl = null;
	Object.defineProperty(this, 'showPagingControl', {
		get: function(){return _showPagingControl;},
		set: function(val){return _showPagingControl = val;}
	});

	var _views = null;
	Object.defineProperty(this, 'views', {
		get: function(){return _views;},
		set: function(val){return _views = val;}
	});

	// Methods
	this.addView = function(){
		console.debug('Method "Titanium.UI.ScrollableView#.addView" is not implemented yet.');
	};
	this.removeView = function(){
		console.debug('Method "Titanium.UI.ScrollableView#.removeView" is not implemented yet.');
	};
	this.scrollToView = function(){
		console.debug('Method "Titanium.UI.ScrollableView#.scrollToView" is not implemented yet.');
	};

	// Events
	this.addEventListener('scroll', function(){
		console.debug('Event "scroll" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.ScrollView', function(args){
	var obj = this;
	// Interfaces
	// outer container
	Ti._5.DOMView(this, 'div', args, 'ScrollView');
	Ti._5.Clickable(this);
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	
	this.dom.style.position = 'absolute';
	this.dom.style.overflow = "auto";

	// we need to do some DOM manipulations here - ScrollView needs to have 2 containers - outer for setting contentWidth && contentHeight,
	// and inner one - to apply everything else
	// inner container
	var _innerContainer = document.createElement('div');
	_innerContainer.style.overflow = "hidden";
	_innerContainer.style.position = "absolute";
	obj.dom.appendChild(_innerContainer);
	this._getAddContainer = function(){
		return _innerContainer;
	};
	// Properties
	this.canCancelEvents = true;
	var _contentHeight;
	Object.defineProperty(this, 'contentHeight', {
		get: function(){return _contentHeight;},
		set: function(val){_contentHeight = val; this._getAddContainer().style.height = Ti._5.parseLength(val);}
	});

	var _contentOffset = null;
	Object.defineProperty(this, 'contentOffset', {
		get: function(){return _contentOffset;},
		set: function(val){
			_contentOffset = val;
			if(typeof val.x !== 'undefined'){
				obj.dom.style.paddingLeft = Ti._5.parseLength(val.x);
			}
			if(typeof val.y !== 'undefined'){
				obj.dom.style.paddingTop = Ti._5.parseLength(val.y);
			}
		}
	});

	var _contentWidth;
	Object.defineProperty(this, 'contentWidth', {
		get: function(){return _contentWidth;},
		set: function(val){_contentWidth = val; this._getAddContainer().style.width = Ti._5.parseLength(val);}
	});

	this.disableBounce = false;
	this.horizontalBounce = false;
	this.maxZoomScale = null;
	this.minZoomScale = null;
	this.scrollType = null;

	var _showHorizontalScrollIndicator = null;
	Object.defineProperty(this, 'showHorizontalScrollIndicator', {
		get: function(){return _showHorizontalScrollIndicator;},
		set: function(val){_showHorizontalScrollIndicator = val; obj.dom.style.overflowX = _showHorizontalScrollIndicator ? "scroll" : "hidden";}
	});

	var _showVerticalScrollIndicator = null;
	Object.defineProperty(this, 'showVerticalScrollIndicator', {
		get: function(){return _showVerticalScrollIndicator;},
		set: function(val){_showVerticalScrollIndicator = val; obj.dom.style.overflowY = _showVerticalScrollIndicator ? "scroll" : "hidden";}
	});

	var _size;
	Object.defineProperty(this, 'size', {
		get: function(){return _size;},
		set: function(val){
			if(val != null && val.width != null){
				_innerContainer.style.width = Ti._5.parseLength(val.width);
			}
			if(val != null && val.height != null){
				_innerContainer.style.height = Ti._5.parseLength(val.height);
			}
		}
	});

	this.verticalBounce = null;
	this.zoomScale = null;

	// Methods
	this.scrollTo = function(x, y){
		if(x != null){
			obj.dom.scrollLeft = parseInt(x);
		}
		if(y != null){
			obj.dom.scrollTop = parseInt(y);
		}
	};

	// Events
	obj.dom.addEventListener('scroll', function(event) {
		var undef;
		var oEvent = {
			decelerating: undef,
			dragging	: undef,
			source		: event.target,
			type		: event.type,
			x			: event.pageX,
			y			: event.pageY
		};
		obj.fireEvent('scroll', oEvent);
	}, false);
	Ti._5.preset(this, ['contentHeight', 'contentWidth', 'contentOffset', 'showHorizontalScrollIndicator', 'showVerticalScrollIndicator', 'size'], args)
	Ti._5.presetUserDefinedElements(this, args);
});

;
Ti._5.createClass('Titanium.UI.SearchBar', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'input', args, 'SearchBar');
	this.dom.type = 'search';
	Ti._5.Touchable(this, args, true);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	Ti._5.Interactable(this);
	Ti._5.Clickable(this);

	// Properties
	var _autocapitalization = 0;
	var _autocapitalizationLoaded = false;
	Object.defineProperty(this, 'autocapitalization', {
		get: function() {return _autocapitalization;},
		set: function(val) {
			_autocapitalization = val;
			if (!_autocapitalizationLoaded) {
				obj.dom.addEventListener('keyup', function(event) {
					Titanium.UI._updateText(obj);
				}, false);
			}
			obj.value = Titanium.UI._capitalizeValue(_autocapitalization, obj.value);
		}
	});

	var _autocorrect = null;
	Object.defineProperty(this, 'autocorrect', {
		get: function(){return _autocorrect;},
		set: function(val){return _autocorrect = val;}
	});

	var _barColor = null;
	Object.defineProperty(this, 'barColor', {
		get: function(){return _barColor;},
		set: function(val){return _barColor = val;}
	});

	Object.defineProperty(this, 'hintText', {
		get: function() {return obj.dom.placeholder;},
		set: function(val) {
			obj.dom.placeholder = Titanium.UI._capitalizeValue(_autocapitalization, val);
		}
	});

	var _hinttextid = null;
	Object.defineProperty(this, 'hinttextid', {
		get: function(){return _hinttextid;},
		set: function(val){return _hinttextid = val; obj.hintText = L(val);}
	});

	var _keyboardType = null;
	Object.defineProperty(this, 'keyboardType', {
		get: function(){return _keyboardType;},
		set: function(val){return _keyboardType = val;}
	});

	var _prompt = null;
	Object.defineProperty(this, 'prompt', {
		get: function(){return _prompt;},
		set: function(val){return _prompt = val;}
	});

	var _promptid = null;
	Object.defineProperty(this, 'promptid', {
		get: function(){return _promptid;},
		set: function(val){return _promptid = val; obj.prompt = L(val);}
	});

	var _showCancel = null;
	Object.defineProperty(this, 'showCancel', {
		get: function(){return _showCancel;},
		set: function(val){return _showCancel = val;}
	});

	Object.defineProperty(this, 'value', {
		get: function() {return obj.dom.value;},
		set: function(val) {obj.dom.value = val ? Titanium.UI._capitalizeValue(_autocapitalization, val) : '';}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});
	
	Ti._5.preset(this, ["value", "autocapitalization", "hintText", "size"], args);
	Ti._5.presetUserDefinedElements(this, args);

	// Methods
	obj.focus = function(ev) {
		obj.dom.focus(ev);
	};
	
	obj.blur = function(ev) {
		obj.dom.blur(ev);
	};

	// Events
	this.addEventListener('cancel', function(){
		console.debug('Event "cancel" is not implemented yet.');
	});
});

;
Ti._5.createClass('Titanium.UI.Slider', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'input', args, 'Slider');
	this.dom.type = 'range'; 
	Ti._5.Clickable(this);
	Ti._5.Touchable(this, args, true);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _disabledLeftTrackImage = null;
	Object.defineProperty(this, 'disabledLeftTrackImage', {
		get: function(){return _disabledLeftTrackImage;},
		set: function(val){return _disabledLeftTrackImage = val;}
	});

	var _disabledRightTrackImage = null;
	Object.defineProperty(this, 'disabledRightTrackImage', {
		get: function(){return _disabledRightTrackImage;},
		set: function(val){return _disabledRightTrackImage = val;}
	});

	var _disabledThumbImage = null;
	Object.defineProperty(this, 'disabledThumbImage', {
		get: function(){return _disabledThumbImage;},
		set: function(val){return _disabledThumbImage = val;}
	});

	var _backgroundDisabledImage = '', _backgroundImage = ''; 
	var	_backgroundDisabledColor = '', _backgroundColor = '';
	Object.defineProperty(this, 'enabled', {
		get: function(){return !obj.dom.disabled;},
		set: function(val) {
			if (!_backgroundImage && obj.backgroundImage) {
				_backgroundImage = obj.backgroundImage;
			}
			if (!_backgroundColor && obj.backgroundColor) {
				_backgroundColor = obj.backgroundColor;
			}
			if (!val) {
				obj.dom.disabled = 'disabled';
				if (_backgroundDisabledImage) {
					obj.backgroundImage = _backgroundDisabledImage;
				}
				if (_backgroundDisabledColor) {
					obj.backgroundColor = _backgroundDisabledColor;
				}
			} else {
				obj.dom.disabled = '';
				obj.backgroundImage = _backgroundImage;
				obj.backgroundColor = _backgroundColor;
			}
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledImage', {
		get: function() {
			return _backgroundDisabledImage ? _backgroundDisabledImage : '';
		},
		set: function(val) {
			_backgroundDisabledImage = val;
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledColor', {
		get: function() {
			return _backgroundDisabledColor ? _backgroundDisabledColor : '';
		},
		set: function(val) {
			_backgroundDisabledColor = val;
		}
	});

	var _highlightedLeftTrackImage = null;
	Object.defineProperty(this, 'highlightedLeftTrackImage', {
		get: function(){return _highlightedLeftTrackImage;},
		set: function(val){return _highlightedLeftTrackImage = val;}
	});

	var _highlightedRightTrackImage = null;
	Object.defineProperty(this, 'highlightedRightTrackImage', {
		get: function(){return _highlightedRightTrackImage;},
		set: function(val){return _highlightedRightTrackImage = val;}
	});

	var _highlightedThumbImage = null;
	Object.defineProperty(this, 'highlightedThumbImage', {
		get: function(){return _highlightedThumbImage;},
		set: function(val){return _highlightedThumbImage = val;}
	});

	var _leftTrackImage = null;
	Object.defineProperty(this, 'leftTrackImage', {
		get: function(){return _leftTrackImage;},
		set: function(val){return _leftTrackImage = val;}
	});

	var _max = null;
	Object.defineProperty(this, 'max', {
		get: function(){return obj.dom.max;},
		set: function(val){return obj.dom.max = parseFloat(val);}
	});

	var _maxRange = null;
	Object.defineProperty(this, 'maxRange', {
		get: function(){return _maxRange;},
		set: function(val){return _maxRange = val;}
	});

	var _min = null;
	Object.defineProperty(this, 'min', {
		get: function(){return obj.dom.min;},
		set: function(val){return obj.dom.min = parseFloat(val);}
	});

	var _minRange = null;
	Object.defineProperty(this, 'minRange', {
		get: function(){return _minRange;},
		set: function(val){return _minRange = val;}
	});

	var _rightTrackImage = null;
	Object.defineProperty(this, 'rightTrackImage', {
		get: function(){return _rightTrackImage;},
		set: function(val){return _rightTrackImage = val;}
	});

	var _selectedLeftTrackImage = null;
	Object.defineProperty(this, 'selectedLeftTrackImage', {
		get: function(){return _selectedLeftTrackImage;},
		set: function(val){return _selectedLeftTrackImage = val;}
	});

	var _selectedRightTrackImage = null;
	Object.defineProperty(this, 'selectedRightTrackImage', {
		get: function(){return _selectedRightTrackImage;},
		set: function(val){return _selectedRightTrackImage = val;}
	});

	var _selectedThumbImage = null;
	Object.defineProperty(this, 'selectedThumbImage', {
		get: function(){return _selectedThumbImage;},
		set: function(val){return _selectedThumbImage = val;}
	});

	var _thumbImage = null;
	Object.defineProperty(this, 'thumbImage', {
		get: function(){return _thumbImage;},
		set: function(val){return _thumbImage = val;}
	});

	var _value = '';
	Object.defineProperty(this, 'value', {
		get: function(){return obj.dom.value;},
		set: function(val){
			obj.dom.value = val;
			var oEvent = {
				source		: obj,
				thumbOffset	: null,
				thumbSize	: null,
				type		: 'change',
				value		: obj.value
			};
			obj.fireEvent('change', oEvent);
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = val.width;
			}
			if (val.height) {
				obj.height = val.height;
			}
		}
	});
	
	Ti._5.preset(this, [
		"enabled", "backgroundDisabledImage", "backgroundDisabledColor",
		"max", "min", "value", "size"
	], args);
	Ti._5.presetUserDefinedElements(this, args);


	// Events
	this.dom.addEventListener('change', function(event) {
		var oEvent = {
			source		: obj,
			thumbOffset	: null,
			thumbSize	: null,
			type		: event.type,
			value		: obj.value
		};
		obj.fireEvent('change', oEvent);
	}, false);
	
});
;
Ti._5.createClass('Titanium.UI.Switch', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'Switch');
	Ti._5.Touchable(this, args, true);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	var _checkBox = document.createElement('input');
	_checkBox.type =  'checkbox';
	obj.dom.appendChild(_checkBox);
	var _titleContainer = document.createTextNode("");
	obj.dom.appendChild(_titleContainer);

	// Properties
	var _touchEnabled = true;
	Object.defineProperty(this, 'touchEnabled', {
		get: function() {
			return _touchEnabled ? _touchEnabled : '';
		},
		set: function(val) {
			_touchEnabled = val;
			if (!_touchEnabled) {
				_checkBox.disabled = 'disabled';
			} else {
				obj.enabled = _enabled;
			}
		}
	});
	
	var _enabled = true;
	var _backgroundDisabledImage = '', _backgroundImage = ''; 
	var	_backgroundDisabledColor = '', _backgroundColor = '';
	Object.defineProperty(this, 'enabled', {
		get: function(){return !_checkBox.disabled;},
		set: function(val) {
			_enabled = val ? true : false;
			if (!_backgroundImage && obj.backgroundImage) {
				_backgroundImage = obj.backgroundImage;
			}
			if (!_backgroundColor && obj.backgroundColor) {
				_backgroundColor = obj.backgroundColor;
			}
			if (!val || !_touchEnabled) {
				_checkBox.disabled = 'disabled';
				if (_backgroundDisabledImage) {
					obj.backgroundImage = _backgroundDisabledImage;
				}
				if (_backgroundDisabledColor) {
					obj.backgroundColor = _backgroundDisabledColor;
				}
			} else {
				_checkBox.disabled = '';
				obj.backgroundImage = _backgroundImage;
				obj.backgroundColor = _backgroundColor;
			}
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledImage', {
		get: function() {
			return _backgroundDisabledImage ? _backgroundDisabledImage : '';
		},
		set: function(val) {
			_backgroundDisabledImage = val;
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledColor', {
		get: function() {
			return _backgroundDisabledColor ? _backgroundDisabledColor : '';
		},
		set: function(val) {
			_backgroundDisabledColor = val;
		}
	});

	var _style = Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});
	
	var _title = '';
	Object.defineProperty(this, 'title', {
		get: function() {return _title ? _title : obj.dom.innerHTML;},
		set: function(val) {
			if (obj.style == Ti.UI.Android.SWITCH_STYLE_CHECKBOX) {
				_title = val;
				obj.dom.innerHTML = '';
				obj.dom.appendChild(_checkBox);
				obj.dom.appendChild(document.createTextNode(val));
				obj.render(null);
			}
		}
	});

	var _titleOff = null;
	Object.defineProperty(this, 'titleOff', {
		get: function(){return _titleOff;},
		set: function(val){
			_titleOff = val;
			if (!obj.dom.checked && obj.style == Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON) {
				obj.title = _titleOff;
			}
		}
	});

	var _titleOn = null;
	Object.defineProperty(this, 'titleOn', {
		get: function(){return _titleOn;},
		set: function(val){
			_titleOn = val; 
			if (obj.dom.checked && obj.style == Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON) {
				obj.title = _titleOn;
			}
		}
	});

	Object.defineProperty(this, 'value', {
		get: function(){return _checkBox.checked;},
		set: function(val){_checkBox.checked = val;_checking(null);}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = val.width;
			}
			if (val.height) {
				obj.height = val.height;
			}
		}
	});
	
	Ti._5.preset(this, [
		"touchEnabled", "style", "title", "backgroundDisabledImage", "backgroundDisabledColor", "enabled",
		"size", "value", "titleOff", "titleOn"
	], args);
	Ti._5.presetUserDefinedElements(this, args);

	// Events
	obj.dom.addEventListener('click', function(event) {
		if (_touchEnabled && _checkBox !== event.target) {
			_checkBox.checked = !_checkBox.checked;
			_checking();
		}
	}, false);
	obj.dom.addEventListener('touchstart', function(event) {
		if (_touchEnabled && _checkBox !== event.target && _checkBox.touchstart) {
			_checkBox.checked = !_checkBox.checked;
			_checking();
		}
	}, false);
	// We need this here for firing 'click'/'touchstart' & 'change' events in native order 
	Ti._5.Clickable(this);
	
	function _checking(event) {
		if (_checkBox.checked && _titleOn && obj.style == Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON) {
			obj.title = _titleOn;
		}
		if (!_checkBox.checked && _titleOff && obj.style == Ti.UI.Android.SWITCH_STYLE_TOGGLEBUTTON) {
			obj.title = _titleOff;
		}
		var oEvent = {
			source		: obj,
			type		: 'change',
			value		: _checkBox.checked
		};
		obj.fireEvent('change', oEvent);
	}
	
	_checkBox.addEventListener('change', _checking, false);
});

;
Ti._5.createClass('Titanium.UI.Tab', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'Tab');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	var _oldShow = this.show;
	this.show = function(){
		_window.show();
		_oldShow();
		Ti.UI.currentTab = obj;
	};

	var _oldHide = this.hide;
	this.hide = function(){
		_window.hide();
		_oldHide();
		if(Ti.UI.currentTab == obj){
			Ti.UI.currentTab = null;
		}
	};

	// FIXME non-TiMobile method
	this.open = function(win, args){
		win.add(obj);
		win.open();
	};

	// Properties
	var _badge = null;
	Object.defineProperty(this, 'badge', {
		get: function(){return _badge;},
		set: function(val){return _badge = val;}
	});

	var _icon = null;
	Object.defineProperty(this, 'icon', {
		get: function(){return _icon;},
		set: function(val){return _icon = val;}
	});

	var _title = null;
	Object.defineProperty(this, 'title', {
		get: function(){return _title;},
		set: function(val){return _title = val;}
	});

	var _window = null;
	Object.defineProperty(this, 'window', {
		get: function(){return _window;},
		set: function(val){_window = val; _window.add(obj);}
	});

	Ti._5.preset(this, ['window', 'title', 'icon', 'badge'], args);
	Ti._5.presetUserDefinedElements(this, args);
});

;
Ti._5.createClass('Titanium.UI.TabbedBar', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'tabbedbar', args, 'TabbedBar');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _index = null;
	Object.defineProperty(this, 'index', {
		get: function(){return _index;},
		set: function(val){return _index = val;}
	});

	var _labels = null;
	Object.defineProperty(this, 'labels', {
		get: function(){return _labels;},
		set: function(val){return _labels = val;}
	});

	var _style = null;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
Ti._5.createClass('Titanium.UI.TabGroup', function(args){
	var obj = this;
	this.tabs = [];
	var _activeTabIndex = null;

	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'TabGroup');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	var _tabsHeaders = document.createElement("div");
	_tabsHeaders.className = "tabsHeaders";
	var _tabsContent = document.createElement("div");
	_tabsHeaders.className = "tabsContent";
	this.dom.appendChild(_tabsHeaders);
	this.dom.appendChild(_tabsContent);

	// Properties
	var _activeTab = null;
	Object.defineProperty(this, 'activeTab', {
		get: function(){return _activeTab;},
		set: function(val){obj.setActiveTab(val);}
	});

	var _allowUserCustomization = null;
	Object.defineProperty(this, 'allowUserCustomization', {
		get: function(){return _allowUserCustomization;},
		set: function(val){return _allowUserCustomization = val;}
	});

	var _barColor = null;
	Object.defineProperty(this, 'barColor', {
		get: function(){return _barColor;},
		set: function(val){return _barColor = val;}
	});

	var _editButtonTitle = null;
	Object.defineProperty(this, 'editButtonTitle', {
		get: function(){return _editButtonTitle;},
		set: function(val){return _editButtonTitle = val;}
	});

	// Methods
	this.addTab = function(tab){
		obj.tabs.push(tab);
		var tabIndex = obj.tabs.length;
		var tabHeader = document.createElement("div");
		tabHeader.onclick = function(){
			tab.open();
		};
		var _tabsHeaders = document.createElement("div");
		var _tabsContent = document.createElement("div");
	};

	this.close = function(){
		console.debug('Method "Titanium.UI.TabGroup#.close" is not implemented yet.');
	};

	this.open = function(){
		if(obj.tabs.length == 0 || _activeTabIndex > obj.tabs.length){
			return;
		}
		
		obj.tabs[_activeTabIndex - 1 || 0].show();
	};

	this.removeTab = function(){
		console.debug('Method "Titanium.UI.TabGroup#.removeTab" is not implemented yet.');
	};

	this.setActiveTab = function(indexOrObject){
		if(typeof indexOrObject == 'Object'){
			obj.addTab(indexOrObject);
			obj.setActiveTab(obj.tabs.length);
		} else {
			_activeTabIndex = indexOrObject;
		}
	};

	// Events
	this.addEventListener('blur', function(){
		console.debug('Event "blur" is not implemented yet.');
	});
	this.addEventListener('close', function(){
		console.debug('Event "close" is not implemented yet.');
	});
	this.addEventListener('focus', function(){
		console.debug('Event "focus" is not implemented yet.');
	});
	this.addEventListener('open', function(){
		console.debug('Event "open" is not implemented yet.');
	});

	Ti._5.presetUserDefinedElements(this, args);
});

;
Ti._5.createClass('Titanium.UI.TableView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'ul', args, 'TableView');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	// Set needed style rules
	this.dom.style.listStyleType = 'none';
	this.dom.style.paddingLeft = '0';
	this.dom.style.marginTop = '0';
	this.dom.style.overflow = 'auto';
	
	function _addRowAdditionalData(row) {
		row.dom.style.borderBottom = '1px solid ' + obj.separatorColor;
		row.dom.style.height = row.height || (obj.rowHeight + 'px');
		row._parents = [obj];
		
		return row;
	}

	// Properties
	var _allowsSelection = null;
	Object.defineProperty(this, 'allowsSelection', {
		get: function(){return _allowsSelection;},
		set: function(val){return _allowsSelection = val;}
	});

	var _allowsSelectionDuringEditing = null;
	Object.defineProperty(this, 'allowsSelectionDuringEditing', {
		get: function(){return _allowsSelectionDuringEditing;},
		set: function(val){return _allowsSelectionDuringEditing = val;}
	});

	var _data = null;
	Object.defineProperty(this, 'data', {
		get: function(){return _data;},
		set: function(val){
			if (val[0] instanceof Titanium.UI.TableViewRow) {
				_data = [];
				obj._children = [];
				obj.dom.innerHTML = '';
				obj.add(val);	
			} else {
				_data = val;
				obj._children = [];
				var oRow = null;
				for (var iCounter=0; iCounter < _data.length; iCounter++) {
					oRow = _addRowAdditionalData(Titanium.UI.createTableViewRow(_data[iCounter]));
					obj._children.push(oRow);
				}
				obj.dom.innerHTML = '';
				obj.render(null);
			}
		}
	});
	
	this.add = function(view) {
		obj._children = obj._children || [];
		_data = _data || [];
		
		var aData = view instanceof Array ? view : [view];
		
		for (var iCounter = 0; iCounter < aData.length; iCounter++) {
			// creating cross-link
			obj._children.push(aData[iCounter]);
			aData[iCounter]._parents.push(obj);
			aData[iCounter].dom.style.borderBottom = '1px solid ' + obj.separatorColor;
			aData[iCounter].dom.style.height = obj.rowHeight + 'px';
			_data.push(aData[iCounter].args);
		}
		// if we have been rendered and add is called - re-render
		if (obj._rendered){
			obj.render(null);
		}
	};

	var _editable = null;
	Object.defineProperty(this, 'editable', {
		get: function(){return _editable;},
		set: function(val){return _editable = val;}
	});

	var _editing = null;
	Object.defineProperty(this, 'editing', {
		get: function(){return _editing;},
		set: function(val){return _editing = val;}
	});

	var _filterAttribute = null;
	Object.defineProperty(this, 'filterAttribute', {
		get: function(){return _filterAttribute;},
		set: function(val){return _filterAttribute = val;}
	});

	var _filterCaseInsensitive = null;
	Object.defineProperty(this, 'filterCaseInsensitive', {
		get: function(){return _filterCaseInsensitive;},
		set: function(val){return _filterCaseInsensitive = val;}
	});

	var _footerTitle = null;
	Object.defineProperty(this, 'footerTitle', {
		get: function(){return _footerTitle;},
		set: function(val){return _footerTitle = val;}
	});

	var _footerView = null;
	Object.defineProperty(this, 'footerView', {
		get: function(){return _footerView;},
		set: function(val){return _footerView = val;}
	});

	var _headerTitle = null;
	Object.defineProperty(this, 'headerTitle', {
		get: function(){return _headerTitle;},
		set: function(val){return _headerTitle = val;}
	});

	var _headerView = null;
	Object.defineProperty(this, 'headerView', {
		get: function(){return _headerView;},
		set: function(val){return _headerView = val;}
	});

	var _index = null;
	Object.defineProperty(this, 'index', {
		get: function(){return _index;},
		set: function(val){return _index = val;}
	});

	var _maxRowHeight = null;
	Object.defineProperty(this, 'maxRowHeight', {
		get: function(){return _maxRowHeight;},
		set: function(val){return _maxRowHeight = val;}
	});

	var _minRowHeight = null;
	Object.defineProperty(this, 'minRowHeight', {
		get: function(){return _minRowHeight;},
		set: function(val){return _minRowHeight = val;}
	});

	var _moving = null;
	Object.defineProperty(this, 'moving', {
		get: function(){return _moving;},
		set: function(val){return _moving = val;}
	});

	var _rowHeight = 50;
	Object.defineProperty(this, 'rowHeight', {
		get: function(){return _rowHeight;},
		set: function(val){return _rowHeight = val;}
	});

	var _scrollable = true;
	Object.defineProperty(this, 'scrollable', {
		get: function(){return _scrollable;},
		set: function(val){
			_scrollable = val;
			if (_scrollable) {
				this.dom.style.overflow = 'auto';
			} else {
				this.dom.style.overflow = 'hidden';
			}
		}
	});

	var _search = null;
	Object.defineProperty(this, 'search', {
		get: function(){return _search;},
		set: function(val){return _search = val;}
	});

	var _searchHidden = true;
	Object.defineProperty(this, 'searchHidden', {
		get: function(){return _searchHidden;},
		set: function(val){return _searchHidden = val ? true : false;}
	});

	var _separatorColor = '#e0e0e0';
	Object.defineProperty(this, 'separatorColor', {
		get: function(){return _separatorColor;},
		set: function(val){return _separatorColor = val;}
	});

	var _separatorStyle = null;
	Object.defineProperty(this, 'separatorStyle', {
		get: function(){return _separatorStyle;},
		set: function(val){return _separatorStyle = val;}
	});

	var _style = null;
	Object.defineProperty(this, 'style', {
		get: function(){return _style;},
		set: function(val){return _style = val;}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});
	
	Ti._5.preset(this, [
		"data", "rowHeight", "scrollable", "separatorColor", "size"
	], args);
	Ti._5.presetUserDefinedElements(this, args);
	
	this.dom.addEventListener('click', function(event) {
		// If tableview has children they will fire this event
		if (obj._children && 0 < obj._children.length) {
			return true;
		}
		var oEvent = {
			detail		: false,
			globalPoint	: { x:event.pageX, y:event.pageY }, 
			index		: null,
			row			: null,
			rowData		: null,
			searchMode	: false,
			section		: null,
			source		: obj,
			type		: event.type,
			x			: event.pageX,
			y			: event.pageY
		};
		obj.fireEvent('click', oEvent);
	}, false);
	
	this.dom.addEventListener('dblclick', function(event) {
		// If tableview has children they will fire this event 
		if (obj._children && 0 < obj._children.length) {
			return true;
		}
		var oEvent = {
			globalPoint	: { x:event.pageX, y:event.pageY }, 
			source		: obj,
			type		: event.type,
			x			: event.pageX,
			y			: event.pageY
		};
		obj.fireEvent('dblclick', oEvent);
	}, false);

	// Methods
	this.appendRow = function(row, properties){
		obj.add(row);
	};
	this.deleteRow = function(row, properties){
		//var oData = _data.splice(row, 1);
		//var oRow = obj._children.splice(row, 1);
		_data.splice(parseInt(row), 1);
		obj._children.splice(parseInt(row), 1);
		obj.dom.innerHTML = '';
		obj.render(null);
		/*
		obj.fireEvent('delete', {
			detail		: false,
			index		: row,
			row			: oRow,
			rowData		: oData,
			searchMode	: false,
			section		: null,
			source		: obj,
			type			: 'delete'
		});
		*/
	};
	this.deselectRow = function(row){
		obj._children[parseInt(row)]._deselectRow();
	};
	this.insertRowAfter = function(index, row, properties){
		_data.splice(parseInt(index)+1, 0, row.args);
		row = _addRowAdditionalData(row);
		obj._children.splice(parseInt(index)+1, 0, row);
		obj.render(null);
	};
	this.insertRowBefore = function(index, row, properties){
		_data.splice(parseInt(index), 0, row.args);
		row = _addRowAdditionalData(row);
		obj._children.splice(parseInt(index), 0, row);
		obj.render(null);
	};
	this.scrollToIndex = function(index, properties) {
		obj.dom.scrollTop = parseInt(index * obj.rowHeight);
	};
	this.scrollToTop = function(yCoord, properties) {
		obj.dom.scrollTop = parseFloat(yCoord);
	};
	this.selectRow = function(row){
		for (var iCounter=0; iCounter < obj._children.length; iCounter++) {
			this.deselectRow(iCounter); 
		}
		obj._children[parseInt(row)]._selectRow();
	};
	this.setData = function(data, properties) {
		if (!data || !data[0]) {
			_data = [];
			obj._children = [];
			obj.dom.innerHTML = '';
			obj.render(null);
		} else if (data[0] instanceof Titanium.UI.TableViewRow) {
			_data = [];
			obj._children = [];
			obj.add(data);	
		} else {
			obj.data = data;
		}
	};
	this.updateRow = function(index, row, properties){
		_data.splice(parseInt(index), 1, row.args);
		row = _addRowAdditionalData(row);
		obj._children.splice(parseInt(index), 1, row);
		obj.dom.innerHTML = '';
		obj.render(null);
	};

	// Events
	this.addEventListener('delete', function(){
		console.debug('Event "delete" is not implemented yet.');
	});
	this.addEventListener('move', function(){
		console.debug('Event "move" is not implemented yet.');
	});
	
	var _scrollTimer = null;
	this.dom.addEventListener('scroll', function(event) {
		clearTimeout(_scrollTimer);
		var oEvent =  {
			contentOffset		: {x: obj.dom.scrollLeft, y:obj.dom.scrollTop},
			contentSize			: {width: obj.dom.scrollWidth, height: obj.dom.scrollHeight},
			firstVisibleItem	: parseInt(obj.dom.scrollTop / obj.rowHeight),
			size				: {width: obj.dom.offsetWidth, height: obj.dom.offsetHeight},
			source				: obj,
			totalItemCount		: _data.length,
			type				: 'scroll',
			visibleItemCount	: Math.round(obj.dom.offsetHeight / obj.rowHeight)
		};
		_scrollTimer = setTimeout(function() {
			obj.fireEvent('scrollEnd', {
				contentOffset		: oEvent.contentOffset,
				contentSize			: oEvent.contentSize,
				size				: oEvent.size,
				source				: oEvent.source,
				type				: 'scrollEnd'
			});
		}, 300);	
		obj.fireEvent('scroll', oEvent);
	}, false);
});
;
Ti._5.createClass('Titanium.UI.TableViewRow', function(args){
	var obj = this;

	args = Ti._5.extend({}, args);
	// Set some default values
	args['backgroundColor'] = args['backgroundColor'] ? args['backgroundColor'] : 'transparent';
	if (!args['font']) {
		args['fontSize'] = args['fontSize'] ? args['fontSize'] : 20;
		args['fontWeight'] = args['fontWeight'] ? args['fontWeight'] : 'bold';
		args['fontFamily'] = args['fontFamily'] ? args['fontFamily'] : 'Helvetica';
	}
		
	// Interfaces
	Ti._5.DOMView(this, 'li', args, 'TableViewRow');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	// Set needed style rules
	//this.dom.style.display = 'table-cell';
	this.dom.style.lineHeight = args['height'] ? args['height'] : '50px';
	this.dom.style.verticalAlign = 'middle';
	this.dom.style.position = 'relative';
	this.dom.style.paddingLeft = '10px';
	this.dom.style.overflow = 'hidden';
	
	this.add = function(view) {
		view.dom.style.top = '0';
		obj._children = obj._children || [];

		// creating cross-link
		obj._children.push(view);
		obj._parent = view;
		view._parents.push(obj);
		// if we have been rendered and add is called - re-render
		if (obj._rendered){
			obj.render(null);
		}
	};

	// Properties
	var _className = null;
	Object.defineProperty(this, 'className', {
		get: function(){return _className;},
		set: function(val){return _className = val;}
	});

	var _colorRow = '#000000';
	Object.defineProperty(this, 'color', {
		get: function(){return _colorRow;},
		set: function(val){
			_colorRow = val;
			obj.dom.style.color = val;
		}
	});

	var _hasCheck = false;
	Object.defineProperty(this, 'hasCheck', {
		get: function(){return _hasCheck;},
		set: function(val){
			_hasCheck = val;
			if (_hasCheck) {
				var check = new Object();
				Ti._5.DOMView(check, "div", {right:10,backgroundImage:'images/hasCheck.png', height:13,width:13, top:'50%'});
				Ti._5.Touchable(check);
				Ti._5.Styleable(check, {right:10,backgroundImage:'images/hasCheck.png', height:13,width:13, top:'50%'});
				Ti._5.Positionable(check, {right:10,backgroundImage:'images/hasCheck.png', height:13,width:13, top:'50%'});
				check.dom.style.marginTop = -7;
				obj.dom.appendChild(check.dom);
			}
		}
	});

	var _hasChild = false;
	Object.defineProperty(this, 'hasChild', {
		get: function(){return _hasChild;},
		set: function(val){
			_hasChild = val;
			if (_hasChild) {
				var child = new Object();
				Ti._5.DOMView(child, "div", {right:10,backgroundImage:'images/hasChild.png', height:13,width:10, top:'50%'});
				Ti._5.Touchable(child);
				Ti._5.Styleable(child, {right:10,backgroundImage:'images/hasChild.png', height:13,width:10, top:'50%'});
				Ti._5.Positionable(child, {right:10,backgroundImage:'images/hasChild.png', height:13,width:10, top:'50%'});
				child.dom.style.marginTop = -7;
				obj.dom.appendChild(child.dom);
			}
		}
	});

	var _hasDetail = false;
	Object.defineProperty(this, 'hasDetail', {
		get: function(){return _hasDetail;},
		set: function(val){
			_hasDetail = val;
			if (_hasDetail) {
				var detail = new Object();
				Ti._5.DOMView(detail, "div", {right:10,backgroundImage:'images/hasDetail.png', height:32,width:28, top:'50%'});
				Ti._5.Touchable(detail);
				Ti._5.Styleable(detail, {right:10,backgroundImage:'images/hasDetail.png', height:32,width:28, top:'50%'});
				Ti._5.Positionable(detail, {right:10,backgroundImage:'images/hasDetail.png', height:32,width:28, top:'50%'});
				detail.dom.style.marginTop = -16;
				obj.dom.appendChild(detail.dom);
			}
		}
	});

	var _indentionLevel = 0;
	Object.defineProperty(this, 'indentionLevel', {
		get: function(){return _indentionLevel;},
		set: function(val){return _indentionLevel = parseInt(val);}
	});

	var _layout = null;
	Object.defineProperty(this, 'layout', {
		get: function(){return _layout;},
		set: function(val){return _layout = val;}
	});

	var _leftImage = null;
	Object.defineProperty(this, 'leftImage', {
		get: function(){return _leftImage;},
		set: function(val){return _leftImage = val;}
	});

	var _rightImage = null;
	Object.defineProperty(this, 'rightImage', {
		get: function(){return _rightImage;},
		set: function(val){return _rightImage = val;}
	});

	var _selectedBackgroundColor = '#cccccc'; //obj.backgroundColor;
	Object.defineProperty(this, 'selectedBackgroundColor', {
		get: function(){return _selectedBackgroundColor;},
		set: function(val){return _selectedBackgroundColor = val;}
	});

	var _selectedBackgroundImage = null;
	Object.defineProperty(this, 'selectedBackgroundImage', {
		get: function(){return _selectedBackgroundImage;},
		set: function(val){return _selectedBackgroundImage = val;}
	});

	var _selectedColor = obj.color;
	Object.defineProperty(this, 'selectedColor', {
		get: function(){return _selectedColor;},
		set: function(val){return _selectedColor = val;}
	});

	var _selectionStyle = null;
	Object.defineProperty(this, 'selectionStyle', {
		get: function(){return _selectionStyle;},
		set: function(val){
			_selectionStyle = val;
			for (var sProp in val) {
				if ("undeined" != typeof obj[sProp]) {
					obj[sProp] = val[sProp];
				}
			}				
		}
	});

	var _title = '';
	Object.defineProperty(this, 'title', {
		get: function(){return _title ? _title : obj.dom.innerHTML;},
		set: function(val) {
			_title = val;
			obj.dom.innerHTML = val;
			obj.render(null);
		}
	});
	
	Object.defineProperty(obj, 'top', {
		get: function() {
			return obj.dom.style.paddingTop ? parseInt(obj.dom.style.paddingTop) : '';
		},
		set: function(val) {
			obj.dom.style.paddingBottom = '';
			obj.dom.style.paddingTop = Ti._5.parseLength(val);
		}
	});
	
	Object.defineProperty(obj, 'bottom', {
		get: function() {
			return obj.dom.style.paddingBottom ? parseInt(obj.dom.style.paddingBottom) : '';
		},
		set: function(val) {
			obj.dom.style.paddingTop = '';
			obj.dom.style.paddingBottom = Ti._5.parseLength(val);
		}
	});
	
	Object.defineProperty(obj, 'left', {
		get: function() {
			return obj.dom.style.paddingLeft ? parseInt(obj.dom.style.paddingLeft) : '';
		},
		set: function(val) {
			obj.dom.style.paddingRight = '';
			obj.dom.style.paddingLeft = Ti._5.parseLength(val);
		}
	});
	
	Object.defineProperty(obj, 'right', {
		get: function() {
			return obj.dom.style.paddingRight ? parseInt(obj.dom.style.paddingRight) : '';
		},
		set: function(val) {
			obj.dom.style.paddingLeft = '';
			obj.dom.style.paddingRight = Ti._5.parseLength(val);
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});
	
	var _height;
	Object.defineProperty(obj, 'height', {
		get: function() {
			return _height;
		},
		set: function(val) {
			_height = val;
			obj.dom.style.height =  val + (/^\d+$/.test(val) ? 'px' : "");
			obj.dom.style.lineHeight =  obj.dom.style.height;
		}
	});

	Ti._5.preset(this, [
		"className", "color", "title", "hasCheck", "hasChild", "hasDetail", "top", "bottom", "left",
		"right", "size", "selectedBackgroundColor", "selectedBackgroundImage", "selectedColor", 
		"selectionStyle", "backgroundDisabledImage", "backgroundDisabledColor", "enabled", "height"
	], args);
	Ti._5.presetUserDefinedElements(this, args);
	
	function setColoredStyle() {
		if (_selectedBackgroundImage) {
			obj.dom.style.backgroundImage = 'url("' + Ti._5.getAbsolutePath(_selectedBackgroundImage) + '")';
			obj.dom.style.backgroundRepeat = "no-repeat";
		}
		if (_selectedBackgroundColor) {
			obj.dom.style.backgroundColor = _selectedBackgroundColor;
		}
		if (_selectedColor){
			obj.dom.style.color = _selectedColor;
		}
	}
	
	function setStatusQuo() {
		obj.dom.style.backgroundImage = obj.backgroundImage;
		obj.dom.style.backgroundColor = obj.backgroundColor;
		obj.dom.style.color = obj.color;
	}
	
	obj._selectRow = function() {
		setColoredStyle();
	}
	
	obj._deselectRow = function() {
		setStatusQuo();
	}
	
	this.dom.addEventListener('touchstart', function(event) {
		setColoredStyle();
	}, false);

	this.dom.addEventListener('touchend', function(event) {
		setStatusQuo();
	}, false);		
	
	this.dom.addEventListener('mousedown', function(event) {
		setColoredStyle();
	}, false);
	
	this.dom.addEventListener('mouseup', function(event) {
		setStatusQuo();
	}, false);
	
	this.dom.addEventListener('click', function(event) {
		var oEl = event.target, index = null, row = null;
		while ('LI' != oEl.tagName.toUpperCase() && oEl.parentNode) {
			oEl = oEl.parentNode;
		}
		var parent = obj._parents[0];
		for (var iCounter = 0; iCounter < parent._children.length; iCounter++) {
			if (parent._children[iCounter].dom == oEl) {
				index = iCounter;
				break;
			}
		}
		var oEvent = {
			detail		: false,
			globalPoint	: { x:event.pageX, y:event.pageY }, 
			index		: index,
			row			: obj,
			rowData		: parent.data[index],
			searchMode	: false,
			section		: null,
			source		: obj,
			type		: event.type,
			x			: event.pageX,
			y			: event.pageY
		};
		obj.fireEvent('click', oEvent);
		obj._parents[0].fireEvent('click', oEvent);
	}, false);
	
	this.dom.addEventListener('dblclick', function(event) {
		var oEvent = {
			globalPoint	: { x:event.pageX, y:event.pageY }, 
			source		: obj,
			type		: event.type,
			x			: event.pageX,
			y			: event.pageY
		};
		obj.fireEvent('dblclick', oEvent);
		obj._parents[0].fireEvent('dblclick', oEvent);
	}, false);
});
;
Ti._5.createClass('Titanium.UI.TableViewSection', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'tableviewsection', args, 'TableViewSection');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _footerTitle = null;
	Object.defineProperty(this, 'footerTitle', {
		get: function(){return _footerTitle;},
		set: function(val){return _footerTitle = val;}
	});

	var _footerView = null;
	Object.defineProperty(this, 'footerView', {
		get: function(){return _footerView;},
		set: function(val){return _footerView = val;}
	});

	var _headerTitle = null;
	Object.defineProperty(this, 'headerTitle', {
		get: function(){return _headerTitle;},
		set: function(val){return _headerTitle = val;}
	});

	var _headerView = null;
	Object.defineProperty(this, 'headerView', {
		get: function(){return _headerView;},
		set: function(val){return _headerView = val;}
	});

	var _rowCount = null;
	Object.defineProperty(this, 'rowCount', {
		get: function(){return _rowCount;},
		set: function(val){return _rowCount = val;}
	});

	Ti._5.presetUserDefinedElements(this, args);
});
;
(function(api){
	function tabgroup(){
		this.addTab = function(){
			
		};
		this.open = function(){
			
		};
	};
	function tab(){
		
	};
	api.createTab = function(args) {
		return new tab();
	};
	api.createTabGroup = function(args) {
		return new tabgroup();
	};
	
})(Ti.UI);
;
Ti._5.createClass('Titanium.UI.TextArea', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'textarea', args, 'TextArea');
	Ti._5.Clickable(this);
	Ti._5.Interactable(this);
	Ti._5.Touchable(this, args, true);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	// Properties
	var _autoLink = null, _autoLinkLoaded = false;
	Object.defineProperty(this, 'autoLink', {
		get: function() {return _autoLink;},
		set: function(val) { _autoLink = val; }
	});

	// Improve change event for textarea
	obj.dom.addEventListener('keyup', function(event) {
		var oEvent = {
			source		: event.target,
			type		: event.type
		};
		if (obj.dom && 'undefined' != typeof obj.dom.value) {
			oEvent.value = obj.dom.value;
		}
		obj.fireEvent('change', oEvent);
	}, false);
	
	var _autocapitalization = 0;
	var _autocapitalizationLoaded = false;
	Object.defineProperty(this, 'autocapitalization', {
		get: function() {return _autocapitalization;},
		set: function(val) {
			_autocapitalization = val;
			if (!_autocapitalizationLoaded) {
				obj.dom.addEventListener('keyup', function(event) {
					Titanium.UI._updateText(obj);
				}, false);
			}
			obj.value = Titanium.UI._capitalizeValue(_autocapitalization, obj.value);
		}
	});
	
	Object.defineProperty(this, 'value', {
		get: function() {return obj.dom.value;},
		set: function(val) {
			obj.dom.value = val ? Titanium.UI._capitalizeValue(_autocapitalization, val) : '';
		}
	});
	
	Object.defineProperty(this, 'editable', {
		get: function() { return obj.enabled; },
		set: function(val) {obj.dom.disabled = !val ? 'disabled' : '';}
	});

	var _backgroundDisabledImage = '', _backgroundImage = ''; 
	var	_backgroundDisabledColor = '', _backgroundColor = '';
	Object.defineProperty(this, 'enabled', {
		get: function(){return !obj.dom.disabled;},
		set: function(val) {
			if (!_backgroundImage && obj.backgroundImage) {
				_backgroundImage = obj.backgroundImage;
			}
			if (!_backgroundColor && obj.backgroundColor) {
				_backgroundColor = obj.backgroundColor;
			}
			if (!val) {
				obj.dom.disabled = 'disabled';
				if (_backgroundDisabledImage) {
					obj.backgroundImage = _backgroundDisabledImage;
				}
				if (_backgroundDisabledColor) {
					obj.backgroundColor = _backgroundDisabledColor;
				}
			} else {
				obj.dom.disabled = '';
				obj.backgroundImage = _backgroundImage;
				obj.backgroundColor = _backgroundColor;
			}
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledImage', {
		get: function() {
			return _backgroundDisabledImage ? _backgroundDisabledImage : '';
		},
		set: function(val) {
			_backgroundDisabledImage = val;
		}
	});
	
	Object.defineProperty(obj, 'backgroundDisabledColor', {
		get: function() {
			return _backgroundDisabledColor ? _backgroundDisabledColor : '';
		},
		set: function(val) {
			_backgroundDisabledColor = val;
		}
	});
	
	var _keyboardToolbar = null;
	Object.defineProperty(this, 'keyboardToolbar', {
		get: function(){return _keyboardToolbar;},
		set: function(val){return _keyboardToolbar = val;}
	});
	
	var _keyboardToolbarColor = null;
	Object.defineProperty(this, 'keyboardToolbarColor', {
		get: function(){return _keyboardToolbarColor;},
		set: function(val){return _keyboardToolbarColor = val;}
	});

	var _keyboardToolbarHeight = null;
	Object.defineProperty(this, 'keyboardToolbarHeight', {
		get: function(){return _keyboardToolbarHeight;},
		set: function(val){return _keyboardToolbarHeight = val;}
	});

	var _suppressReturn = null, _suppressLoaded = false;
	Object.defineProperty(this, 'suppressReturn', {
		get: function() {return _suppressReturn;},
		set: function(val) {
			_suppressReturn = val;
			if (!_suppressLoaded) {
				_suppressLoaded = true;
				obj.dom.addEventListener('keyup', function(event) {
					if (_suppressReturn && event.keyCode == 13) {
						if (event.preventDefault) event.preventDefault();
						return false;
					} else {
						return true;
					}
				}, false);
			}
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});
   
	Ti._5.preset(this, [
		"autoLink", "autocapitalization", "value", "editable", "keyboardToolbar", 
		"keyboardToolbarColor", "keyboardToolbarHeight", "suppressReturn", "backgroundDisabledImage",
		"backgroundDisabledColor", "size", "enabled"
	], args);
	Ti._5.presetUserDefinedElements(this, args);
	
	// Methods
	this.blur = function(){
		obj.dom.blur();
	};
	this.focus = function(){
		obj.dom.focus();
	};
	this.hasText = function(){
		return obj.value ? true : false;
	};
	
	function _check_sel(event, isMouse) {
		var startPos = obj.dom.selectionStart;
		var endPos = obj.dom.selectionEnd;
		if (obj.value.substring(startPos,endPos).length != 0 && (!event.shiftKey || isMouse)){
			var oEvent = {
				range		: {
					location	: startPos,
					length		: obj.value.substring(startPos,endPos).length
				},
				source		: obj,
				type		: 'selected'
			};
			obj.fireEvent('selected', oEvent);
			return true;
		}
		return false;
	}
	
	var _isIOS = false;
	if (
		-1 < Titanium.Platform.osname.indexOf('iphone') ||
		-1 < Titanium.Platform.osname.indexOf('ipod') ||
		-1 < Titanium.Platform.osname.indexOf('ipad') 
	) {
		_isIOS = true;
	}
	
	var _timeoutId  = null;
	function _iOSFix () {
		if (_timeoutId) {
			return;
		}
		_timeoutId = setTimeout(function() {
			_timeoutId = null;
			if (!_check_sel({shiftKey: false}, true)) {
				_iOSFix();
			} 
		}, 500);
	};
	
	obj.dom.addEventListener('keyup', function(event) {
		_check_sel(event, false);
		if (_isIOS) {
			_iOSFix();
		}
	}, false);
	obj.dom.addEventListener('mouseup', function(event) {
		_check_sel(event, true);
		if (_isIOS) {
			_iOSFix();
		}
	}, false);
});

;
Ti._5.createClass('Titanium.UI.TextField', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'input', args, 'TextField');
	Ti._5.Clickable(this);
	Ti._5.Interactable(this);
	Ti._5.Touchable(this, args, true);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	
	// Properties
	var _autocapitalization = 0;
	var _autocapitalizationLoaded = false;
	Object.defineProperty(this, 'autocapitalization', {
		get: function() {return _autocapitalization;},
		set: function(val) {
			_autocapitalization = val;
			if (!_autocapitalizationLoaded) {
				obj.dom.addEventListener('keyup', function(event) {
					Titanium.UI._updateText(obj);
				}, false);
			}
			obj.value = Titanium.UI._capitalizeValue(_autocapitalization, obj.value);
		}
	});
	
	Object.defineProperty(this, 'value', {
		get: function() {return obj.dom.value;},
		set: function(val) {
			obj.dom.value = val ? Titanium.UI._capitalizeValue(_autocapitalization, val) : '';
		}
	});
	
	Object.defineProperty(this, 'editable', {
		get: function() { return obj.enabled; },
		set: function(val) {obj.dom.disabled = !val ? 'disabled' : '';}
	});

	var _backgroundDisabledImage = '', _backgroundImage = ''; 
	var	_backgroundDisabledColor = '', _backgroundColor = '';
	Object.defineProperty(this, 'enabled', {
		get: function(){return !obj.dom.disabled;},
		set: function(val) {
			if (!_backgroundImage && obj.backgroundImage) {
				_backgroundImage = obj.backgroundImage;
			}
			if (!_backgroundColor && obj.backgroundColor) {
				_backgroundColor = obj.backgroundColor;
			}
			if (!val) {
				obj.dom.disabled = 'disabled';
				if (_backgroundDisabledImage) {
					obj.backgroundImage = _backgroundDisabledImage;
				}
				if (_backgroundDisabledColor) {
					obj.backgroundColor = _backgroundDisabledColor;
				}
			} else {
				obj.dom.disabled = '';
				obj.backgroundImage = _backgroundImage;
				obj.backgroundColor = _backgroundColor;
			}
		}
	});
	
	var _borderStyle = Titanium.UI.INPUT_BORDERSTYLE_LINE;
	Object.defineProperty(obj, 'borderStyle', {
		get: function() {
			return _backgroundDisabledImage ? _backgroundDisabledImage : '';
		},
		set: function(val) {
			_borderStyle = val;
			switch(val){
				case Titanium.UI.INPUT_BORDERSTYLE_NONE:
					obj.dom.style.borderStyle = "none";
					break;
				case Titanium.UI.INPUT_BORDERSTYLE_LINE:
					obj.dom.style.borderStyle = "solid";
					break;
				case Titanium.UI.INPUT_BORDERSTYLE_ROUNDED:
					obj.dom.style.borderStyle = "rounded";
					obj.dom.style.borderRadius = obj.dom.style.borderRadius ? obj.dom.style.borderRadius : obj.dom.style.borderWidth;
					break;
				case Titanium.UI.INPUT_BORDERSTYLE_BEZEL:
					obj.dom.style.borderStyle = "solid";
					break;
			}
		}
	});

	Object.defineProperty(obj, 'backgroundDisabledImage', {
		get: function() {
			return _backgroundDisabledImage ? _backgroundDisabledImage : '';
		},
		set: function(val) {
			_backgroundDisabledImage = val;
		}
	});

	Object.defineProperty(obj, 'backgroundDisabledColor', {
		get: function() {
			return _backgroundDisabledColor ? _backgroundDisabledColor : '';
		},
		set: function(val) {
			_backgroundDisabledColor = val;
		}
	});
	
	var _clearButtonMode = null;
	Object.defineProperty(this, 'clearButtonMode', {
		get: function(){return _clearButtonMode;},
		set: function(val){return _clearButtonMode = val;}
	});

	var _clearOnEdit = null, _clearOnEditLoaded = false;
	Object.defineProperty(this, 'clearOnEdit', {
		get: function(){return _clearOnEdit;},
		set: function(val) {
			_clearOnEdit = val;
			if (!_clearOnEditLoaded) {
				obj.dom.addEventListener('focus', function() {
					if (_clearOnEdit) {
						obj.value = '';
					}
				}, false);
			}
		}
	});

	Object.defineProperty(this, 'hintText', {
		get: function() {return obj.dom.placeholder;},
		set: function(val) {
			obj.dom.placeholder = val;
		}
	});
	
	var _keyboardToolbar = null;
	Object.defineProperty(this, 'keyboardToolbar', {
		get: function(){return _keyboardToolbar;},
		set: function(val){return _keyboardToolbar = val;}
	});
	
	var _keyboardToolbarColor = null;
	Object.defineProperty(this, 'keyboardToolbarColor', {
		get: function(){return _keyboardToolbarColor;},
		set: function(val){return _keyboardToolbarColor = val;}
	});

	var _keyboardToolbarHeight = null;
	Object.defineProperty(this, 'keyboardToolbarHeight', {
		get: function(){return _keyboardToolbarHeight;},
		set: function(val){return _keyboardToolbarHeight = val;}
	});
	
	// iPhone spes
	var _leftButton = null;
	Object.defineProperty(this, 'leftButton', {
		get: function(){return _leftButton;},
		set: function(val){return _leftButton = val;}
	});
	
	// iPhone spes
	var _leftButtonMode = null;
	Object.defineProperty(this, 'leftButtonMode', {
		get: function(){return _leftButtonMode;},
		set: function(val){return _leftButtonMode = val;}
	});

	// iPhone spes
	var _leftButtonPadding = null;
	Object.defineProperty(this, 'leftButtonPadding', {
		get: function(){return _leftButtonPadding;},
		set: function(val){return _leftButtonPadding = val;}
	});

	var _minimumFontSize = null;
	Object.defineProperty(this, 'minimumFontSize', {
		get: function() {return _minimumFontSize;},
		set: function(val) {_minimumFontSize = val;}
	});

	var _paddingLeft = null;
	Object.defineProperty(this, 'paddingLeft', {
		get: function() {return parseInt(obj.dom.style.paddingLeft);},
		set: function(val) {obj.dom.style.paddingLeft = parseInt(val)+"px";}
	});

	var _paddingRight = null;
	Object.defineProperty(this, 'paddingRight', {
		get: function() {return parseInt(obj.dom.style.paddingRight);},
		set: function(val) {obj.dom.style.paddingRight = parseInt(val)+"px";}
	});
	
	// iPhone spes
	var _rightButton = null;
	Object.defineProperty(this, 'rightButton', {
		get: function(){return _rightButton;},
		set: function(val){return _rightButton = val;}
	});
	
	// iPhone spes
	var _rightButtonMode = null;
	Object.defineProperty(this, 'rightButtonMode', {
		get: function(){return _rightButtonMode;},
		set: function(val){return _rightButtonMode = val;}
	});

	// iPhone spes
	var _rightButtonPadding = null;
	Object.defineProperty(this, 'rightButtonPadding', {
		get: function(){return _rightButtonPadding;},
		set: function(val){return _rightButtonPadding = val;}
	});

	var _suppressReturn = null, _suppressLoaded = false;
	Object.defineProperty(this, 'suppressReturn', {
		get: function() {return _suppressReturn;},
		set: function(val) {
			_suppressReturn = val;
			if (!_suppressLoaded) {
				_suppressLoaded = true;
				obj.dom.addEventListener('keyup', function(event) {
					if (_suppressReturn && event.keyCode == 13) {
						if (event.preventDefault) event.preventDefault();
						return false;
					} else {
						return true;
					}
				}, false);
			}
		}
	});

	var _vertAlign = 'auto';
	Object.defineProperty(this, 'verticalAlign', {
		get: function(){return _vertAlign;},
		set: function(val){
			if (parseInt(val) == val) {
				obj.dom.style.lineHeight = val + 'px';
			} else {
				switch (val) {
					case 'top': 
						_vertAlign = 'top';
						obj.dom.style.lineHeight = 'auto';
						break;
					case 'bottom':
						_vertAlign = 'bottom';
						obj.dom.style.lineHeight = (obj.height + ((obj.height  - obj.fontSize) * 0.5)) + 'px';
						break;
					case 'midle':
						_vertAlign = 'midle';
					case 'auto':
					default : 
						_vertAlign = 'auto';
						obj.dom.style.lineHeight = 'auto';
				}
			}
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});

	Ti._5.preset(this, [
		"value", "autocapitalization", "editable", "clearOnEdit", "suppressReturn",
		"hintText", "paddingLeft", "paddingRight", "borderStyle", "backgroundDisabledImage",
		"backgroundDisabledColor", "verticalAlign", "size", "enabled"
	], args);
	Ti._5.presetUserDefinedElements(this, args);

	// Methods
	obj.focus = function(ev) {
		obj.dom.focus(ev);
	}
	obj.blur = function(ev) {
		obj.dom.blur(ev);
	}
	obj.hasText = function() {
		return obj.value ? true : false;
	}
});

;
Ti._5.createClass('Titanium.UI.Toolbar', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'toolbar', args, 'Toolbar');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);

	Ti._5.presetUserDefinedElements(this, args);
});
;
(function(api){
	api.currentWindow = null;
	api.currentTab = null;
	
	// Properties
	api.ANIMATION_CURVE_EASE_IN = 2;
	api.ANIMATION_CURVE_EASE_IN_OUT = 4;
	api.ANIMATION_CURVE_EASE_OUT = 3;
	api.ANIMATION_CURVE_LINEAR = 1;
	api.AUTODETECT_ADDRESS = 1;
	api.AUTODETECT_ALL = 0;
	api.AUTODETECT_CALENDAR = 2;
	api.AUTODETECT_LINK = 3;
	api.AUTODETECT_NONE = -1;
	api.AUTODETECT_PHONE = 4;
	api.BLEND_MODE_CLEAR = -1;
	api.BLEND_MODE_COLOR = 1;
	api.BLEND_MODE_COLOR_BURN = 2;
	api.BLEND_MODE_COLOR_DODGE = 3;
	api.BLEND_MODE_COPY = 4;
	api.BLEND_MODE_DARKEN = 5;
	api.BLEND_MODE_DESTINATION_ATOP = 6;
	api.BLEND_MODE_DESTINATION_IN = 7;
	api.BLEND_MODE_DESTINATION_OUT = 8;
	api.BLEND_MODE_DESTINATION_OVER = 9;
	api.BLEND_MODE_DIFFERENCE = 10;
	api.BLEND_MODE_EXCLUSION = 11;
	api.BLEND_MODE_HARD_LIGHT = 12;
	api.BLEND_MODE_HUE = 13;
	api.BLEND_MODE_LIGHTEN = 14;
	api.BLEND_MODE_LUMINOSITY = 15;
	api.BLEND_MODE_MULTIPLY = 16;
	api.BLEND_MODE_NORMAL = 0;
	api.BLEND_MODE_OVERLAY = 17;
	api.BLEND_MODE_PLUS_DARKER = 18;
	api.BLEND_MODE_PLUS_LIGHTER = 19;
	api.BLEND_MODE_SATURATION = 20;
	api.BLEND_MODE_SCREEN = 21;
	api.BLEND_MODE_SOFT_LIGHT = 22;
	api.BLEND_MODE_PLUS_LIGHTER = 23;
	api.BLEND_MODE_SATURATION = 24;
	api.BLEND_MODE_SCREEN = 25;
	api.BLEND_MODE_SOFT_LIGHT = 26;
	api.BLEND_MODE_SOURCE_ATOP = 27;
	api.BLEND_MODE_SOURCE_IN = 28;
	api.BLEND_MODE_SOURCE_OUT = 29;
	api.BLEND_MODE_XOR = 30;

	api.FACE_DOWN = 1;
	api.FACE_UP = 2;
	api.PORTRAIT = 3;
	api.UPSIDE_PORTRAIT = 4;
	api.LANDSCAPE_LEFT = 5;
	api.LANDSCAPE_RIGHT = 6;

	api.INPUT_BORDERSTYLE_BEZEL = 3;
	api.INPUT_BORDERSTYLE_LINE = 1;
	api.INPUT_BORDERSTYLE_NONE = 0;
	api.INPUT_BORDERSTYLE_ROUNDED = 2;
	api.INPUT_BUTTONMODE_ALWAYS = 1;
	api.INPUT_BUTTONMODE_NEVER = 0;
	api.INPUT_BUTTONMODE_ONBLUR = 0;
	api.INPUT_BUTTONMODE_ONFOCUS = 1;
	api.KEYBOARD_APPEARANCE_ALERT = 1;
	api.KEYBOARD_APPEARANCE_DEFAULT = 0;
	api.KEYBOARD_ASCII = 1;
	api.KEYBOARD_DEFAULT = 2;
	api.KEYBOARD_EMAIL = 3;
	api.KEYBOARD_NAMEPHONE_PAD = 4;
	api.KEYBOARD_NUMBERS_PUNCTUATION = 5;
	api.KEYBOARD_NUMBER_PAD = 6;
	api.KEYBOARD_PHONE_PAD = 7;
	api.KEYBOARD_URL = 8;
	api.NOTIFICATION_DURATION_LONG = 1;
	api.NOTIFICATION_DURATION_SHORT = 2;
	api.PICKER_TYPE_COUNT_DOWN_TIMER = 1;
	api.PICKER_TYPE_DATE = 2;
	api.PICKER_TYPE_DATE_AND_TIME = 3;
	api.PICKER_TYPE_PLAIN = 4;
	api.PICKER_TYPE_TIME = 5;
	api.RETURNKEY_DEFAULT = 0;
	api.RETURNKEY_DONE = 1;
	api.RETURNKEY_EMERGENCY_CALL = 2;
	api.RETURNKEY_GO = 3;
	api.RETURNKEY_GOOGLE = 4;
	api.RETURNKEY_JOIN = 5;
	api.RETURNKEY_NEXT = 6;
	api.RETURNKEY_ROUTE = 7;
	api.RETURNKEY_SEARCH = 8;
	api.RETURNKEY_SEND = 9;
	api.RETURNKEY_YAHOO = 10;
	api.TEXT_ALIGNMENT_CENTER = 1;
	api.TEXT_ALIGNMENT_RIGHT = 2;
	api.TEXT_ALIGNMENT_LEFT = 3;
	api.TEXT_AUTOCAPITALIZATION_ALL = 3;
	api.TEXT_AUTOCAPITALIZATION_NONE = 0;
	api.TEXT_AUTOCAPITALIZATION_SENTENCES = 2;
	api.TEXT_AUTOCAPITALIZATION_WORDS = 1;
	api.TEXT_VERTICAL_ALIGNMENT_BOTTOM = 2;
	api.TEXT_VERTICAL_ALIGNMENT_CENTER = 1;
	api.TEXT_VERTICAL_ALIGNMENT_TOP = 3;
	api.UNKNOWN = 0;

	var _backgroundColor = null;
	Object.defineProperty(api, 'backgroundColor', {
		get: function(){return _backgroundColor;},
		set: function(val){
			_backgroundColor = val;
			api.setBackgroundColor(_backgroundColor);
		}
	});

	var _backgroundImage = null;
	Object.defineProperty(api, 'backgroundImage', {
		get: function(){return _backgroundImage;},
		set: function(val){
			_backgroundImage = val;
			api.setBackgroundImage(_backgroundImage);
		}
	});

	// Methods
	api.setBackgroundColor = function(args) {
		onloaded(function(){
			document.body.style.backgroundColor = args;
		});
	};
	
	api.setBackgroundImage = function(args) {
		onloaded(function()
		{
			document.body.style.backgroundImage = 'url("' + Ti._5.getAbsolutePath(args) + '")';
			//document.body.style.backgroundRepeat = "no-repeat";
		});
	};
	
	api.create2DMatrix = function(){
		console.debug('Method "Titanium.UI.create2DMatrix" is not implemented yet.');
	};
	api.create3DMatrix = function(){
		console.debug('Method "Titanium.UI.create3DMatrix" is not implemented yet.');
	};
	api.createActivityIndicator = function(){
		console.debug('Method "Titanium.UI.createActivityIndicator" is not implemented yet.');
	};
	api.createAlertDialog = function(args){
		return new Ti.UI.AlertDialog(args);
	};
	api.createAnimation = function(){
		console.debug('Method "Titanium.UI.createAnimation" is not implemented yet.');
	};
	api.createButton = function(args) {
		return new Ti.UI.Button(args);
	};
	api.createButtonBar = function(){
		console.debug('Method "Titanium.UI.createButtonBar" is not implemented yet.');
	};
	api.createCoverFlowView = function(){
		console.debug('Method "Titanium.UI.createCoverFlowView" is not implemented yet.');
	};
	api.createDashboardItem = function(){
		console.debug('Method "Titanium.UI.createDashboardItem" is not implemented yet.');
	};
	api.createDashboardView = function(){
		console.debug('Method "Titanium.UI.createDashboardView" is not implemented yet.');
	};
	api.createEmailDialog = function(){
		console.debug('Method "Titanium.UI.createEmailDialog" is not implemented yet.');
	};
	api.createImageView = function(args){
		return new Ti.UI.ImageView(args);
	};
	api.createLabel = function(args) {
		return new Ti.UI.Label(args);
	};
	api.createOptionDialog = function(){
		console.debug('Method "Titanium.UI.createOptionDialog" is not implemented yet.');
	};
	api.createPicker = function(args) {
		return new Ti.UI.Picker(args);
	}
	api.createPickerColumn = function(){
		console.debug('Method "Titanium.UI.createPickerColumn" is not implemented yet.');
	};
	api.createPickerRow = function(args){
		return new Ti.UI.PickerRow(args);
	};
	api.createProgressBar = function(){
		console.debug('Method "Titanium.UI.createProgressBar" is not implemented yet.');
	};
	api.createScrollView = function(args) {
		return new Ti.UI.ScrollView(args);
	};
	api.createScrollableView = function(){
		console.debug('Method "Titanium.UI.createScrollableView" is not implemented yet.');
	};
	api.createSearchBar = function(args){
		return new Ti.UI.SearchBar(args);
	};
	api.createSlider = function(args){
		return new Ti.UI.Slider(args);
	};
	api.createSwitch = function(args){
		return new Titanium.UI.Switch(args);
	};
	api.createTab = function(args){
		return new Ti.UI.Tab(args);
	};
	api.createTabGroup = function(args){
		return new Ti.UI.TabGroup(args);
	};
	api.createTabbedBar = function(){
		console.debug('Method "Titanium.UI.createTabbedBar" is not implemented yet.');
	};
	api.createTableView = function(args) {
		return new Ti.UI.TableView(args);
	};
	api.createTableViewRow = function(args){
		return new Ti.UI.TableViewRow(args);
	};
	api.createTableViewSection = function(){
		console.debug('Method "Titanium.UI.createTableViewSection" is not implemented yet.');
	};
	api.createTextArea = function(args) {
		return new Ti.UI.TextArea(args);
	};
	api.createTextField = function(args) {
		return new Ti.UI.TextField(args);
	};
	api.createToolbar = function(){
		console.debug('Method "Titanium.UI.createToolbar" is not implemented yet.');
	};
	api.createView = function(args) {
		return new Ti.UI.View(args);
	};
	api.createWebView = function(args) {
		return new Ti.UI.WebView(args);
	};
	api.createWindow = function(args) {
		return new Ti.UI.Window(args);
	};
})(Ti._5.createClass('Titanium.UI'));

;
Ti._5.createClass('Titanium.UI.View', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'View');
	Ti._5.Clickable(this);
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	this.dom.style.overflow = "hidden";

	Object.defineProperty(this, 'size', {
		get: function(){
			return {
				width: obj.width,
				height: obj.height
			}
		},
		set: function(val){
			if(val != null && val.width != null){
				obj.width = val.width;
			}

			if(val != null && val.height != null){
				obj.height = val.height;
			}
		}
	});

	Ti._5.presetUserDefinedElements(this, args);
});


;
Ti._5.createClass('Titanium.UI.WebView', function(args){
	var obj = this;
	// Interfaces
	Ti._5.DOMView(this, 'iframe', args, 'WebView');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	Ti._5.Clickable(this);
	// For width & height on iPhone
	this.dom.scrolling = "no";
		
	var _executeWhenLoaded = null;
	obj.dom.addEventListener('load', function (event) {
		if (!obj.dom.contentWindow) {
			obj.fireEvent('error', {
				sourse	: obj,
				message	: 'The page couldn`t be found',
				type	: 'error',
				url		: obj.url
			});
		} else {
			obj.fireEvent('load', {
				sourse	: obj,
				type	: 'load',
				url		: obj.url
			});
		}
		if ('function' == typeof _executeWhenLoaded) {
			_executeWhenLoaded(event);
			_executeWhenLoaded = null;
		}
	}, false);
	
	obj.dom.addEventListener('error', function (event) {
		obj.fireEvent('error', {
			sourse	: obj,
			message	: 'The page couldn`t be found',
			type	: 'error',
			url		: obj.url
		});
		if ('function' == typeof _executeWhenLoaded) {
			_executeWhenLoaded(event);
			_executeWhenLoaded = null;
		}
	}, false);
	
	// Properties
	// NOT IMPLEMENTED
	var _data = null;
	Object.defineProperty(this, 'data', {
		get: function(){return _data;},
		set: function(val){return _data = val;}
	});

	Object.defineProperty(this, 'html', {
		get: function() {
			try {
				return obj.dom.contentWindow.document.body.innerHTML;
			} catch (error) {
				obj.fireEvent('error', {
					message	: error.description ? error.description : error,
					sourse	: obj,
					type	: 'error',
					url		: obj.url
				});
				return "";
			} 
		},
		set: function(val) {
			obj.dom.src = 'about:blank';
			_loading = true;
			_executeWhenLoaded = function () {
				// We need some delay, when setting window html from constructor
				setTimeout(function() {
					obj.dom.contentWindow.document.body.innerHTML = val;
					_loading = false;
				}, 0);
			};
		}
	});

	var _loading = false;
	Object.defineProperty(this, 'loading', {
		get: function(){return _loading;},
		set: function(val){return false;}
	});

	// NOT IMPLEMENTED
	Object.defineProperty(this, 'scalesPageToFit', {
		get: function(){return _scalesPageToFit;},
		set: function(val){return _scalesPageToFit = val;}
	});
	
	var _url = "";
	Object.defineProperty(this, 'url', {
		get: function(){return _url;},
		set: function(val){
			if (val.substring(0,1) == '/'){
				val = val.substring(1);
			}
			obj.fireEvent('beforeload', {
				sourse	: obj,
				type	: 'beforeload',
				url		: val
			});
			_loading = true;
			_url
			obj.dom.src = Ti._5.getAbsolutePath(val);
			_executeWhenLoaded = function () {
				_loading = false;
			};
		}
	});
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = Ti._5.parseLength(val.width);
			}
			if (val.height) {
				obj.height = Ti._5.parseLength(val.height);
			}
		}
	});
	
	Ti._5.preset(this, ["url", "loading", "size", "html"], args);
	Ti._5.presetUserDefinedElements(this, args);

	// Methods
	this.canGoBack = function() {
		return obj.dom.contentWindow && obj.dom.contentWindow.history && obj.url ? true : false;
	};
	this.canGoForward = function() {
		return obj.dom.contentWindow && obj.dom.contentWindow.history && obj.url ? true : false;
	};
	this.evalJS = function(sJScript){
		if (obj.dom.contentWindow.eval) {
			return obj.dom.contentWindow.eval(sJScript);
		} else {
			return "";
		}
	};
	this.goBack = function() {
		if (this.canGoBack()) {
			obj.dom.contentWindow.history.back();
		}
	};
	this.goForward = function(){
		if (this.canGoForward()) {
			obj.dom.contentWindow.history.forward();
		}
	};
	this.reload = function(){
		if (obj.url) {
			obj.url = obj.url;
		} else if (obj.html) {
			obj.html = obj.html;
		}
	};
	this.repaint = function() {
		this.reload();
	};
	this.setBasicAuthentication = function(){
		console.debug('Method "Titanium.UI.WebView#.setBasicAuthentication" is not implemented yet.');
	};
	this.stopLoading = function(){
		// we have no permission to stop loading current iframe, so we can only stop loading all frames in window
		window.stop();
	};
});
;
Ti._5.createClass('Titanium.UI.Window', function(args){
	var obj = this;
	var _windowIndex = Titanium.UI.Window._windows.length;
	this._isBack = false;
	Titanium.UI.Window._windows[_windowIndex] = this;
	// set defaults
	args = Ti._5.extend({}, args);
	args['height'] = args['height'] || '100%';
	args['width'] = args['width'] || '100%';

	var _isHTMLPage = function(url){
		return _url != null && _url.indexOf('htm') != -1;
	};
	
	// Interfaces
	Ti._5.DOMView(this, 'div', args, 'Window');
	Ti._5.Touchable(this, args);
	Ti._5.Styleable(this, args);
	Ti._5.Positionable(this, args);
	Ti._5.Clickable(this);
	Ti._5.Interactable(this, true);
	obj.dom.style.boxSizing = 'border-box';

	// Properties
	this.backButtonTitle = null;
	this.backButtonTitleImage = null;
	this.barColor = null;
	this.barImage = null;
	this.exitOnClose = null;
	this.fullscreen = false;
	this.leftNavButton = null;
	var _modal = null;
	Object.defineProperty(this, 'modal', {
		get: function(){return _modal;},
		set: function(val){return _modal = val;}
	});

	var _navBarHidden = null;
	Object.defineProperty(this, 'navBarHidden', {
		get: function(){return _navBarHidden;},
		set: function(val){return _navBarHidden = val;}
	});

	this.orientationModes = [];

	this.rightNavButton = null;
	this.softInputMode = null;

	var _tabBarHidden = null;
	Object.defineProperty(this, 'tabBarHidden', {
		get: function(){return _tabBarHidden;},
		set: function(val){return _tabBarHidden = val;}
	});

	this.titleControl = null;
	this.titleImage = null;
	this.titlePrompt = null;

	var _titleid = null;
	Object.defineProperty(this, 'titleid', {
		get: function(){return _titleid;},
		set: function(val){_titleid = val; obj.title = L(val);}
	});

	var _titlepromptid = null;
	Object.defineProperty(this, 'titlepromptid', {
		get: function(){return _titlepromptid;},
		set: function(val){return _titlepromptid = val;  obj.titlePrompt = L(val);}
	});

	this.toolbar = null;
	this.translucent = null;

	var _url = null;
	Object.defineProperty(this, 'url', {
		get: function(){return _url;},
		set: function(val){
			_url = val;
			if (_isHTMLPage()) {
				window.location.href = Ti._5.getAbsolutePath(_url);
			} else {
				// We need this for proper using window.open in code
				setTimeout(function(){
					Ti.include(_url);
				}, 0); 
			}
		}
	});

	var _oldHide = this.hide;
	this.hide = function(){
		obj.fireEvent("blur", {source: obj.dom, type: "blur"});
		_oldHide();
	};
	// Methods
	var _historyPoint = 0;
	this.open = function(){
		// hide previous window
		if (Ti.UI.currentWindow != null){
			Ti.UI.currentWindow.hide();
		}
		// display current window
		document.body.appendChild(obj.dom);
		obj.show();
		Ti.UI.currentWindow = obj;
		obj.render(null);

		if(this._isBack){
			this._isBack = false;
		} else {
			// leave record in History object
			window.history.pushState({windowIndex: _windowIndex}, "", "");
		}
		_setTitle();
		_historyPoint = window.history.length;
		obj.fireEvent("open", {source: null, type: "open"});
		obj.fireEvent("focus", {source: obj.dom, type: "focus"});
	};
	
	this.close = function(){
		obj.fireEvent("blur", {source: obj.dom, type: "blur"});
		obj.fireEvent("close", {source: null, type: "close"});
		if(!_isHTMLPage()){
			// remove script include
			document.body.removeChild(obj.dom);
			var head = document.getElementsByTagName('head')[0];
			head.removeChild(head.children[head.children.length - 1]);
		}
		// Return to history state
		window.history.go(_historyPoint-window.history.length-1);
	};
	
	Object.defineProperty(this, 'size', {
		get: function() {
			return {
				width	: obj.width,
				height	: obj.height
			}
		},
		set: function(val) {
			if (val.width) {
				obj.width = val.width;
			}
			if (val.height) {
				obj.height = val.height;
			}
		}
	});

	var _setTitle = function(){
		if(Ti.UI.currentWindow === obj){
			document.title = obj.title != null ? obj.title : Ti._5.getArguments().projectName;
		}
	};
	
	var _title;
	Object.defineProperty(this, 'title', {
		get: function() {
			return _title;
		},
		set: function(val) {
			_title = val;
			_setTitle();
		}
	});

	Ti._5.preset(this, ["width", "height", "url", "size"], args);
	Ti._5.presetUserDefinedElements(this, args);
	
	obj.render = function(parent) {
		obj._parent = parent;
		if (parent) {
			// handle horizontal layout
			if (parent['layoutStyle']=='horizontal') {
				obj.dom.style.cssFloat = 'left';
				obj.dom.style.position = 'relative';
				obj.dom.style.marginLeft = (obj.args) ? obj.args['left'] : '';
				obj.dom.style.left = '';
				obj.dom.style.marginTop = '';
			}
			// handle vertical layout
			else if (parent['layoutStyle']=='vertical') {
				parent.dom.style.clear = 'both';
				obj.dom.style.cssFloat = '';
				obj.dom.style.position = 'relative';
				obj.dom.style.marginLeft = '';
				obj.dom.style.marginTop = (obj.args) ? obj.args['top'] : '';
				obj.dom.style.display = 'block';
				obj.dom.style.top = '';
			}
			parent.dom.appendChild(obj.dom);
		} 
		// Get first element margin
		var _maxChildrenHeight = 0;
		if (obj._children) {
			var _padding = 0;
			if (obj._children[0] && obj._children[0].dom) {
				_padding = parseInt(obj._children[0].dom.style.marginTop);
			}
			obj.dom.style.paddingTop = _padding + 'px';
			for (var c=0;c<obj._children.length;c++) {
				obj._children[c].render(obj);
				_maxChildrenHeight = _maxChildrenHeight < obj._children[c].dom.offsetHeight + obj._children[c].dom.offsetTop ? 
					obj._children[c].dom.offsetHeight + obj._children[c].dom.offsetTop : _maxChildrenHeight;
			}
		}
		// Set min window height for preventing window heights be smaller then sum of all window children heights  
		obj.dom.style.minHeight = _maxChildrenHeight + 'px';
		
		obj._rendered = true;
	};
});

Titanium.UI.Window._windowStack = [];
Titanium.UI.Window._windows = [];

window.onpopstate = function(event){
	if(event && event.state && event.state.windowIndex){
		var win = Titanium.UI.Window._windows[event.state.windowIndex];
		// for opening HTML windows
		if (!win) {
			return;
		}
		win._isBack = true;
		win.open();
	}
};

;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	// private method for UTF-8 encoding
	function _utf8_encode (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};
	// private method for UTF-8 decoding
	function _utf8_decode (utftext) {
	   var string = "";
	   var i = 0;
	   var c = c1 = c2 = 0;

	   while ( i < utftext.length ) {

		   c = utftext.charCodeAt(i);

		   if (c < 128) {
			   string += String.fromCharCode(c);
			   i++;
		   }
		   else if((c > 191) && (c < 224)) {
			   c2 = utftext.charCodeAt(i+1);
			   string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			   i += 2;
		   }
		   else {
			   c2 = utftext.charCodeAt(i+1);
			   c3 = utftext.charCodeAt(i+2);
			   string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			   i += 3;
		   }

	   }

		return string;
	};
	
	// Methods
	api.base64decode = function(input){
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = _utf8_decode(output);

		return output;
	};
	api.base64encode = function(input){
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = _utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);

		}

		return output;
	};
	api.md5HexDigest = function(input){
		// +   original by: javascript.ru (http://www.javascript.ru/)

		var RotateLeft = function(lValue, iShiftBits) {
				return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
			};
	 
		var AddUnsigned = function(lX,lY) {
				var lX4,lY4,lX8,lY8,lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
				if (lX4 & lY4) {
					return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				}
				if (lX4 | lY4) {
					if (lResult & 0x40000000) {
						return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					} else {
						return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
					}
				} else {
					return (lResult ^ lX8 ^ lY8);
				}
			};
	 
		var F = function(x,y,z) { return (x & y) | ((~x) & z); };
		var G = function(x,y,z) { return (x & z) | (y & (~z)); };
		var H = function(x,y,z) { return (x ^ y ^ z); };
		var I = function(x,y,z) { return (y ^ (x | (~z))); };
	 
		var FF = function(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
	 
		var GG = function(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
	 
		var HH = function(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
	 
		var II = function(a,b,c,d,x,s,ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};
	 
		var ConvertToWordArray = function(str) {
				var lWordCount;
				var lMessageLength = str.length;
				var lNumberOfWords_temp1=lMessageLength + 8;
				var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
				var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
				var lWordArray=Array(lNumberOfWords-1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while ( lByteCount < lMessageLength ) {
					lWordCount = (lByteCount-(lByteCount % 4))/4;
					lBytePosition = (lByteCount % 4)*8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
				lWordArray[lNumberOfWords-2] = lMessageLength<<3;
				lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
				return lWordArray;
			};
	 
		var WordToHex = function(lValue) {
				var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
				for (lCount = 0;lCount<=3;lCount++) {
					lByte = (lValue>>>(lCount*8)) & 255;
					WordToHexValue_temp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
				}
				return WordToHexValue;
			};
	 
		var x=Array();
		var k,AA,BB,CC,DD,a,b,c,d;
		var S11=7, S12=12, S13=17, S14=22;
		var S21=5, S22=9 , S23=14, S24=20;
		var S31=4, S32=11, S33=16, S34=23;
		var S41=6, S42=10, S43=15, S44=21;
	 
		str = _utf8_encode(input);
		x = ConvertToWordArray(str);
		a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	 
		for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
		}
	 
		var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
	 
		return temp.toLowerCase();

	};
})(Ti._5.createClass('Titanium.Utils'));
;
(function(api){
	// Properties
	var _class = null;
	Object.defineProperty(api, 'class', {
		get: function(){return _class;},
		set: function(val){return _class = val;}
	});

})(Ti._5.createClass('Titanium.XML.DOMDocument'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	
	function _clone(oSource) {
		if(!oSource || 'object' !== typeof oSource)  {
			return oSource;
		}
		var oClone = 'function' === typeof oSource.pop ? [] : {};
		var sIndex = null;
		for(sIndex in oSource) {
			if(oSource.hasOwnProperty(sIndex)) {
				var oProp = oSource[sIndex];
				if(oProp && 'object' === typeof oProp) {
					oClone[sIndex] = _clone(oProp);
				} else {
					oClone[sIndex] = oProp;
				}
			}
		}
		return oClone;
	}

	var _DOMParser = new DOMParser();
	api.DOMDocument = null;
	
	function _NodeList() {
		var _nodes = [];

		Object.defineProperty(this, 'length', {
			get: function() {return _nodes.length},
			set: function() {return false}
		});
	
		this.item = function (iIndex) {
			return _nodes[iIndex]; 
		}
		this.add = function (oNode) {
			_nodes.push(oNode);
		}
		this.remove = function (oNode) {
			for (var iCounter=_nodes.length; iCounter--;) {
				if (oNode == _nodes[iCounter]) {
					_nodes.splice(iCounter,1);
				}
			}
		}
	}
	
	function _nodeWrapper(oNode) {
		oNode.text = oNode.nodeValue;
		oNode.evaluate = function (xml) {
			var oNodes = document.evaluate(xml, oNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var oResult = new _NodeList();
			var oTemp = null;
			if (oNodes) {
				while (oTemp = oNodes.iterateNext()) {
					oResult.add(oTemp);
				}
			}
			return oResult;
		};
		return oNode;
	}
	
	// Methods
	api.parseString = function(xml) {
		domDocument = _DOMParser.parseFromString(xml,"text/xml");

		// Add some functionality
		domDocument.evaluate = function (xml) {
			var oNodes = document.evaluate(xml, domDocument, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
			var oResult = new _NodeList();
			var oTemp = null;
			if (oNodes) {
				while (oTemp = oNodes.iterateNext()) {
					oResult.add(_nodeWrapper(oTemp));
				}
			}
			return oResult;
		};

		return api.DOMDocument = domDocument;
	};
	
	function _serialize1Node (node) {
		if ('undefined' != typeof node.outerHTML) {
			return node.outerHTML;
		}
		
		if ('undefined' != typeof XMLSerializer) {
			var serializer = new XMLSerializer();
			return serializer.serializeToString(node);
		} else if (node.xml) {
			return node.xml;
		} else {
			var oNode = document.createElement("div");
			oNode.appendChild(node);
			return oNode.innerHTML;
		}
	};
	
	api.serializeToString = function (nodeList) {
		if ('array' != typeof nodeList && '[object NodeList]' !== nodeList.toString()) {
			return _serialize1Node(nodeList);
		}
		var sResult = "";
		for (var iCounter=0; iCounter < nodeList.length; iCounter++) {
			sResult += _serialize1Node(nodeList[iCounter]);
		}
		return sResult;
	}
	
})(Ti._5.createClass('Titanium.XML'));
;
(function(api){
	// Interfaces
	Ti._5.EventDriven(api);
	// Methods
	api.yql = function(){
		console.debug('Method "Titanium.Yahoo..yql" is not implemented yet.');
	};
})(Ti._5.createClass('Titanium.Yahoo'));
;
Ti._5.frameworkLoaded()