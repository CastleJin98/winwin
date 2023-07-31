package com.example.winwin.vo.board;


import com.example.winwin.vo.infinityScroll.Criteria;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class CsVo extends Criteria {
    private Long csNumber;
    private String csTitle;
    private String csContent;
    private String csDate;
    private Long userNumber;
    private String userId;
    private String userNickname;
    private String userBelong;
    private String userPosition;
    private String userStatus;
    private String gradeName;
    private int likeCnt; // 좋아요 추가함
    private int csReadCnt; // 조회수 추가함
    private int commentCnt; // 댓글수 추가함
    private String pfpSystemName; // 프로필 추가함
    private String pfpUuId;         // 프로필 추가함
}
