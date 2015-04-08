$(function() {
	$canvas = $('#canvas');
	$('#intro').click(function() {
		begin();
	});
});

function begin() {
	$('body').attr('class','');
	setTimeout(function() {
		$('body').attr('class', 'flashing');
		flashSlide();
		activateBoard();
	}, 1500);
}

var slideNumber = 1;
function flashSlide() {
	var slideImgPath = '/images/slides/position/' + slideNumber + '.jpg';
	$('#slide').css({
		'backgroundImage' : 'url('+slideImgPath+')'
	});
	$('#slide').addClass('flash')
	$('#slide').on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", function() {
        $(this).removeClass("flash");
        $('body').addClass('drawing');
    });
	slideNumber++;
}

function activateBoard() {
	stretchCanvas();
	initDrawing();
	$('body').addClass('drawing');
}

function stretchCanvas() {
	$canvas.css({
		'height' : $('#drawingBoard').height(),
		'width' : $('#drawingBoard').width()
	});
}

$(window).resize(function() {
	stretchCanvas();
});	


