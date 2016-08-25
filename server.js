var express = require('express');
var app = express();
var mongojs = require('mongojs');
//which database and collections we gonna be using
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');


/*app.get('/', function(req, res) {
	res.send("Hello world from server.js");
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res) {
	console.log("I receive a GET request");

	//dummy data
	/*person1 = {
		name: 'Tim',
		email: 'tim@gmail.com',
		number: '(111) 111-1111'
	};

	person2 = {
		name: 'Emily',
		email: 'emily@gmail.com',
		number: '(222) 222-2222',
	};

	person3 = {
		name: 'John',
		email: 'john@gmail.com',
		number: '(333) 333-3333'
	};

	var contactList = [person1, person2, person3];
	res.json(contactList);*/

	db.contactlist.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactlist', function(req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, docs) {
		res.json(docs);
	});
});

app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("server running on port 3000");
