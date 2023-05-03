const express = require("express");
const router = express.Router();

// 댓글 작성 API
const Comments = require("../schemas/comment")
router.post('/comments/:postId', async (req, res) => {
    const {postId} = req.params;
    const {userName, password, content, createdAt} = req.body;

    if (content.length == 0){
        return res.status(400).json({message : '댓글 내용을 입력해주세요'})
    } else if (postId.length == 0) {
        return res.status(400).json({message : '데이터 형식이 올바르지 않습니다.'})
    }

    const createdComments = await Comments.create({userName, password, content, postId, createdAt});
    res.json({message : "댓글을 생성하였습니다."})
})

// 댓글 목록 조회 API - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 / 작성 날짜 기준으로 내림차순 정렬 (최신순)
router.get('/comments', async (req, res) => {
    const {postId} = req.params;
    const comments = await Comments
                    .find({postId: postId},{_id: 1, userName: 1, content: 1, createdAt: 1})
                    .sort({createdAt: -1});
                    
    if (postId == 0) {
        return res.status(400).json({message : '데이터 형식이 올바르지 않습니다.'})
    }

    res.json({"data" : comments})
})

// 댓글 수정 API
router.put('/comments/:postId', async (req, res) => {
    const {postId} = req.params;
    const {_id, userName, content} = req.body;

    if (content.length) {
        return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'})
    } else if (content.length == 0) {
        return res.status(400).json({message: '댓글 내용을 입력해주세요.'})
    } else if (postId == 0) {
        return res.status(404).json({message: '댓글 조회에 실패하였습니다.'})
    }

     await Comments.updateOne(
     {_id: _id},
     {$set: {content: content}})

    res.json({message: "댓글을 수정하였습니다."})
})

// 댓글 삭제 API - 원하는 댓글 삭제
router.delete('/comments/:_id', async (req, res) => {
    const {_id} = req.params;
    const deletedComments = await Comments.deleteOne({_id: _id})
    if (deletedComments.length) {
        return res.status(400).json({message: '데이터 형식이 올바르지 않습니다.'})
    } else if (_id == 0){
        return res.status(404).json({message: '댓글 조회에 실패하였습니다.'})
    }
    res.json({message: '댓글을 삭제하였습니다.'})
})


module.exports = router;
