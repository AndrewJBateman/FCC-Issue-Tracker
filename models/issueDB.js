const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var ProjectSchema = new mongoose.Schema({
	issue_title: { type: String, required: true },
	issue_text: { type: String, required: true },
	created_by: { type: String, required: true },
	assigned_to: { type: String, required: false },
	status_text: { type: String, required: false },
	created_on: { type: Date, default: new Date() },
	updated_on: { type: Date, default: new Date() },
	open: { type: Boolean, default: true },
	projectName: { type: String, required: true },
});
var Project = mongoose.model('IssueBoard', ProjectSchema);

exports.Project = Project;
