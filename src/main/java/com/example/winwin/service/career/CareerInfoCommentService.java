package com.example.winwin.service.career;

import com.example.winwin.dto.careerInfo.CareerInfoCommentDto;
import com.example.winwin.dto.careerInfo.CareerInfoCommentVo;
import com.example.winwin.mapper.career.CareerInfoCommentMapper;
import com.example.winwin.vo.infinityScroll.Criteria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CareerInfoCommentService {

    private final CareerInfoCommentMapper careerInfoCommentMapper;

//    진로정보 댓글 작성하기
    public void careerInfoCommentRegister(CareerInfoCommentDto careerInfoCommentDto){
        if(careerInfoCommentDto == null){
            throw new IllegalArgumentException("댓글정보가 누락되었습니다.");
        }

        careerInfoCommentMapper.insertCareerComment(careerInfoCommentDto);
    }
//    진로정보 댓글 최신순으로 조회하기 및 무한스크롤
    public List<CareerInfoCommentVo> careerInfoCommnetList(Criteria criteria, Long careerInfoNumber){
        if(criteria == null || careerInfoNumber == null){
            throw new IllegalArgumentException("댓글 번호가 일치하지 않습니다.");
        }

        return Optional.of(careerInfoCommentMapper.selectCareerCommentList(criteria, careerInfoNumber))
                .orElseThrow(()->{
                    throw new IllegalArgumentException("존재하지 않는 댓글입니다.");
                });
    }

//    진로정보 댓글페이지 갯수 구하기
    public int findTotal(Long careerInfoNumber){
        if (careerInfoNumber == null){
            throw new IllegalArgumentException("게시글 번호 누락입니다.");
        }

        return careerInfoCommentMapper.selectTotal(careerInfoNumber);
    }

//    회원이 등록한 댓글 조회하기
    public CareerInfoCommentVo findUserReply(Long commentNumber){
        if (commentNumber == null){
            throw new IllegalArgumentException("댓글 번호가 일치하지 않습니다.");
        }

        return Optional.ofNullable(careerInfoCommentMapper.selectUserReply(commentNumber))
                .orElseThrow(()->{
                    throw new IllegalArgumentException("존재하지 않는 댓글입니다.");
                });
    }


//    진로정보 댓글 번호로 수정하기
    public void careerInfoCommentModify(CareerInfoCommentDto careerInfoCommentDto){
        if (careerInfoCommentDto == null){
            throw new IllegalArgumentException("댓글 수정정보가 누락되었습니다.");
        }

        careerInfoCommentMapper.updateCareerUpdate(careerInfoCommentDto);

    }

//    진로정보 댓글 번호로 삭제하기
    public void careerInfoCommentRemove(Long commentNumber){
        if (commentNumber == null){
            throw new IllegalArgumentException("댓글번호가 일치하지 않습니다.");
        }

        careerInfoCommentMapper.deleteCareerComment(commentNumber);
    }

}
