const assert = require('assert');

exports.insertDocument = (db, document, collection, callBack) => {
    const coll = db.collection(collection);

    coll.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log(`Inserted ${result.result.n} documents into the collection`);
        callBack(result);
    });
};

exports.findDocument = (db, collection, callBack) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, result) => {
        assert.equal(err, null);
        callBack(result);
    });
};

exports.removeDocument = (db, document, collection, callBack) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log(`Removed the document ${document}`);
        callBack(result);
    });
};

exports.updateDocument = (db, document, update, collection, callBack) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);
        console.log(`Updated the document with ${update}`);
        callBack(result);
    });
};