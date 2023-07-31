package com.example.winwin.mapper.career;

import com.example.winwin.dto.careerInfo.CareerInfoCommentDto;
import com.example.winwin.dto.careerInfo.CareerInfoCommentVo;
import com.example.winwin.vo.infinityScroll.Criteria;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CareerInfoCommentMapper {

//    진로정보 댓글 작성하기
    void insertCareerComment(CareerInfoCommentDto careerInfoCommentDto);

//    진로정보 댓글 최신순으로 조회하기 및 무한 스크롤
    List<CareerInfoCommentVo> selectCareerCommentList(@Param("criteria") Criteria criteria, @Param("careerInfoNumber") Long careerInfoNumber);

//    진로정보 댓글페이지 갯수 구하기
    int selectTotal(Long careerInfoNumber);

//    회원이 등록한 댓글 조회하기
    CareerInfoCommentVo selectUserReply(Long commentNumber);

//    진로정보 댓글 번호로 수정하기
    void updateCareerUpdate(CareerInfoCommentDto careerInfoCommentDto);

//    진로정보 댓글 번호로 삭제하기
    void deleteCareerComment(Long commentNumber);

//    진로정보 글 삭제 시 댓글 삭제
    void deleteCareerInfoBoardComment(Long careerInfoNumber);
}
