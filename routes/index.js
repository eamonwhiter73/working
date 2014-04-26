
/*
 * GET home page.
 */

exports.index = function(User) {
  return function(req, res) {
    User.find({}, function(error, users) {
      res.render('index', {
        title: 'Express',
        users : users
      });
    });
  };
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.addUser = function (User) {
  return function(req, res) {
    var user = new User(req.body);
      user.save(function(error, user) {
      if (error || !user) {
        res.json({ error : error });
      } else {
        res.json({ user : user });
      }
    });
  };
}

exports.get = function(User) {
  return function(req, res) {
    User.find({}, function(error, users) {
      res.json({ users : users });
    });
  }
};

exports.update = function(User) {
  return function(req, res) {
    User.findOne({ _id : req.params.id }, function(error, user) {
      if (error || !user) {
        res.json({ error : error });
      } else {
        user.done = req.body.done;
        user.save(function(error, user) {
          if (error || !user) {
            res.json({ error : error });
          } else {
            res.json({ user : user });
          }
        });
      }
    });
  }
};