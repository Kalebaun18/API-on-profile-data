const router = require("express").Router();
const passport = require("passport");


router.get("/login/success", async(req, res) => {
	console.log("hi");

	if (req.user) {
		console.log("hi1");
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	console.log("hi2");

	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		
		successRedirect: process.env.clienturl,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	console.log("hi3");

	req.logout();
	res.redirect(process.env.clienturl);
});

module.exports = router;
