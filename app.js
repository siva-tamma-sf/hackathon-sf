const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRoutes = require('./routes');

const app = express();
const port = 5000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

registerRoutes(app);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));