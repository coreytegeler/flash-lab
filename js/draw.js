var path;

function onMouseDown(event) {
	path = new Path();
	path.strokeColor = 'black';
	path.strokeWidth = 30;
	path.strokeCap = 'round';
}

function onMouseDrag(event) {
	path.add(event.point);
}

function onMouseUp(event) {
	path.simplify();
}

