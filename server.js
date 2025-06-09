const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:3001';
const DB_NAME = 'mydatabase';
const COLLECTION = 'contacts';

const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    addContact(name: String!, email: String!): Contact
  }
`;

async function startServer() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const contacts = db.collection(COLLECTION);

  const resolvers = {
    Mutation: {
      addContact: async (_, { name, email }) => {
        const result = await contacts.insertOne({ name, email });
        return { id: result.insertedId.toString(), name, email };
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

startServer();