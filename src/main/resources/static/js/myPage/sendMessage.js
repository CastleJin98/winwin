// 모달창
$(function () {
    $(".send-main").on('click', '.message-box', function () {
        $(".send-wrap").css("display", "flex");
        $(".send-wrap").fadeIn();

        let chattingNumber = $(this).closest('.message-box').find('.message-list').data('cnum');

        $.ajax({
            url: "/chattings/sendModal2",
            type: 'get',
            data: {chattingNumber: chattingNumber},
            success: function (result) {
                if (result == null) {
                    alert("삭제된 쪽지입니다.");
                }
                $('.send-sender').text(result.userNickname);
                $('.send-content-chat').text(result.chattingContent);
                $('.send-date-s').text(result.chattingDate);

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
$(".send-main").on('click', '.message-box', function () {
    $(".send-wrap").removeClass("none");

    $('body').css('overflow', 'hidden');
});

// 검은 화면 누르면 모달창 제거
$(".send-wrap").on("click", function (e) {

    if ($(e.target).hasClass("send-wrap")) {
        $(".send-wrap").css("display", "none");
        $(".send-wrap").addClass("none");
        $('body').css('overflow', 'auto');

        $('.form-reset')[0].reset();
    }
});


// 무한스크롤
let pageNumber = 1;

getListPage({page: pageNumber}, appendList, showError);

$(window).on('scroll', function () {
    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()
        || Math.floor($(window).scrollTop()) == $(document).height() - $(window).height()) {
        ++pageNumber;
        getListPage({page: pageNumber}, appendList, showError)
    }
});

function getListPage(pageInfo, appendList, error) {
    $.ajax({
        url: `/chattings/sendMessage/${pageInfo.page}`,
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
            <span>앗! 보낸 쪽지가 없어요.😿<br/>
            회원들과 활발한 쪽지를 나누어 보아요.</span>
          </div>
        `;

        $('.send-main').html(text);

    } else {

        map.chattingVoList.forEach(chatting => {

            text += `
                <div class="message-box">
                        <span class="message-list" data-cnum="${chatting.chattingNumber}"></span>
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
                                    <span name="chattingTo" class="sender">${chatting.userNickname}</span>
                                </div>
                                <button class="send-reply" data-uunum="${chatting.userNumber}">✉ 보내기</button>
                            </div>
                            <span class="message-content">${chatting.chattingContent}</span>
                            <div class="message-bottom-box">
                                <span class="message-date">${chatting.chattingDate}</span>
                            </div>
                    </div>
        `;

        });
        $('.send-main').append(text);
    }
}

function showError(a, b, c) {
    console.log(c);
}

// 답장하기 모달창
$(function () {
    $(".chatting-main").on('click', '.send-reply', function (e) {
        // e.stopPropagation();
        $(".send-wrap").css("display", "none");
        $(".input-wrap").fadeIn();

        let userNickname = $(this).closest('.message-box').find('.sender').text();
        let num = $(this).data('uunum');

        $('.chattingTo').text(userNickname);
        $('.chattingTo').data('num', num);
    });


});

$(".chatting-main").on('click', '.send-reply', function (e) {
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






