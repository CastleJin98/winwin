// 모달창
$(function () {
    $(".receive-main").on('click', '.message-box', function () {
        $(".send-wrap").fadeIn();

        let chattingNumber = $(this).closest('.message-box').find('.message-list').data('ctnum');

        $.ajax({
            url: "/chattings/sendModal",
            type: 'get',
            data: {chattingNumber: chattingNumber},
            success: function (result) {
                if (result == null) {
                    alert("삭제된 쪽지입니다.");
                }
                $('.send-sender').text(result.userNickname);
                $('.send-content-chat').text(result.chattingContent);
                $('.send-date-s').text(result.chattingDate);

                console.log(result);

                if (result.pfpSystemName != null) {
                    $('.send-message-profile-img').css("background-image", "url(/profile/" + result.pfpUuid + "_" + result.pfpSystemName + ")");
                } else {
                    $('.send-message-profile-img').css("background-image", "url(/img/profile-basic.png)");
                }
            }
        })


    });
});

// 모달창이 나타났을 때 스크롤 제거
$(".receive-main").on("click", '.message-box', function () {
    $(".send-wrap").removeClass("none");

    $('body').css('overflow', 'hidden');
});

// 검은 화면 누르면 모달창 제거
$(".send-wrap").on("click", function (e) {

    if ($(e.target).hasClass("send-wrap")) {
        $(".send-wrap").addClass("none");
        $('body').css('overflow', 'auto');

        $('.form-reset')[0].reset();
    }
});

// 신고하기 모달창
$(function () {
    $(".message-police").click(function () {
        $(".reportModal").fadeIn();
    });
});

$(".message-police").on("click", function () {
    $(".reportModal-content").removeClass("none");
    $(".reportModal").css("display", "flex");

    $('body').css('overflow', 'hidden');
});

$(".reportModal").on("click", function (e) {

    if ($(e.target).hasClass("reportModal")) {
        $(".reportModal").addClass("none");
        $('body').css('overflow', 'auto');
        $(".reportModal").css("display", "none");

        $('.form-reset')[0].reset();
    }
});

// 답장하기 모달창
$(function () {
    $(".chatting-main").on('click', '.send-reply', function (e) {
        // e.stopPropagation();
        $(".send-wrap").css("display", "none");
        $(".input-wrap").fadeIn();

        let userNickname = $(this).closest('.message-box').find('.sender').text();
        let num = $(this).data('unum');

        $('.chattingTo').text(userNickname);
        $('.chattingTo').data('num', num);
    });


});

$(".chatting-main").on('click', '.send-reply', function () {
    $(".input-wrap").removeClass("none");

    $('body').css('overflow', 'hidden');
});

$(".input-wrap").on("click", function (e) {

    if ($(e.target).hasClass("input-wrap")) {
        $(".input-wrap").addClass("none");
        $('body').css('overflow', 'auto');

        $('.form-reset')[0].reset();
    }
});

$("#inputMessage").keyup(function (e) {
    let content = $(this).val();

    // 글자수 세기
    if (content.length == 0 || content == "") {
        $(".send-text-count").text("0");
    } else {
        $(".send-text-count").text(content.length);
    }

    // 글자수 제한
    if (content.length > 400) {
        // 400자 부터는 타이핑 되지 않도록
        $(this).val($(this).val().substring(0, 400));
        // 400자 넘으면 알림창 뜨도록
        $('.warning-text').html("글자수는 400자까지 입력 가능합니다.");
    }
});

// 무한스크롤
let pageNumber = 1;

getListPage({page: pageNumber}, appendList, showError);

$(window).on('scroll', function () {
    console.log("AAA : " + $(window).scrollTop());
    console.log("BBB : " + $(document).height());
    console.log("CCC : " + $(window).height());

    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()
        || Math.floor($(window).scrollTop()) == $(document).height() - $(window).height()) {
        ++pageNumber;
        getListPage({page: pageNumber}, appendList, showError)
    }
});

function getListPage(pageInfo, appendList, error) {
    $.ajax({
        url: `/chattings/receiveMessage/${pageInfo.page}`,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (appendList) {
                appendList(result);
            }
        },
        error: error
    });
}

function appendList(map) {
    let text = '';

    if (map.chattingVoList.length == 0 && pageNumber == 1) {
        text = `
          <div class="community-main-box">
            <span>앗! 받은 쪽지가 없어요.😿<br/>
            회원들과 활발한 쪽지를 나누어 보아요.</span>
          </div>
        `;

        $('.receive-main').html(text);

    } else {

        map.chattingVoList.forEach(chatting => {

            text += `
                <div class="message-box">
            <span class="message-list" data-ctnum="${chatting.chattingNumber}" ></span>
            <div class="message-box-top">
                <div class="sender-profile">
                `;
            if (chatting.pfpSystemName == null) {
                text += `<div class="sender-img">
                                  <img class="sender-img" src="/img/profile-basic.png"/>
                              </div>`;
            } else {
                text += `<div class="sender-img"
                              style="${'background-image: url(/profile/' + chatting.pfpUuid + '_' + chatting.pfpSystemName + ')'}">
                              </div>`;
            }

            text += `
                  <span class="sender">${chatting.userNickname}</span>
                </div>
                <button class="send-reply" data-unum="${chatting.userNumber}">✉ 답장</button>
              </div>
              <span class="message-content">${chatting.chattingContent}</span>
              <div class="message-bottom-box">
                <span class="message-date" >${chatting.chattingDate}</span>
              </div>
          </div>
        `;

        });
        $('.receive-main').append(text);
    }
}

function showError(a, b, c) {
    console.log(c);
}












