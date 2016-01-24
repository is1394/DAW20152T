/**
 * DiagramController
 *
 * @description :: Server-side logic for managing Diagrams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getDiagramasByUser: function(req, res){
    console.log(req.session.user);
    console.log(req.session);
    Diagram.find({autor:req.session.user}).exec(function(err, found){
      return res.json({result: found})
    });
  },
  createDiagram : function(req, res){
    var name = req.param('name');
    var autor = req.param('autor');
    var content = req.param('content');
    var id = req.param('id');
    Diagram.findOne({id:id}).exec(function(err, created){
      console.log(err);
      created.content = content;
      created.name = name;
      created.save(function(err,s){
        return res.json({new:created});
      });
    });
  },
  showDiagram: function(req, res){
    var id = req.param('id');
    if(id == null){
      Diagram.create({autor:req.session.user,name:''}).exec(function(err, result){
        return res.view('workspace_material.ejs',{id:result.id})
      });
    }else{
      console.log(id);
      return res.view('workspace_material.ejs',{id:id})
    }
  }
};

