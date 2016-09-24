/**
 * Anuncios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {

  	text:{
  		type:'mediumtext',
  		required: true
  	},
  	estado:{
  		type:'string'
  	},
  	group:{
  		model: 'group'
  	},
    autor:{
      model: 'user'
    }

  },
  anunciosFindByGroup: function (options, cb) {
     Anuncio.find({group:options}).populate('autor').exec(function (err, anuncios) {
       if (err) return cb(err);
       if (!anuncios) return cb(new Error('Anuncios not found.'));
       return cb(null,anuncios);
     });
   }
};


