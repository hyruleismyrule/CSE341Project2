// Imports
const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

const authorizationHost = process.env.AUTHORIZATION_HOST;
const authUserURL = authorizationHost + "/userinfo";
// console.log(authUserURL);
// const User = require("../models/user");

const loadUser = async (req, res, next) => {
    // console.log("loading a user");
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    const user = await findOrCreateUser(authZeroUser);

    // console.log(authZeroUser);
    // console.log(user);

    next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
    const response = await fetch(authUserURL, {
        headers: { Authorization: authorizationValue}
    });
    return response.json();
};

const findOrCreateUser = async (authZeroUserJson) => {
    if (!authZeroUserJson) return;

    const exitingUser = await mongodb.getDb().db('genshinImpact').collection('users').find({ identifier: authZeroUserJson.sub });

    if (exitingUser.id) return exitingUser;

    const newUser = await mongodb.getDb().db('genshinImpact').collection('users').insertOne({
        identifier: authZeroUserJson.sub,
        email: authZeroUserJson.email,
        givenName: authZeroUserJson.given_name,
        familyName: authZeroUserJson.family_name,
        locale: authZeroUserJson.locale,
        picture: authZeroUserJson.picture
    });

    return newUser;
}

module.exports = loadUser;