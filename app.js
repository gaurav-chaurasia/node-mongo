const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { debugPort } = require('process');
const dboper = require('./operation');

const url = 'mongodb://localhost:27017/';
const dbname = 'complete_backend';

MongoClient.connect(url, (err, client) => {
    
    assert.equal(err, null);

    console.log(`Connected correctly to server`);

    const db = client.db(dbname);

    dboper.insertDocument(db, {"name":"su","description":"woow!!!"}, 'dishes', (result) => {
        console.log(`\nInsert Document: \n` + result.ops);

        dboper.findDocument(db, 'dishes', (docs) => {
            console.log(`Found Document:\n ${docs}`);
            
            dboper.updateDocument(db, {name:"su"}, {description:"woow updated!!!"}, 'dishes', (result) => {
                console.log(`Updated Document: \n ${result.result}`);

                dboper.findDocument(db, 'dishes', (docs) => {
                    console.log(`Found Updated Document:\n ${docs}`);
                    
                    db.dropCollection('dishes', (result) => {
                        console.log(`Droped collections:` + result);
                        client.close();
                    });
                });
            });
        });
    });
});