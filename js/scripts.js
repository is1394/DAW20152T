var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({

    el: $('#paper'),
    width: 800,
    height: 1400,
    gridSize: 1,
    perpendicularLinks: false,
    model: graph,
    linkView: joint.dia.LinkView.extend({
	pointerdblclick: function(evt, x, y) {
	    if (V(evt.target).hasClass('connection') || V(evt.target).hasClass('connection-wrap')) {
		this.addVertex({ x: x, y: y });
	    }
	},
        options: _.extend({}, joint.dia.LinkView.prototype.options, {
            doubleLinkTools: true,
            linkToolsOffset: 40,
            doubleLinkToolsOffset: 60
        })
    }),
    interactive: function(cellView) {
	if (cellView.model.get('vertexOnDblClick')) {
	    return {
		//arrowheadMove: false
		// vertexMove: false,
		vertexAdd: false,
		//    vertexRemove: false,
	    };
	}
	return true;
    }
});
var graph2 = new joint.dia.Graph();

var paper2 = new joint.dia.Paper({

    el: $('#toolbox'),
    width: 800,
    height: 1400,
    gridSize: 1,
    perpendicularLinks: false,
    model: graph2,
    linkView: joint.dia.LinkView.extend({
	pointerdblclick: function(evt, x, y) {
	    if (V(evt.target).hasClass('connection') || V(evt.target).hasClass('connection-wrap')) {
		this.addVertex({ x: x, y: y });
	    }
	},
        options: _.extend({}, joint.dia.LinkView.prototype.options, {
            doubleLinkTools: true,
            linkToolsOffset: 40,
            doubleLinkToolsOffset: 60
        })
    }),
    interactive: function(cellView) {
	if (cellView.model.get('vertexOnDblClick')) {
	    return {
		//arrowheadMove: false
		// vertexMove: false,
		vertexAdd: false,
		//    vertexRemove: false,
	    };
	}
	return true;
    }
});

paper2.on('link:pointerdown', function(evt, linkView, x, y) {
    console.log('link:pointerdown');
});


var r1 = new joint.shapes.basic.Rect({
    position: { x: 0, y: 0 },
    size: { width: 70, height: 30 },
    attrs: {
        rect: { fill: 'orange' },
        text: { text: 'Box', magnet: true }
    }
});
graph2.addCell(r1);

var r1 = new joint.shapes.basic.Ellipse({
    position: { x: 0, y: 40 },
    size: { width: 70, height: 30 },
    attrs: {
        ellipse: { fill: 'orange' },
        text: { text: 'Box', magnet: true }
    }
});
graph2.addCell(r1);

var jsonString = JSON.stringify(graph);
console.log(jsonString);

$(document).ready(function(){
  $('#load').click(function(){
    console.log('dd');
    $.getJSON('json/save.json',function(data){
      graph.clear();
      console.log(data);
      graph.fromJSON(data);
    });
  });
});
