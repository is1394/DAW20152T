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
						firstname = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.NOMBRES;
						lastname= result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.APELLIDOS;
						name = firstname + " " + lastname;
						req.session.user = name ;
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
