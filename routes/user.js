import express from "express"
import passport from "passport"
import { getAdminStats, getAdminUsers, logout, myProfile } from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";


// Creating express router
const router = express.Router()

// Handling request using router
router.get("/googlelogin", passport.authenticate("google",{
    scope:["profile"],
})
);

router.get("/login",
    passport.authenticate("google"),
    (req,res,next)=>{
        res.send("Logged In")
    }
);

router.get("/me",isAuthenticated, myProfile)
router.get("/logout",logout)
router.get("/admin/users",isAuthenticated,authorizeAdmin,getAdminUsers)
router.get("/admin/stats",isAuthenticated,authorizeAdmin,getAdminStats)

// Exporting router
export default router
