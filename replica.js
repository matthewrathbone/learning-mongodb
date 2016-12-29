var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017,localhost:27018/myproject?replicaSet=foo';

// Use the connect method to connect to the server
MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	console.log('Connected correctly to the server: ');
	db.close();
});
