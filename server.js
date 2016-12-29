var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/learning-mongodb';

// Use MongoDB's connect method to connect to the server
MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	console.log('Connected successfully to the server: ' + url);

	insertDocuments(db, function () {
		indexCollection(db, function () {
			db.close();
		});
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

	// The result of this is the following:
	// - Connected successfully to the server: mongodb://localhost:27017/learning-mongodb
	// - Inserted 3 documents into the collection
}

// Find all documents
// Add a query that returns all the documents
var findDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');

	// Find all the documents
	collection.find({}).toArray(function (err, docs) {
		assert.equal(err, null);
		console.log('Found the following records');
		console.log(docs[0], docs[1], docs[2]);
		callback(docs);
	});

	// The result of this query is it returns all the documents in the 'documents' collection
}

// Add a query filter to find only documents which meet the query criteria
var findDocuments = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find a certain document
	collection.find({'a': 3}).toArray(function (err, docs) {
		assert.equal(err, null);
		console.log('Found the following document');
		console.log(docs[0]);
		callback(docs);
	});

	// The result of this query is that only the document that matches 'a': 3 should be returned.
}

// The following query updates a document in the documents collection.
var updateDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');

	// Update a document where a is 2, set b equal to 1
	collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function (err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Updated the document with the field a equal to 2');
		callback(result);
	});
}

// The following query removes a document where the field a is equal to 3
var removeDocument = function (db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');

	// Delete a certain collection item.
	collection.deleteOne({ a: 3 }, function (err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Removed the document with the field a equal to 3');
		callback(result);
	});
}

// Index a collection
// Indexes can improve your applications performance. The following function creates an index on the a field in the documents collection
var indexCollection = function (db, callback) {
	db.collection('documents').createIndex({ 'a': 1 }, null, function (err, results) {
		console.log(results);
		callback();
	});
}
