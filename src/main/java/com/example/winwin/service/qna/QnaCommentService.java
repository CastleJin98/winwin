package com.example.winwin.service.qna;

import com.example.winwin.dto.board.QnaCommentDto;
import com.example.winwin.mapper.board.QnaCommentMapper;
import com.example.winwin.mapper.like.QnaCommentUdMapper;
import com.example.winwin.vo.board.QnaCommentUdVo;
import com.example.winwin.vo.board.QnaCommentVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QnaCommentService {
    private final QnaCommentMapper qnaCommentMapper;
    private final QnaCommentUdMapper qnaCommentUdMapper;
    private final QnaCommentUdService qnaCommentUdService;

    public void registerQnaComment(QnaCommentDto qnaCommentDto){
        if (qnaCommentDto == null) {
            throw new IllegalArgumentException("댓글 정보 누락");
        }
        qnaCommentMapper.insertQnaComment(qnaCommentDto);
    }

    @Transactional(readOnly = true)
    public List<QnaCommentVo> findQnaCommentList(Long qnaNumber){
        if (qnaNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }

        return qnaCommentMapper.selectQnaCommentList(qnaNumber);
    }

    @Transactional(readOnly = true)
    public QnaCommentVo findQna(Long commentNumber){
        if (commentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }
        return Optional.ofNullable(qnaCommentMapper.selectQna(commentNumber))
                .orElseThrow(()->{throw new IllegalArgumentException("존재하지 않는 댓글 번호");});
    }

    public void modifyQna(QnaCommentDto qnaCommentDto){
        if (qnaCommentDto == null) {
            throw new IllegalArgumentException("댓글 수정 정보 누락");
        }
        qnaCommentMapper.updateQna(qnaCommentDto);
    }

    public void remove(Long commentNumber){
        if (commentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }


        qnaCommentMapper.delete(commentNumber);
    }


    public void removeQna(Long qnaNumber){
        if (qnaNumber == null) {
            throw new IllegalArgumentException("게시글 번호 누락");
        }
        qnaCommentMapper.deleteQna(qnaNumber);
    }

    public List<QnaCommentVo> findQnaCommentUdList(QnaCommentVo qnaCommentVo) {
        if (qnaCommentVo.getQnaNumber() == null) {
            throw new IllegalArgumentException("글 번호 누락");
        }

        return qnaCommentMapper.findQnaCommentUdList(qnaCommentVo);
    }

    public void deleteQnaCommentUd(Long commentNumber){
        if (commentNumber == null) {
            throw new IllegalArgumentException("댓글 번호 누락");
        }
        qnaCommentUdMapper.deleteQnaCommentUd(commentNumber);
    }


}