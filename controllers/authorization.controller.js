const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURL = process.env.REDIRECT_URL;
const authorizationHost = process.env.AUTHORIZATION_HOST;

const authorizationURL = authorizationHost + "/authorize?response_type=code&client_id=" + clientID + "&redirect_uri=" + redirectURL + "&scope=openid%20profile%20email&state=1234";

const AuthorizationController = {
    login: (req, res) => {
        // res.send("login endpoint");
        // res.redirect("https://dev-6rfoxiaajiqencck.us.auth0.com/authorize?response_type=code&client_id=f2SSSB3Z4g6jwPxkRAVL1Mx9gajH9qCe&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid%20profile%20email&state=1234");
        res.redirect(authorizationURL);
    }
}

module.exports = AuthorizationController;