const express = require('express'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      Mustache = require('mustache');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const loginForm = fs.readFileSync('templates/login-form.html').toString();

Mustache.parse(loginForm);

// For healthchecks
app.get('/ping', (req, res) => res.send('pong'));

function renderLoginForm(res) {
   res.header["Content-Type"] = "text/html";
   res.send(Mustache.render(loginForm));
}

app.get('/', (req, res) => {
   renderLoginForm(res);
});

app.post('/', (req, res) => {
   console.log(req.body);
   renderLoginForm(res);
});

app.listen(port, () => console.log(`Listening on ${port}`));
