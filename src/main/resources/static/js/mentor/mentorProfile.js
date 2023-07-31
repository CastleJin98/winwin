/* 쪽지 모달창 */
$(function () {
    $(".chatting-button").click(function () {
        $(".input-wrap").fadeIn();
        let userNickname = $(this).closest('.item').find('.mento-name2').text();
        let num = $(this).closest('.item').find('.mentor-num').data('num');
        console.log(num);

        $('.chattingTo').text(userNickname);
        $('.chattingTo').data('num', num);
    });
});

$(".chatting-button").on("click", function () {
    $(".input-wrap").removeClass("none");

    $('body').css('overflow', 'hidden');
});

$(".input-wrap").on("click", function (e) {

    if ($(e.target).hasClass("input-wrap")) {
        $(".input-wrap").addClass("none");
        console.log("엥????????????????????/");
        $('body').css('overflow', 'auto');
        console.log("뜨엥????????????????????/");

        $('.form-reset')[0].reset();
        console.log("뜨엥에?????????????????????/");
    }
});


let moreInfo = $(".mento-more-info-box");

moreInfo.click(function () {
    $(this).find(".mento-more-info").toggleClass("none");
});

//링크 공유하기 버튼
let share = $(".share-button");

share.click(function CopyUrlToClipboard() {
    var url = 'http://localhost:10000/mentor/list'; // 현재 페이지의 URL 가져오기
    var tempInput = $("<input>"); // 임시로 input 요소 생성
    share.append(tempInput);
    tempInput.val(url); // input 요소의 값에 URL 설정
    tempInput.select(); // input 요소 내용 선택
    document.execCommand("copy"); // 복사 명령 실행
    tempInput.remove(); // 임시 input 요소 제거
    alert("복사가 완료 되었습니다.");
});

//멘토 신청하기 버튼
$(".main-mentor").on("click",'.message-button' ,function () {
    let user =  $('.user').val();
    // let status = $(this).
    console.log(user);
    console.log($('.loginstatus').val());
    if(user == ''){
        alert("로그인 해주세요!");
        $('.login-move').trigger('click');
    }
    // if($('.loginstatus').val() == '멘토'){
    //     alert("멘토이신 경우 신청이 불가능합니다.");
    // }
    if(user != ''){
        $(".modal-wrap1").removeClass("none");
        $(".modal-wrap1").css({
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        });
    }

    let name = $(this).closest('.item__box').find('.mento-name').text();
    let number = $(this).closest('.item__box').find('.add-num').data('add');
    console.log(number);
    // console.log(name);
    $('.mentorName').text(name);
    $('.addNumber').text(number);

    $.ajax({
        url : '/mentor/profile2',
        type : 'get',
        data : {mentorNumber : number},
        success : function (r){
            mentorProfile(r);
        },
        error : function (){
            console.log("실패");
        }
    });

});

//멘토 프로필 불러오기
function mentorProfile(mentor){
    let text = '';
    text += `
    ${mentor.pfpSystemName == null ? '<img class="img-box" src="/img/profile-basic.png"/>' :
        '<img class="img-box" src=/profile/' + mentor.pfpUuid + '_' + mentor.pfpSystemName + '>' }
    `;
    $('.mento-profile-photo-box2').html(text);
}

//멘토 신청하기 모달
$(".modal-wrap1").on("click", function (e) {
    if ($(e.target).hasClass("modal-wrap1")) {
        $(".modal-wrap1").addClass("none");
    }
});

// 태그 필터
const selectBoxElements2 = document.querySelectorAll(".select");

function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const selectedElement = selectBox.querySelector(".selected-value");
    selectedElement.textContent = optionElement.textContent;
}

selectBoxElements2.forEach((selectBoxElement) => {
    selectBoxElement.addEventListener("click", function (e) {
        console.log("aaaaaaa")
        const targetElement = e.target;
        const isOptionElement = targetElement.classList.contains("option");

        if (isOptionElement) {
            selectOption(targetElement);
        }

        toggleSelectBox(selectBoxElement);
        if (e.target.classList.contains("option")) {
            $(e.target).closest(".select").find(".arrow").removeClass("arrow-after");
        }

        e.preventDefault();
    });
});

document.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isSelect =
        targetElement.classList.contains("select") ||
        targetElement.closest(".select");

    if (isSelect) {
        return;
    }

    const allSelectBoxElements = document.querySelectorAll(".select");

    allSelectBoxElements.forEach((boxElement) => {
        boxElement.classList.remove("active");
        $(boxElement).find(".arrow").removeClass("arrow-after");
    });
});

// 클릭시 arrow 180도 회전
$(".select").on("click", function (e) {

});

$(".middle-option-box").on("click", ".middle-option", function () {
    let text = $(this).text();

    let tagHtml = `<span class="tag">@${text}</span>`;

    $(".select-tag").append(tagHtml);
});

//태그 눌렀을 때 지워주기+리스트 다시 띄우기
$(".select-tag").on("click", ".tag", function () {
    $(this).detach();

    let list = [];

    $('.tag').each((i, tag) => {
       list.push($(tag).data('value'))
    });

    $.ajax({
        url : '/mentor/sub',
        type : 'get',
        traditional : true,
        data : {
            subNumber : list
        },
        success : function (result){
            // $('.main-mentor').html('');

            showMentor(result);
        }
    });
//    ==================================================================================
});

// 나의 관심분야 3가지 카테고리 박스
let $boxes2= $('.select');

//클릭하면 리스트 div 보기,닫기
$boxes2.on('click', function(){
    if($(this).closest('.select').find('.option-box').hasClass('none')){
        $('.option-box').addClass('none');
        $(this).closest('.select').find('.option-box').toggleClass('none');
    }else{
        $('.option-box').addClass('none');
    }
});

//고른 항목 텍스트 상위로 복사
$('.select').on('click', '.option', function(){
    $(this).closest('.select').find('.selected-value').text($(this).text());
});

//다른 곳 클릭 시 리스트 div 닫기
$("body").on('click', function(e){
    if(!$(e.target).closest('.select').hasClass('select')){
        $boxes2.each((i, box) => {$(box).find('.option-box').addClass('none');});
    }
});

//3차 카테고리 선택 시 태그 추가(최대 3개)
$(".third-job-box").on("click", ".option", function () {
    let text = $(this).text();
    let val = $(this).val();

    let existingTags = $(".select-tag .tag");
    if (existingTags.length >= 10) { return; }

    for(let i=0; i<existingTags.length; i++){
        if(existingTags.eq(i).text() == '@' + text){
            return;
        }
    }

    let tagHtml = `<div class="tag" data-value="${val}">@${text}</div>`;

    let list = [];

    $(".select-tag").append(tagHtml);

    $('.tag').each((i, obj) => {
        let tmp = $(obj).data('value');
        list.push(tmp);
    });

    console.log(list);
    $.ajax({
        url : '/mentor/sub',
        type : 'get',
        traditional : true,
        data : {
            subNumber : list
        },
        success : function (result){
            // $('.main-mentor').html('');

            showMentor(result);
        }
    });
});


// $('.select-tag').on('click', '.tag' , function (){
//     console.log($('.tag').data('value'));
//     let tag = $('.tag').data('value');
//
//     if(tag == null){
//         // window.location.href= '/mentor/list';
//         // showMentor;
//         console.log('제발');
//     }
//
// });

function showMentor(map){
    let text = '';

    map.forEach(mentor => {
        text += `
     <article class="item">
          <section class="mento-profile">
            <div class="item__box">
              <input type="hidden" class="add-num" data-add="${mentor.mentorNumber}"/>
              <a href="/mentor/profile?mentorNumber=${mentor.mentorNumber}" class="page-move">
                <div class="flex">
                  <div class="mento-profile-photo-box">
                    ${mentor.pfpSystemName == null ? '<img class="img-box" src="/img/profile-basic.png"/>' :
            '<img class="img-box" src=/profile/' + mentor.pfpUuid + '_' + mentor.pfpSystemName + '>' }
                    
                  </div>
                  <div class="flex text-wrap" >
                    <div class="mento-name"> <span>${mentor.userName}</span> </div>
                    <div class="mento-career">
                        <span>${mentor.careerCompany}</span> · <span>${mentor.careerAnnual}</span>년차
                    </div>
                  </div>
                </div>
              </a>

              <div class="mento-button-box">
                  <input type="hidden" class="mentor-num" data-num="${mentor.mentorNumber}"/>
                <button class="like-button" data-value="${mentor.likeCnt}"> `;
        if(mentor.likeCnt == 0){
            text+= `
            <div class="like-up like0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill none2" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                  </div>
            `;
        }
        if (mentor.likeCnt == 1){
            text += `
            <div class="like-down like0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart none2" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                  </div>
            `;
        }

        text+=`                
                </button>`;

        if(mentor.umStatus == '0'){
            text += `
                <button class="message-button">신청하기</button>
            `;
        }
        if(mentor.umStatus == 'Y'){
            text += `
                <button class="chatting-button">쪽지 보내기</button>
            `
        }
        if(mentor.umStatus == 'N'){
            text +=`
            <button class="d-button">대기중</button>
            `;
        }

              text += `</div>
            </div>
            <div class="skill-tags">
              <!--            스킬 나열 -->
              `;
        mentor.skill.forEach(skills => {
            text += `
                    <div class="skill">
                    <span class="skill2">${skills.skillName}</span>
                    </div>
                `;
        });
        text+=`
            
            </div>

            <!-- 경력 -->
            <div class="career1">`;

        mentor.career.forEach(careers => {
            text += `
            <div class="career">
               <div class="career-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-buildings" viewBox="0 0 16 16">
                  <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
                  <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
                </svg>
              </div>

              <div class="main-career">
                <span class="point">${careers.careerCompany}</span>
                  <span class="point2">${careers.careerTitle}</span>
                  <span class="date"> <span>${careers.careerStartDate} - <span>
                    `;
            if(careers.careerStatus == 'Y') {
                text += `
                   <span>재직 중</span>
                   ` ;
            }
            if(careers.careerStatus == 'N'){
                text += `
                     ${careers.careerEndDate}
                     `;
            }
            text += `
                </span>
                <span class="date"> · <span class="date">${careers.careerAnnual}</span>년차</span>
              </div>
              </div>
            `;
        });
        text +=
            ` </div>
         </div>
            <!-- /경력 -->

          </section>
          <div class="mento-more-info-box">
            <div class="mento-more-info">
              더보기
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 -2 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
            <div class="mento-more-info none">
              닫기
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 -2 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
              </svg>
            </div>
          </div>
        </article>
    `;
    });

    $('.main-mentor').html(text);
}

//태그 선택시 지워주기
// $(".select-tag").on("click", ".tag", function () {
//     $(this).detach();
// });


// 1, 2, 3차 카테고리 별 항목 띄우기

// 1차 카테고리
// let $category = $(".first-option-box");
// 2차 카테고리
let $jobBox2 = $(".second-job-box");
// 3차 카테고리
let $depBox2 = $(".third-job-box");

$(".option").on("click", function () {
    let text = "";
    $jobBox2.html(text);
    let ss = $(this).val();
    if($(this).val() == "1"){
        $.ajax({
            url: "/category/categoryJ",
            type: "get",
            data: {mainCode: ss},
            dataType : 'json',
            success: function (result) {
                makeMiddleCate(result);
            },
        });
    }
    if($(this).val() == "2"){
        $.ajax({
            url: "/category/categoryH",
            type: "get",
            data: {mainCode: ss},
            dataType : 'json',
            success: function (result) {
                makeMiddleCate(result);
            },
        });
    }
    $jobBox2.html(text);
});

$(".second-job-box").on("click", ".option", function () {
    let text = "";
    $depBox2.html(text)
    let ss = $(this).val();
    $.ajax({
        url : '/category/subCategory',
        type : 'get',
        data : { mainCode : ss },
        dataType : 'json',
        success : function (result) {
            let text2 = '';
            result.forEach(r => {
                text2 +=`
                    <li class="option" value="${r.subNumber}">${r.subName}</li>
                    `;
            });
            $('.third-job-box').html(text2);
        }
    });
    $depBox2.html(text);
});

// 2, 3차 카테고리 선택 시 항목 띄어주는 함수
function makeMiddleCate(result) {
    let text2 = '';

    result.forEach(r => {
        text2 += `
        <li class="option" value="${r.mainCode}">${r.mainName}</li>
        `;
    });
    $('.second-job-box').html(text2);

    return text2;
}

//-----------------------------------------------------------
let check = $("#suggest-profile");
let height = parseInt($(".myProfile").css("height")) + 25;

check.click(function () {
    $(".toggle-ment").toggleClass("none");

    if ($('p[class="toggle-ment none"]').text().trim() != "올림") {
        $(".myProfile-box").css("height", height);
    } else {
        $(".myProfile-box").css("height", 0);
    }
});
//-----------------------------------------------------------

//멘토 프로필 업데이트
$('#suggest-profile').on("click", function (){
    console.log($(this).is(":checked"));
    let status = $('#status').val() == 'N' ? 'Y' : 'N';
    console.log("프로필 오픈!");

    $.ajax({
        url : '/mentor/list',
        type : 'patch',
        data : {mentorStatus : status},
        success : function (){
            console.log("성공!");
            $('#status').val(status);
            // console.log($('#status').val());
        },
        error : function (){
            console.log("실패");
        }
    });
    // $('.profile-btn').submit();
});

$(function(){
    if($('#status').val() == 'Y'){
        $('#suggest-profile').attr('checked', 'true');
        $(".toggle-ment").toggleClass("none");

        if ($('p[class="toggle-ment none"]').text().trim() != "올림") {
            $(".myProfile-box").css("height", height);
        } else {
            $(".myProfile-box").css("height", 0);
        }
    }
});

//좋아요(찜) 처리
$(".main-mentor").on("click",'.like-button' ,function (e){
    e.preventDefault();
    let user = $('.user').val();
    if (user == ''){
        alert("로그인 해주세요!");
        $('.login-move').trigger('click')
    }
    // if($('.loginstatus').val() == '멘토'){
    //     alert("멘토이신 경우 관심 멘토 등록이 불가합니다.");
    // }
    if(user != ''){
        e.preventDefault();
        let btn = $(this).find('.bi-heart');
        let btn2 =$(this).find('.bi-heart-fill');
        if ($(this).val() == 0){
            let mentorNum = $(this).closest('.mento-button-box').find('.mentor-num').val();
            let num2 = $(this).closest('.main-mentor').find('.mentor-num').data('num');
            // console.log(num2);
            console.log(mentorNum);
            $.ajax({
                url : '/mentor/like',
                type : 'post',
                data : {mentorNumber : mentorNum},
                success : function (){
                    console.log("성공");
                },
                error : function (){
                    console.log("실패");
                }
            });
            btn2.show();
            btn.hide();
        }

        if($(this).val() == 1){
            e.preventDefault();
            let mentorNum =  $(this).closest('.mento-button-box').find('.mentor-num').val();
            let num2 = $(this).closest('.main-mentor').find('.mentor-num').data('num');
            $.ajax({
                url : '/mentor/delete',
                type : 'delete',
                data : {mentorNumber : mentorNum},
                success : function (){

                    console.log("성공");
                },
                error : function (){
                    console.log("실패");
                }
            });
            btn2.hide();
            btn.show();
        }
    }
});

//멘토 프로필 등록하기
$('.profile-button').on('click', function (e) {
    e.preventDefault();

    let mentorNumber = $('.mento-button').data('mentornumber');
    let userNumber = $('.mento-button').data('usernumber');

    if(mentorNumber > -1){
        window.location.href = '/mentor/apply';
    }
    else if (mentorNumber == -1){
        alert("멘토가 아닙니다");
    }
    else {
        $('.login-move').trigger('click');
    }
});

//멘토 신청하기
$('.modal-wrap1').on('click', '.um-btn' , function (){
    let number = $(this).closest('.modal-wrap1').find('.addNumber').text();
    console.log(number);
    $.ajax({
        url : '/mentor/add',
        type : 'post',
        data : {mentorNumber : number},
        success : function (){
            console.log("성공");
            alert("신청에 성공하셨습니다.");
            $(".modal-wrap1").addClass("none");
            // showMentor();
        },
        error : function (){
            console.log("실패");
        }
    });

});

//멘토 프로필 더보기+닫기 버튼
$('.main-mentor').on('click', '.mento-more-info-box',function (){
    console.log("선택 됐다");
    let $target = $(this).prev('.mento-profile');

    if($target.css('max-height') == 'none'){
        $target.css('max-height' , "186px")
    }else {
        $target.css('max-height' , "none");
    }

});

//내 프로필 더보기+닫기 버튼
$('.mento-more-info-box2').on('click', function (){
    console.log("선택 됐다");
    let $target = $(this).prev('.mento-profile');
    let myprofile = $('.myProfile-box');

    if($target.css('max-height') == 'none'){
        $target.css('max-height' , "186px")
    }else {
        $target.css('max-height' , "none");
        // myprofile.css('margin-bottom' , "10px");
        myprofile.css('height' , 'auto');
    }
});

//내프로필 쪽지함 버튼
$('.my-message').on('click', function (){
    window.location.href = '/myPage/receiveMessage';
})

