'use strict';
require('dotenv').config({ path: './.env' });
var express = require('express');
var bodyParser = require('body-parser');
var expect = require('chai').expect;
var cors = require('cors');
var helmet = require('helmet');
var apiRoutes = require('./routes/api.js');
var fccTestingRoutes = require('./routes/fcctesting.js');
var runner = require('./test-runner');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var app = express();
app.use(helmet());
//Challenge 1.I will prevent cross-site scripting (XSS) attacks.
app.use(helmet.xssFilter());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

// MongoDB Atlas Database Access Credentials
const dbUserName = process.env.USER_NAME;
const dbUserPass = process.env.USER_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;
const dbUrl = `mongodb+srv://${dbUserName}:${dbUserPass}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

// MongoDB Database connection
mongoose.connect(
	dbUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		if (err) {
			console.log('Database connection error: ' + err);
		} else {
			console.log(
				'Successful database connection to Mongoose Atlas database named: ',
				dbName
			);
		}
	}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/').get((req, res) => {
	res.sendFile(process.cwd() + '/views/issue.html');
});

//Index page (static HTML)
app.route('/').get((req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use((req, res, next) => {
	res.status(404).type('text').send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
	console.log('Listening on port ' + process.env.PORT);
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(() => {
			try {
				runner.run();
			} catch (e) {
				var error = e;
				console.log('Tests are not valid:');
				console.log(error);
			}
		}, 3500);
	}
});

module.exports = app; //for testing
