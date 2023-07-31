package com.example.winwin.controller.police;

import com.example.winwin.dto.police.PoliceBoardDto;

import com.example.winwin.dto.police.PoliceCommentDto;

import com.example.winwin.service.police.PoliceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/police/*")
public class PoliceRestController {

    private final PoliceService policeService;


    //    나눔 페이지 bigcode 600 고정
//

//    나눔 글 신고하기
    @PostMapping("/share")
    public void shareReport(@RequestBody PoliceBoardDto policeBoardDto, HttpServletRequest req) {
//        로그인 세션 처리
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        policeBoardDto.setUserNumber(userNumber);

        policeBoardDto.setBigCode("600");
        policeService.policeBoardRegister(policeBoardDto);

    }

//    진로정보 글 신고하기
    @PostMapping("/careerInfo")
    public void careerInfoReport(@RequestBody PoliceBoardDto policeBoardDto, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        policeBoardDto.setUserNumber(userNumber);
        policeBoardDto.setBigCode("200");

        policeService.policeBoardRegister(policeBoardDto);
    }

    //    모임 글 신고하기
    @PostMapping("/study")
    public void studyReport(@RequestBody PoliceBoardDto policeBoardDto, HttpServletRequest req) {

        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        policeBoardDto.setUserNumber(userNumber);

        policeBoardDto.setBigCode("500");
        policeService.policeBoardRegister(policeBoardDto);
    }

    @PostMapping("/cs")
    public void csReport(@RequestBody PoliceBoardDto policeBoardDto, HttpServletRequest req) {
//        로그인 세션 처리
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
        policeBoardDto.setUserNumber(userNumber);
        policeBoardDto.setBigCode("700");
        policeService.policeBoardRegister(policeBoardDto);

    }

    @PostMapping("/community")
    public void communityReport(@RequestBody PoliceBoardDto policeBoardDto, HttpServletRequest req) {
//        로그인 세션 처리
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
//      ------------------------------------
        policeBoardDto.setBigCode("400");
        policeBoardDto.setUserNumber(userNumber);
        policeService.policeBoardRegister(policeBoardDto);
    }

    @PostMapping("/comment")
    public void communityCommentReport(@RequestBody PoliceCommentDto policeCommentDto, HttpServletRequest req) {
//        로그인 세션 처리
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
//      ------------------------------------
        policeCommentDto.setBigCode("400");
        policeCommentDto.setUserNumber(userNumber);
        System.out.println("==============================");
        System.out.println(policeCommentDto);
        policeService.policeCommentRegister(policeCommentDto);
        System.out.println("==============================");
        System.out.println(policeCommentDto);
    }

    @PostMapping("/qna")
    public void qnaReport(@RequestBody PoliceBoardDto policeBoardDto, HttpServletRequest req) {
//        로그인 세션 처리
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
//      ------------------------------------
        policeBoardDto.setBigCode("300");
        policeBoardDto.setUserNumber(userNumber);
        policeService.policeBoardRegister(policeBoardDto);


    }

    @PostMapping("/qnaComment")
    public void qnaCommentReport(@RequestBody PoliceCommentDto policeCommentDto, HttpServletRequest req) {
//        로그인 세션 처리
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
//      ------------------------------------
        policeCommentDto.setBigCode("300");
        policeCommentDto.setUserNumber(userNumber);
        System.out.println("==============================");
        System.out.println(policeCommentDto);
        policeService.policeQnaCommentRegister(policeCommentDto);
        System.out.println("==============================");
        System.out.println(policeCommentDto);
    }


}
