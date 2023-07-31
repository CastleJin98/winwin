import * as comment from '../module/careerInfoCommentModule.js';

// 진로정보 댓글 리스트
const boardNumber = $('.careerInfo-num').val();
let page = 1;

console.log(boardNumber)
console.log($('.careerInfo-num'))

comment.getList({careerInfoNumber : boardNumber, page : page} ,appendComment, showError);

// 무한 스크롤 페이징
$(window).on('scroll', function (){
    console.log($(window).scrollTop());
    console.log(`document : ${$(window).height()}`);
    console.log(`document : ${$(window).scrollTop()}`);

    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()){
        console.log(++page);
        console.log("==========================================")
        comment.getList({careerInfoNumber : boardNumber, page : page} ,appendComment, showError);
    }
});

function appendComment(map) {
    let text = '';


    map.careerInfoCommentList.forEach(c => {
        text += `
             <div class="reply-cardbox" data-index="0" style="" data-num="${c.commentNumber}">
                <div class="reply-content1">
                    <div class="profile-wrap">
                        <div class="profile-icon-wrap">
                        ${c.pfpSystemName == null ?
                            '<img class="profile-icon-img" src="/img/profile-basic.png"/>' :
                            '<img class="profile-icon-img" src=/profile/' + c.pfpUuid + '_' + c.pfpSystemName +'>'}
                        </div>
                        <div class="profile-text-wrap">
                            <div><span class="profile-text-id">${c.userNickname}</span></div>
                            <div><span class="profile-text-date">${comment.timeForToday(c.commentDate)}</span></div>
                        </div>
                        <div class="reply-time">
                            <span class="time-text"></span>
                        </div>
                    </div>
                </div>
                <br>
                <div class="reply-content2">
                    <div class="reply-content">
                <span class="reply-text">${c.commentContent}</span>
                    </div>
                </div>
                <div class="reply-content3">
                `;
        if (c.userNumber == loginNumber) {
            text += `
                    <div class="btn-wrap">
                        <div class="btn-sub-wrap">
                            <div class="modify-btn">수정</div>
                            <div class="remove-btn">삭제</div>
                        </div>
                    </div>`
        }

        text += `
                </div>
            </div>`;
    });

    $('.reply').append(text);
}

function showComment(result) {
    let text = '';

    result.careerInfoCommentList.forEach(c => {
        text += `
             <div class="reply-cardbox" data-index="0" style="" data-num="${c.commentNumber}">
                <div class="reply-content1">
                    <div class="profile-wrap">
                        <div class="profile-icon-wrap">
                        ${c.pfpSystemName == null ?
                         '<img class="profile-icon-img" src="/img/profile-basic.png"/>' :
                         '<img class="profile-icon-img" src=/profile/' + c.pfpUuid + '_' + c.pfpSystemName +'>'}
                        </div>
                        <div class="profile-text-wrap">
                            <div><span class="profile-text-id">${c.userNickname}</span></div>
                            <div><span class="profile-text-date">${comment.timeForToday(c.commentDate)}</span></div>
                        </div>
                        <div class="reply-time">
                            <span class="time-text"></span>
                        </div>
                    </div>
                </div>
                <br>
                <div class="reply-content2">
                    <div class="reply-content">
                <span class="reply-text">${c.commentContent}</span>
                    </div>
                </div>
                <div class="reply-content3">
                `;
        if (c.userNumber == loginNumber) {
            text += `
                    <div class="btn-wrap">
                        <div class="btn-sub-wrap">
                            <div class="modify-btn">수정</div>
                            <div class="remove-btn">삭제</div>
                        </div>
                    </div>`
        }

        text += `
                </div>
            </div>`;
    });

    $('.reply').html(text);
}

function showError(a, b, c) {
    // console.error(c);
}

// 진로정보 댓글 작성하기
$('.submit-btn').on('click', function () {

    if (loginNumber == null){
        alert("로그인 후 이용바랍니다.");
        $('.login-move').trigger('click');
        return;
    }

    let content = $('#content').val().trim();
    let boardNumber = $('.careerInfo-num').val();

    if (content != null && content != ''){
    comment.register({commentContent: content, careerInfoNumber: boardNumber}, function (){
        comment.getList(obj, showComment, showError)}, showError);
    }

    $('#content').val('');

    page = 1;
    let obj = {
        careerInfoNumber : boardNumber,
        page : page
    }

    // comment.getList(obj, showComment, showError);
});

// 진로정보 댓글 삭제하기
$('.reply').on('click', '.remove-btn', function () {

    let commnetNumber = $(this).closest('.reply-cardbox').data('num');

    page = 1;
    let obj = {
        careerInfoNumber : boardNumber,
        page : page
    }

    comment.remove(commnetNumber, function (){
        comment.getList(obj, showComment, showError)
    }, showError)



});

// 진로정보 댓글 수정하기
$('.reply').on('click', '.modify-btn', function () {

    let content = $(this).closest('.reply-cardbox').find('.reply-text');
    let num = $(this).closest('.reply').find('.reply-cardbox').data('num');
    let content1 = $(this).closest('.reply-cardbox').find('.reply-text').text();

    console.log(num);
    console.log(content);

    content.replaceWith(`
    <div class='modify-box'>
    <textarea class='modify-content'>${content1}</textarea>
    <button type='button' class='modify-content-btn'>수정 완료</button>
    </div>
    `);

    $('.btn-sub-wrap').addClass('none');
});

// 진로정보 댓글 수정 완료처리
$('.reply').on('click', '.modify-content-btn', function (){
    console.log('modify!!!!')
    let commentNumber = $(this).closest('.reply-cardbox').data('num');
    let commentContent = $(this).closest('.reply').find('.modify-content').val();
    // let comment = $(this).closest('.reply');
    console.log("=================================")
    console.log(commentNumber);
    console.log(commentContent);
    console.log("=================================")

    let commnetObj = {
        commentNumber : commentNumber,
        commentContent : commentContent
    }
    page = 1;
    let obj = {
        careerInfoNumber : boardNumber,
        page : page
    }

    comment.modify(commnetObj, function (){
        comment.getList(obj, showComment, showError)
    } , showError)
});

//====================================================================

let likeStatus = $('.btn-img').data('num');

// 좋아요 버튼 클릭시 하트 색상 변경
$(".like-btn").on("click", function () {
    careerInfoLike(boardNumber);

});

function careerInfoLike(careerInfoNumber){
    $.ajax({
       type : 'post',
        url :'/careerInfoLike/likeBtn',
        data : {
            careerInfoNumber : careerInfoNumber
        },
        success : function (result){
            let likeNumber = parseInt($('.like-number').text());
            $('.like-number').text(likeNumber + parseInt(result));
            $(".like-btn").find(".bi-heart").toggleClass("none");
            $(".like-btn").find(".bi-heart-fill").toggleClass("none");
        }
    });
}


// 수정 페이지 이동
$('.dropdown-content').on('click', '.detail-modify-btn', function (){
    let careerInfoNumber = $('.careerinfo-num').val();
    alert("정말 수정하시겠습니까?");
    location.href = "/career/modify?careerInfoNumber=" + careerInfoNumber;
})

// 진로정보 글 삭제하기
$('.dropdown-content').on('click', '.detail-remove-btn', function (){
    let careerInfoNumber = $('.careerinfo-num').val();
    alert("정말 삭제하시겠습니까?");
    location.href = "/career/remove?careerInfoNumber=" + careerInfoNumber;
})

// 진로정보 신고하기 페이지 이동
let reportModal = document.querySelector(".reportModal");
let reportBtn = document.querySelector(".detail-police-btn");

reportBtn.addEventListener("click", function (){
    reportModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

reportModal.addEventListener("click", function (e){
    if ($(e.target).hasClass("reportModal")){
        reportModal.style.display = "none";
        document.body.style.overflow = "unset";
    }
});

// 진로정보 신고하기 버튼 클릭 시 컨펌 및 신고처리
let $reportButton = $('.report-btn');
$reportButton.on("click", function () {
    if (loginNumber) {
        console.log($('.report-list input:checked').val());
        let result = confirm("정말 신고하시겠습니까?");
        if (result) {
            reportAjax();
        }
    } else {
        alert("로그인 후 이용해주세요.");
    }
});

// 진로정보 글 신고하기 처리
function reportAjax(){
    let careerInfoNumber = $('.careerinfo-num').val();
    let policeCategory = $('.report-list input:checked').val();

    $.ajax({
       url : '/police/careerInfo',
       type : 'post',
       data : JSON.stringify({boardNumber : careerInfoNumber, policeCategory : policeCategory}),
       contentType : 'applicatrion/json; charset=utf-8',
       success : function (){
           alert("정상적으로 신고처리 되었습니다.");
           location.href = "/career/list";
       }
    });
}
