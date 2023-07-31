package com.example.winwin.mapper.myPage;

import com.example.winwin.dto.user.UserDto;
import com.example.winwin.vo.user.UserVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserInfoMapper {
//    본인 정보 불러오기
    //    이름, 닉네임, 연락처, 이메일, 등급명
    public UserVo selectUserInfo(Long userNumber);
    //    멘토여부, 현재 직업
    public List<String> selectMentorTag(Long userNumber);
    //    관심 태그
    public List<Map<Integer, String>> selectInterestTag(Long userNumber);
    //    작성한 글수
    public int selectBoardCnt(Long userNumber);
    //    작성한 댓글수
    public int selectCommentCnt(Long userNumber);

//    본인 정보 수정
    public void updateUserInfo(UserDto userDto);
//    관심태그 삭제
    public void deleteInterestTag(Long userNumber);
//    관심태그 추가
    public void insertInterestTag(int subNumber, Long userNumber);
//    멘토 여부
    public int checkMentor(Long userNumber);
//    등급명
    public String selectGradeName(Long userNumber);
//    닉네임
    public String selectUserNickname(Long userNumber);

//    회원 탈퇴
    //멘토넘버 가져오기
    public Long selectMentorNumber(Long userNumber);
    //이력서 번호 리스트
    public List<Long> selectResumeNumber(Long userNumber);
    //나눔 글번호 리스트
    public List<Long> selectShareNumber(Long userNumber);
    //커뮤니티 글번호 리스트
    public List<Long> selectCommunityNumber(Long userNumber);
    //qna 글번호 리스트
    public List<Long> selectQnaNumber(Long userNumber);
    //진로정보 글번호 리스트
    public List<Long> selectCareerInfoNumber(Long userNumber);


    public void deleteTodo(Long userNumber);
    public void deleteResumePr(Long userNumber);
    public void deleteUserPfp(Long userNumber);
    public void deleteDiary(Long userNumber);
    public void deleteUserFile(Long userNumber);
    public void deleteWing(Long userNumber);
    public void deleteResumeFile(List<Long> resumeNumberList);
    public void deleteResume(Long userNumber);
    public void deleteChatting(Long userNumber);
    public void deleteSuBridge(Long userNumber);

    public void deleteStudyLike(Long userNumber);
    public void deleteStudyComment(Long userNumber);
    public void deleteStudy(Long userNumber);

    public void deleteCsComment(Long userNumber);
    public void deleteCs(Long userNumber);
    public void deletePoliceComment(Long userNumber);
    public void deletePoliceBoard(Long userNumber);
    public void deleteCareerInfoComment(Long userNumber, List<Long> careerInfoNumberList);
    public void deleteCareerInfoLike(Long userNumber, List<Long> careerInfoNumberList);
    public void deleteCareerInfo(Long userNumber);
    public void deleteMentorReview(Long userNumber, Long mentorNumber);
    public void deleteMentorLike(Long userNumber, Long mentorNumber);
    public void deleteUmBridge(Long userNumber, Long mentorNumber);
    public void deleteMentorSkill(Long mentorNumber);
    public void deleteMentorCareer(Long mentorNumber);
    public void deleteMentorProfile(Long userNumber);
    public void deleteMentor(Long userNumber);
    public void deleteWingShare(Long userNumber);
    public void deleteShareFile(List<Long> shareNumberList);
    public void deleteShareFree(Long userNumber);

    public void deleteCommunityGood(Long userNumber);
    public void deleteCommunityCommentUd(Long userNumber);
    public void deleteCommunityComment(Long userNumber);
    public void deleteCommunityFile(List<Long> communityNumberList);
    public void deleteCommunity(Long userNumber);
    public void deleteQsBridge(List<Long> qnaNumberList);
    public void deleteQnaGood(Long userNumber);
    public void deleteQnaCommentUd(Long userNumber, List<Long> qnaNumberList);
    public void deleteQnaComment(Long userNumber);
    public void deleteQna(Long userNumber);
    public void deleteUser(Long userNumber);

}
