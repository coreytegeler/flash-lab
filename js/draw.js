tool.minDistance = 50;
tool.maxDistance = 60;

var path;

function onMouseDown(event) {
	path = new Path();
	path.fillColor = 'black';
	path.add(event.point);
	path.smooth();
}

function onMouseDrag(event) {
	var step = event.delta / 2;
	step.angle += 90;
	
	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;
	console.log(top);
	path.add(top);
	path.insert(0, bottom);
	path.smooth();
}

function onMouseUp(event) {
	path.add(event.point);
	path.closed = true;
	path.smooth();
}