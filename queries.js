var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/puppies';
var connection = {
	host: 'localhost',
	database: 'puppies',
	port: 5432,
	user: 'postgres',
	password: 'postgres'
}

var db = pgp(connection);

//add query functions

module.exports = {
	getPuppies: getPuppies,
	getPuppy: getPuppy,
	createPuppy: createPuppy,
	updatePuppy: updatePuppy,
	removePuppy: removePuppy
};

function getPuppies(req, res, next){
	db.any('select * from pups')
	.then(function(data){
		res.status(200)
		.json({
			status: 'success',
			data: data
		})
	})
	.catch(function(err){
		return next(err)
	})
}
function getPuppy(req, res, next){
	var pupID = parseInt(req.params.id);
	  db.one('select * from pups where id = $1', pupID)
	    .then(function (data) {
	      res.status(200)
	        .json({
	          status: 'success',
	          data: data,
	          message: 'Retrieved ONE puppy'
	        });
	    })
	    .catch(function (err) {
	      return next(err);
	    });
}
function createPuppy(req, res, next){
	req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updatePuppy(req, res, next){
	db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function removePuppy(req, res, next){
	var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}