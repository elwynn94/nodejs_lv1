const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    noteId : {
        type : Number,
        required : true,
        unique : false
    },
    commentId : {
        type : Number,
        required : true,
        unique : false
    },
    author: {
        type: String,
        required: true,
        unique: false
    },
    content: {
        type: String,
        required: true,
        unique: false
    },
    createdAt: {
        type: Date,
        required: true,
        unique: false,
        //default : Date.now()    //이건 서버 킬 때 초기시간으로 고정되버려서 나중에 db에 넣을 때 date.now 호출해야함.
    }
});

module.exports = mongoose.model("Comment", commentSchema); 