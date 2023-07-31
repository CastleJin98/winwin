let $current = $('.login-box'); // 첫 번째 모달창 (처음에는 로그인 고정, 이후 변경)
let $next = null; // 다음 모달창 (항시 변경)
let $checkIdMsg = $('#join-check-id-msg');
let $checkPwMsg = $("#join-check-pw-msg");
let $checkPwMsg2 = $("#join-check-pw-msg2");
let $checkEmailMsg = $('#join-check-email-msg');

// 아이디 정규식
// 영문/숫자만 입력 가능 || 전체 길이 = 2-15자
let $idPattern = RegExp("^[a-zA-Z][0-9a-zA-Z]{2,14}$");

// 닉네임 정규식
// 특수문자 절대 못 씀
let nicknamePattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

// 이메일 정규식
// @, . 무조건 들어가야 함 || @를 제외한 특수문자 입력 안 됨
let $emailPattern = RegExp("^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$");

// 비밀번호 정규식
//영어, 숫자, 특수문자 입력 || 최소 8자 이상 || 영어 대소문자를 구분 안 함
const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;

// 이름 정규식
// 한글 또는 영문만 가능 (혼용x)
let namePattern = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;

// 주민번호, 핸드폰번호, 인증번호
// 숫자만 입력할 수 있음
let numberPattern = /^[0-9]+$/;




// 모달창 이동처리
$('.modal-next').on('click', function(){

    if($current.hasClass('login-box')){

        return;
    }


    if($current.hasClass('message-box')){
        console.log('메세지 이후 처리');

    }

    if($current.hasClass('find-id-box')){
        $('.modal-next').addClass('none');
        $('.home-btn').addClass('none');
        $('.home-btn-2').removeClass('none');
        $next = $('.result-id-box');
    }

    if($current.hasClass('find-pw-box')){
        $('.modal-next').addClass('none');
        $('.home-btn').addClass('none');
        $('.home-btn-2').removeClass('none');
        $next = $('.result-pw-box');
    }

    if($current.hasClass('result-id-box')){
        // $next = $('.result-id-box');
        $('.modal-next').addClass('none');
        $('.home-btn').addClass('none');
        $('.home-btn-2').removeClass('none');
    }

    if($current.hasClass('result-pw-box')){
        // $next = $('.result-id-box');
        $('.modal-next').addClass('none');
        $('.home-btn').addClass('none');
        $('.home-btn-2').removeClass('none');
    }

    if($current.hasClass('agreement-box')){
        //약관 확인
        if (!$("#agreement-check2").is(":checked") || !$("#agreement-check3").is(":checked")) {
            console.log('약관 확인 처리!')
            return;
        }
        $next = $('.self-box');
    }



    if($current.hasClass('self-box')){

        console.log($('.radioInput').val());

        if($('#user-name').val() == '') {
            return;
        }else if(!namePattern.test($('#user-name').val())){
            return;
        }else if($('#self-number').val() == '' || $('#self-gender').val() == ''){
            return;
        }else if($('#self-gender').val() >= 5){
            return;
        }else if(!numberPattern.test($('#self-number').val()) || !numberPattern.test($('#self-gender').val())){
            return;
        }else if($('#userPhoneNumber').val() == ''){
            return;
        }else if(!numberPattern.test($('#userPhoneNumber').val()) || !numberPattern.test($('#userVerification').val())){
            return;
        }else if($('#userVerification').val() == ''){
            return;
        }
        $next = $('.join-box');

    }

    if($current.hasClass('join-box')){

        if($('#join-id-input').val() == ''){
            return;
        }else if($('#userNickname').val() == ''){
            return;
        }else if($('#join-pw-input').val() == ''){
            return;
        }else if(!regex.test($('#join-pw-input').val())){
            return;
        }else if($("#join-pw-input2").val() != "" && $("#join-pw-input").val() != $("#join-pw-input2").val()){
            return;
        }else if($('#userEmail').val() == ''){
            return;
        } else if(!$emailPattern.test($('#userEmail').val())){
            return;
        }

        $next = $('.job-dep-box');
    }

    if($current.hasClass('job-dep-box')){

        if($('.job-tag').val() == null){
            $('.job-dep-text').html("최소 1개 이상의 태그를 선택해 주세요.");
            return;
        }

        $next = $('.goal-box');
    }

    // if($current.hasClass('goal-box')){
    //     if($('.goal-mm-value').val() == null){
    //         $next = $('.goal-box');
    //     }
    // }


    if ($current.hasClass('identity-belong-box')){
        // let $selectBox = $('select[name=identity-belong]');
        // console.log($selectBox.val());
        // if($selectBox.val() == "identity-office-worker"){
        //     $next = $('.mentor-goal-box');
        // }else if($selectBox.val() == "identity-university-student"){
        //     $next = $('.mentor-goal-2-box');
        // }else{
        // }
            $next = $('.mentor-goal-box');
    }



    if ($current.hasClass('mentor-goal-box')){

        if($('.userBelong').val() == ''){
            $('#com-check-msg').html("회사명/학교명을 입력해 주세요.");
            return;
        }
        $next = $('.certification-box');
    }

    // if ($current.hasClass('mentor-goal-2-box')){
    //
    //     if($('.userBelong2').val() == ''){
    //         $('#un-check-msg').html("학교명을 입력해 주세요.");
    //         return;
    //     }
    //     $next = $('.certification-box');
    // }

    if ($current.hasClass('certification-box')){
        $next = $('.sign-box');

        $('.modal-next').addClass('none');
        $('.home-btn').removeClass('none');
    }

    if ($next.hasClass('sign-box')){
        $('.modal-next').addClass('none');
        $('.home-btn').removeClass('none');
    }


    changeModal($current, $next);

});

/**
 * 모달창 변경하는 함수
 *
 * @param $currentParam 현재 페이지를 jquery객체로 넘겨주기
 * @param $nextParam 다음 페이지를 jquery객체로 넘겨주기
 */
function changeModal($currentParam, $nextParam){
    //현재 페이지 화면에서 사라지기
    $currentParam.addClass('disappear');
    $currentParam.removeClass('appear');
    $currentParam.addClass('none');

    //다음 페이지 화면에 보이기
    $nextParam.removeClass('none');
    $nextParam.addClass('appear');

    $current = $nextParam;
}



// 아이디 찾기
$('.find-id-link').on('click', function(e){
    e.preventDefault();
    // console.log('click');
    $next = $('.find-id-box');
    changeModal($current, $next);
    $('.login-end').addClass('none');
    $('.modal-next').removeClass('none');
});

// 비밀번호 찾기
$('.find-pw-link').on('click', function(e){
    e.preventDefault();
    // console.log('click');
    $next = $('.find-pw-box');
    changeModal($current, $next);
    $('.login-end').addClass('none');
    $('.modal-next').removeClass('none');
})

// 회원가입 (첫 페이지 : 약관 동의)
$('.login-kakao').on('click', function(e){
    e.preventDefault();
    console.log('click');
    $next = $('.agreement-box');
    changeModal($current, $next);
    $('.login-end').addClass('none');
    $('.modal-next').removeClass('none');
})

// 가입 목적 버튼에 따라 다음페이지가 달라짐
$('.btn1').on('click', function(){

    $('.goal-mm-value').val('mentor');

    $next = $('.identity-belong-box');

})

$('.btn3').on('click', function (){

    $('.goal-mm-value').val('mentorMentee');

    $next = $('.identity-belong-box');
})

$('.btn2').on('click', function (){

    $('.goal-mm-value').val('mentee');

    $next = $('.sign-box');
})



// 로그인 처리
$('.login-end').on('click', function (){
    console.log('login!!!');

    $.ajax({
        url : '/users/login',
        type : 'post',
        data : JSON.stringify({userId : $('#login-id').val() , userPassword: $('#login-password').val()}),
        contentType : "application/json; charset=utf-8",
        async : false,
        success: function (result){
            $(".modal-container").addClass("none");
            $('body').css('overflow', 'auto');
            modalSetUp();

            if(result == 0){
                alert("잘못된 회원 정보입니다.");
            }else if(result == 3){
                alert("영구정지 처리된 회원입니다.");
            }else{
                let tmp = window.location.href;
                window.location.href = tmp;
            }
        }
    })
    function modalSetUp(){
        $('.modal-wrap>div').addClass('none');
        $('.modal-wrap>button').addClass('none');
        $('.login-box').removeClass('none');
        $('.login-end').removeClass('none');
        $('.login-box').removeClass('disappear');
        $current = $('.login-box');
        $next = null;
        $('.form-reset')[0].reset();
    }
});


// 회원가입 처리
$('.home-btn').on('click', function (){

    console.log("드러와따 ~~~")
    let form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");  //Post 방식
    form.setAttribute("action", "/main/main"); //요청 보낼 주소

    let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userName");
    hiddenField.setAttribute("value", $('#user-name').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userRrnumber");
    hiddenField.setAttribute("value", $('#self-number').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userPhoneNumber");
    hiddenField.setAttribute("value", $('#userPhoneNumber').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userId");
    hiddenField.setAttribute("value", $('#join-id-input').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userPassword");
    hiddenField.setAttribute("value", $('#join-pw-input').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userEmail");
    hiddenField.setAttribute("value", $('#userEmail').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userGender");
    hiddenField.setAttribute("value", $('#self-gender').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userNickname");
    hiddenField.setAttribute("value", $('#userNickname').val());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userIdentity");
    hiddenField.setAttribute("value", $('.radioInput:checked').val());
    form.appendChild(hiddenField);


    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userBelong");
    hiddenField.setAttribute("value", $('.userBelong').val());
    form.appendChild(hiddenField);

    // hiddenField = document.createElement("input");
    // hiddenField.setAttribute("type", "hidden");
    // hiddenField.setAttribute("name", "userBelong");
    // hiddenField.setAttribute("value", $('.userBelong2').val());
    // form.appendChild(hiddenField);


    $('.job-tag>input').each((i, obj) => {
        let value = $(obj).val();

        hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "subNumber");
        hiddenField.setAttribute("value", value);
        form.appendChild(hiddenField);
    })

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "userPosition");
    hiddenField.setAttribute("value", $('.goal-mm-value').val());
    form.appendChild(hiddenField);

    if($('#certi-input').val()){
        hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "certificationNumber");
        hiddenField.setAttribute("value", $('#certi-input').val());
        form.appendChild(hiddenField);
    }


    document.body.appendChild(form);
    form.submit();
});



// 아이디 중복 검사
$('#join-id-input').on('blur', function() {
    if ($(this).val() == '') {
        $checkIdMsg.text('아이디를 입력하세요.');
    }else if(!$idPattern.test($(this).val())){
        $checkIdMsg.text('아이디는 영문/숫자만 가능하며 3-15자 이내로 작성해 주세요.');
    }
    else {
        console.log($(this).val());
        let id = $(this).val();
        $.ajax({
            url: '/users/checkId',
            type: 'post',
            data : {'userId' : id},
            success : function(result) {
                //서버와 통신성공시 실행할 내용 작성.
                console.log('통신 성공!');
                if (result === 0) {
                    $checkIdMsg.html('사용 가능한 아이디 입니다.');
                } else {
                    $checkIdMsg.html('중복된 아이디 입니다.');
                }
            }
        });
    }
});

let $checkNicknameMsg = $('#join-check-nickname-msg');
let $userNickname = $('#userNickname');

// 닉네임 중복 검사
$('#userNickname').on('blur', function() {
    if ($(this).val() == '') {
        $checkNicknameMsg.text('닉네임을 입력하세요.');
    }else if(nicknamePattern.test($(this).val())){
        $checkNicknameMsg.text('특수문자는 사용이 불가능 합니다.');
    }
    else {
        console.log($(this).val());
        let nickname = $(this).val();
        $.ajax({
            url: '/users/checkNickname',
            type: 'post',
            data : {'userNickname' : nickname},
            success : function(result) {
                //서버와 통신성공시 실행할 내용 작성.
                console.log('통신 성공!');
                if (result === 0) {
                    $checkNicknameMsg.html('사용 가능한 닉네임 입니다.');
                } else {
                    $checkNicknameMsg.html('중복된 닉네임 입니다.');
                }
            }
        });
    }
});



// 비밀번호 조건
$("#join-pw-input").on("blur", function () {
    if($(this).val() == ''){
        $checkPwMsg.text("비밀번호를 입력해 주세요.");
    }else if (regex.test($(this).val())) {
        $checkPwMsg.text("사용가능한 비밀번호 입니다.");
    } else {
        $checkPwMsg.html("사용 불가능한 비밀번호입니다.<br>영어, 숫자, 특수문자를 포함한 8글자 이상으로 작성해주세요.");
    }
    if ($("#join-pw-input2").val() != "" && $("#join-pw-input").val() == $("#join-pw-input2").val()) {
        $checkPwMsg2.html("비밀번호가 일치합니다.");
    } else if ($("#join-pw-input2").val() != "" && $("#join-pw-input").val() != $("#join-pw-input2").val()) {
        $checkPwMsg2.text("비밀번호가 일치하지 않습니다.");
    }
});

// 비밀번호 동일확인
$("#join-pw-input2").on("blur", function () {
    console.log($("#join-pw-input").val());
    if ($("#join-pw-input").val() != $("#join-pw-input2").val()) {
        $checkPwMsg2.text("비밀번호가 일치하지 않습니다.");
    } else {
        $checkPwMsg2.html("비밀번호가 일치합니다.");
    }
});

// 이메일 조건
$("#userEmail").on("blur", function () {
    if($(this).val() == ''){
        $checkEmailMsg.text("이메일을 입력해 주세요.");
    }else if ($emailPattern.test($(this).val())) {
        $checkEmailMsg.text("사용가능한 이메일 입니다.");
    } else {
        $checkEmailMsg.html("올바른 형식의 이메일이 아닙니다.");
    }

});

// 이름 조건
$('#user-name').on('blur', function (){
    if(!namePattern.test($('#user-name').val())){
        $('#user-name-msg').text('잘못된 형식의 이름입니다.');
    }else {
        $('#user-name-msg').text('');
    }
});

// 주민번호 조건
$('#self-number').on('blur', function (){
    if(!numberPattern.test($('#self-number').val())){
        $('#user-rrnumber-msg').text('올바른 형식의 주민등록번호가 아닙니다.');
    }else{
        $('#user-rrnumber-msg').text('');
    }
});

$('#self-gender').on('blur', function (){
    if(!numberPattern.test($('#self-gender').val())){
        $('#user-rrnumber-msg').text('올바른 형식의 주민등록번호가 아닙니다.');
    }else if ($('#self-gender').val() >= 5){
        $('#user-rrnumber-msg').text('올바른 형식의 주민등록번호가 아닙니다.');
    }else{
        $('#user-rrnumber-msg').text('');
    }
});

// 전화번호, 인증번호 조건
$('#userPhoneNumber').on('blur', function (){
    if(!numberPattern.test($('#userPhoneNumber').val())){
        $('#user-phone-msg').text('올바른 형식의 번호가 아닙니다.')
    }else{
        $('#user-phone-msg').text('')
    }
});

$('#userVerification').on('blur', function (){
    if(!numberPattern.test($('#userVerification').val())){
        $('#user-phone-msg').text('올바른 형식의 번호가 아닙니다.')
    }else{
        $('#user-phone-msg').text('')
    }
});



// ========================================
// 약관 동의 js
//체크박스 전체선택
$("#agreement-check1").on("click", function () {
    if ($(this).is(":checked")) {
        $(".agreement-check").prop("checked", true);
    } else {
        $(".agreement-check").prop("checked", false);
    }
});

$(".agreement-input-btn").on("click", ".check", function () {
    console.log("check");
    $("#agreement-check1").prop("checked", false);
});

$(".agreement-check").on("change", function () {
    if ($("#agreement-check2").is(":checked") && $("#agreement-check3").is(":checked") && $("#agreement-check4").is(":checked")) {
        $("#agreement-check1").prop("checked", true);
    }
});

$(".check").on("change", function () {

    if ($("#check2").is(":checked") && $("#check3").is(":checked") && $("#check4").is(":checked")) {
        $("#check1").prop("checked", true);
    }
});

// ========================================
// 관심분야 태그 js

// 1,2,3차 카테고리 선택

const selectBoxElements = document.querySelectorAll(".job-select");

function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("job-active");
}

function selectOption(optionElement) {
    const selectBox = optionElement.closest(".job-select");
    const selectedElement = selectBox.querySelector(".job-selected-value");
    selectedElement.textContent = optionElement.textContent;
}

selectBoxElements.forEach((selectBoxElement) => {
    selectBoxElement.addEventListener("click", function (e) {
        const targetElement = e.target;
        const isOptionElement = targetElement.classList.contains("job-option");

        if (isOptionElement) {
            selectOption(targetElement);
        }

        toggleSelectBox(selectBoxElement);
        if (e.target.classList.contains("job-option")) {
            $(e.target).closest(".job-select").find(".job-arrow").removeClass("job-arrow-after");
        }

        e.preventDefault();
    });
});

document.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isSelect = targetElement.classList.contains("job-select") || targetElement.closest(".job-select");

    if (isSelect) {
        return;
    }

    const allSelectBoxElements = document.querySelectorAll(".job-select");

    allSelectBoxElements.forEach((boxElement) => {
        boxElement.classList.remove("job-active");
        $(boxElement).find(".job-arrow").removeClass("job-arrow-after");
    });
});

// 클릭시 arrow 180도 회전
$(".job-select").on("click", function (e) {
    // $('.arrow').css({"transform":"rotate(180deg)","transition":"all ease 0.5s"})

    // $(this).find('.arrow').css({"transform":"rotate(180deg)","transform-origin":"center","transition":"all ease 0.5s"})

    // if (e.target.tagName != "LI") {
    //     $(this).find(".job-arrow").addClass("job-arrow-after");
    // }
});

$(".job-third-job-box").on("click", ".job-option2", function () {
    let text = $(this).text();

    // let existingTags = $(".job-select-tag .job-tag");
    // if (existingTags.length >= 3) {
    //     return; // 최대 3개의 태그만 생성 가능
    // }

    let tagHtml = `<div class="job-tag">@${text}</div>`;

    $(".job-select-tag").append(tagHtml);
});

$(".job-select-tag").on("click", ".job-tag", function () {
    $(this).detach();
});

// 나의 관심분야 3가지 카테고리 박스
let $boxes = $('.job-select');

//클릭하면 리스트 div 보기,닫기
$boxes.on('click', function(){
    if($(this).closest('.job-select').find('.job-option-box').hasClass('none')){
        $('.job-option-box').addClass('none');
        $(this).closest('.job-select').find('.job-option-box').toggleClass('none');
    }else{
        $('.job-option-box').addClass('none');
    }
});

//고른 항목 텍스트 상위로 복사
$('.job-select').on('click', '.option', function(){
    $(this).closest('.job-select').find('.job-selected-value').text($(this).text());
});

//다른 곳 클릭 시 리스트 div 닫기
$("body").on('click', function(e){
    if(!$(e.target).closest('.job-select').hasClass('job-select')){
        $boxes.each((i, box) => {$(box).find('.job-option-box').addClass('none');});
    }
});

//3차 카테고리 선택 시 태그 추가(최대 3개)
$(".job-third-job-box").on("click", ".job-option", function () {
    let text = $(this).text();
    let val = $(this).val();

    let existingTags = $(".job-select-tag .job-tag");
    if (existingTags.length >= 3) { return; }

    for(let i=0; i<existingTags.length; i++){
        if(existingTags.eq(i).text() == '@' + text){
            return;
        }
    }

    let tagHtml = `<div class="job-tag" name="subNumber" value="${val}">@${text}
                                <input type="hidden" name="subNumber" value="${val}"/>
                            </div>
                            `;

    $(".job-select-tag").append(tagHtml);
});

// 태그 눌렀을 때 삭제
$(".job-select-tag").on("click", ".job-tag", function () {
    $(this).detach();
});

// 1, 2, 3차 카테고리 별 항목 띄우기

// 1차 카테고리
let $category = $(".job-first-option-box");
// 2차 카테고리
let $jobBox = $(".job-second-job-box");
// 3차 카테고리
let $depBox = $(".job-third-job-box");

$(".job-option").on("click", function () {
    let text = "";
    $jobBox.html(text);
    // 직무일때
    let ss = $(this).val();
    if ($(this).val() == "1") {
        // 백엔드 작업시 비동기 통신 사용해서 꽂기
        $.ajax({
          url: "/users/categoryJ",
          type: "get",
          data: { mainCode: ss },
          dataType : 'json',
          success: function (result) {
            makeMiddleCate(result);
          },
        });

        // let obj = [
        //     { number: 1, name: "서비스업" },
        //     { number: 2, name: "의료/제약" },
        //     { number: 3, name: "제조/화학" },
        //     { number: 4, name: "판매/유통" },
        //     { number: 5, name: "IT/웹/통신" },
        // ];
        // text = makeMiddleCate(obj);
    }

    // 학과일때
    if ($(this).val() == "2") {
        // 백엔드 작업시 비동기 통신 사용해서 꽂기
        $.ajax({
          url: "/users/categoryH",
          type: "get",
            data: { mainCode: ss },
            dataType : 'json',
          success: function (result) {
            makeMiddleCate(result);
          },
        });
        //
        // let obj = [
        //     { number: 11, name: "사회" },
        //     { number: 12, name: "자연과학" },
        //     { number: 13, name: "의약" },
        //     { number: 14, name: "교육" },
        // ];
        // text = makeMiddleCate(obj);
    }

    $jobBox.html(text);
});

$(".job-second-job-box").on("click", ".job-option", function () {
    let text = "";

    $depBox.html(text)
    let ss = $(this).val();
    $.ajax({
        url : '/users/subCategory',
        type : 'get',
        data : { mainCode : ss },
        dataType : 'json',
        success : function (result) {
            let text2 = '';
            result.forEach(r => {
                text2 +=`
                    <li class="job-option" value="${r.subNumber}">${r.subName}</li>
                    `;
            });
            $('.job-third-job-box').html(text2);
        }
    });
    $depBox.html(text);

    // if ($(this).val() == "1") {
    //     let obj = [{ number: 1, name: "서비스업1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "2") {
    //     let obj = [{ number: 2, name: "의료/제약1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "3") {
    //     let obj = [{ number: 3, name: "제조/화학1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "4") {
    //     let obj = [{ number: 4, name: "판매/유통1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "5") {
    //     let obj = [{ number: 5, name: "IT/웹/통신1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "11") {
    //     let obj = [{ number: 11, name: "사회1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "12") {
    //     let obj = [{ number: 12, name: "자연과학1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "13") {
    //     let obj = [{ number: 13, name: "의약1" }];
    //     text = makeSmallCate(obj);
    // } else if ($(this).val() == "14") {
    //     let obj = [{ number: 14, name: "교육1" }];
    //     text = makeSmallCate(obj);
    // }
    //
    // $depBox.html(text);
});

// 2, 3차 카테고리 선택 시 항목 띄어주는 함수

function makeMiddleCate(result) {
    let text2 = '';

    result.forEach((r) => {
        text2 += `<li class="job-option" value="${r.mainCode}">${r.mainName}</li>`;
    });

    $('.job-second-job-box').html(text2);

    return text2;
}

// function makeSmallCate(obj) {
//     let list = obj;
//     let text = "";
//
//     list.forEach((cate) => {
//         text += `<li class="job-option job-option2" value="${cate.number}">${cate.name}</li>`;
//     });
//
//     return text;
// }

// ========================================
// 직장인 인증 js
$("#mentor-goal-file").on("change", function () {
    let files = [...this.files];

    if (files.length == 1) {
        $(this).closest(".mentor-goal-box").find(".mentor-goal-file-name1").text(files[0].name);
        $(this).closest(".mentor-goal-box").find(".mentor-goal-name1").removeClass("mentor-goal-none");
        $(this).closest(".mentor-goal-box").find(".mentor-goal-file-name2").text("");
        $(this).closest(".mentor-goal-box").find(".mentor-goal-name2").addClass("mentor-goal-none");
    } else if (files.length == 2) {
        $(this).closest(".mentor-goal-box").find(".mentor-goal-file-name1").text(files[0].name);
        $(this).closest(".mentor-goal-box").find(".mentor-goal-name1").removeClass("mentor-goal-none");
        $(this).closest(".mentor-goal-box").find(".mentor-goal-file-name2").text(files[1].name);
        $(this).closest(".mentor-goal-box").find(".mentor-goal-name2").removeClass("mentor-goal-none");
    } else {
        alert("파일은 최대 2개까지 업로드 가능합니다.");
    }
});

$(".bi-trash3").on("click", function () {
    let targetName = $(this).closest(".mentor-goal-name-box").find(".mentor-goal-file-name1").text();
    $(this).closest(".mentor-goal-name-box").find(".mentor-goal-file-name1").text("");
    $(this).closest(".mentor-goal-name-box").find(".mentor-goal-name1").addClass("mentor-goal-none");
    $(this).closest(".mentor-goal-name-box").find(".mentor-goal-file-name2").text("");
    $(this).closest(".mentor-goal-name-box").find(".mentor-goal-name2").addClass("mentor-goal-none");

    let $input = $("#mentor-goal-file");
    let oldFiles = $input[0].files;
    console.log($input[0].files);

    let dt = new DataTransfer();

    for (let i = 0; i < 2; i++) {
        if ($input[0].files[i].name != targetName) {
            dt.items.add(oldFiles[i]);
        }
    }
    let newFiles = dt.files;

    $input[0].files = newFiles;

    console.log($input[0].files);
});

// ========================================
// 대학생 인증 js
$("#mentor-goal-2-file").on("change", function () {
    let files = [...this.files];

    if (files.length == 1) {
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-file-name1").text(files[0].name);
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-name1").removeClass("mentor-goal-2-none");
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-file-name2").text("");
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-name2").addClass("mentor-goal-2-none");
    } else if (files.length == 2) {
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-file-name1").text(files[0].name);
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-name1").removeClass("mentor-goal-2-none");
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-file-name2").text(files[1].name);
        $(this).closest(".mentor-goal-2-box").find(".mentor-goal-2-name2").removeClass("mentor-goal-2-none");
    } else {
        alert("파일은 최대 2개까지 업로드 가능합니다.");
    }
});

$(".bi-trash2").on("click", function () {
    let targetName = $(this).closest(".mentor-goal-2-name-box").find(".mentor-goal-2-file-name1").text();
    $(this).closest(".mentor-goal-2-name-box").find(".mentor-goal-2-file-name1").text("");
    $(this).closest(".mentor-goal-2-name-box").find(".mentor-goal-2-name1").addClass("mentor-goal-2-none");
    $(this).closest(".mentor-goal-2-name-box").find(".mentor-goal-2-file-name2").text("");
    $(this).closest(".mentor-goal-2-name-box").find(".mentor-goal-2-name2").addClass("mentor-goal-2-none");

    let $input = $("#mentor-goal-2-file");
    let oldFiles = $input[0].files;
    console.log($input[0].files);

    let dt = new DataTransfer();

    for (let i = 0; i < 2; i++) {
        if ($input[0].files[i].name != targetName) {
            dt.items.add(oldFiles[i]);
        }
    }
    let newFiles = dt.files;

    $input[0].files = newFiles;

    console.log($input[0].files);

});

// ========================================
// 인증 태그 js

// 셀렉트 박스 클릭 이벤트
$('.certi-select').on('click', function (){
    let $optionBox = $(this).find('.certi-option__box');
    if($optionBox.css('display') == 'none'){
        $optionBox.show();
    }else{
        $optionBox.hide();
    }
});

// 옵션 클릭 이벤트
$('.certi-option__box').on('click', '.certi-option', function (){
    let $selectedValue = $(this).closest('.certi-select').find('.certi-selected-value');
    $selectedValue.text($(this).text());

    let $ul = $(this).closest('ul');

    if($ul.hasClass('certi-first-option-box')){
        if($(this).val() == 1){
            getCertificationJ();
        }else {
            getCertificationH();
        }
    }else if($ul.hasClass('certi-second-job-box')){
        getCertificationSub($(this).val());
    }else if($ul.hasClass('certi-third-job-box')){

        if($('.certi-tag').length > 0){
            return;
        }

        let subName = $(this).text();
        let value = $(this).val();
        console.log(value);
        $('.certi-select-tag').append(`
                                <div class="certi-tag">@${subName}
                                 <input type="hidden" class="certi-input" id="certi-input" name="certificationNumber" value="${value}"/>
                             </div>`);
    }


});

$(".certi-select-tag").on("click", ".certi-tag", function () {
    $(this).detach();
});

function makeCertiOptionList(result){
    let htmlTags = '';

    result.forEach(obj => {
        htmlTags += `<li class="certi-option" value="${obj.mainCode}">${obj.mainName ? obj.mainName : obj.subName}</li>`;
    });

    return htmlTags
}

function makeCertiSubOptionList(result){
    let htmlTags = '';

    result.forEach(obj => {
        htmlTags += `<li class="certi-option" value="${obj.subNumber}">${obj.mainName ? obj.mainName : obj.subName}</li>`;
    });

    return htmlTags
}

function getCertificationSub(mainCode){
    $.ajax({
        url: '/users/certificationSub',
        type: 'get',
        data: {mainCode: mainCode},
        dataType: 'json',
        success: function (result) {
            console.log(result)
            $('.certi-third-job-box').html(makeCertiSubOptionList(result));
        }
    });
}

function getCertificationH(){
    $.ajax({
        url: "/users/certificationH",
        type: "get",
        dataType : 'json',
        success: function (result) {
            console.log(result);
            $('.certi-second-job-box').html(makeCertiOptionList(result));
        },
    });
}

function getCertificationJ(){
    $.ajax({
        url: "/users/certificationJ",
        type: "get",
        dataType : 'json',
        success: function (result) {
            console.log(result);
           $('.certi-second-job-box').html(makeCertiOptionList(result));
        },
    });
}





// ========================================
// SMS 인증

let timeout = null;

$('#sms-check').on('click', function (){
    let phoneNumber = $('#userPhoneNumber').val();

    console.log(phoneNumber);

    $.ajax({
        url: "/userSms/v1/send",
        type: "post",
        data: JSON.stringify({phoneNumber : phoneNumber}),
        contentType: "application/json; charset=utf-8",
        success: function (result){
            console.log(result)

            let time = 180;
            let min = '';
            let sec = '';

            timeout = setInterval(function (){
                min = parseInt(time / 60);
                sec = time % 60;
                $('.self-timer').text(`${min}분 ${sec}초`);

                time--;

                if(time < 0){
                    clearInterval(timeout);
                    $('.self-timer').text('시간초과');
                }
            }, 1000);

        }
    })
});

$('#self-check-number').on('click', function (){
    let inputNumber= $('#userVerification').val();

    $.ajax({
        url : '/userSms/v1/check',
        type : 'post',
        data : {authNumber : inputNumber},
        success : function (result){
            if(result){
                $('#user-phone-msg').text("인증이 완료되었습니다.");
                clearInterval(timeout);
                $('.self-timer').text('');
            }else{
                $('#user-phone-msg').text("인증번호가 올바르지 않습니다.");
            }
        }
    });
})

/*================================================================*/
/* 아이디 찾기 */

$('#find-id-certi-btn').on('click', function (){

    let userName = $('#find-id-user-name').val();
    let phoneNumber = $('#find-id-phone-number').val();

    $.ajax({
        url: "/userSms/v1/send",
        type: "post",
        data: JSON.stringify({phoneNumber : phoneNumber}),
        contentType: "application/json; charset=utf-8",
        success: function (result){
            console.log(result)

            let time = 180;
            let min = '';
            let sec = '';

            timeout = setInterval(function (){
                min = parseInt(time / 60);
                sec = time % 60;
                $('.find-id-timer').text(`${min}분 ${sec}초`);

                time--;

                if(time < 0){
                    clearInterval(timeout);
                    $('.find-id-timer').text('시간초과');
                }
            }, 1000);

        }
    })

});

$('#find-id-check').on('click', function (){
    let inputNumber= $('#find-certi-number').val();
    let userName = $('#find-id-user-name').val();
    let phoneNumber = $('#find-id-phone-number').val();

    $.ajax({
        url : '/userSms/v1/findId',
        type : 'post',
        data : {authNumber : inputNumber, userName : userName, phoneNumber : phoneNumber},
        success : function (result){
            if(result){
                $('#find-msg').text("인증이 완료되었습니다.");
                clearInterval(timeout);
                $('.find-id-timer').text('');
            }else{
                $('#find-msg').text("인증번호가 올바르지 않습니다.");
            }

                $('#result-id').text(result);
        }
    });
});


/*================================================================*/
/* 아이디 찾기 */

$('#pind-pw-certi').on('click', function (){

    let userId = $('#find-pw-id').val();
    let phoneNumber = $('#find-pw-phone-number').val();

    $.ajax({
        url: "/userSms/v1/send",
        type: "post",
        data: JSON.stringify({phoneNumber : phoneNumber}),
        contentType: "application/json; charset=utf-8",
        success: function (result){
            console.log(result)

            let time = 180;
            let min = '';
            let sec = '';

            timeout = setInterval(function (){
                min = parseInt(time / 60);
                sec = time % 60;
                $('#find-pw-timer').text(`${min}분 ${sec}초`);

                time--;

                if(time < 0){
                    clearInterval(timeout);
                    $('#find-pw-timer').text('시간초과');
                }
            }, 1000);

        }
    })

});

$('#find-pw-check').on('click', function (){
    let inputNumber= $('#find-certi-number').val();
    let userId = $('#find-pw-id').val();
    let phoneNumber = $('#find-pw-phone-number').val();

    $.ajax({
        url : '/userSms/v1/findPw',
        type : 'post',
        data : {authNumber : inputNumber, userId : userId, phoneNumber : phoneNumber},
        success : function (result){
            if(result){
                $('#find-pw-msg').text("인증이 완료되었습니다.");
                clearInterval(timeout);
                $('#find-pw-timer').text('');
            }else {
                $('#find-pw-msg').text("인증번호가 올바르지 않습니다.");
            }

            $('#result-pw').text(result);
        }
    });
});








