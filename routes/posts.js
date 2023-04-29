const express = require("express");
const Note = require("../schemas/post.js"); //저 파일에서 내보냈던 스키마를 참조. 모델은 보기쉽게 대문자 추천. 소문자인 다른 변수쓸때 겹칠수도있고.
const router = express.Router();

router.post("/", async (req, res) => {
    //const author = req.body.author; //하나씩 받아올 때 이런식. get을 제외한 포스트, 풋, 딜리트 이런애들은 바디를 가져올수가있다. 
    //const {author} = req.body; //이런식으로 {}로 감싸서 해도 됨.
    const { noteId, author, pw, title, content} = req.body; //한꺼번에 가져오기.
    const note = await Note.find({ noteId });  //find 함수가 promis를 반환해서. await 쓸수있게 위에 async 써야함.
    if (note.length) {   //note에 아무것도 안담겨오면  길이가 0일 때 = 즉 못찾았을 때인데. 이건 찾앗을 경우.
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });    //여기서 리턴한 이유는 실패시 밑에꺼 실행안하기위함. else쓰면 더 길어지니까 return해도 아무 상관없을 때는 짧게 코딩하는거.
    }   //실패할 때도 200 ok.를 보내버리는데 400으로 보내기위해 저사이에 .status(400) 추가. 
    const createnote = await Note.create({ noteId, author, pw, title, content, createdAt:Date.now() }); //create는 모델을 만들고 insert까지 해주는 함수.
    
    res.json({ note: createnote });
});

router.get("/:noteId", async (req, res) => {
    const { noteId } = req.params;

    const [note] = await Note.find({ noteId: Number(noteId) }).select('-pw -__v -_id -noteId'); //하나가 아닐수있기에 []로 감싼거. -빼고 쓰면 받고싶은거.
    res.json({
        note
    });

    
    

});

router.get("/", async (req, res) => {
    const note = await Note.find().select( '-pw -content -__v -_id -noteId' ).sort( {createdAt : -1} ); //promise객체로 내보니지기때문에 await 써야함.
    // 비밀번호는 보여주면 안되기때문에 slelect에서 pw뺐고. 날짜순 내림차순이라서 sort 써서 -1 넣음. 
    res.json({
        note // note : note 와 같은 구문. note, 콤마는 넣어도 되는건가.
        //"title" : note[0].title


    });
});

router.put("/:noteId", async (req, res) => {    //많이 바꾸면 put 적게 바꾸면 patch.
    const { noteId } = req.params;
    const { pw, title, content} = req.body; 
    const note = await Note.find({ noteId, pw });  
    if (note.length) {   
        const putnote = await Note.findOneAndUpdate({ noteId:noteId}, {title:title, content:content }, {new : true}); //, {new : true}) 이거까지 명시해주면 업데이트 후껄 리턴.
        res.json({ note: putnote });
         
    }else {
        res.send("없는 데이터입니다."); 
    }
    
});

router.delete("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { pw} = req.body; 
    const note = await Note.find({ noteId, pw });  
    if (note.length) {   
        const deletenote = await Note.findOneAndDelete( {noteId:noteId}); 
        res.json({ note: deletenote }); 
    }else {
        res.send("없는 데이터입니다."); 
    }
});

module.exports = router;