package com.example.winwin.mapper.career;

import com.example.winwin.dto.careerInfo.CareerInfoLikeDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CareerInfoLikeMapper {

//    진로정보 좋아요
    void insertCareerInfoLike(CareerInfoLikeDto careerInfoLikeDto);

//    진로정보 글 좋아요 카운트
    Long selectCareerInfoLikeCount(Long careerInfoNumber);

//    유저가 좋아요 한 진로정보 글 찾기
    int selectUserCareerInfo(CareerInfoLikeDto careerInfoLikeDto);

//    진로정보 글 좋아요 취소
    void deleteCareerInfoLike(CareerInfoLikeDto careerInfoLikeDto);

//    진로정보 글 삭제 시 좋아요 삭제
    void deleteCareerInfoBoardLike(Long careerInfoNumber);
}
