


$(document).ready(function() {

	$(".port-imgs").mouseover(function() {
		$(this).css("border-style", "solid");
		$(this).css("border-width", "4px");
		$(this).css("border-color", "#4aaaa5");
	});

	$(".port-imgs").mouseout(function() {
		$(this).css("border-style", "none");
	});


});