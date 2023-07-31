// 진로정보 관심 글(좋아요) 무한스크롤 페이징
let page = 1;

getListPage({page: page}, appendList, showError);

$(window).on('scroll', function () {
    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {
        ++page;
        getListPage({page: page}, appendList, showError)
    }
});

function getListPage(pageInfo, appendList, error) {
    // console.log("aaaaaaa");
    $.ajax({
        url: `/myPages/myCareerInfoLike/${pageInfo.page}`,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            if (appendList) {
                appendList(result);
            }
        },
        error: error
    });
}

function appendList(map) {
    let text = ``;
    let flag = 0;

    if (map.activeBoardVoList.length == 0 && page == 1) {
        text = `
          <div class="community-main-box">
            <span>앗! 아직 관심 글이 없습니다.😿 <br/>
            관심 글을 등록하고 멘토와 이야기를 나눠보세요.</span>
          </div>
          <div class="page-move-btn">
            <button class="mapage-careerinfo-path" onclick="location.href='/career/list'">진로정보 입장하기</button>
          </div>
        `;

        $('.career-info-content').html(text);
    } else {

        map.activeBoardVoList.forEach(board => {
            if (flag % 3 == 0) {
                text += `<div class="career-info-box">`;
            }

            text += `
               <a class="career-click" href="/career/detail?careerInfoNumber=${board.boardNumber}">
                <div class="career-box">
                  <div class="career-info">
                    <div class="career-top">
                      <span class="career-tag">${board.subName}</span>
                      <span class="career-title">${board.boardTitle}</span>
                    </div>
                    <span class="career-content">${board.boardContent}</span>
                  </div>
                  <div class="career-bottom">
                    <div class="career-user-profile-box">
                      <div class="career-profile-img">
                        ${board.boardSystemName == null ?
                '<img src="/img/profile-basic.png"/>' :
                '<img src=/profile/' + board.boardUuid + '_' + board.boardSystemName + '>'}
                      </div>
                      <div class="career-user-info">
                        <span class="career-user-name">${board.userNickname}</span>
                        <span class="career-user-tag">${board.gradeName}</span>
                      </div>
                    </div>
                    <div class="career-icon">
                      <div class="select-count-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="rgb(148, 155, 160)" class="bi bi-eye" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        <span class="select-count">${board.boardCnt}</span>
                      </div>
                      <div class="career-like-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="rgb(148, 155, 160)" class="bi bi-heart" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        <span class="like-count">${board.boardLike}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
        `;
            flag++;

            if (flag % 3 == 0) {
                text += `</div>`;
            }
        });

        if (flag % 3 != 0) {
            text += `</div>`;
        }

        $('.career-info-content').append(text);
    }
}

function showError(a, b, c) {
  console.log(c);
}
