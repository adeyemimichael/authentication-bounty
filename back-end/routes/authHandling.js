const express = require('express');
const router = express.Router();//change handler to this router
const authentication = require('../service/security/authentication');

//DB Files
const authController = require('../controllers/authController');
const authorisation = require('../service/security/authorisation');

//Route
router.post('/login', (req, res) => authController.login(req, res))
router.post('/logout', (req, res) => authController.logout(req, res))
router.post('/register', (req, res) => authController.register(req, res))
router.post(
  "/delete/user",
  authentication,  // Ensure the user is authenticated
  authorisation({ isAdmin: false }),  // Adjust if only admins can delete users
  authController.delete_user_by_username
);
router.get('/user', authentication, authorisation("user"), (req, res) => authController.load_user_profile(req, res))
router.put('/user', authentication, authorisation("user"), (req, res) => authController.update_user_profile(req, res))
// Add the delete user route


module.exports = router;