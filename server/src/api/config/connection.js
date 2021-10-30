const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

const connection = () => (
  schema ? Promise.resolve(schema)
    : MongoClient
      .connect('mongodb://localhost:27017/taskManager', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db('TaskManager'))
      .then((dbSchema) => {
        schema = dbSchema;
        return schema;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      }));

module.exports = connection;
