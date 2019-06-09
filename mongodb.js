//CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Database connection failed');
    }

    const db = client.db(databaseName);

    //updateOne
    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('5cfc2f31e9ba4b2bb4abd5d0')
    //     },
    //     {
    //       $set: { name: 'Prabhath Teja' }
    //     }
    //   )
    //   .then(Response => console.log(Response))
    //   .catch(error => console.log(error));

    //updateMany
    db.collection('tasks')
      .updateMany(
        {
          completed: false
        },
        {
          $set: {
            completed: true
          }
        }
      )
      .then(Response => console.log(Response.modifiedCount))
      .catch(error => console.log(error));

    // //findone.
    // db.collection('users').findOne(
    //   { name: 'Sri Ram Teja' },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Failed to find collection');
    //     }
    //     console.log(result);
    //   }
    // );

    // //find method with a toArray cursor.
    // db.collection('users')
    //   .find({ age: 26 })
    //   .toArray((error, documents) => {
    //     if (error) {
    //       return console.log('Failed to fetch items');
    //     }
    //     console.log(documents);
    //   });

    //fetching Tasks which are completed.
    // db.collection('tasks')
    //   .find({ completed: true })
    //   .toArray((error, documents) => {
    //     if (error) {
    //       return console.log('documents are not found');
    //     }
    //     console.log(documents);
    //   });

    //Inserting

    // db.collection('users').insertOne(
    //   {
    //     name: 'prabhath',
    //     age: 26
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Failed to insert data');
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'santhosh',
    //       age: 26
    //     },
    //     {
    //       name: 'Ajay Sai',
    //       age: 24
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Failed to insert data');
    //     }
    //     console.log(result.ops);
    //   }
    // );
    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       description: 'Complete the react js framework',
    //       completed: true
    //     },
    //     {
    //       description: 'Should complete node course',
    //       completed: false
    //     },
    //     {
    //       description: 'should complete the CSS frameworks',
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Failed to insert data');
    //     }
    //     console.log(result.ops);
    //   }
    // );
  }
);
