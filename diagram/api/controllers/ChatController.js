/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addConv: function(req,res){
		//first get data from user, message
		requser = req.param.user;
		reqmsj = req.param.message;
		reqdiagram_id = req.param.diagram_id;

		console.log("addconv controller: " + requser);
		console.log("addconv controller: " + reqmsj);
		console.log("addconv controller: " + reqdiagram_id);
		if(req.isSocket && req.method === 'POST'){
			Chat.create({user:requser, message:reqmsj, diagram_id: reqdiagram_id}).exec(function(error,data){
				console.log("create data: "+data);
				Chat.publishCreate({user:data.user, message:data.message, diagram_id: data.diagram_id});
			});

		}
		else if (req.isSocket) {
			Chat.watch(req.socket);
			console.log("User suscribed to socket"+ req.socket.id);
		}
	}

};
