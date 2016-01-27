var soap = require('soap');
var url = 'https://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
var username, password;
module.exports = {

	login: function(req,res){
		var name;
		username = req.body.username;
		password = req.body.pass;
		soap.createClient(url,function(err,client){
			client.autenticacion({authUser: username, authContrasenia: password},function(err,result){
				console.log(result);
				if (result.autenticacionResult === true){
					req.session.auth = true;
					client.wsInfoUsuario({usuario: username},function(err,result){
						firstname_ = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.NOMBRES;
						lastname_= result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.APELLIDOS;
						name_ = firstname_ + " " + lastname_;
						// User.create({provider:"ESPOL",uid:"12345",name:name_,firstname:firstname_,lastname:lastname_}).exec(console.log("cree el usuario"));
						User.findOrCreate({provider:"ESPOL",uid:"12345",name:"Holi",firstname:"holi",lastname:"holio"});
						req.session.user = name_ ;
						res.redirect('/profile');
					});
				}
				else {
					res.redirect('/');
				}

			});

		});
	},
};
