package com.example.winwin.controller.community;


import com.example.winwin.dto.board.CommunityDto;
import com.example.winwin.dto.file.CommunityFileDto;
import com.example.winwin.service.board.CommunityCommentService;
import com.example.winwin.service.board.CommunityCommentUdService;
import com.example.winwin.service.board.CommunityGoodService;
import com.example.winwin.service.board.CommunityService;
import com.example.winwin.service.file.CommunityFileService;
import com.example.winwin.vo.board.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;


@Controller
@RequestMapping("/community/*")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityCommentService communityCommentService;
    private final CommunityFileService communityFileService;
    private final CommunityGoodService communityGoodService;
    private final CommunityCommentUdService communityCommentUdService;

    /**
     * 타임라인 목록
     * /community/list/all : 전체
     * /community/list/10 : 고등학생
     * /community/list/20 : 대학생
     * /community/list/30 : 직장인
     */
    @GetMapping("/list/{categoryTypeStr}")
    public String communityMainForm(@PathVariable("categoryTypeStr") String categoryTypeStr ,Model model, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        if(userNumber != null){
            CommunityProfileVo communityProfileVo = communityService.selectUserProfile(userNumber);
            model.addAttribute("communityProfileVo", communityProfileVo);
        }
         model.addAttribute("categoryTypeStr", categoryTypeStr);
        System.out.println("------------------------------------");
        System.out.println(categoryTypeStr);
        System.out.println("------------------------------------");
        return "community/communityMain";
    }

    @GetMapping("/write")
    public String communityWriteForm(HttpServletRequest req, Model model) {
        Long userNumber = (Long) req.getSession().getAttribute("userNumber");
//        return userNumber == null ? "users/login" : "community/communityWrite";
        return "community/communityWrite";

    }

    @PostMapping("/write")
    public RedirectView communityWrite(CommunityDto communityDto, HttpServletRequest req, RedirectAttributes redirectAttributes,
                                       @RequestParam("communityFile") List<MultipartFile> files){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        communityDto.setUserNumber(userNumber);
        communityService.register(communityDto);
        redirectAttributes.addFlashAttribute("communityNumber", communityDto.getCommunityNumber());

        if(files != null){
            try {
                communityFileService.registerAndSaveFiles(files, communityDto.getCommunityNumber());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new RedirectView("/community/list/all");
    }

    @GetMapping("/read")
    public String communityReadForm(Long communityNumber, Model model, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        CommunityVo communityVo = communityService.find(communityNumber);

        CommunityCommentVo communityCommentVo = new CommunityCommentVo();
        communityCommentVo.setSessionUserNumber(userNumber);
        communityCommentVo.setCommunityNumber(communityNumber);

        CommunityProfileVo communityProfileVo = communityService.selectUserProfile(communityVo.getUserNumber());
        model.addAttribute("communityProfileVo", communityProfileVo);

        List<CommunityCommentVo> communityCommentVoList = communityCommentService.findCommentUdList(communityCommentVo);

        List<CommunityFileDto> fileList =  communityFileService.findList(communityNumber);
        communityService.upHitCnt(communityNumber);
        int commentCnt = communityService.commentCnt(communityNumber);
        CommunityGoodVo communityGoodVo = new CommunityGoodVo();
        communityGoodVo.setCommunityNumber(communityNumber);
        communityGoodVo.setUserNumber(userNumber);
        Long likeStatus = communityGoodService.findLike(communityGoodVo);
        int likeCnt = communityGoodService.likeCnt(communityGoodVo);

        model.addAttribute("community", communityVo);
        model.addAttribute("commentList", communityCommentVoList);
        model.addAttribute("commentCnt", commentCnt);
        model.addAttribute("likeStatus", likeStatus);
        model.addAttribute("likeCnt", likeCnt);



        return "community/communityRead";
    }

    @GetMapping("/modify")
    public String modifyForm(Long communityNumber, Model model){
        CommunityVo communityVo = communityService.find(communityNumber);
        model.addAttribute("community", communityVo);
        return "community/communityModify";
    }

    @PostMapping("/modify")
    public RedirectView modify(CommunityDto communityDto, RedirectAttributes redirectAttributes,
                               @RequestParam("communityFile") List<MultipartFile> files){
        try {
            communityService.modify(communityDto, files);
        } catch (IOException e) {
            e.printStackTrace();
        }
        redirectAttributes.addAttribute("communityNumber", communityDto.getCommunityNumber());
        return new RedirectView("/community/read");
    }

    @GetMapping("/remove")
    public RedirectView remove(Long communityNumber, RedirectAttributes redirectAttributes){
        communityService.remove(communityNumber);
        return new RedirectView("/community/list/all");
    }

    @GetMapping("/qna")
    public String qna(){
        return "/qna/qna";
    }

    }
