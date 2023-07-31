package com.example.winwin.service.myPage;

import com.example.winwin.dto.file.ResumeFileDto;
import com.example.winwin.dto.user.ResumeDto;
import com.example.winwin.dto.user.ResumePrDto;
import com.example.winwin.dto.user.UserDto;
import com.example.winwin.dto.user.UserPfpDto;
import com.example.winwin.mapper.file.MyPageFile;
import com.example.winwin.mapper.file.ResumeFile;
import com.example.winwin.mapper.myPage.ActivityMapper;
import com.example.winwin.mapper.myPage.ResumeMapper;
import com.example.winwin.mapper.myPage.ResumePrMapper;
import com.example.winwin.mapper.myPage.UserInfoMapper;
import com.example.winwin.service.file.CommunityFileService;
import com.example.winwin.service.file.ShareFileService;
import com.example.winwin.vo.infinityScroll.Criteria;
import com.example.winwin.vo.myPage.ActiveBoardVo;
import com.example.winwin.vo.myPage.ActiveCommentVo;
import com.example.winwin.vo.myPage.MyPageVo;
import com.example.winwin.vo.myPage.SideBarVo;
import com.example.winwin.vo.user.UserVo;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {
    private final UserInfoMapper userInfoMapper;
    private final MyPageFile myPageFile;
    private final MyPageVo myPageVo;
    private  final ResumeMapper resumeMapper;
    private final ResumePrMapper resumePrMapper;
    private final ResumeFile resumeFile;
    private final ActivityMapper activityMapper;
    private final ShareFileService shareFileService;
    private final CommunityFileService communityFileService;

    @Value("${pfp.dir}")
    private String pfpDir;

//사이드바
//    멘토/멘티 여부와 등급명과 프로필 사진 가져오기
    @Transactional(readOnly = true)
    public SideBarVo getSideBar(Long userNumber){
        SideBarVo sideBarVo = new SideBarVo();

        //닉네임
        sideBarVo.setUserNickname(userInfoMapper.selectUserNickname(userNumber));
        //프사
        sideBarVo.setUserPfpDto(myPageFile.selectProfile(userNumber));
        //등급명
        sideBarVo.setGradeName("Lv. " + userInfoMapper.selectGradeName(userNumber));
        //멘토멘티여부
        sideBarVo.setUserPosition(userInfoMapper.checkMentor(userNumber) > 0 ? "멘토" : "멘티");

        return sideBarVo;
    }

//활동 내역
//    내가 작성한 글 리스트 보기
    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveBoardList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveBoardList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveQnaBoardList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveQnaBoardList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveCommunityBoardList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveCommunityBoardList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveMeetingBoardList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveMeetingBoardList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveShareBoardList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveShareBoardList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveCsBoardList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveCsBoardList(userNumber, criteria);
    }

//    진로정보 내 글 리스트 보기
    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveCareerInfoBoardList(Long userNumber, Criteria criteria){
        if (userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectCareerInfoBoardList(userNumber, criteria);
    }

//    진로정보 관심 글(좋아요) 리스트보기
    @Transactional(readOnly = true)
    public List<ActiveBoardVo> getActiveCareerInfoLikeBoardList(Long userNumber, Criteria criteria){
        if (userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectCareerInfoBoardLikeList(userNumber, criteria);
    }

//    내가 작성한 댓글 리스트 보기
    @Transactional(readOnly = true)
    public List<ActiveCommentVo> getActiveCommentList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveCommentList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveCommentVo> getActiveQnaCommentList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveQnaCommentList(userNumber, criteria);
    }

    @Transactional(readOnly = true)
    public List<ActiveCommentVo> getActiveCommunityCommentList(Long userNumber, Criteria criteria){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectActiveCommunityCommentList(userNumber, criteria);
    }

//    내가 작성한 글 개수
    @Transactional(readOnly = true)
    public int getBoardCnt(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return userInfoMapper.selectBoardCnt(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalQna(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalQna(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalCommunity(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalCommunity(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalMeeting(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalMeeting(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalShare(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalShare(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalCs(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalCs(userNumber);
    }

//    진로정보 내글 페이지 카운팅
    @Transactional(readOnly = true)
    public int getTotalCareerInfo(Long userNumber){
        if (userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalCareer(userNumber);
    }

//    진로정보 관심 글(좋아요) 페이지 카운팅
    @Transactional(readOnly = true)
    public int getTotalCareerInfoLike(Long userNumber){
        if (userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return activityMapper.selectTotalCareerInfoBoardLike(userNumber);
    }

//    내가 작성한 댓글 개수
    @Transactional(readOnly = true)
    public int getCommentCnt(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return userInfoMapper.selectCommentCnt(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalQnaComment(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return userInfoMapper.selectCommentCnt(userNumber);
    }

    @Transactional(readOnly = true)
    public int getTotalCommunityComment(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return userInfoMapper.selectCommentCnt(userNumber);
    }
//이력관리
//    이력서 등록
    public Long registerResume(ResumeDto resumeDto){
        if(resumeDto == null){
            throw new IllegalArgumentException("이력서 정보가 없습니다.");
        }

        return resumeMapper.insertResume(resumeDto);
    }

//    이력서 사진 등록
    public void registerResumeFile(ResumeFileDto resumeFileDto){
        if(resumeFileDto == null){
            throw new IllegalArgumentException("사진 파일이 없습니다.");
        }

        resumeFile.insertResumeFile(resumeFileDto);
    }

//    이력서 사진 불러오기
    @Transactional(readOnly = true)
    public ResumeFileDto getResumeFile(Long resumeNumber){
        if(resumeNumber == null){
            throw new IllegalArgumentException("이력서 번호가 필요합니다.");
        }
        return resumeFile.selectResumeFile(resumeNumber);
    }


    //    이력서 사진 파일 저장
    public ResumeFileDto saveResumeFile(MultipartFile file) throws IOException {
//        사용자가 올린 파일 이름(확장자를 포함 함)
        String originName = file.getOriginalFilename();
        originName = originName.replaceAll("\\s+", "");
//        파일이름에 붙여줄 uuid 생성(파일이름 중복이 나오지 않게 처리)
        UUID uuid = UUID.randomUUID();
//        uuid와 파일이름을 합쳐준다.
        String sysName = uuid.toString() + "_" + originName;

//        날짜가 필요없기에 상위 경로만.
        File uploadPath = new File(pfpDir);

        //        경로가 존재하지 않는다면(폴더가 없다면)
        if(!uploadPath.exists()){
//            경로에 필요한 폴더를 생성한다.
            uploadPath.mkdirs();
        }

//        전체 경로와 파일이름을 연결한다.
        File uploadFile = new File(uploadPath, sysName);

//        썸네일 크기로 파일을 저장한다.
        if(Files.probeContentType(uploadFile.toPath()).startsWith("image")) {
            FileOutputStream out = new FileOutputStream(new File(uploadPath, sysName));
            Thumbnailator.createThumbnail(file.getInputStream(), out, 900, 1200);
            out.close();
        }

        ResumeFileDto resumeFileDto = new ResumeFileDto();
        resumeFileDto.setFileSystemName(originName);
        resumeFileDto.setFileUuid(uuid.toString());
        resumeFileDto.setFileUploadPath(uploadPath.toString());

        return resumeFileDto;
    }


    //    이력서 리스트 불러오기
    @Transactional(readOnly = true)
    public List<ResumeDto> getResumeList(Long userNumber){
        if(userNumber== null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return resumeMapper.selectResumeList(userNumber);
    }

//    개별 이력서 상세보기
    @Transactional(readOnly = true)
    public ResumeDto getResume(Long userNumber){
        if(userNumber== null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return resumeMapper.selectResume(userNumber);
    }

//    이력서 사진파일 삭제
    public void removeResumeFile(Long resumeNumber){
        if (resumeNumber == null) {
            throw new IllegalArgumentException("이력서 정보가 없습니다.");
        }

        ResumeFileDto resumeFileDto = resumeFile.selectResumeFile(resumeNumber);

        if(resumeFileDto == null){
            return;
        }

        File target = new File(pfpDir, resumeFileDto.getFileUuid() + "_" + resumeFileDto.getFileSystemName());

        if(target.exists()){
            target.delete();
        }

        resumeFile.deleteResumeFile(resumeNumber);
    }

//    유저 폰번호 가져오기
    @Transactional(readOnly = true)
    public String getPhoneNumber(Long userNumber){
        if(userNumber== null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return resumeMapper.selectPhone(userNumber);
    }

//    자기소개서 등록
    public void registerPr(ResumePrDto resumePrDto){
        if(resumePrDto == null){
            throw new IllegalArgumentException("자기소개서 정보가 없습니다.");
        }

        resumePrMapper.insertPr(resumePrDto);
    }

//    자기소개서 리스트 불러오기
    @Transactional(readOnly = true)
    public List<ResumePrDto> getPrList(Long userNumber){
        if(userNumber== null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return resumePrMapper.selectPrList(userNumber);
    }

//    개별 자기소개서 상세보기
    @Transactional(readOnly = true)
    public ResumePrDto getPr(Long userNumber){
        if(userNumber== null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        return resumePrMapper.selectPr(userNumber);
    }

//회원정보수정
//    본인 정보 불러오기
    @Transactional(readOnly = true)
    public MyPageVo getUserInfo(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요한 서비스입니다.");
        }

        myPageVo.setUserVo(
                Optional.ofNullable(userInfoMapper.selectUserInfo(userNumber))
                .orElseThrow(()->{throw new IllegalArgumentException("회원정보가 존재하지 않습니다.");})
        );
        myPageVo.setMentorTag(userInfoMapper.selectMentorTag(userNumber));
        myPageVo.setInterestTag(userInfoMapper.selectInterestTag(userNumber));
        myPageVo.setBoardCnt(userInfoMapper.selectBoardCnt(userNumber));
        myPageVo.setCommentCnt(userInfoMapper.selectCommentCnt(userNumber));

        return myPageVo;
    }

//    본인 정보 수정하기
    public void updateUserInfo(UserDto userDto){
        if(userDto == null){
            throw new IllegalArgumentException("수정할 회원정보가 없습니다.");
        }

        userInfoMapper.updateUserInfo(userDto);
    }


//    관심태그 수정하기
    public void modifyInterestTag(Long userNumber, List<String> tagList){
        if(userNumber == null || tagList == null){
            throw new IllegalArgumentException("수정할 관심태그 정보가 없습니다.");
        }

        userInfoMapper.deleteInterestTag(userNumber);
        tagList.forEach(subNumber ->
                userInfoMapper.insertInterestTag(Integer.valueOf(subNumber), userNumber)
        );
    }

//    프로필 사진 등록하기
    public void registerProfile(UserPfpDto userPfpDto){
        if(userPfpDto == null){
            throw new IllegalArgumentException("수정할 이미지 정보가 없습니다.");
        }
        myPageFile.insertProfile(userPfpDto);
    }

    //    유저 프로필 사진 파일 저장
    public UserPfpDto saveFile(MultipartFile file) throws IOException {
//        사용자가 올린 파일 이름(확장자를 포함 함)
        String originName = file.getOriginalFilename();
        originName = originName.replaceAll("\\s+", "");
//        파일이름에 붙여줄 uuid 생성(파일이름 중복이 나오지 않게 처리)
        UUID uuid = UUID.randomUUID();
//        uuid와 파일이름을 합쳐준다.
        String sysName = uuid.toString() + "_" + originName;

//        날짜가 필요없기에 상위 경로만.
        File uploadPath = new File(pfpDir);

        //        경로가 존재하지 않는다면(폴더가 없다면)
        if(!uploadPath.exists()){
//            경로에 필요한 폴더를 생성한다.
            uploadPath.mkdirs();
        }

//        전체 경로와 파일이름을 연결한다.
        File uploadFile = new File(uploadPath, sysName);

//        매개변수로 받은 파일을 우리가 만든 경로와 이름으로 저장한다.
//        file.transferTo(uploadFile);

//        썸네일 크기로 파일을 저장한다.
        if(Files.probeContentType(uploadFile.toPath()).startsWith("image")) {
            FileOutputStream out = new FileOutputStream(new File(uploadPath, sysName));
            Thumbnailator.createThumbnail(file.getInputStream(), out, 200, 200);
            out.close();
        }

        UserPfpDto userPfpDto =new UserPfpDto();
        userPfpDto.setPfpSystemName(originName);
        userPfpDto.setPfpUuid(uuid.toString());
        userPfpDto.setPfpUploadPath(uploadPath.toString());

        return userPfpDto;
    }

//    프로필 사진 불러오기
    @Transactional(readOnly = true)
    public UserPfpDto getProfile(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }
        return myPageFile.selectProfile(userNumber);
    }

//    프로필 사진 수정하기
    public void modifyProfile(UserPfpDto userPfpDto){
        if(userPfpDto == null){
            throw new IllegalArgumentException("수정할 이미지 정보가 없습니다.");
        }
        myPageFile.updateProfile(userPfpDto);
    }

//    프로필 사진파일 삭제
    public void removeProfile(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 정보가 없습니다.");
        }

        UserPfpDto userPfpDto = myPageFile.selectProfile(userNumber);

        if(userPfpDto == null){
            return;
        }

        File target = new File(pfpDir, userPfpDto.getPfpUuid() + "_" + userPfpDto.getPfpSystemName());

        if(target.exists()){
            target.delete();
        }

        myPageFile.deleteProfile(userNumber);
    }

//    회원 탈퇴
    public void withdrawUser(Long userNumber){
        if(userNumber == null){
            throw new IllegalArgumentException("회원정보가 없습니다.");
        }
        Long mentorNumber = userInfoMapper.selectMentorNumber(userNumber);
        List<Long> resumeNumberList = userInfoMapper.selectResumeNumber(userNumber);
        List<Long> shareNumberList = userInfoMapper.selectShareNumber(userNumber);
        List<Long> communityNumberList = userInfoMapper.selectCommunityNumber(userNumber);
        List<Long> qnaNumberList = userInfoMapper.selectQnaNumber(userNumber);
        List<Long> careerInfoNumberList = userInfoMapper.selectCareerInfoNumber(userNumber);

        removeProfile(userNumber);
        resumeNumberList.forEach((resumeNumber)->removeResumeFile(resumeNumber));
        shareNumberList.forEach((shareNumber)->shareFileService.shareFileRemove(shareNumber));
        shareNumberList.forEach((communityNumber)->communityFileService.remove(communityNumber));

        userInfoMapper.deleteTodo(userNumber);
        userInfoMapper.deleteResumePr(userNumber);
        userInfoMapper.deleteUserPfp(userNumber);
        userInfoMapper.deleteDiary(userNumber);
        userInfoMapper.deleteUserFile(userNumber);
        userInfoMapper.deleteWing(userNumber);
        if(resumeNumberList.size() != 0){
            userInfoMapper.deleteResumeFile(resumeNumberList);
        }
        userInfoMapper.deleteResume(userNumber);
        userInfoMapper.deleteChatting(userNumber);
        userInfoMapper.deleteSuBridge(userNumber);

        userInfoMapper.deleteStudyLike(userNumber);
        userInfoMapper.deleteStudyComment(userNumber);
        userInfoMapper.deleteStudy(userNumber);
        userInfoMapper.deleteCsComment(userNumber);
        userInfoMapper.deleteCs(userNumber);
        userInfoMapper.deletePoliceComment(userNumber);
        userInfoMapper.deletePoliceBoard(userNumber);
        userInfoMapper.deleteCareerInfoComment(userNumber, careerInfoNumberList);
        userInfoMapper.deleteCareerInfoLike(userNumber, careerInfoNumberList);
        userInfoMapper.deleteCareerInfo(userNumber);
        userInfoMapper.deleteMentorReview(userNumber, mentorNumber);
        userInfoMapper.deleteMentorLike(userNumber, mentorNumber);
        userInfoMapper.deleteUmBridge(userNumber, mentorNumber);
        if(mentorNumber != null){
            userInfoMapper.deleteMentorSkill(mentorNumber);
            userInfoMapper.deleteMentorCareer(mentorNumber);
        }
        System.out.println("+++++111111");
        userInfoMapper.deleteMentorProfile(userNumber);
        System.out.println("+++++111112");
        userInfoMapper.deleteMentor(userNumber);
        System.out.println("+++++111114");
        userInfoMapper.deleteWingShare(userNumber);
        System.out.println("+++++22222");
        if(shareNumberList.size() != 0) {
            userInfoMapper.deleteShareFile(shareNumberList);
        }
        userInfoMapper.deleteShareFree(userNumber);

        userInfoMapper.deleteCommunityGood(userNumber);
        userInfoMapper.deleteCommunityCommentUd(userNumber);
        userInfoMapper.deleteCommunityComment(userNumber);
        if(communityNumberList.size() != 0) {
            userInfoMapper.deleteCommunityFile(communityNumberList);
        }
        System.out.println("+++++33333");
        userInfoMapper.deleteCommunity(userNumber);
        if(qnaNumberList.size() != 0) {
            userInfoMapper.deleteQsBridge(qnaNumberList);
        }
        userInfoMapper.deleteQnaGood(userNumber);
        userInfoMapper.deleteQnaCommentUd(userNumber, qnaNumberList);
        userInfoMapper.deleteQnaComment(userNumber);
        userInfoMapper.deleteQna(userNumber);

        System.out.println("+++++55555");
        userInfoMapper.deleteUser(userNumber);
        System.out.println("+++++66666");
    }

}
