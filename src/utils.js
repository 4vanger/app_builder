function showError(message, timeout){
	return showMessage(message, timeout, "ui-state-error", "ui-icon-alert");
}

function showInfo(message, timeout){
	return showMessage(message, timeout, "ui-state-highlight", "ui-icon-info");
}

function showMessage(message, timeout, className, icon){
	if(!timeout){
		timeout = 5000;
	}

	$.tmpl("message", {
		className: className,
		icon: icon,
		message: message
	})
	.click(function(){$(this).clearQueue().slideUp(200);})
	.slideDown(200).delay(timeout).slideUp(200)
	.appendTo($(".notificationsArea"));
}

function handleErrorResponse(xhr, textStatus, errorThrown){
	switch (textStatus){
		case "error":
				if(xhr != null && xhr.status == 401){
					// logged out
					doLogout();
					return;
				}
		case "timeout":
		case "notmodified":
		case "parsererror":
			break;
	}
}

function initTemplates(){
	// auto-init all templates
	$('[type="text/x-jquery-tmpl"]').each(function(ii, el){
		$.template(el.id.replace(/Template$/, ""), el);
	});
}

$.fn.defaultValue = function(label){
	this.focus(function(){
		if($(this).val() == label){
			$(this).removeClass("hasDefaultValue").val("");
		}
	}).blur(function(){
		if($(this).val() == ""){
			$(this).addClass("hasDefaultValue").val(label);
		}
	}).blur();
	return this;
};