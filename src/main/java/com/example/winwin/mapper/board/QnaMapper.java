package com.example.winwin.mapper.board;

import com.example.winwin.dto.board.QnaDto;
import com.example.winwin.dto.board.QsBridgeDto;
import com.example.winwin.vo.board.CommunityProfileVo;
import com.example.winwin.vo.board.QnaProfileVo;
import com.example.winwin.vo.board.QnaVo;
import com.example.winwin.vo.board.QsBridgeVo;
import com.example.winwin.vo.infinityScroll.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QnaMapper {
    //추가
    public void insertQna(QnaDto qnaDto);
    public void insertQs(QsBridgeDto QsBridgeDto);

    //리스트 조회
    public List<QnaVo> selectQna(@Param("criteria") Criteria criteria, @Param("cateList") List<Integer> cateList);

    //    카테고리 조회
    //    public List<QnaVo> selectSub(Long qnaNumber);

    // 조회
    public QnaVo selectQnaByQnaNumber(Long qnaNumber);

    // 삭제
    public void deleteQna(Long qnaNumber);
    public void deleteQs(Long qnaNumber);

    // 수정
    public void updateQna(QnaDto qnaDto);

    // 태그 수정
//    public void updateQs(QsBridgeDto qsBridgeDto);

    // 조회수
    public int upQna(Long qnaNumber);

    // 댓글 수
    public int commentCnt(Long qnaNumber);
    public int commentAuth(Long qnaNumber, Long userNumber);

    // 프로필
//    public List<QnaProfileVo> selectUserProfile(Long userNumber);
    public QnaProfileVo selectUserProfile(Long userNumber);

    //    페이지 무한스크롤
    List<QnaVo> selectQnaScroll(QnaVo qnaVo);

    //    메인페이지 갯수 구하기
    int selectTotal();

}