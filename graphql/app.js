const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');

const isAuth = require('./middleware/isAuth')
const displayUser = require('./middleware/displayUser')

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(isAuth);
app.use(displayUser);

app.use(
  '/graphql',
  graphqlHttp((req,res) => ({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: {req,res}
  }))
);

mongoose
  .connect('mongodb://localhost:27017/graphql', {useNewUrlParser: true})
  .then(() => {
    app.listen(3030);
  })
  .catch(err => {
    console.log(err);
  });
