package com.example.winwin.controller.community;

import com.example.winwin.dto.board.CommunityCommentDto;
import com.example.winwin.service.board.CommunityCommentService;
import com.example.winwin.vo.board.CommunityCommentVo;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments/*")
public class CommunityCommentController {
    private final CommunityCommentService communityCommentService;

    @PostMapping("/comment")
    public String commentRegister(@RequestBody CommunityCommentDto communityCommentDto, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        communityCommentDto.setUserNumber(userNumber);
        System.out.println(communityCommentDto);
        communityCommentService.register(communityCommentDto);
        return "작성 성공!";
    }

    @GetMapping("/list/{communityNumber}")
    public List<CommunityCommentVo> getCommentList(HttpServletRequest req,
                                                   @PathVariable("communityNumber") Long communityNumber){
        Long sessionUserNumber = (Long)req.getSession().getAttribute("userNumber");
        System.out.println("======================"+sessionUserNumber+"===============================");
        CommunityCommentVo communityCommentVo = new CommunityCommentVo();
        communityCommentVo.setSessionUserNumber(sessionUserNumber);
        communityCommentVo.setCommunityNumber(communityNumber);
        System.out.println("!@#$%^&*()"+communityCommentService.findCommentUdList(communityCommentVo));


        return communityCommentService.findCommentUdList(communityCommentVo);
    }

    @PatchMapping("/{commentNumber}")
    public void commentModify(@PathVariable("commentNumber") Long commentNumber, @RequestBody CommunityCommentDto communityCommentDto){
        communityCommentDto.setCommentNumber(commentNumber);
        communityCommentService.modify(communityCommentDto);
    }

    @GetMapping("/{commentNumber}")
    public CommunityCommentVo commentView(@PathVariable("commentNumber") Long commentNumber){
        return communityCommentService.findComment(commentNumber);
    }

    @DeleteMapping("/{commentNumber}")
    public void commentRemove(@PathVariable("commentNumber") Long commentNumber){
        communityCommentService.deleteCommentUd(commentNumber);
        communityCommentService.remove(commentNumber);
    }

}
