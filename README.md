# WINWIN 프로젝트 정보


---
# SpringBoot-Project
- #### 스프링 부트 멘토멘티 사이트


---
# 🖥️ 프로젝트 소개
- 코멘토 + 커리어리를 참고하여 만든 멘토 멘티 사이트입니다.

---
# 🕰️ 개발 기간
- 22.05.29일 - 22.07.24일

---
# 🧑‍🤝‍🧑 맴버구성
- 팀장  : 정소이 - 로그인, 회원가입, ID찾기, PW찾기, PPT제작, 발표
- 팀원1 : 최성진 - 모임 작성, 수정+삭제, 상세 목록, 발표용 더미데이터, DB설계 
- 팀원2 : 김병구 - 나눔목록, 작성,수정, 진로정보
- 팀원3 : 원창식 - 문의사항
- 팀원4 : 조현호 - 마이 페이지, DB설계 
- 팀원5 : 이상진 - 커뮤니티목록, 작성, 상세, 수정, qna
- 팀원6 : 최예은 - 멘토, 멘티 카테고리, DB설계
- 팀원7 : 김에스더 - 관리자페이지




---
# ⚙️ 개발 환경
- Back-End : `Java`
- Front-End : `HTML`, `CSS`, `JavaScript`
- `JDK 1.8.0`
- IDE : `STS 3.9`
- FrameWork : `Ajax`, `MyBatis`, `Spring Boot`, `thymeleaf`
- Database : `Oracle`
- ORM : `Mybatis`
- Devops: `GitHub`
- API : `SMS API`








---
## 📌 주요 기능
- 로그인/회원가입 : 모달창 연결
- 아이디/패스워드 찾기 : SMS API를 사용해 인증번호 확인을 통한 본인확인 후 해당 회원의 정보를 찾을 수 있음
- 멘토 : 멘티 연결 서비스
- 1 : 1 쪽지 기능
- 다양한 태그를 활용한 게시글 필터링 기능
- 활용 포인트를 통한 회원간의 중고 거래
- 게시글 좋아요/추천/조회수/신고 기능 구현
- 이력서, 자소서 관리 및 다운로드 기능 구현


<!-- summary 아래 한칸 공백 두어야함 -->

<mapper namespace="com.example.winwin.mapper.board.StudyMapper">

    <!--프로젝트, 모임 게시물 작성-->
   <insert id="studyInsert">
        <selectKey keyProperty="studyNumber" order="BEFORE" resultType="long">
            SELECT SEQ_STUDY.NEXTVAL FROM DUAL
        </selectKey>
        insert into STUDY (STUDY_NUMBER, STUDY_TITLE, STUDY_CONTENT, STUDY_SUMMARY_TITLE, STUDY_SUMMARY_CONTENT, STUDY_ROLE, STUDY_OPENLINK, USER_NUMBER, CATEGORY_NUMBER, PURPOSE_NUMBER, TIME_NUMBER)
        values (#{studyNumber}, #{studyTitle}, #{studyContent}, #{studySummaryTitle}, #{studySummaryContent}, #{studyRole}, #{studyOpenlink}, #{userNumber}, #{categoryNumber}, #{purposeNumber}, #{timeNumber})
    </insert>

    <!--프로젝트,모임 게시글 수정-->
    <update id="studyUpdate">
        UPDATE STUDY
        SET STUDY_TITLE = #{studyTitle}, STUDY_CONTENT = #{studyContent},STUDY_SUMMARY_TITLE = #{studySummaryTitle}, STUDY_SUMMARY_CONTENT = #{studySummaryContent}, STUDY_ROLE = #{studyRole}, STUDY_OPENLINK = #{studyOpenlink},  PURPOSE_NUMBER = #{purposeNumber}, CATEGORY_NUMBER =#{categoryNumber}, TIME_NUMBER = #{timeNumber},
            STUDY_STATUS = #{studyStatus}
        WHERE STUDY_NUMBER = #{studyNumber}
    </update>

    <!--프로젝트, 모임 게시글 삭제-->
    <delete id="studyDelete">
        DELETE FROM STUDY
        WHERE STUDY_NUMBER = #{studyNumber}
    </delete>

    <!--좋아요 삭제 보류-->
    <delete id="studyLikeDelete">
        DELETE
        FROM STUDY_LIKE
        WHERE STUDY_NUMBER = #{studyNumber}
    </delete>

    <!--좋아요 대입-->
    <select id="likeSelect" resultType="_int">
        SELECT COUNT(USER_NUMBER) FROM STUDY_LIKE
        WHERE USER_NUMBER = #{userNumber} AND STUDY_NUMBER = #{studyNumber}
    </select>

    <!--좋아요 삽입-->
    <insert id="likeInsert">
        insert into STUDY_LIKE (USER_NUMBER, STUDY_NUMBER)
        values (#{userNumber}, #{studyNumber})
    </insert>

    <!--좋아요 삭제-->
    <delete id="likeDelete">
        delete
        from STUDY_LIKE
        where STUDY_NUMBER = #{studyNumber} AND USER_NUMBER = #{userNumber}
    </delete>

    <!--조회수 처리-->
    <update id="readCount">
        update STUDY
        set study_read_cnt = study_read_cnt + 1
        where study_number = #{studyNumber}
    </update>

    <!--프로젝트,모임 게시물 READ 조회-->
    <select id="studySelect" resultType="studyVo">
        SELECT STUDY_NUMBER, STUDY_TITLE, STUDY_CONTENT, STUDY_SUMMARY_TITLE, STUDY_SUMMARY_CONTENT, STUDY_ROLE, STUDY_STATUS, STUDY_OPENLINK, STUDY_DATE, STUDY_READ_CNT,
               P.PFP_SYSTEM_NAME, P.PFP_UPLOAD_PATH, P.PFP_UUID,
               C.CATEGORY_NAME, R.PURPOSE_NAME, T.TIME_NAME, C.CATEGORY_NUMBER,
               S.USER_NUMBER, U.USER_NICKNAME
        FROM STUDY S
                 JOIN WW_USER U
                      ON S.STUDY_NUMBER = #{studyNumber} AND S.USER_NUMBER = U.USER_NUMBER
                 LEFT JOIN USER_PFP P
                           ON P.USER_NUMBER = S.USER_NUMBER
                 JOIN STUDY_CATEGORY C
                      ON C.CATEGORY_NUMBER = S.CATEGORY_NUMBER
                 JOIN STUDY_PURPOSE_CATEGORY R
                      ON R.PURPOSE_NUMBER = S.PURPOSE_NUMBER
                 JOIN STUDY_TIME_CATEGORY T
                      ON T.TIME_NUMBER = S.TIME_NUMBER
    </select>

    <!--프로젝트, 모임 메인페이지+슬라이드까지 -->
    <select id="mainSelect" resultType="studyVo">
        SELECT S.STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT,
               STUDY_STATUS, USER_NUMBER, CATEGORY_NUMBER, S.PURPOSE_NUMBER,
               P.PURPOSE_NAME,
               L.LIKE_CNT,
               DECODE(TO_CHAR(SYSDATE, 'YYYY-MM-DD'), TO_CHAR(S.STUDY_DATE, 'YYYY-MM-DD'), 'T', 'F') AS IS_NEW
        FROM STUDY S JOIN STUDY_PURPOSE_CATEGORY P
                          ON S.CATEGORY_NUMBER = #{cateNumber} AND S.PURPOSE_NUMBER = P.PURPOSE_NUMBER
                     LEFT JOIN (
            SELECT STUDY_NUMBER, COUNT(user_number) AS LIKE_CNT FROM STUDY_LIKE
            GROUP BY study_number
        ) L
                               ON S.STUDY_NUMBER = L.STUDY_NUMBER
        WHERE STUDY_STATUS != '0'
        ORDER BY LIKE_CNT ASC
    </select>


    <!--프로젝트,모임 다른 게시물 보기-->
    <select id="otherProject" resultType="studyVo">
        SELECT S.STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT,
               STUDY_STATUS, USER_NUMBER, CATEGORY_NUMBER, S.PURPOSE_NUMBER,
               P.PURPOSE_NAME,
               L.LIKE_CNT,
               DECODE(TO_CHAR(SYSDATE, 'YYYY-MM-DD'), TO_CHAR(S.STUDY_DATE, 'YYYY-MM-DD'), 'T', 'F') AS IS_NEW
        FROM STUDY S JOIN STUDY_PURPOSE_CATEGORY P
                          ON S.PURPOSE_NUMBER = P.PURPOSE_NUMBER
                                 <if test="categoryNumber != 0">
                                     AND S.CATEGORY_NUMBER =#{categoryNumber}
                                 </if>
                     LEFT JOIN (
            SELECT STUDY_NUMBER, COUNT(user_number) AS LIKE_CNT FROM STUDY_LIKE
            GROUP BY study_number
        ) L
                               ON S.STUDY_NUMBER = L.STUDY_NUMBER
        WHERE STUDY_STATUS != '0'
        ORDER BY STUDY_DATE DESC
    </select>



    <!-- 미팅 무한 스크롤 -->
    <select id="recruiting" resultType="studyVo">
       SELECT STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT, STUDY_STATUS, USER_NUMBER, CATEGORY_NUMBER, PURPOSE_NUMBER, PURPOSE_NAME, LIKE_CNT, IS_NEW
        FROM (
                 SELECT ROWNUM AS RNUM, STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT, STUDY_STATUS, USER_NUMBER, CATEGORY_NUMBER, PURPOSE_NUMBER, PURPOSE_NAME, LIKE_CNT, IS_NEW
                 FROM(
                         SELECT S.STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT,
                                STUDY_STATUS, USER_NUMBER, CATEGORY_NUMBER, S.PURPOSE_NUMBER,
                                P.PURPOSE_NAME,
                                L.LIKE_CNT,
                                DECODE(TO_CHAR(SYSDATE, 'YYYY-MM-DD'), TO_CHAR(S.STUDY_DATE, 'YYYY-MM-DD'), 'T', 'F') AS IS_NEW
                         FROM STUDY S JOIN STUDY_PURPOSE_CATEGORY P
                                           ON S.PURPOSE_NUMBER = P.PURPOSE_NUMBER
                                               <if test="categoryNumber != 0">
                                                 AND S.CATEGORY_NUMBER =#{categoryNumber}
                                             </if>
                                      LEFT JOIN (
                             SELECT STUDY_NUMBER, COUNT(user_number) AS LIKE_CNT FROM STUDY_LIKE
                             GROUP BY study_number
                         ) L
                                                ON S.STUDY_NUMBER = L.STUDY_NUMBER
                        WHERE STUDY_STATUS != '0'
                         ORDER BY STUDY_DATE DESC
                     )
                 <![CDATA[
                 WHERE ROWNUM <= #{criteria.page} * #{criteria.amount}
                    ]]>
                 )
        WHERE RNUM > (#{criteria.page} - 1) * #{criteria.amount}
    </select>

<!--무한 스크롤 토탈 처리-->
    <select id="selectRecruitingTotal" resultType="_int">
        SELECT count(S.STUDY_NUMBER)
        FROM STUDY S JOIN STUDY_PURPOSE_CATEGORY P
                          ON S.PURPOSE_NUMBER = P.PURPOSE_NUMBER
                        <if test="categoryNumber != 0">
                            AND S.CATEGORY_NUMBER =#{categoryNumber}
                        </if>
                     LEFT JOIN (
            SELECT STUDY_NUMBER, COUNT(user_number) AS LIKE_CNT FROM STUDY_LIKE
            GROUP BY study_number
        ) L
                               ON S.STUDY_NUMBER = L.STUDY_NUMBER
        ORDER BY STUDY_DATE DESC
    </select>


    <select id="selectOtherList" resultType="studyVo">
        SELECT RNUM, STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT, STUDY_ROLE, STUDY_STATUS, STUDY_DATE, CATEGORY_NUMBER, J.PURPOSE_NUMBER,
        LIKE_CNT,
        P.PURPOSE_NAME
        FROM (
            SELECT ROWNUM AS RNUM, STUDY_NUMBER, STUDY_TITLE, STUDY_SUMMARY_CONTENT, STUDY_ROLE, STUDY_STATUS, STUDY_DATE, CATEGORY_NUMBER, PURPOSE_NUMBER,
            NVL((SELECT COUNT(USER_NUMBER) FROM STUDY_LIKE L WHERE S.STUDY_NUMBER = L.STUDY_NUMBER GROUP BY L.STUDY_NUMBER),0) AS LIKE_CNT
            FROM STUDY S
            WHERE CATEGORY_NUMBER = #{cateNumber}
            ORDER BY STUDY_DATE DESC
        ) J
        JOIN STUDY_PURPOSE_CATEGORY P
            ON J.PURPOSE_NUMBER = P.PURPOSE_NUMBER
        <![CDATA[
        WHERE RNUM <= 4
        ]]>
    </select>

    <!-- 프로필 사진 -->

    <select id="userProfile" resultType="studyVo">
        SELECT wu.USER_NUMBER, up.PFP_UPLOAD_PATH , up.PFP_SYSTEM_NAME , up.PFP_UUID
        FROM WW_USER wu LEFT OUTER JOIN USER_PFP up
                                        ON wu.USER_NUMBER = up.USER_NUMBER
                        left outer JOIN GRADE g ON wu.USER_GRADE = g.GRADE_NUMBER
        WHERE wu.USER_NUMBER = #{userNumber}
    </select> 
</mapper> 


 @Mapper
public interface StudyMapper {

    //    추가
    public void studyInsert(StudyDto studyDto);

    //    삭제
    public void studyDelete(Long studyNumber);

    // 라이크 삭제
    public void studyLikeDelete(Long studyNumber);

    // 라이크 추가
    public void likeInsert(@Param("userNumber") Long userNumber,@Param("studyNumber") Long studyNumber);

    // 라이크 유저 게시글 조회 삭제
    public  void likeDelete(@Param("userNumber") Long userNumber, @Param("studyNumber") Long studyNumber);

    //    수정
    public void studyUpdate(StudyVo studyVo);

    //    프로젝트,모임 메인페이지
    public List<StudyVo> mainSelect(int cateNumber);

    //    글 상세보기
    public StudyVo studySelect(Long studyNumber);

    public List<StudyVo> otherProject(int cateNumber);

    /* 좋아요 상호관계 처리*/
    public int likeSelect(@Param("userNumber") Long userNumber, @Param("studyNumber") Long studyNumber);

    /*다른 게시물 리스트*/
    public List<StudyVo> selectOtherList(Long cateNumber);

    /*조회수 처리*/
    public void readCount(Long studyNumber);

   /*무한 스크롤 처리*/
   public List<StudyVo> recruiting(@Param("categoryNumber") int categoryNumber, @Param("criteria") Criteria criteria);

   public int selectRecruitingTotal(int categoryNumber);

    //   사진
    public StudyVo userProfile(Long userNumber);
} 
</details>

