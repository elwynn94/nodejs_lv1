const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/lv1")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => { // mongodb가 연결되고 있었을때 error인 경우 에러 메세지 출력
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;