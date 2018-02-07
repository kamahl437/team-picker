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
  return res.json(team);
});



router.post('/team', function(req, res, next) {
  console.log('im in the method!')
  let response = saveTeam(req.body, next);
  return res.json(response);
});

function saveTeam(team, cb) {
  console.log(team);
  let response = 'error'
  client.connect(uri, function (err, db) {
	    if (err) cb(err)
    	var collection = db.collection('team');
    	collection.insert(team, function(err, result) {
        if(err){cb(err)}
			response =  { result: "success" };
    	});
	});
  return response;
}

function getTeam(teamIdArg, cb) {
  let response = ''
  client.connect(uri, function (err, db) {
    if (err) return cb(err);
    var collection = db.collection('team');
    collection.find({teamId:teamIdArg}).toArray(function(err, docs) {
      if (err) return cb(err);
      response =  docs;
    });
  });
  return response;
}


module.exports = router;
