// // 사용자가 입력한 내용을 서버에 전송하고 응답을 받아와서 내용을 업데이트하는 함수
// function updateContent() {
//     // 사용자가 입력한 값들을 받아온다고 가정
//     var userNameInput = "";
//     var questionTitleInput = "";
//
//     // AJAX 요청 설정
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/updateQuestionContent', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     // 요청 데이터 설정
//     var requestData = {
//         userName: userNameInput,
//         questionTitle: questionTitleInput
//     };
//
//     // 요청 전송
//     xhr.send(JSON.stringify(requestData));
//
//     // 요청에 대한 응답 처리
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             var response = JSON.parse(xhr.responseText);
//             var questionContent = response.questionContent;
//
//             // 응답 받은 내용으로 내용을 업데이트
//             document.getElementById("questionContent").innerText = questionContent;
//         }
//     };
// }
// 페이지 로드 시 내용 업데이트 함수 호출
// window.onload = updateContent;

function fn_modify(csNumber) {
    if (confirm("정말 수정하시겠습니까?")) {
        location.href = "/cs/modify?csNumber=" + csNumber;
    }
}

function fn_remove(csNumber) {
    if (confirm("정말 삭제하시겠습니까?")) {
        location.href = "/cs/remove?csNumber=" + csNumber;
    }
}

function fn_modify2(replyNumber) {
    if (confirm("정말 수정하시겠습니까?")) {
        location.href = "/cs/modify?csNumber=" + csNumber;
    }
}

function fn_remove2(replyNumber) {
    if (confirm("정말 삭제하시겠습니까?")) {
        location.href = "/cs/remove?csNumber=" + csNumber;
    }
}


// 리플 작성 완료 처리

// const csNumber = $('.cs-num').val();

$('.commentBtn').on('click', function () {
    let content = $('.comment1').val().trim();

    if (content == '') {
        return;
    }

    let commentObj = {
        commentContent: content,
        csNumber: csNumber
    }

    register(commentObj, function () {
        getList(csNumber, showComment, showError);
        // getView(commentNumber, findComment, findError);
    }, showError);

    $('.comment1').val('');
});

// 댓글 등록하기
function register(commentObj, callback, error) {
    $.ajax({
        url: "/replies/reply",
        type: "post",
        data: JSON.stringify(commentObj),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            if (callback) {
                callback();
            }
        },
        error: error
    });
    document.location.reload();
}

// 댓글 리스트 뽑아오기
function getList(csNumber, callback, error) {

    $.ajax({
        url: `/replies/list${csNumber}`,
        type: 'get',
        dataType: 'json',
        success: function (result) {

            if (callback) {
                callback(result);
            }
        },
        error: error
    });
}

// 리플 댓글 작성
function getView(csNumber, callback, error) {
    $.ajax({
        url: `/replies/list/${csNumber}`,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (callback) {
                callback(result);
            }
        },
        error: error
    });
}


function showComment(replies) {
    // console.log(replies);
    // console.log("댓글완성")
    // console.log("1111111111111111111111111111111")
    let text = ``;

// ↓ inner html 코드를 text변수 빈 문자열에 html코드를 넣어준다.
    replies.forEach(r => {
        text += `<div class="commentAi" data-num="${r.commentNumber}">
            <input type="hidden" class="comment-num" value="${r.commentNumber}">
        <div class="profil">
            <img src="../img/corgi-g5894d3ae3_1920.jpg" height="50px" width="50px">
            <div class="Commento"><p>`;
        if (r.userStatus == 'a') {
            text += `<p>관리자</p>`;
        }
        text += `</p></div>
                <div class="Commento"> 
                    <p>코멘토AI봇</p>
                </div>
                <div class="dropdown2">
                    <button class="dropbtn2">
                        <span class="dropbtn_icon2"> <svg data-v-bd9f2bcc="" data-v-3035bc76="" width="24" height="24" fill="black" xmlns="http://www.w3.org/2000/svg" class="c-Applicatio c-icon" style="fill: rgb(148, 155, 160);"><circle data-v-bd9f2bcc="" cx="12" cy="5.5" r="1.5"></circle><circle data-v-bd9f2bcc="" cx="12" cy="12" r="1.5"></circle><circle data-v-bd9f2bcc="" cx="12" cy="18.5" r="1.5"></circle></svg></span>
                    </button> `;

        if (r.userNumber == loginNumber) {
            text += `
                    <div class="dropdown-content2">
                        <a href="#" class="btn-modify">수정</a>
                        <a href="#" class="btn-remove">삭제</a>
                    </div> `;
        }
        text += `
               
                </div>
        </div>
        <div class="description"><p>${r.userId}</p></div>
        <div class="Aicontent">${r.commentContent}</div>
        <div class="parent">
                <div class="icon2">
                    <div class="date1">${timeForToday(r.commentDate)}</div>
                </div>
            </div>
        </div>`;

    });
    console.log("333");
    $('#csCommentList').html(text);

}

function showError(a, b, c) {

}

// 신고하기  ↓

// 병구가 확인한 신고하기 모달창 처리
$('.police-btn').on('click', function (e) {
    e.preventDefault();
    let userNumber = $('.police-btn').data('userNumber');
    console.log(userNumber);
    if (userNumber) {
        window.location.href = '/cs/write';
    } else {
        $('.login-move').trigger('click');
    }
});


// 신고하기 페이지 이동
let reportModal = document.querySelector(".reportModal");
let reportBtn = document.querySelector(".police-btn");

reportBtn.addEventListener("click", function () {
    reportModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

reportModal.addEventListener("click", function (e) {
    if ($(e.target).hasClass("reportModal")) {
        reportModal.style.display = "none";
        document.body.style.overflow = "unset";
    }
});

// 신고하기 버튼 클릭 시 컨펌 및 신고처리
let $reportButton = $('.report-btn');
$reportButton.on("click", function () {
    console.log($('.report-list input:checked').val());

    let result = confirm("정말 신고하시겠습니까?");


    if (result) {
        reportAjax();
    }
});

// 신고하기 처리
function reportAjax() {
    let csNumber = $('.cs-num').val();
    let policeCategory = $('.report-list input:checked').val();

    $.ajax({
        url: '/police/cs',
        type: 'post',
        data: JSON.stringify({boardNumber: csNumber, policeCategory: policeCategory}),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert("정상적으로 신고처리 되었습니다.")
            location.href = "/cs/main";
        }

    })
}


// 리플 수정 버튼 처리 (클릭 버튼 눌럿을시 js)
$('#csCommentList').on('click', '.btn-modify', function () {
    console.log("수정버튼 눌렀음")
    let content = $(this).closest('.commentAi').find('.Aicontent');
    console.log(content);
    content.replaceWith(`
   <div class= 'modify-box'>
   <textarea class='modify-content'>${content.text()}</textarea>
   <button type='button' class='modify-content-btn'>수정 완료</button>
   </div>
    `);
    $('.dropdown-content2').addClass('none');
});


// 리플 수정 완료 처리
const csNumber = $('.cs-num').val();

$('#csCommentList').on('click', '.modify-content-btn', function () {
    let commentNumber = $(this).closest('.commentAi').data('num');
    let commentContent = $(this).closest('.modify-box').find('.modify-content').val();

    let commentObj = {
        commentNumber: commentNumber,
        commentContent: commentContent
    }
    console.log(commentObj);
    modify(commentObj, function () {
        getList(csNumber, showComment, showError);
    }, showError);
    document.location.reload();
});


// 리플 댓글 수정하기 ( 수정 완료 버튼 눌렀을시 )
function modify(commentObj, successCallback, errorCallback) {
    console.log("modify 들어옴");
    $.ajax({
        url: `/replies/${commentObj.commentNumber}`,
        type: 'patch',
        data: JSON.stringify(commentObj),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            console.log("modify ajax 성공했다");
            if (successCallback) {
                successCallback(result);
            }
            // Reload the page after successful modification
            location.reload();
        },
        error: errorCallback
    });
    console.log("88888888888888888888888");
}

// 리플 삭제 버튼 처리
$('#csCommentList').on('click', '.btn-remove', function (e) {
    $('.dropdown-content2').addClass('none');

    let commentNumber = $(this).closest('.commentAi').data('num');
    console.log(commentNumber);
    remove(commentNumber, function () {
        getList(csNumber, showComment, showError);
    }, showError);

});

// 댓글 삭제

function remove(commentNumber, callback, error) {
    $.ajax({
        url: `/replies/${commentNumber}`,
        type: 'delete',
        success: function () {

            console.log("replise 들어옴");
            if (callback) {
                callback();
                console.log("callback함수 실행!!")

            }
        },
        error: error
    });
    console.log("js끝마침");
    document.location.reload();
}

// ===========
// 경과일자 계산
// ===========
function timeForToday(value) {
    // new Date() 현재 날짜와 시간
    const today = new Date();
    const timeValue = new Date(value);

    console.log(today);
    console.log(timeValue);

    // Math.floor()는 소수점을 내림 처리 해준다.
    // getTime()은 1970년 01/01 을 기준으로 지금까지 몇 ms가 지났는지 알려준다.
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

    console.log(betweenTime);

    if (betweenTime < 1) {
        return "방금 전";
    }
    if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
}
