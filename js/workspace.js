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

$(document).ready(function(){
    //initialize dropdown materialize

    $(".dropdown-button").dropdown();


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
          entities[name] = new uml.Class({
              position:{x:0, y:0},
              size: {width:180, height:180},
              name: input,
              attributes:['primary key'],
              methods: ['atributo1','atributo2','atributo3'],
              attrs: {
                 '.uml-class-name-rect': {
                     fill: '#4dd0e1',
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
          _.each(entities, function(c) { graph.addCell(c); });

        });
        count++;
    });

    $("#item2").click(function(){
        var link;
        swal({
          title: "Relacion",
          text: "Ingrese el tipo de relación:",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "0 - 1, 1 - 1, M - M, etc"
        },
        function(inputValue){
          if (inputValue === false) return false;

          if (inputValue === "") {
            swal.showInputError("Inserte por favor el tipo de relación");
            return false
          }
          swal("Excelente","", "success");
          link = new joint.dia.Link({
          source: { x: 10, y: 200 },
          target: { x: 350, y: 200 },
          attrs: {
              '.marker-source': { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 10 0 L 0 5 L 10 10 z'},
              '.marker-target': { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 10 0 L 0 5 L 10 10 z' }
          },
          labels: [
              { position: 0.5, attrs: { text: { text: inputValue } } }
          ]
          });
          graph.addCell([link]);
        });

    });

    $(".uml-class-attrs-text").dblclick(); //le sigue un tspan este es el nombre
    $(".uml-class-attrs-text").dblclick(); //rpimary key
    $(".uml-class-methods-text").dblclick(); //atts
    _.each(entities, function(c) { graph.addCell(c); });

    $("#save").click(function(){
        var jsonString = JSON.stringify(graph);
        console.log(jsonString);
    });
    $("#load").click(function(){
        $.getJSON('json/load.json',function(data){
          graph.clear();
          console.log(data);
          graph.fromJSON(data);
        });
    });
    $('select').material_select();
});
