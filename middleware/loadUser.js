// Imports
const mongodb = require('../connections/index');
// const ObjectId = require('mongodb').ObjectId;
const userController = require('../controllers/user.js');

const authorizationHost = process.env.AUTHORIZATION_HOST;
const authUserURL = authorizationHost + "/userinfo";
// console.log(authUserURL);
// const User = require("../models/user");

const loadUser = async (req, res, next) => {
    // console.log("loading a user");
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    const user = await findOrCreateUser(authZeroUser);

    // console.log(authZeroUser);
    console.log(user);

    req.user = user;

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

// https://dev-6rfoxiaajiqencck.us.auth0.com/authorize?response_type=code&client_id=f2SSSB3Z4g6jwPxkRAVL1Mx9gajH9qCe&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid%20profile%20email&state=1234

// https://dev-6rfoxiaajiqencck.us.auth0.com/u/login?state=hKFo2SBtNG5NLWNGWnI5eVUxb05DY29uNlNlWmV4cUZwYVp2WKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEJhQzVUM2E1T0NJVHZURWtmN3lLMHpjZFhZNlZTUXZ2o2NpZNkgZjJTU1NCM1o0ZzZqd1B4a1JBVkwxTXg5Z2FqSDlxQ2U