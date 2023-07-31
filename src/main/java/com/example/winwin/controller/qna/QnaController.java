package com.example.winwin.controller.qna;

import com.example.winwin.dto.board.QnaDto;
import com.example.winwin.dto.board.QnaGoodDto;
import com.example.winwin.dto.board.QsBridgeDto;
import com.example.winwin.service.qna.QnaCommentService;
import com.example.winwin.service.qna.QnaCommentUdService;
import com.example.winwin.service.qna.QnaGoodService;
import com.example.winwin.service.qna.QnaService;
import com.example.winwin.vo.board.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/qna/*")
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;
    private final QnaGoodService qnaGoodService;
    private final QnaCommentService qnaCommentService;
    private final QnaCommentUdService qnaCommentUdService;

    @GetMapping("/read")
    public String qnaRead(Long qnaNumber, Model model, HttpServletRequest req){

        Long userNumber = (Long)req.getSession().getAttribute("userNumber");

        QnaVo qnaVo = qnaService.findQna(qnaNumber);

        QnaCommentVo qnaCommentVo = new QnaCommentVo();
        qnaCommentVo.setSessionUserNumber(userNumber);
        qnaCommentVo.setQnaNumber(qnaNumber);

        QnaProfileVo selectUserProfile = qnaService.selectUserProfile(qnaVo.getUserNumber());
        model.addAttribute("qnaProfile", selectUserProfile);

        List<QnaCommentVo> qnaCommentVoList = qnaCommentService.findQnaCommentUdList(qnaCommentVo);

        qnaService.upQnaCnt(qnaNumber);

        int commentCnt = qnaService.commentCnt(qnaNumber);
        QnaGoodDto qnaGoodDto = new QnaGoodDto();
        qnaGoodDto.setQnaNumber(qnaNumber);
        qnaGoodDto.setUserNumber(userNumber);
        Long likeStatus = qnaGoodService.findQnaLike(qnaGoodDto);
        int qnaLikeCnt = qnaGoodService.likeQnaCnt(qnaGoodDto);
        qnaVo.setQnaNumber(qnaNumber);

        int commentAuth = 0;
        if(userNumber != null){
            commentAuth = qnaService.commentAuth(qnaVo.getQnaNumber(), userNumber);
        }
        model.addAttribute("commentAuth", commentAuth);
        model.addAttribute("qna", qnaVo);
        model.addAttribute("likeStatus", likeStatus);
        model.addAttribute("qnaLikeCnt", qnaLikeCnt);
        model.addAttribute("commentCnt", commentCnt);
        model.addAttribute("commentList", qnaCommentVoList);


        return "/qna/qnaRead";
    }

    @GetMapping("/write")
    public String qnaWrite(HttpServletRequest req, Model model){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
//        QnaVo qnaVo = qnaService.findQna(qnaNumber);
//        model.addAttribute("qna", qnaVo);
        return userNumber == null? "/user/loginModal " : "/qna/qnaWrite";
    }


    @PostMapping("/write")
    public RedirectView qnaWriteOk(QnaDto qnaDto, @RequestParam("subList")List<Long> subList, HttpServletRequest req, RedirectAttributes redirectAttributes){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        qnaDto.setUserNumber(userNumber);
        qnaService.registerQna(qnaDto);
        System.out.println("=========="+qnaDto);
        QsBridgeDto qsBridgeDto = new QsBridgeDto();

        for(Long subNum : subList){
            qsBridgeDto.setQnaNumber(qnaDto.getQnaNumber());
            qsBridgeDto.setSubNumber(subNum);
            qnaService.registerQs(qsBridgeDto);
        }
        redirectAttributes.addFlashAttribute("qnaNumber", qnaDto.getQnaNumber());
        return new RedirectView("/qna/list");
    }

    @GetMapping("/list")
    public String qnaList(Model model, HttpServletRequest req) {
//        List<QnaVo> qnaList = qnaService.findQnaList();
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");


        if(userNumber != null){
            QnaProfileVo selectUserProfile = qnaService.selectUserProfile(userNumber);
            model.addAttribute("qnaProfile", selectUserProfile);
        }


        return "/qna/qna";
    }

    // 삭제
    @GetMapping("/removeQna")
    public RedirectView removeQna(Long qnaNumber, RedirectAttributes redirectAttributes){

        qnaService.removeQs(qnaNumber);
//        qnaCommentService.remove(commentNumber);
        qnaService.removeQna(qnaNumber);
        return new RedirectView("/qna/list");
    }

    // 수정
    @GetMapping("/modify")
    public String modifyQna(Long qnaNumber, Model model){
        QnaVo qnaVo = qnaService.findQna(qnaNumber);
        model.addAttribute("qna", qnaVo);
        return "qna/qnaModify";
    }

    @PostMapping("/modify")
    public RedirectView modify(QnaDto qnaDto, Long qnaNumber, @RequestParam("subList") List<Long> subList, RedirectAttributes redirectAttributes){
        qnaService.removeQs(qnaNumber);
//        qnaService.registerQs(qsBridgeDto);
        qnaService.modifyQna(qnaDto);
        QsBridgeDto qsBridgeDto = new QsBridgeDto();

        for(Long subNum : subList){
            qsBridgeDto.setQnaNumber(qnaDto.getQnaNumber());
            qsBridgeDto.setSubNumber(subNum);
            qnaService.registerQs(qsBridgeDto);
        }

        redirectAttributes.addAttribute("qnaNumber", qnaDto.getQnaNumber());
        return new RedirectView("/qna/read");
    }


}