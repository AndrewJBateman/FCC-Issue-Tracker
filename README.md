# :zap: Nodejs Issue Tracker (Information Security and Quality Assurance)

* Node.js app to store and access book data as json objects in a MongoDB database
* Part of a FreeCodeCamp exercise for Front End Certification.

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [:zap: Nodejs Issue Tracker (Information Security and Quality Assurance)](#zap-nodejs-issue-tracker-information-security-and-quality-assurance)
	* [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
	* [:books: General info](#books-general-info)
	* [:camera: Screenshots](#camera-screenshots)
	* [:signal_strength: Technologies](#signal_strength-technologies)
	* [:floppy_disk: Setup](#floppy_disk-setup)
	* [:computer: Code Examples](#computer-code-examples)
	* [:cool: Features](#cool-features)
	* [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
	* [:clap: Inspiration](#clap-inspiration)
	* [:envelope: Contact](#envelope-contact)

## :books: General info

* This project is no longer part of the Free Code Camp Front End Certification. Original instructions from FCC:

1) ADD YOUR MongoDB connection string to .env without quotes as db
    `example: DB=mongodb://admin:pass@1234.mlab.com:1234/fccpersonallib`
2) SET NODE_ENV to `test` without quotes
3) You need to create all routes within `routes/api.js`
4) You will add any security features to `server.js`
5) You will create all of the functional tests in `tests/2_functional-tests.js`

* MongoDB Cloud Atlas database set up to use Google Cloud Storage.

## :camera: Screenshots

![Example screenshot](./img/issues.png).
![Example screenshot](./img/postman.png).

## :signal_strength: Technologies

* [Node v12](https://nodejs.org/en/) javaScript runtime built on Chrome's V8 JavaScript engine
* [Express v4](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
* [mongoose v5](https://mongoosejs.com/) object modelling for node.js.
* [Helmet v4](https://helmetjs.github.io/) Express.js security with HTTP headers.
* [nocache v2](https://www.npmjs.com/package/nocache) Middleware to turn off caching (was part of Helmet)
* [Cors v2](https://www.npmjs.com/package/cors) node.js package for providing Connect/Express middleware that can be used to enable CORS with various options.
* [jQuery v3](https://jquery.com/) Javascript library

## :floppy_disk: Setup

* Create MongoDB Atlas Cloud database (or local installed MongoDB database) and add user access/database credentials (USER_NAME, USER_PASSWORD, DB_CLUSTER, PORT & DB_NAME) to a new `.env` file. This is used in `server.js`.
* Add IP address to MongoDB Atlas Network Access whitelist. Or simply whitelist all (IP address 0.0.0.0/0).
* Run `node server.js` for a dev server. Navigate to `http://localhost:4000/`.
* The app will automatically reload if you change any of the source files.

## :computer: Code Examples

* extract from `routes/api.js` showing routes to..

```javascript
.post((req, res) => {
	var projectName = req.params.project;
	var issue_title = req.body.issue_title;
	var issue_text = req.body.issue_text;
	var created_by = req.body.created_by;
	if (!issue_title || !issue_text || !created_by) {
		res.send('missing inputs'); //required inputs
	}
	var project = new Project({
		issue_title: issue_title,
		issue_text: issue_text,
		created_by: created_by,
		assigned_to: req.body.assigned_to || '',
		status_text: req.body.status_text || '',
		projectName: projectName,
	});
	project.save((err, data) => {
		if (err) return err;
		console.log('New data saved.');
		res.json(data);
		console.log(data);
		Project.find().exec((err, data) => {
			if (err) return err;
			Project.deleteOne({ _id: `{data[0]['_id']}` }, (err, data) => {
				console.log('Old data removed.');
			});
		});
	});
})
```

## :cool: Features

* Common MongoDB Atlas Cloud connection method used to save a lot of time with multple projects.

## :clipboard: Status & To-Do List

* Status: Working and passes tests but limited functionality - e.g. does not display the project just entered with confirmation etc. Dependencies all up to date.
* To-Do: replace var with const/let, use destructuring etc. This was early code just to pass the tests.

## :clap: Inspiration

* [freeCodeCamp's curriculum](https://www.freecodecamp.org/learn/) - although it has changed in the years since I completed this challlenge.

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
