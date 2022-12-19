const { user } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { response } = require("express");
const { model } = require("mongoose");

async function login({email, paasword},callback){
    const userModel = await user.findOne({email});

    if(userModel != null){
        if(bcrypt.compareSync(paasword, userModel.paasword)){
            const token = auth.generateAccessToken(userModel.toJSON());
            return callback(null, {...userModel.toJSON(), token});
        }else{
            return callback({
                message: "Invalid Email/Password"
            });
        }
    }
    else{
        return callback({
            message: "Invalid Email/Password"
        });
    }
}

async function register(params, callback){
    if(params.email === undefined){
        return callback({
            message: "Email Required!"
        });
    }
    let isUserExit = await user.findOne({email: params.email});

    if(isUserExit){
        return callback({
            message: "Email is already rregisterd"
        });
    }

    const salt = bcrypt.genSaltSync(10);
    params.paasword = bcrypt.hashSync(params.paasword, salt);

    const userSchema = new user(params);
    userSchema.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

module.exports = {
    login,
    register,
};