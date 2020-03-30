import * as bodyParser from "body-parser";
import * as fs from "fs";
import * as express from 'express'
import { render, parse } from 'mustache'

import { MongoClient } from 'mongodb'

import * as crypto from 'crypto'

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'auth';

// Create a new MongoClient
const client = new MongoClient(url);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const loginForm = fs.readFileSync('templates/login-form.html').toString();

// Pre-compile the form
parse(loginForm);

// For healthchecks
app.get('/ping', (req, res) => res.send('pong'));

function renderLoginForm(res: express.Response) {
   // @ts-ignore
   res.setHeader("Content-Type", "text/html");
   res.send(render(loginForm, {}));
}

app.get('/', (req, res) => {
   renderLoginForm(res);
});

app.post('/', async (req, res) => {
   console.log(req.body);
   const connection = await client.connect();

   const db = client.db(dbName);

   const user = await db.collection('users').findOne<User>({ email: req.body.username });

   if (user === null) {
      renderLoginForm(res);
      return;
   }

   const hash = crypto.createHash('sha512');
   const data = hash.update(user.salt + req.body.password, 'utf8');
   const passwordHash = data.digest('hex');

   if (passwordHash !== user.passwordHash) {
      renderLoginForm(res);
      return;
   }

   res.send('#loggedin')
});

app.listen(port, () => console.log(`Listening on ${port}`));
