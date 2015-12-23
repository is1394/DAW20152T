var graph = new joint.dia.Graph();

var workspace = new joint.dia.Paper({
    el: $('#workspace'),
    width: 800,
    height: 1400,
    gridSize: 1,
    model: graph
});

var uml = joint.shapes.uml;
//dictionary who contains the entities created by user
var entities = {};


var relations = [];

_.each(relations, function(r) { graph.addCell(r); });

$(document).ready(function(){
    var count = 1;
    var name = "entity" + count;
    var input;
    $("#item1").click(function(){
    swal({
          title: "Nueva Entidad Creada",
          text: "Escriba el nombre de su nueva entidad:",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "Nombre Entidad"
        },
        function(inputValue){
           input = inputValue;
          if (inputValue === false) return false;

          if (inputValue === "") {
            swal.showInputError("Necesitas Escribir algo");
            return false
          }

          swal("Excelente!", "Nueva Entidad: " + inputValue, "success");
        });

        entities[name] = new uml.Class({
            position:{x:0, y:0},
            size: {width:180, height:180},
            name: input,
            attributes:['primary key'],
            methods: ['atributo1','atributo2','atributo3'],
            attrs: {
               '.uml-class-name-rect': {
                   fill: '#BEBEBE',
                   stroke: '#000000',
                   'stroke-width': 0.5,
               },
               '.uml-class-attrs-rect, .uml-class-methods-rect': {
                   fill: '#FFFFFF',
                   stroke: '#000000',
                   'stroke-width': 0.5
               },
               '.uml-class-attrs-text': {
                   ref: '.uml-class-attrs-rect',
                   'ref-y': 0.5,
                   'y-alignment': 'middle'
               },
               '.uml-class-methods-text': {
                   ref: '.uml-class-methods-rect',
                   'ref-y': 0.5,
                   'y-alignment': 'middle'
               }
           }
        });
        count++;
    });
    _.each(entities, function(c) { graph.addCell(c); });
});
