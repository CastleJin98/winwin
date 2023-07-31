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
        url: `/myPages/myQna/${pageInfo.page}`,
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
            <button class="mapage-careerinfo-path" onclick="location.href='/qna/list'">QnA 입장하기</button>
          </div>
          </div>
        `;

        $('.my-mentor-content').html(text);
    } else {

        map.activeBoardVoList.forEach(board => {
            text += `
           <a class="community-main-box" href="/qna/read?qnaNumber=${board.boardNumber}">
            <div class="community-box">
              <div class="community-sub-content">
                <span class="user-identity">Q&A</span>
                <div class="community-title">${board.boardTitle}</div>
                <div class="community-content">${board.boardContent}</div>
              </div>
              <div class="community-sub-box">
                <div class="community-btn">
                  <div class="read-count">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" style="fill: rgb(148, 155, 160);" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    <span class="readCount-num">${board.boardCnt}</span>
                  </div>
                  <div class="check">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="fill: rgb(148, 155, 160);" class="bi bi-chat-dots" viewBox="0 0 16 16">
                      <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                      <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                    </svg>
                    <span class="checkCnt">${board.boardComment}</span>
                  </div>
                </div>
                <div class="date">${board.boardDate}</div>
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