const mongoose = require('mongoose')

//CREATE USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        fullName: {
            required: [true, "First name is required"],
            type: String,
        },
        profilePhoto: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "Hei buddy Password is required"],
        },
        refreshTokens : {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        roles: {
            type: [],
            //enum: ["Admin", "Guest", "User"],
            default:["User"]
        },
        wallet:{
            type:Number,
            default: 0,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);
//virtual methode to populate the created survey
userSchema.virtual("surveys",{
    ref: "Survey",
    foreignField: "user",
    localField: "_id"
})
//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
