
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
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