package com.example.winwin.controller.careerInfo;

import com.example.winwin.dto.careerInfo.CareerInfoDto;
import com.example.winwin.dto.careerInfo.CareerInfoLikeDto;
import com.example.winwin.dto.mentor.CareerInfoVo;
import com.example.winwin.dto.mentor.CategoryVo;
import com.example.winwin.service.career.CareerInfoCommentService;
import com.example.winwin.service.career.CareerInfoLikeService;
import com.example.winwin.service.career.CareerInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.Service;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/career/*")
public class CareerContoller {

    private final CareerInfoService careerInfoService;
    private final CareerInfoLikeService careerInfoLikeService;


//    보류
//    세션으로 userNumber가져와서 페이지 진입할 때, 태그에 대한 리스트 뿌려줘
//    userNumber == null 그냥 진입하고 글을 그냥 뿌려주기
//    ------------------------------------------
//    진로정보 메인페이지 단순이동
    @GetMapping("/list")
    public String careerpathForm(Model model, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");

        if (userNumber == null) {
            userNumber = 0L;
        }

        List<CategoryVo> userTagList = careerInfoService.findUserTag(userNumber);

        model.addAttribute("userTagList", userTagList);

        return "careerInfo/careerInfo";
    }

//    진로정보 페이지 상세페이지 단순이동
    @GetMapping("/detail")
    public String careerDetail(Long careerInfoNumber, CareerInfoLikeDto careerInfoLikeDto, Model model, HttpServletRequest req){
        Long careerInfoLikeCnt = careerInfoLikeService.careerInfoLikeCnt(careerInfoNumber);
        model.addAttribute("careerInfoLikeCnt", careerInfoLikeCnt);

        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        int careerInfoUserStatus = 0;
        if(userNumber != null){
            careerInfoLikeDto.setUserNumber(userNumber);
            careerInfoUserStatus = careerInfoLikeService.findCareerInfoUser(careerInfoLikeDto);
        }
            model.addAttribute("userLike", careerInfoUserStatus);



        careerInfoService.careerInfoReadUpdate(careerInfoNumber);
        CareerInfoVo careerInfoVo = careerInfoService.findCareerInfo(careerInfoNumber);
        model.addAttribute("career", careerInfoVo);

        return "careerInfo/careerInfoDetail";
    }

//    진로정보 글 작성하기 페이지 단순이동
    @GetMapping("/write")
    public String careerWrite (HttpServletRequest req, Model model){
        Long mentorNumber = (Long)req.getSession().getAttribute("mentorNumber");
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");

//        멘토 인증된 태그 찾기
        CareerInfoVo careerInfoVo = careerInfoService.findMentorTag(userNumber);
        model.addAttribute("career", careerInfoVo);

        return "careerInfo/careerInfoWrite";
    }

//    진로정보 글 작성하기
    @PostMapping("/write")
    public RedirectView careerWrite(CareerInfoDto careerInfoDto, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        Long mentorNumber = (Long)req.getSession().getAttribute("mentorNumber");

        careerInfoDto.setMentorNumber(mentorNumber);
        careerInfoDto.setUserNumber(userNumber);

        careerInfoService.findMentorNumber(userNumber);
        careerInfoService.findMentorTag(mentorNumber);

        careerInfoService.careerInfoRegister(careerInfoDto);

        return new RedirectView("/career/list");
    }


//    진로정보 글 수정하기 단순이동
    @GetMapping("/modify")
    public String careerModify(Long careerInfoNumber, Model model, HttpServletRequest req){
        Long mentorNumber = (Long)req.getSession().getAttribute("mentorNumber");
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");

//        멘토 인증된 태그 찾기
        CareerInfoVo careerInfoVoTag = careerInfoService.findMentorTag(userNumber);
        model.addAttribute("careerTag", careerInfoVoTag);

        CareerInfoVo careerInfoVo = careerInfoService.findCareerInfo(careerInfoNumber);
        model.addAttribute("career", careerInfoVo);

        return "careerInfo/careerInfoModify";
    }

//    진로정보 글 수정하기
    @PostMapping("/modify")
    public RedirectView careerModify(CareerInfoDto careerInfoDto){
        careerInfoService.careerInfoModify(careerInfoDto);

        return new RedirectView("/career/list");
    }

//    진로정보 글 삭제하기
    @GetMapping("/remove")
    public RedirectView careerInfoRemove(Long careerInfoNumber){
        careerInfoService.careerInfoRemove(careerInfoNumber);

        return new RedirectView("/career/list");
    }

//    진로정보 글 신고하기
    @GetMapping("/report")
    public RedirectView careerInfoReport(Long careerInfoNumber){

        return new RedirectView("/career/report");
    }

}
