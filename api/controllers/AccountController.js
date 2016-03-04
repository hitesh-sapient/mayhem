/**
 * AccountController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `AccountController.()`
   */
	 myaccount: function(req, res){
   res.view('myaccountpage');
 }
};
