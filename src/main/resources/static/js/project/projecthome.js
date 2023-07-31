// 모집글 작성하기 모달창 영역
let searchButton = document.querySelector(".search-button");
let projectmodal = document.querySelector(".projectmodal-wrap");

$('.search-button').on('click', function (){
    let user = $('.userNumber').val();

    if(user == ''){
        alert('로그인 해주세요.');
        $('.login-move').trigger('click');
    }

    if(user != ''){
        projectmodal.style.display = "flex";
        document.body.style.overflow = "hidden"; //모달창 스크롤 막기
    }

});

// searchButton.addEventListener("click", function () {
//     projectmodal.style.display = "flex";
//     document.body.style.overflow = "hidden"; //모달창 스크롤 막기
// });

projectmodal.addEventListener("click", function (e) {
    if($(e.target).hasClass("projectmodal-wrap")){
        projectmodal.style.display = "none";
        document.body.style.overflow = "unset"; //모달창 스크롤 복구
    }

});

let currentIdx = 1;

// 탑텐 슬라이드 배너 영역
$(function(){
    let topten_length = $(".topten-cardbox").length;
    let topten_width = topten_length * 525;
    $(".topten-body").css("width",`${topten_width}px`);



    $(".topten-right-arrow").on(
        "click",
        function(){

            if (currentIdx < (topten_length/2) ){
                $('.topten-left-arrow').attr("fill", "#000");
                $('.topten-left-arrow').css("cursor", "pointer");

                let tmp = currentIdx*1050;
                $(".topten-body").css("transform",`translate(-${tmp}px)`);
                currentIdx += 1;
            }
            if(currentIdx >= (topten_length/2)){
                $('.topten-right-arrow').attr("fill", "#cbd5e1");
                $('.topten-right-arrow').css("cursor", "auto");
            }
        }
    );
    $(".topten-left-arrow").on(
        "click",
        function(){
            if (currentIdx > 1 ) {
                $('.topten-right-arrow').attr("fill", "#000");
                $('.topten-right-arrow').css("cursor", "pointer");
                currentIdx -= 1;
                let tmp = -((currentIdx-1) * 1050);
                $(".topten-body").css("transform", `translate(${tmp}px)`);

            }

            if(currentIdx <= 1){
                $('.topten-left-arrow').attr("fill", "#cbd5e1");
                $('.topten-left-arrow').css("cursor", "auto");
            }
        }
    );
});

// 스터디 슬라이드 배너 영역
$(function(){
    let study_length = $(".study-cardbox").length;
    let study_width = study_length * 525;
    $(".study-body").css("width",`${study_width}px`);

    let currentIdx = 1;
    $(".study-right-arrow").on(
        "click",
        function(){

            if (currentIdx < (study_length/2) ){
                $('.study-left-arrow').attr("fill", "#000");
                $('.study-left-arrow').css("cursor", "pointer");
                let tmp = currentIdx*1050;
                $(".study-body").css("transform",`translate(-${tmp}px)`);
                currentIdx += 1;
            }

            if(currentIdx >= (study_length/2)){
                $('.study-right-arrow').attr("fill", "#cbd5e1");
                $('.study-right-arrow').css("cursor", "auto");
            }
        }
    );
    $(".study-left-arrow").on(
        "click",
        function(){
            if (currentIdx > 1 ) {
                $('.study-right-arrow').attr("fill", "#000");
                $('.study-right-arrow').css("cursor", "pointer");
                currentIdx -= 1;
                let tmp = -((currentIdx-1) * 1050);
                $(".study-body").css("transform", `translate(${tmp}px)`);

            }

            if(currentIdx <= 1){
                $('.study-left-arrow').attr("fill", "#cbd5e1");
                $('.study-left-arrow').css("cursor", "auto");
            }
        }
    );
});

// 네비 영역 마우스오버 시 텍스트 강조
$('.nav-span1').on('mouseover', function(){
    $('.nav-span1').css("color","rgb(37, 99, 235)")
    $('.nav-span1').css("font-weight","600")
});

$('.nav-span1').on('mouseout', function(){
    $('.nav-span1').css("color","rgb(100, 116, 139)")
    $('.nav-span1').css("font-weight","500")
});

$('.nav-span2').on('mouseover', function(){
    $('.nav-span2').css("color","rgb(37, 99, 235)")
    $('.nav-span2').css("font-weight","600")
});

$('.nav-span2').on('mouseout', function(){
    $('.nav-span2').css("color","rgb(100, 116, 139)")
    $('.nav-span2').css("font-weight","500")
});

$('.nav-span3').on('mouseover', function(){
    $('.nav-span3').css("color","rgb(37, 99, 235)")
    $('.nav-span3').css("font-weight","600")
});

$('.nav-span3').on('mouseout', function(){
    $('.nav-span3').css("color","rgb(100, 116, 139)")
    $('.nav-span3').css("font-weight","500")
});

//프로젝트 박스 누르면 진입 하기
$('.topten-cardbox').on('click', function (){
    let titleNumber = $(this).closest('.topten-area').find('.projectTitle').val();
   window.location.href = '/project/read?studyNumber=' + titleNumber;
});


//모임 박스 누르면 진입 하기
$('.study-cardbox').on('click', function (){
    let titleNumber2 = $(this).closest('.study-area').find('.studyTitle').val();
    window.location.href = '/project/read?studyNumber=' + titleNumber2;
});




