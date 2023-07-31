package com.example.winwin.service.career;

import com.example.winwin.dto.careerInfo.CareerInfoLikeDto;
import com.example.winwin.mapper.career.CareerInfoLikeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CareerInfoLikeService {

    private final CareerInfoLikeMapper careerInfoLikeMapper;

//    진로정보 좋아요
    public int careerInfoLikeProcess(CareerInfoLikeDto careerInfoLikeDto){
        if (careerInfoLikeDto == null){
            throw new IllegalArgumentException("진로정보 좋아요 정보가 누락되었습니다.");
        }

        if(careerInfoLikeMapper.selectUserCareerInfo(careerInfoLikeDto) == 0){
            careerInfoLikeMapper.insertCareerInfoLike(careerInfoLikeDto);
            return 1;
        }else{
            careerInfoLikeMapper.deleteCareerInfoLike(careerInfoLikeDto);
            return -1;
        }
    }

//    진로정보 글 좋아요 카운트
    public Long careerInfoLikeCnt(Long careerInfoNumber){
        if (careerInfoNumber == null){
            throw new IllegalArgumentException("진로정보 글이 존재하지 않습니다.");
        }

        return Optional.ofNullable(careerInfoLikeMapper.selectCareerInfoLikeCount(careerInfoNumber))
                .orElseThrow(() -> {
                    throw new IllegalArgumentException("존재하지 않는 진로정보 글입니다.");
                });
    }

//    유저가 좋아요 한 진로정보 글 찾기
    public int findCareerInfoUser(CareerInfoLikeDto careerInfoLikeDto){
        if (careerInfoLikeDto == null){
            throw new IllegalArgumentException("좋아요 정보가 누락되었습니다.");
        }

        return Optional.ofNullable(careerInfoLikeMapper.selectUserCareerInfo(careerInfoLikeDto))
                .orElseThrow(() -> {
                    throw new IllegalArgumentException("존재하지 않는 회원이거나 존재하지 않는 진로정보 글입니다.");
                });
    }


//    진로정보 글 좋아요 취소
    public void removeCareerInfoLike(CareerInfoLikeDto careerInfoLikeDto){
        if (careerInfoLikeDto == null){
            throw new IllegalArgumentException("회원번호, 진로정보 글이 일치하지 않습니다.");
        }

        careerInfoLikeMapper.deleteCareerInfoLike(careerInfoLikeDto);
    }

}
