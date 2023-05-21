const express = require('express');
const session = require('express-session');
const mongo = require("./db/conn");
const todo = require('./routes/profile');

const Db = require( './db/conn.js');
const passport = require("passport");
const authRoute = require("./routes/auth/auth.google");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const index = require
const crypto = require('crypto');




const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
const port = process.env.port || 3000;
app.use('/task', todo);

app.get('/', (req, res) => {
  res.send('Welcome to Freelancer Profile');
});
app.use(express.static('public'));


  app.use('/index.html', express.static('public'));

  app.use('/success.html', express.static('public'));


const profile = require("./routes/profile");
app.use("/profile", profile);


const freelancerDesc = require("./routes/freelancerdesc");
app.use("/freelancerDesc", freelancerDesc);


// authencation

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 1000,
	})
);
// const generateSessionSecret = () => {
// 	return crypto.randomBytes(32).toString('hex');
//   };

// const sessionSecret = generateSessionSecret();

app.use(session({
	secret: 'sessionSecret',
	resave: false,
	saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);


Db.connectdb().then(()=> {
  app.listen(port,()=> {
    console.log('connection is setup at' ,port);
});
})

    

