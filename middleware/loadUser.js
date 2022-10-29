const authorizationHost = process.env.AUTHORIZATION_HOST;
const authUserURL = authorizationHost + "/userinfo";
// console.log(authUserURL);
const User = require("../models/user");

const loadUser = async (req, res, next) => {
    // console.log("loading a user");
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);

    console.log(authZeroUser);

    next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
    const responce = await fetch(authUserURL, {
        headers: { Authorization: authorizationValue}
    });
    return responce.json();
};

const findOrCreateUser = (authZeroUserJson) => {
    if (!authZeroUserJson) return;

    const exitingUser = User.findOne({});
}

module.exports = loadUser;