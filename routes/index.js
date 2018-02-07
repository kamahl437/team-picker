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
  let team = getTeam(req.params.teamId);
  return res.json(team);
});



router.post('/team', function(req, res, next) {
  let response = saveTeam(req.body);
  return res.json(response);
});

function saveTeam(team) {
  client.connect(uri, function (err, db) {
	    if (err) return next(err);
    	var collection = db.collection('team');
    	collection.insertMany(team, function(err, result) {
			return { result: "success" };
    	});
	});
}

function getTeam(teamIdArg) {
  client.connect(uri, function (err, db) {
    if (err) return next(err);
    var collection = db.collection('team');
    collection.find({teamId:teamIdArg}).toArray(function(err, docs) {
      if (err) return next(err);
      return docs;
    });
  });
}


module.exports = router;
