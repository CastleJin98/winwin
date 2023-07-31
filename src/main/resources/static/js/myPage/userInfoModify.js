// 프로필 사진 미리보기
$('.profile-file').on('change', function(){
    let files = this.files;

    let src = URL.createObjectURL(files[0]);

    $('.img-box').css('background-image', `url(${src})`).css('background-size', 'cover').data('name', `${files[0].name}`);
})

// 나의 관심분야 3가지 카테고리 박스
let $boxes = $('.select');

//클릭하면 리스트 div 보기,닫기
$boxes.on('click', function(){
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
        $boxes.each((i, box) => {$(box).find('.option-box').addClass('none');});
    }
});

//3차 카테고리 선택 시 태그 추가(최대 3개)
$(".third-job-box").on("click", ".option", function () {
    let text = $(this).text();
    let val = $(this).val();

    let existingTags = $(".select-tag .tag");
    if (existingTags.length >= 3) { return; }

    for(let i=0; i<existingTags.length; i++){
        if(existingTags.eq(i).find('input').val() == val){
            return;
        }
    }

    let tagHtml = `
        <div class="tag">@${text}
            <input type="hidden" value="${val}" name="subNumber">
        </div>
    `;

    $(".select-tag").append(tagHtml);
});

$(".select-tag").on("click", ".tag", function () {
    $(this).detach();
});


// 1, 2, 3차 카테고리 별 항목 띄우기

// 1차 카테고리
let $category = $(".first-option-box");
// 2차 카테고리
let $jobBox2 = $(".second-job-box");
// 3차 카테고리
let $depBox2 = $(".third-job-box");

$(".option").on("click", function () {
    let text = "";
    $jobBox2.html(text);
    let ss = $(this).val();
    // 직무일때
    if ($(this).val() == "1") {
        $.ajax({
            url: "/category/categoryJ",
            type: "get",
            data: {mainCode: ss},
            dataType: 'json',
            success: function (result) {
                makeMiddleCate(result);
            },
        });
    }

    // 학과일때
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

//내 글, 내 댓글 클릭 시 활동내역으로 이동
$('.write').on('click', '.number', function(){
    window.location.href="/myPage/activityDetail";
});

$('.comment').on('click', '.number', function(){
    window.location.href="/myPage/activityComment";
});

//등급 클릭 시 등급정보 모달창 띄워주기
$('.mentor-grade').on('click', function(){
    $('.grade-modal-wrap').removeClass('none');
    $('.grade-box').css({
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    });

    let wing = $('.mentor-grade').data('num');
    let level = Math.floor(wing / 1000 + 1);
    let percent = (wing % 1000) / 10;

    if(level == 1){
        $('.now-level').text('Lv.' + level + ' 깃털');
    }else if(level == 2){
        $('.now-level').text('Lv.' + level + ' 날개');
    }else if(level == 3){
        $('.now-level').text('Lv.' + level + ' 천사날개');
    }else if(level == 4){
        $('.now-level').text('Lv.' + level + ' 수호천사');
    }else if(level >= 5){
        $('.now-level').text('Lv.' + level + ' 대천사');
    }
    $('.next-level').text('다음 등급까지 ' + percent + '% 남음');
    $('.experience-bar').val(percent);
});

$('.confirm-btn').on('click', function(){
    $('.grade-modal-wrap').addClass('none');
});

$('.grade-modal-wrap').on('click', function (e) {
    if ($(e.target).hasClass("grade-modal-wrap")) {
        $('.grade-modal-wrap').addClass("none");
    }
});
