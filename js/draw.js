function initDrawing() {
	var path;
	function onMouseDown(event) {
		path = new Path();
		path.strokeColor = 'white';
		path.strokeWidth = 50;
		path.strokeCap = 'round';
	}

	function onMouseDrag(event) {
		path.add(event.point);
		console.log(event.point);
	}

	function onMouseUp(event) {
		path.simplify();
	}
}