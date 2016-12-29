// The connection string specifies the mongo instances running on localhost:50000 and localhost:50001
// and the database to access (cluster-testdb)

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:50000,localhost:50001/cluster-testdb';

// Use the connect method to connect to the server
MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	console.log('Connected successfully to the server');
	db.close();
});
