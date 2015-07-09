$(function() {

	$('section').each(function(i, section) {
		$(section).css({
			y : $(section).innerHeight()*i
		}).attr('data-count',i);

		$('canvas#canvas').css({
			height: h() - 90,
			width: w()
		});
	});

	$('section header').click(function() {
		$section = $(this).parent('section');
		if(!$section.hasClass('opened')) {
			$section.addClass('opened').addClass('intro');
			var distY = $section.offset().top;
			var count = $section.attr('data-count');
			var speed = 250 + count/50;
			$section.transition({y:0, height:h()}, speed);
			$('body').animate({ scrollTop: "0" }, speed);
			$('body').removeClass('home').addClass('intro');
		}
	});

	$('section .begin').click(function() {
		var cue = $(this).attr('data-cue');
		beginCue(cue);
	});

	function beginCue(cue) {
		$section = $('section#'+cue);
		$('body').removeClass('intro').addClass('onCue');
		$section.removeClass('intro').addClass('dark');
		$('#easel').transition({opacity:1, delay: 00}, 130);
		createCanvas();
	}

});