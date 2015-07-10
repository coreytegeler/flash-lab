(function(url) {
    
  var result = {},
      hashLoc = url.indexOf('#');

  url.substring(url.indexOf('?')).replace(
    /([^?=&]+)(=([^&]+))?/g,
    function($0, $1, $2, $3) {
      result[$1] = $3;
    }
  );

  result['boolean'] = function(name, defaultValue) {
    if (!result.hasOwnProperty(name))
      return defaultValue;
    return result[name] !== 'false';
  };

  result['float'] = function(name, defaultValue) {
    var r = parseFloat(result[name]);
    if (r != r) 
      return defaultValue;
    return r;
  };

  result['int'] = function(name, defaultValue) {
    var r = parseInt(result[name], 10);
    if (r != r) 
      return defaultValue;
    return r;
  };

  result['hash'] = hashLoc == -1 ? undefined : url.substring(hashLoc+1);
  result['setUrl'] = arguments.callee; 
  window['url'] = result;

})(location.href);

var createCanvas = function(e) {

  var type = /(canvas|webgl)/.test(url.type) ? url.type : 'canvas';
  var canvas = new Two({
    type: Two.Types[type],
    fullscreen: false,
    width: w(),
    height: h() - 90,
    autostart: true
  });
  var canvasElem = canvas.renderer.domElement;
  $(canvasElem).appendTo($('#easel'));
  $(canvasElem).attr('id', 'canvas');
  var x, y, line, mouse = new Two.Vector();

  var drag = function(e) {
    x = e.clientX;
    y = e.clientY - 90;
    if (!line) {
      var v1 = makePoint(mouse);
      var v2 = makePoint(x, y);
      line = canvas.makeCurve([v1, v2], true);
      line.noFill();
      line.stroke = '#110d0d';
      line.linewidth = 60;
      line.cap = 'round';
      _.each(line.vertices, function(v) {
        v.addSelf(line.translation);
      });
      line.translation.clear();
    } else {
      var v1 = makePoint(x, y);
      line.vertices.push(v1);
    }
    mouse.set(x, y);
  };

  var dragEnd = function(e) {
    $('#canvas')
      .unbind('mousemove', drag)
      .unbind('mouseup', dragEnd);
  };

  var touchDrag = function(e) {
    e.preventDefault();
    var touch = e.originalEvent.changedTouches[0];
    drag({
      clientX: touch.pageX,
      clientY: touch.pageY
    });
    return false;
  };

  var touchEnd = function(e) {
    e.preventDefault();
    $('#canvas')
      .unbind('touchmove', touchDrag)
      .unbind('touchend', touchEnd);
    return false;
  };

  $('#canvas')
    .bind('mousedown', function(e) {
      mouse.set(e.clientX, e.clientY);
      line = null;
      $('#canvas')
        .bind('mousemove', drag)
        .bind('mouseup', dragEnd);
    })
    .bind('touchstart', function(e) {
      e.preventDefault();
      var touch = e.originalEvent.changedTouches[0];
      mouse.set(touch.pageX, touch.pageY);
      line = null;
      $('#canvas')
        .bind('touchmove', touchDrag)
        .bind('touchend', touchEnd);
      return false;
    });

  function makePoint(x, y) {
    if (arguments.length <= 1) {
      y = x.y - 90;
      x = x.x;
    }

    var v = new Two.Vector(x, y);
    v.position = new Two.Vector().copy(v);

    return v;
  }
}
