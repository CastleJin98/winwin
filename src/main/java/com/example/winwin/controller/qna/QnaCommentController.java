package com.example.winwin.controller.qna;

import com.example.winwin.dto.board.QnaCommentDto;
import com.example.winwin.service.qna.QnaCommentService;
import com.example.winwin.vo.board.QnaCommentVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/qnaComments/*")
public class QnaCommentController {
    private final QnaCommentService qnaCommentService;

    @PostMapping("/comment")
    public String commentRegister(@RequestBody QnaCommentDto qnaCommentDto, HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        qnaCommentDto.setUserNumber(userNumber);


        System.out.println(qnaCommentDto+"============================================");
        qnaCommentService.registerQnaComment(qnaCommentDto);
        return "작성 성공!";
    }

    @GetMapping("/list/{qnaNumber}")
    public List<QnaCommentVo> getCommentList(HttpServletRequest req,
                                             @PathVariable("qnaNumber") Long qnaNumber){
        Long sessionUserNumber = (Long)req.getSession().getAttribute("userNumber");
        QnaCommentVo qnaCommentVo = new QnaCommentVo();
        qnaCommentVo.setSessionUserNumber(sessionUserNumber);
        qnaCommentVo.setQnaNumber(qnaNumber);

        System.out.println(qnaCommentService.findQnaCommentUdList(qnaCommentVo));

        return qnaCommentService.findQnaCommentUdList(qnaCommentVo);
    }

    @PatchMapping("/{commentNumber}")
    public void commentModify(@PathVariable("commentNumber") Long commentNumber, @RequestBody QnaCommentDto qnaCommentDto){
        qnaCommentDto.setCommentNumber(commentNumber);
        qnaCommentService.modifyQna(qnaCommentDto);
    }

    @GetMapping("/{commentNumber}")
    public QnaCommentVo commentView(@PathVariable("commentNumber") Long commentNumber){
        return qnaCommentService.findQna(commentNumber);
    }

    @DeleteMapping("/{commentNumber}")
    public void commentRemove(@PathVariable("commentNumber") Long commentNumber){
        qnaCommentService.deleteQnaCommentUd(commentNumber);
        qnaCommentService.remove(commentNumber);
    }
}