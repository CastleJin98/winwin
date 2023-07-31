//무한 스크롤 페이징

let page = 1;

getListPage({page: page}, appendList, showError);

$(window).on('scroll', function () {
    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {
        ++page;
        getListPage({page: page}, appendList, showError)
    }
});

function getListPage(pageInfo, appendList, error) {
    $.ajax({
        url: `/myPages/myCs/${pageInfo.page}`,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            if (appendList) {
                appendList(result);
            }
        },
        error: error
    });
}

function appendList(map) {
    let text = '';

    if (map.activeBoardVoList.length == 0 && page == 1) {
        text = `
          <div class="community-main-box-size">
            <span>앗! 활동 내역이 없어요.😿<br/>
            활발한 활동을 통해 회원들과 소통을 나누어 보아요.</span>
              <div class="page-move-btn">
            <button class="mapage-careerinfo-path" onclick="location.href='/cs/main'">문의사항 입장하기</button>
          </div>
          </div>
        `;

        $('.my-mentor-content').html(text);
    } else {

        map.activeBoardVoList.forEach(board => {
            text += `
          <a class="cs-click" href="/cs/read?csNumber=${board.boardNumber}">
          <div class="cs-container">
            <div class="cs-box">
              <div class="cs-title-box">
                <span class="cs-title">${board.boardTitle}</span>
              </div>
              <span class="cs-content">${board.boardContent}</span>
              <div class="cs-bottom">
                <div class="cs-icon">
                </div>
                <span class="cs-date">${board.boardDate}</span>
              </div>
            </div>
          </div>
        </a>
        `;
        });
        $('.my-mentor-content').append(text);
    }
}

function showError(a, b, c) {
    console.log(c);
}