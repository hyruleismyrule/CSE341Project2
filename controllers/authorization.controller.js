const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURL = process.env.REDIRECT_URL;
const authorizationHost = process.env.AUTHORIZATION_HOST;
const userRedirectUrl = process.env.USER_REDIRECT_URL;
const authorizationURL = authorizationHost + "/authorize?response_type=code&client_id=" + clientID + "&redirect_uri=" + encodeURIComponent(redirectURL) + "&scope=openid%20profile%20email&state=1234";
const tokenURL = authorizationHost + "/oauth/token/";


const AuthorizationController = {
    login: (req, res) => {
        console.log("login");
        res.redirect(authorizationURL);
    },
    callback: async (req, res) => {
        console.log("callback");
        const response = await fetch(tokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams( {
                grant_type: "authorization_code",
                client_id: clientID,
                client_secret: clientSecret,
                redirect_uri: redirectURL,
                scope: "openid profile email",
                code: req.query.code
            })
        });

        const jsonResponse = await response.json();

        const token = jsonResponse.access_token;

        // // Access Token
        res.cookie("access_token", token, {
            httpOnly: true
        })
        .json(jsonResponse);        

        // console.log(res.cookie("access_token"));
      
        // const auth = jsonResponse.token_type + " " + jsonResponse.access_token;

        // res.header('Authorization', auth);
        // res.set({
        //     'Authorization': auth
        // })

        // res.setHeader('Authorization', auth)

        // res.redirect(userRedirectUrl);
    }
    // },
    // userpage: async (req, res) => {
    //     console.log("userpage");
    //     const response = await fetch(tokenURL, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //         }
    //     });

    //     const jsonResponse = await response.json();; 

    //     // Access Token
    //     res.json(jsonResponse);
    // }
}

module.exports = AuthorizationController;
