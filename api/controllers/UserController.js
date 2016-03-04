/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `UserController.index()`
   */
  index: function(req, res) {
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },


  /**
   * `UserController.create()`
   */
  create: function(req, res) {
    var params = req.params.all();
    if (params.repassword == params.password) {
      User.findOne({
        username: params.username
      }).exec(function(err, users) {
        if (err) {
          User.create({
            username: params.username,
            password: params.password
          }).exec(function createCB(err, created) {
            res.view('myaccountpage', {
              success: "user created successfully"
            });
          });
        } else {
          res.view('registerpage', {
            error: 'User already exists'
          });
        }
      });
    } else {
      res.view('registerpage', {
        error: 'Password do not match'
      });
    }

  },


  /**
   * `UserController.show()`
   */
  show: function(req, res) {

    User.find().exec(function(err, users) {
      if (err) {
        return res.json({
          notice: ' error '
        });
      } else {
        return res.json({
          users
        });
      }
    });
  },

  /**
   * `UserController.show()`
   */
  showOne: function(req, res) {

    User.findOne({
      username: res.username
    }).exec(function(err, users) {
      if (err) {
        return res.json({
          notice: ' error '
        });
      } else {
        return res.json({
          users
        });
      }
    });
  },
  /**
   * `UserController.edit()`
   */
  edit: function(req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `UserController.delete()`
   */
  delete: function(req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },
  /**
   * `UserController.create()`
   */
  register: function(req, res) {
    res.view('registerpage');
  }
};
