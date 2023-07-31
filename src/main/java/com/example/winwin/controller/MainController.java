package com.example.winwin.controller;

import com.example.winwin.dto.mentor.CategoryVo;
import com.example.winwin.dto.user.MentorDto;
import com.example.winwin.dto.user.UserDto;
import com.example.winwin.dto.user.UserPfpDto;
import com.example.winwin.service.board.StudyService;
import com.example.winwin.service.user.UserService;
import com.example.winwin.vo.board.StudyVo;
import com.example.winwin.vo.user.CategoryBridgeVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/main/*")
public class MainController {

    private final UserService userService;
    private final StudyService studyService;

//    @GetMapping("/main")
//    public String main(){
//        return"main/main";
//    };

    @PostMapping("/main")
    public RedirectView header(UserDto userDto, @RequestParam("subNumber") List<Integer> subNumbers,  Integer certificationNumber){
        userService.userRegister(userDto);

//        UserPfpDto userPfpDto = new UserPfpDto();
//        userService.joinPfp(userPfpDto);

        CategoryBridgeVo categoryBridgeVo = new CategoryBridgeVo();
        categoryBridgeVo.setUserNumber(userDto.getUserNumber());


        for(int i : subNumbers){
            categoryBridgeVo.setSubNumber(i);
            userService.categoryBridge(categoryBridgeVo);
        }


        if(userDto.getUserPosition().equals("mentor")){
            MentorDto mentorDto = new MentorDto();
            mentorDto.setUserNumber(userDto.getUserNumber());
            mentorDto.setCertificationNumber(certificationNumber.intValue());

            userService.joinMentor(mentorDto);
        }



        return new RedirectView("/main/main");
    }

    /* 프로젝트 인기순(좋아요)으로 조회*/
    @GetMapping("/main")
    public String meetingHomeForm(Model model){
        List<StudyVo> projectList = studyService.findMainList(1);
        List<StudyVo> studyList = studyService.findMainList(2);
        System.out.println(projectList);
        model.addAttribute("projectList", projectList);
        model.addAttribute("studyList", studyList);

        return "main/main";
    }
}
