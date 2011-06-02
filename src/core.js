$(function(){
	initTemplates();
	$('#loading').remove();
	$.tmpl('main').appendTo(document.body);
});