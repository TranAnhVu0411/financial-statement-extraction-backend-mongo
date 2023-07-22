const db = require("../models");
const Account = db.accounts;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
config = require("../config/auth.config.js");

exports.register = async (req, res) => {
    try{
        // Check user exist
        const oldAccount = await Account.findOne({ email: req.body.email });
        if (oldAccount!==null) {
            return res.status(401).json({ message: "Account already exist" });
        }

        const accountParams = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
            email: req.body.email,
            role: 'user'
        };

        const account = await Account.create(accountParams);

        res.status(200).json({info: account});
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while register",
        });
    }
};

exports.login = async (req, res) => {
    try{
        const account = await Account.findOne({ email: req.body.email });
        if (!account) {
            return res.status(404).json({ message: "Account doesn't exist" });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            account.password
        );
        if (!passwordIsValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: account._id, role: account.role }, config.secret, {
            expiresIn: "24h",
        });

        res.status(200).json({account, token});
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while login",
        });
    }
};