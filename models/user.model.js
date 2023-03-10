const mongoose =  require('mongoose');



const user = mongoose.model(
    "User",
    mongoose.Schema({
        fulName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        paasword: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            Transform: function (doc, ret){
                ret.userId = ret._id.toString();
                delete ret._id;
                delete ret._v;
                delete ret.paasword;
            }
        }

    }, {
        timestamps: true
    })
);

module.exports= {
    user
}