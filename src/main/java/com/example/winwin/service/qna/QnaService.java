package com.example.winwin.service.qna;

import com.example.winwin.dto.board.QnaDto;
import com.example.winwin.dto.board.QsBridgeDto;
import com.example.winwin.mapper.board.QnaMapper;
import com.example.winwin.mapper.like.QnaCommentUdMapper;
import com.example.winwin.mapper.like.QnaGoodMapper;
import com.example.winwin.vo.board.*;
import com.example.winwin.vo.infinityScroll.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QnaService {
    private final QnaMapper qnaMapper;
    private final QnaCommentService qnaCommentService;
    private final QnaGoodMapper qnaGoodMapper;
    private final QnaCommentUdMapper qnaCommentUdMapper;

    // 글 등록
    public void registerQna(QnaDto qnaDto){
        if (qnaDto == null) {
            throw new IllegalArgumentException("게시판 정보가 없습니다.");
        }
        qnaMapper.insertQna(qnaDto);
    }

    // 카테고리 넣기
    public void registerQs(QsBridgeDto qsBridgeDto){
        if (qsBridgeDto == null) {
            throw new IllegalArgumentException("카테고리 정보가 없습니다.");
        }
        qnaMapper.insertQs(qsBridgeDto);
    }

    // 리스트 전체 조회하기
    @Transactional(readOnly = true)
    public List<QnaVo> findQnaList(Criteria criteria, List<Integer> cateList){return qnaMapper.selectQna(criteria, cateList);}

    //카테고리 조회하기
//    @Transactional(readOnly = true)
//    public List<QnaVo> findSubList(Long qnaNumber) {
//        return qnaMapper.selectSub(qnaNumber);
//    }

    // 조회
    @Transactional(readOnly = true)
    public QnaVo findQna(Long qnaNumber){
        if(qnaNumber == null){
            throw new IllegalArgumentException("게시물 번호 누락");
        }
        return Optional.ofNullable(qnaMapper.selectQnaByQnaNumber(qnaNumber))
                .orElseThrow(()->{throw new IllegalArgumentException("존재하지 않는 게시물 번호"); });
    }

    // 삭제
    public void removeQna(Long qnaNumber){
        if (qnaNumber == null){
            throw new IllegalArgumentException("게시물 번호 누락");
        }
        qnaCommentUdMapper.deleteForQna(qnaNumber);
        qnaGoodMapper.deleteForQna(qnaNumber);
        qnaCommentService.removeQna(qnaNumber);
        qnaMapper.deleteQna(qnaNumber);
    }

    // 태그 삭제
    public void removeQs(Long qnaNumber){
        if (qnaNumber == null){
            throw new IllegalArgumentException("게시물 번호 누락");
        }

        qnaMapper.deleteQs(qnaNumber);
    }

    // 게시글 수정
    public void modifyQna(QnaDto qnaDto){
        if( qnaDto == null){

            throw new IllegalArgumentException("게시물 수정 정보 누락");
        }
        qnaMapper.updateQna(qnaDto);
    }

    // 태그 수정
//    public void modifyQs(QsBridgeDto qsBridgeDto){
//        if(qsBridgeDto == null){
//            throw new IllegalArgumentException("게시물 수정 정보 누락");
//        }
//        qnaMapper.updateQs(qsBridgeDto);
//    }

    // 조회수
    public int upQnaCnt(Long qnaNumber) {
        if(qnaNumber == null){
            throw new IllegalArgumentException("게시물 번호 누락");
        }
        return qnaMapper.upQna(qnaNumber);
    }

    // 댓글 수
    public int commentCnt(Long qnaNumber){
        if(qnaNumber == null){
            throw new IllegalArgumentException("댓글 번호 누락");
        }
        return qnaMapper.commentCnt(qnaNumber);
    }
    // 댓글 수
    public int commentAuth(Long qnaNumber, Long userNumber){
            if(qnaNumber == null || userNumber == null){
            throw new IllegalArgumentException("정보 누락");
        }
        return qnaMapper.commentAuth(qnaNumber, userNumber);
    }

    // 프로필 조회
//    public List<QnaProfileVo> registerProfile(Long userNumber){
//        return qnaMapper.selectUserProfile(userNumber);
//    }
    public QnaProfileVo selectUserProfile(Long userNumber){
        return qnaMapper.selectUserProfile(userNumber);
    }

    //    나눔 페이지 무한스크롤
    public List<QnaVo> findListPage(QnaVo qnaVo){
        if(qnaVo == null){
            throw new IllegalArgumentException("페이지 처리에 필요한 정보가 누락되었습니다.");
        }

        return qnaMapper.selectQnaScroll(qnaVo);
    }

    //    나눔 메인페이지 갯수 구하기
    public int findTotal(){

        return qnaMapper.selectTotal();
    }
}