/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ObjectId = require('mongodb').ObjectID;
var db=require('../models/issueDB.js');
var Project=db.Project

module.exports = (app) => {
  app.route('/api/issues/:project')
  //challenge 5. I can GET /api/issues/{projectname} for an array of 
  //all issues on that specific project with all the information 
  //for each issue as was returned when posted.
  //challenge 9. I can GET with as many queries as I want.
  .get((req, res) => {
    var project = req.params.project;
    var queryObj = req.query;
    queryObj['projectName']=project;
    Project.find(queryObj,{"projectName":0,"__v":0}, (err,data) => {
      if(err) return err;
      res.json(data);
    });
  })

  //challenge 2. I can POST /api/issues/{projectname} with form data 
  //containing required issue_title, issue_text, created_by, 
  //and optional assigned_to and status_text.
  //challenge 3. Posting data without required fields will fail.
  //challenge 4. I can post data with the optional fields.
  .post((req, res) => {
    var projectName = req.params.project;
    var issue_title=req.body.issue_title;
    var issue_text=req.body.issue_text;
    var created_by=req.body.created_by;
    if (!issue_title || !issue_text || !created_by){
      res.send('missing inputs'); //required inputs
    }
    var project = new Project
      ({
        'issue_title': issue_title,
        'issue_text':  issue_text,
        'created_by':  created_by,
        'assigned_to': req.body.assigned_to || "",
        'status_text': req.body.status_text || "",
        'projectName': projectName,
      })
    project.save((err,data) => {
      if (err) return err;
      console.log('New data saved.');
      res.json(data)
      console.log(data);
      Project.find()
             .exec((err,data) => {
              if(err) return err;
              Project.deleteOne({_id:`{data[0]['_id']}`}, (err,data) => {
                console.log('Old data removed.');
              });
             });
    }); //end project.save
    
  }) // end .post
  
  //challenge 6. I can PUT /api/issues/{projectname} with a _id and 
  //any fields in the object with a value to object said object.
  //challenge 7. I can GET with queries to filter the return data, including the _id.
  //challenge 8.I can PUT with as many fields and values as I wish to update.
  .put((req, res) => {
    var project = req.params.project;
    var id=req.body._id;    
    if (JSON.stringify(req.body) == "{}")
      {res.send('no updated field sent')} 
    else {
      var updateForm={'open':req.body.open,'updated_on': new Date()}
      
      updateForm['issue_title'] = (req.body.issue_title!="")? req.body.issue_title : null;
      updateForm['issue_text'] = (req.body.issue_text!="")? req.body.issue_text : null;
      updateForm['created_by'] = (req.body.created_by!="")? req.body.created_by : null;
      updateForm['assigned_to'] = (req.body.assigned_to!="")? req.body.assigned_to : null;
      updateForm['status_text'] = (req.body.status_text!="")? req.body.status_text : null;
            
      Project.findOneAndUpdate({'_id':id},updateForm,{new:true},(err,data) => {
        if(err){
          res.send('could not update ' + id)
        }else{
          res.send('successfully updated')
        };
      }); //end of Project.findOneAndUpdate
    }
  })
  
  //challenge 10.I can DELETE /api/issues/{projectname} with a _id to completely delete an issue.
  .delete((req, res) => {
    var project = req.params.project;
    var id=req.body._id;
    if (!id){
      res.send('_id error')
    }else{
      Project.findByIdAndRemove({'_id':id},(err,data) => {
        if (err){
          res.send('could not delete project with id '+ id)
        }else{
          res.send('deleted '+ id)
        }
      });
    } //end of if else
  }); //end of delete
  
}; //end of module.exports

  


