const express = require("express");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const app = express()

// Register the home route that displays a welcome message
// This route can be accessed without a token
app.get('/', function (req, res) {
    res.send("Welcome to our API");
})

// Register the route to get a new token
// In a real world scenario we would authenticate user credentials
// before creating a token, but for simplicity accessing this route
// will generate a new token that is valid for 2 minutes
app.get('/login', function (req, res) {
    const token = jwt.sign({ isAdmin: true, username: req.query.userName },
        process.env.SECRET, { expiresIn: 400 });
    res.send(token)
})

function authorizationMiddleware(req, res, next) {
    const headerAuth = req.headers.authorization;
    if (headerAuth) {
        jwt.verify(headerAuth, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).send("UnAuthorized")
            }
            const { isAdmin } = decoded;
            req.isAdmin = isAdmin;
            return next();
        })

    }
    else res.status(401).send("UnAuthorized")
}

function isAdmin(req, res, next) {
    if (req.isAdmin) return next();
    return res.status(401).send("You are not Admin!!")
}
function wrapper(param) {
    //add more logic
    return function isAdmin(req, res, next) {
        // compare to param
    }
}

// Register a route that requires a valid token to view data //authMiddleware, verifyIsAdmin
app.get('/products', authorizationMiddleware, isAdmin, function (req, res) {
    res.json({ product: "insuranceMountain", loginBy: "id", userName: "Gal", totalBalance: 1002 })
})


app.listen(3550)

const pk = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`