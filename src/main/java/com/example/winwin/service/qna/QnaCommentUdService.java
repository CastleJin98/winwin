package com.example.winwin.service.qna;

import com.example.winwin.mapper.like.QnaCommentUdMapper;
import com.example.winwin.vo.board.QnaCommentUdVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class QnaCommentUdService {
    private final QnaCommentUdMapper qnaCommentUdMapper;

    public Long qnaUdFind(QnaCommentUdVo qnaCommentUdVo){
        if (qnaCommentUdVo == null) {
            throw new IllegalArgumentException("좋아요 게시글번호, 회원번호 누락");
        }
        return qnaCommentUdMapper.qnaUdFind(qnaCommentUdVo);
    }

    public void qnaGoodInsert(QnaCommentUdVo qnaCommentUdVo){
        System.out.println("커뮤니티서비스 연결성공!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+qnaCommentUdVo);
        if (qnaCommentUdVo == null) {
            throw new IllegalArgumentException("좋아요 게시글번호, 회원번호 누락");
        }
        qnaCommentUdMapper.qnaGoodInsert(qnaCommentUdVo);
    }

    public void qnaGoodCancle(QnaCommentUdVo qnaCommentUdVo){
        if (qnaCommentUdVo == null) {
            throw new IllegalArgumentException("좋아요 게시글번호, 회원번호 누락");
        }
        qnaCommentUdMapper.qnaGoodCancle(qnaCommentUdVo);
    }

    public void qnaHateInsert(QnaCommentUdVo qnaCommentUdVo){
        System.out.println("커뮤니티서비스 연결성공!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+qnaCommentUdVo);
        if (qnaCommentUdVo == null) {
            throw new IllegalArgumentException("좋아요 게시글번호, 회원번호 누락");
        }
        qnaCommentUdMapper.qnaHateInsert(qnaCommentUdVo);
    }

    public void qnaHateCancle(QnaCommentUdVo qnaCommentUdVo){
        if (qnaCommentUdVo == null) {
            throw new IllegalArgumentException("좋아요 게시글번호, 회원번호 누락");
        }
        qnaCommentUdMapper.qnaHateCancle(qnaCommentUdVo);
    }


    public int udCnt(QnaCommentUdVo qnaCommentUdVo){
        if (qnaCommentUdVo == null) {
            throw new IllegalArgumentException("좋아요 게시글번호, 회원번호 누락");
        }
        return qnaCommentUdMapper.udCnt(qnaCommentUdVo);
    }

}
