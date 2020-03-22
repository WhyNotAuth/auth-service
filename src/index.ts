import * as bodyParser from "body-parser";
import * as fs from "fs";
import * as express from 'express'
import { render, parse } from 'mustache'

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

app.post('/', (req, res) => {
   console.log(req.body);
   renderLoginForm(res);
});

app.listen(port, () => console.log(`Listening on ${port}`));
