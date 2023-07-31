package com.example.winwin.mapper.like;

import com.example.winwin.vo.board.QnaCommentUdVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QnaCommentUdMapper {
    public Long qnaUdFind(QnaCommentUdVo qnaCommentUdVo);
    public void qnaGoodInsert(QnaCommentUdVo qnaCommentUdVo);
    public void qnaGoodCancle(QnaCommentUdVo qnaCommentUdVo);
    public void qnaHateInsert(QnaCommentUdVo qnaCommentUdVo);
    public void qnaHateCancle(QnaCommentUdVo qnaCommentUdVo);
    public int udCnt(QnaCommentUdVo qnaCommentUdVo);
    //ud 삭제 (Q&A 게시글 삭제에서 사용)
    public void deleteForQna(Long qnaNumber);

    //댓글 삭제시 (up&down 삭제)
    public void deleteQnaCommentUd(Long commentNumber);
}
