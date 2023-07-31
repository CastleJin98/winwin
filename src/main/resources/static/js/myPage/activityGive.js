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
        url: `/myPages/myShare/${pageInfo.page}`,
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
            <button class="mapage-careerinfo-path" onclick="location.href='/share/list'">나눔 입장하기</button>
          </div>
          </div>
        `;

        $('.my-mentor-content').html(text);
    } else {

        map.activeBoardVoList.forEach(board => {
            text += `
                    <div class="share-main-box">
                        <a class="give-click" href="/share/read?shareNumber=${board.boardNumber}">
                          <div class="give-container">
                            <div class="give-box">
                              <div class="give-wrap">
                                <div class="give-title-box">
                                  <div class="give-status-box">
                                    <span class="give-status" style="color:${board.boardStatus == '1' ? 'green' : 'gray'}">
                                    ${board.boardStatus == '1' ? '나눔 중' : '마감'}
                                    </span>
                                    <span>&nbsp;|&nbsp;</span>
                                  </div>
                                  <span class="give-title">${board.boardTitle}</span>
                                </div>
                                <span class="give-content">${board.boardContent}</span>
                                <div class="give-bottom">
                                  <div class="give-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="rgb(148, 155, 160)" class="bi bi-eye" viewBox="0 0 16 16">
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                    <span class="give-count">${board.boardCnt}</span>
                                  </div>
                                  <span class="give-date">${board.boardDate}</span>
                                </div>
                              </div>
                              <div class="give-img-box">
                              ${board.boardUuid == null ?
                `<img src="/img/defualt_camera.jpg">` : `<img src="${'/upload/' + board.boardUploadPath + '/th_' + board.boardUuid + '_' + board.boardSystemName}">`
            }
                              </div>
                            </div>
                          </div>    
                        </a>
                   </div>
        `;
        });
        $('.my-mentor-content').append(text);
    }
}

function showError(a, b, c) {
    console.log(c);
}