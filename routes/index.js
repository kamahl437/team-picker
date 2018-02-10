var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var client = mongodb.MongoClient;

var uri = "mongodb://mongo/team-picker";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/team/all', function(req, res, next) {
  client.connect(uri, function (err, db) {
    if (err) return next(err);
    var collection = db.collection('team');
    collection.find({}).toArray(function(err, docs) {
      if (err) return next(err);
      return res.json(docs);
    });
  });
});

router.get('/team/:teamId', function(req, res, next) {
  let team = getTeam(req.params.teamId, next);
  console.log('params');
  console.log(req.params.teamId);
  return res.json(team);
});



router.post('/team', function(req, res, next) {
  console.log('im in the method!')
  var response = saveTeam(req.body, next);
  return res.json(response);
});

// this method works but does not send back a proper response for some strange reason.  It sends error every time
function saveTeam(team, cb) {
  console.log(team);
  var response = 'error'
  client.connect(uri, function (err, db) {
	    if (err) cb(err)
    	var collection = db.collection('team');
    	collection.insert(team, function(err, result) {
        console.log(result);
        if(err){cb(err)}
			response =  { result: "success" };
    	});
	});
  return response;
}

// this method works but does not send back a proper response for some strange reason.  It sends blank every time
function getTeam(teamIdArg, cb) {
  var response = ''
  client.connect(uri, function (err, db) {
    if (err) return cb(err);
    var collection = db.collection('team');
    collection.find({teamId:teamIdArg}).toArray(function(err, docs) {
      console.log(docs);
      if (err) return cb(err);
      response =  docs;
    });
  });
  return response;
}


module.exports = router;
