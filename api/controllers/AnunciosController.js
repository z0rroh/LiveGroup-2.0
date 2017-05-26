/**
 * AnunciosController
 *
 * @description :: Server-side logic for managing anuncios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment=require('moment');

module.exports = {

	index: function(req,res){
		res.view('anuncios/index');
	},
	subscribe: function(req,res){
			/*var infoUser = {
				name: req.session.User.name,
				group: req.session.User.id_group
			}*/
			if(req.isSocket && req.session.User){
					Anuncio.anunciosFindByGroup(req.session.User.id_group, function(err, anuncios){
					// Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
							Anuncio.subscribe(req, anuncios);
					});
					Anuncio.watch(req);
					sails.log( 'Usuario suscrito a anuncios con la id: ' + req.socket.id );
			}
			//res.send(infoUser);
	},
	new: function(req,res){
		res.view('anuncios/new');
	},
	show: function(req, res, next){
		/*
		User.findByGroup(req.session.User.id_group, function(err,users){
			res.view({
				users: users
			});
		});
*/

	},
	create: function(req, res){
		var anuncioObj={
			text: req.param('text'),
			autor: req.session.User.id,
			group: req.session.User.id_group
		}
		//console.log(anuncioObj);
		Anuncio.create(anuncioObj,function (err, anuncio) {

			if(err){
				var noAnuncio=[{message: 'No se creo el anuncio'}]
				req.session.flash={
						err: noAnuncio
				}
				return res.redirect('anuncios/new');
			}

			var sucessAnuncio=[{message: 'Anuncio creado correctamente'}]
			req.session.flash={
					err: sucessAnuncio
			}
			res.redirect('anuncios/index');

		});
	},
	getAnuncios: function(req, res){
		var anuntios = [];
		var comment = [];
		Anuncio.anunciosFindByGroup(req.session.User.id_group, function(err, anuncios){

			    moment.locale('es');
			    for(var i in anuncios){
						var dia = anuncios[i].createdAt.getDate();
						var mes = anuncios[i].createdAt.getMonth();
						var año = anuncios[i].createdAt.getFullYear();
						var hora = anuncios[i].createdAt.getHours();
						var min = anuncios[i].createdAt.getMinutes();
						var seg = anuncios[i].createdAt.getSeconds();
						var now = moment([año,mes,dia,hora,min,seg]).fromNow();
						anuncios[i].fecha = now;
						var aux = {
							id: anuncios[i].id,
							autor: anuncios[i].autor.name,
							text: anuncios[i].text,
							group: anuncios[i].group,
							fecha: now,
							comment: []
						}
						anuntios.push(aux);

						if( anuncios[i].comment !== ""){

							for(var j=0; j< anuncios[i].comment.length; j++){
								moment.locale('es');
								var dia = anuncios[i].comment[j].createdAt.getDate();
								var mes = anuncios[i].comment[j].createdAt.getMonth();
								var año = anuncios[i].comment[j].createdAt.getFullYear();
								var hora = anuncios[i].comment[j].createdAt.getHours();
								var min = anuncios[i].comment[j].createdAt.getMinutes();
								var seg = anuncios[i].comment[j].createdAt.getSeconds();
								var now = moment([año,mes,dia,hora,min,seg]).fromNow();
								anuncios[i].comment[j].fecha = now;

							}
					}

				}
				res.send(anuntios);
			});
	}

};
