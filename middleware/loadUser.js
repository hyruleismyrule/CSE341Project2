// Imports
const mongodb = require('../connections/index');

const authorizationHost = process.env.AUTHORIZATION_HOST;
const authUserURL = authorizationHost + "/userinfo";


const loadUser = async (req, res, next) => {
    // console.log("loadUser");
    // console.log(req.headers);


    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    // const authZeroUser = await fetchAuthZeroUser(req.cookies.access_token);
    const user = await findOrCreateUser(authZeroUser);

    // console.log(user);

    req.user = user;

    // res.send({"SMEG":"HEAD"});

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
// {"identifier":"google-oauth2|10079488729658549166800000"}
    const exitingUser = await mongodb.getDb().db('genshinImpact').collection('users').find({ identifier: authZeroUserJson.sub }).toArray();
    // const exitingUser = await mongodb.getDb().db('genshinImpact').collection('users').find({ identifier: authZeroUserJson.sub });
    
    // console.log(exitingUser);

    if (exitingUser.length > 0) {
        return exitingUser[0];
    }

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
