const express = require('express');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

const url = 'mongodb://admin:password@mongodb:27017/?authSource=admin';
const client = new MongoClient(url);
const dbName = 'userdb';

client.connect();

app.get('/', async (req, res) => {
  const users = await client.db(dbName).collection('users').find({}).toArray();
  const usersHtml = users.map(u => `<li>${u.name} - ${u.userId}</li>`).join('');

  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
  res.send(html.replace('<!-- USERS -->', usersHtml));
});

app.post('/submit', async (req, res) => {
  await client.db(dbName).collection('users').insertOne({
    name: req.body.name,
    userId: req.body.userId
  });

  res.redirect('/');
});

app.listen(3000, () => console.log('http://127.0.0.1:3000'));