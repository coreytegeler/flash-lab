$(function() {
	$canvas = $('#canvas');
	stretchCanvas();
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
	canDraw=true;
	$('body').addClass('drawing');
	stretchCanvas();

	setTimeout(function() {
		$('body').removeClass('drawing').addClass('review');
	},5000);
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


