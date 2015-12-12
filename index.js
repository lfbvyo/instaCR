var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser')


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//app.use(express.static('public'));

var globalLimit = 2;
var url = 'mongodb://localhost:27017/instaCR';

// Guarda un nuevo post en la base de datos 
app.post('/post/new', function(req, res){
	var post = req.body;
	post.creado = new Date();
	post.comentarios = [];
  post.likes = 0;
	MongoClient.connect(url, function(err, db) {
	    if (err) {
		res.end('500: Internal Server Error :p', 500);
	    }
	    db.collection('posts').insert(post);
	});
	res.end('Ok');
});

// agrega un comentario a un post
app.post('/comment/new/:post_id', function(req, res){
  var comment = req.body;
  comment.creado = new Date();
  MongoClient.connect(url, function(err, db) {
      if (err) {
          res.end('500: Internal Server Error :p', 500);
      }
      db.collection('posts').update(
        {'_id':new ObjectId(req.params.post_id)}, 
        {$push:{comentarios:comment}}, 
        function(err){
    			if (err) {
    	        res.end('500: Internal Server Error :p', 500);
        	}

         });
  });
  res.end('Ok');
});

// agrega un like a un post
app.post('/like/new/:post_id', function(req, res){
  MongoClient.connect(url, function(err, db) {
      if (err) {
          res.end('500: Internal Server Error :p', 500);
      }
      db.collection('posts').update(
        {'_id':new ObjectId(req.params.post_id)}, 
        {$inc:{likes:1}}, 
        function(err){
          if (err) {
              res.end('500: Internal Server Error :p', 500);
          }

         });
  });
  res.end('Ok');
});

// Obtiene los posts
app.get('/:page_num', function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.end('500: Internal Server Error :p', 500);
    }
    db.collection('posts').find(
	{},
	{ limit:globalLimit, skip:globalLimit*req.params.page_num}
	).toArray(function(err, docs) {
        res.jsonp(docs); 
        db.close();
      });
  });
});


var port = 3000;
app.listen(port);
console.log('En servidor corriendo en el puerto: '+port);