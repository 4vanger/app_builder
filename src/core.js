$(function(){
	initTemplates();
	$('#loading').remove();

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
			console.log(event, ui)
			var absCoords = canvas.offset();
			var canvasLeft = ui.offset.left - absCoords.left;
			var canvasTop = ui.offset.top - absCoords.top;
			var el;
			switch (ui.draggable.attr('data-libType')){
				case "TextField":
					el = Ti.UI.createTextField({
						left: canvasLeft,
						top: canvasTop
					});
					break;
			}
			console.log(el)
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
});
