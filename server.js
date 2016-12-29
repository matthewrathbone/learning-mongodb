var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/learning-mongodb';

// Use MongoDB's connect method to connect to the server
MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	console.log('Connected successfully to the server: ' + url);

	insertDocuments(db, function () {
		db.close();
	});
});

// insertDocuments will use the 'insertMany' method to add three documents to the documents collection.

////
// The insert command returns an object with the following fields:
// - 'result' - Contains the result document from MongoDB
// - 'ops' - Contains the documents inserted with added _id fields.
// - 'connection' - Contains the connection used to perform the insert.
////

var insertDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');

	// Insert 3 documents
	collection.insertMany([
		{ a: 1 }, { a: 2 }, { a: 3 }
	], function (err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log('Inserted 3 documents into the collection');
		callback(result);
	});
}
