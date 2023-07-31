package com.example.winwin.controller.myPage;

import com.example.winwin.dto.file.ResumeFileDto;
import com.example.winwin.dto.mentor.MentorVo;
import com.example.winwin.dto.user.ResumeDto;
import com.example.winwin.dto.user.ResumePrDto;
import com.example.winwin.dto.user.UserDto;
import com.example.winwin.dto.user.UserPfpDto;
import com.example.winwin.service.chatting.ChattingService;
import com.example.winwin.service.myPage.MyPageService;
import com.example.winwin.service.myPage.UserMentorService;
import com.example.winwin.vo.myPage.ActiveBoardVo;
import com.example.winwin.vo.myPage.ChattingVo;
import com.example.winwin.vo.myPage.MyPageVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;


import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.Service;
import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/myPage/*")
public class MyPageController {
    private final MyPageService myPageService;
    private final ChattingService chattingService;
    private final UserMentorService userMentorService;

    @GetMapping("/activityComment")
    public String activityComment(){
        return "myPage/activityComment";
    }

    @GetMapping("/activityDetail")
    public String activityDetail(HttpServletRequest req){
        return "myPage/activityDetail";
    }

    @GetMapping("/activityGive")
    public String activityGive(){
        return "myPage/activityGive";
    }

    @GetMapping("/activityProject")
    public String activityProject(){
        return "myPage/activityProject";
    }

    @GetMapping("/activityStudy")
    public String activityStudy(){
        return "myPage/activityStudy";
    }

    @GetMapping("/careerInfo")
    public String careerInfo(){
        return "myPage/careerInfo";
    }

    @GetMapping("/careerInfoLike")
    public String careerInfoLike(){
        return "myPage/careerInfoLike";
    }

    @GetMapping("/careerInfoReply")
    public String careerInfoReply(){
        return "myPage/careerInfoReply";
    }

    @GetMapping("/loveMentor")
    public String loveMentor(Model model , HttpServletRequest req){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        List<MentorVo> mentor= userMentorService.likeMentor(userNumber);
        model.addAttribute("like" , mentor);

        String user = userMentorService.findLogin(userNumber);
        model.addAttribute("user", user);
        System.out.println(user);

        return "myPage/loveMentor";
    }

    @GetMapping("/myMentor")
    public String myMentor(Model model , HttpServletRequest req){
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        List<MentorVo> mentorList = userMentorService.findMentor(userNumber);

        String user = userMentorService.findLogin(userNumber);
        model.addAttribute("user", user);
        System.out.println(user);

        model.addAttribute("mentor" , mentorList);
        return "myPage/myMentor";
    }

    @GetMapping("/myMentee")
    public String myMentee(Model model , HttpServletRequest req ){
        Long mentorNumber = (Long) req.getSession().getAttribute("mentorNumber");
        List<MentorVo> mentorList = userMentorService.findMentee(mentorNumber);

        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        String user = userMentorService.findLogin(userNumber);
        model.addAttribute("user", user);
        System.out.println(user);

        model.addAttribute("mentee", mentorList);
        return "myPage/myMentee";
    }

    @GetMapping("/activityCommunity")
    public String activityCommunity(){
        return "myPage/activityCommunity";
    }

    @GetMapping("/activityCommunityReply")
    public String activityCommunityReply(){
        return "myPage/activityCommunityReply";
    }

    @GetMapping("/activityQna")
    public String activityQna(){ return "myPage/activityQna"; }

    @GetMapping("/activityQnaReply")
    public String activityQnaReply(){ return "myPage/activityQnaReply"; }

    @GetMapping("/activityCs")
    public String activityCs(){ return "myPage/activityCs"; }

    @GetMapping("/resume")
    public String resume(HttpServletRequest req, Model model){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        myPageService.getResume(userNumber);
        List<ResumeDto> resumeList = myPageService.getResumeList(userNumber);

        model.addAttribute("resumeList", resumeList);

        return "myPage/resume";
    }

    @GetMapping("/resumeModal")
    public String resumeModal(){
        return "myPage/resumeModal";
    }

    @GetMapping("/resumePr")
    public String resumePR(HttpServletRequest req, Model model){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        myPageService.getResume(userNumber);
        List<ResumePrDto> prList = myPageService.getPrList(userNumber);

        model.addAttribute("prList", prList);

        return "myPage/resumePr";
    }

    @GetMapping("/resumePrModal")
    public String resumePrModal(){
        return "myPage/resumePrModal";
    }

    @GetMapping("/resumeWrite")
    public String resumeWrite(){
        return "myPage/resumeWrite";
    }

    // 이력서 작성하기
    @PostMapping("/resumeWrite")
    public RedirectView resumeWrite(ResumeDto resumeDto, HttpServletRequest req,
                                    @RequestParam("resumeFile") MultipartFile file){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        resumeDto.setUserNumber(userNumber);

        myPageService.registerResume(resumeDto);

        if( !file.isEmpty() ) {
            try {
                ResumeFileDto resumeFileDto = myPageService.saveResumeFile(file);
                resumeFileDto.setResumeNumber(resumeDto.getResumeNumber());
                myPageService.registerResumeFile(resumeFileDto);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return new RedirectView ("/myPage/resume");
    }

    @GetMapping("/resumePrWrite")
    public String resumePrWrite(){
        return "myPage/resumePrWrite";
    }

    // 자기소개서 작성하기
    @PostMapping("/resumePrWrite")
    public RedirectView resumePrWrite(ResumePrDto resumePrDto, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        resumePrDto.setUserNumber(userNumber);

        myPageService.registerPr(resumePrDto);

        return new RedirectView("/myPage/resumePr");
    }

    @GetMapping("/userDelete")
    public String userDelete(){
        return "myPage/userDelete";
    }

    // 회원 탈퇴
    @PostMapping("/userDelete")
    public String userDelete(HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");

        try {
            myPageService.withdrawUser(userNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return "myPage/userDelete";
        }

        req.getSession().invalidate();

        return "main/main";
    }

    // 회원정보수정 페이지 이동
    @GetMapping("/userInfoModify")
    public String userInfoModify(HttpServletRequest req, Model model){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");

        MyPageVo userInfo = myPageService.getUserInfo(userNumber);
        model.addAttribute("userInfo", userInfo);

        UserPfpDto profile = myPageService.getProfile(userNumber);
        model.addAttribute("profile", profile);

        return "myPage/userInfoModify";
    }

    // 회원정보 수정하기
    @PostMapping("/userInfoModify")
    public RedirectView updateUserInfo(HttpServletRequest req, RedirectAttributes redirectAttributes,
                                       UserDto userDto, @RequestParam("pfpFile") MultipartFile file){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        userDto.setUserNumber(userNumber);
        redirectAttributes.addFlashAttribute("userDto", userDto);
        myPageService.updateUserInfo(userDto);

        if( !file.isEmpty() ) {
            try {
                myPageService.removeProfile(userNumber);
                UserPfpDto userPfpDto = myPageService.saveFile(file);
                userPfpDto.setUserNumber(userNumber);
                myPageService.registerProfile(userPfpDto);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        req.getSession().setAttribute("userNickname", userDto.getUserNickname());
        
        return new RedirectView("/myPage/userInfoModify");
    }

    // 나의관심분야 수정하기
    @PostMapping("/interestTagModify")
    public RedirectView interestTagModify(HttpServletRequest req, RedirectAttributes redirectAttributes,
                                          @RequestParam("subNumber") List<String> tagList){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        myPageService.modifyInterestTag(userNumber, tagList);

        MyPageVo userInfo = myPageService.getUserInfo(userNumber);
        redirectAttributes.addFlashAttribute("userInfo", userInfo);

        return new RedirectView("/myPage/userInfoModify");
    }

    // 프로필 이미지 수정하기
    @PostMapping("/userProfileModify")
    public RedirectView userProfileModify(HttpServletRequest req, RedirectAttributes redirectAttributes
                                          ){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        redirectAttributes.addFlashAttribute("userInfo", userNumber);
        return new RedirectView("/myPage/userInfoModify");
    }

    @GetMapping("/myRecord")
    public String myRecord(){
        return "myPage/myRecord";
    }

    // 받은 메세지 조회
    @GetMapping("/receiveMessage")
    public String chattingSelect(){
        return "myPage/receiveMessage";
    }

    // 보낸 메세지 조회
    @GetMapping("/sendMessage")
    public String chattingSelectFrom(){
        return "myPage/sendMessage";
    }


}
