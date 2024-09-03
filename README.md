# User Management System with Delete Functionality

This project demonstrates a simple user management system with a key feature: **Delete User** functionality. The project is implemented using Node.js, Express, and Sequelize ORM.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Delete User Functionality](#delete-user-functionality)
- [Authentication vs Authorization](#authentication-vs-authorization)
- [Explanation](#explanation)
- [License](#license)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone  https://github.com/adeyemimichael/authentication-bounty.git
cd authentication-bounty
npm install
Make sure you have Node.js installed. You can start the server with:
npm start
Usage
Register a User: Create a new user by sending a POST request to /auth/register.
Login: Authenticate by sending a POST request to /auth/login with your credentials.
Delete a User: After logging in, you can delete a user by entering their username in the prompt provided on the web page.
Delete User Functionality
This feature allows any authenticated user to delete another user by entering their username. The implementation is done by adding a new route /delete/user that handles the deletion process.

Backend Implementation
In the authController.js:


const delete_user_by_username = async (req, res) => {
    try {
        const { username } = req.body;
        await UserModel.destroy({
            where: { username: username }
        });
        return res.status(200).json({ message: "User Deleted", ok: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", ok: false });
    }
};
 ### In authHandling.js
router.post(
    "/delete/user",
    authentication,
    authorisation({ isAdmin: false }),
    (req, res) => authController.delete_user_by_username(req, res)
);

### Frontend Implementation
document.getElementById("delete-user-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("other-username").value;
    const response = await fetch(`http://localhost:4001/auth/delete/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
    });
});
```
``` bash
Authentication vs Authorization
Authentication
Authentication is the process of verifying the identity of a user. It ensures that the user is who they claim to be by checking credentials like username and password.

Authorization
Authorization, on the other hand, determines what an authenticated user is allowed to do. It controls access to resources and actions based on the user's permissions or roles.

Explanation
Is deleting a user after authentication a good idea?

While allowing any authenticated user to delete another user might be feasible in certain scenarios (like testing or educational purposes), it’s generally a bad idea for a production environment. Such functionality should be restricted to authorized roles, typically admins, to prevent misuse and unauthorized deletions.

Key Differences:

Authentication confirms the user's identity.
Authorization controls the actions a user can perform based on their role or permissions.
The two concepts are distinct but often work together. A secure system must ensure both proper authentication and authorization are in place.

