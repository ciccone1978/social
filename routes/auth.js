const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
/*router.get("/register", async(req,res)=>{
    const user = await new User({
        username:"norris",
        email:"norris@gmail.com",
        password:"12345678"
    });
    await user.save();
    res.send("OK");
});*/

//Register New User
router.post("/register", async(req,res)=>{
    try{
        //generate password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        });

        //save and respond
        const u = await user.save();
        res.status(200).json(u);
    } catch(e){
        console.log(e);
    }

});

module.exports = router;