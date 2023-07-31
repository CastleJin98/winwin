//무한스크롤 영역
let count = 3;
window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // // // div 코드가 1개 생성됨 = 내가 작성하고자하는 영역을 대입하면됨.
        // let toAdd = document.createElement("div");
        // toAdd.classList.add("box")
        // toAdd.textContent = `${++count}번째 블록`
        // document.querySelector('section').appendChild(toAdd);

    }
}

/* 무한 스크롤 */
/*

let page = 1;
const categoryNumbers = [0, 1, 2]; // 원하는 카테고리 번호 목록

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
        sendRequest(page);
    }
});

function sendRequest(pageNumber) {
    for (const categoryNumber of categoryNumbers) {
        const url = `/likes/recruiting/${categoryNumber}?page=${pageNumber}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                `
                <div class="project-cardbox" th:each="project : ${projectList}">
                    <div class="project-content1">
                        <div class="project-content-header">
                            <span class="project-sub-text1"
                                  th:text="${project.categoryNumber == 1 ? '사이드 프로젝트' : '스터디 / 모임'}"></span>

                        </div>
                        <br/>
                        <div class="project-text-wrap">
                            <div class="project-sub-text2"th:text="${project.studyStatus == '1' ? '모집 중' : '모집 완료'}">모집 중</div>
                            <div class="vertical">&nbsp;|&nbsp;</div>
                            <div class="project-sub-text3">
                                <a th:text="${project.studyTitle}"
                                   th:href="${'/project/read?studyNumber=' + project.studyNumber}" style="color: black;
}"></a></div>
                            <div class="new-text" th:if="${project.isNew == 'T'}">&nbsp;NEW</div>
                        </div>
                    </div>
                    <br/>
                    <div class="project-content2">
                        <span class="project-sub-text4" th:text="${project.studySummaryContent}"></span>
                    </div>
                    <br/>
                    <div class="project-content3">
                        <span class="project-sub-text4" th:text="${project.purposeName}"></span>
                        <p class="project-sub-text5">좋아요
                            <span class="project-sub-text6" th:text="${project.likeCnt}"></span>
                        </p>
                    </div>
                </div>
               `
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    page = pageNumber + 1;
}
*/


/*                                              */

let projectmodalwrap = $(".projectmodal-wrap");


function fn_modal() {
    projectmodalwrap.css("display", "flex");
    $("body").css("overflow", "hidden"); //모달창 스크롤 막기
}

function fn_modal_close(target, e) {
    if ($(e.target).hasClass("projectmodal-wrap")) {
        projectmodalwrap.css("display", "none");
        $("body").css("overflow", "unset"); //모달창 스크롤 막기
    }
}


// 네비 영역 마우스오버 시 텍스트 강조
$('.nav-span1').on('mouseover', function () {
    $('.nav-span1').css("color", "rgb(37, 99, 235)")
    $('.nav-span1').css("font-weight", "600")
});

$('.nav-span1').on('mouseout', function () {
    $('.nav-span1').css("color", "rgb(100, 116, 139)")
    $('.nav-span1').css("font-weight", "500")
});

$('.nav-span2').on('mouseover', function () {
    $('.nav-span2').css("color", "rgb(37, 99, 235)")
    $('.nav-span2').css("font-weight", "600")
});

$('.nav-span2').on('mouseout', function () {
    $('.nav-span2').css("color", "rgb(100, 116, 139)")
    $('.nav-span2').css("font-weight", "500")
});

$('.nav-span3').on('mouseover', function () {
    $('.nav-span3').css("color", "rgb(37, 99, 235)")
    $('.nav-span3').css("font-weight", "600")
});

$('.nav-span3').on('mouseout', function () {
    $('.nav-span3').css("color", "rgb(100, 116, 139)")
    $('.nav-span3').css("font-weight", "500")
});


// 카드박스 백그라운드 마우스오버 처리
$('.project-cardbox').on('mouseover', function () {
    $(this).css("background-color", "rgba(241, 245, 249, 0.4)")
});

$('.project-cardbox').on('mouseout', function () {
    $('.project-cardbox').css("background-color", "")
});


// 하트 마우스오버 처리
$('.heart').on('mouseover', function () {
    $(this).css("fill", "black")
});

$('.heart').on('mouseout', function () {
    $('.heart').css("fill", "rgb(203, 213, 225)")
});


// 비동기 페이징 처리 ====================================================
let page = 1;

getCateList(page);

function getCateList(pageNum){
    let url = new URLSearchParams(location.search);
    let cateNumber = url.get('categoryNumber');

    $.ajax({
        url : `/likes/recruiting/${pageNum}`,
        type : 'get',
        data : {categoryNumber : cateNumber},
        success : function (result){
            console.log(result);
            makeList(result.StudyVoList);
        }
    });
}

$(window).on('scroll', function () {
    if (Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height()) {
        ++page;
        getCateList(page);
    }
});

function makeList(list){
    let tagList = '';

    list.forEach(obj => {
        tagList += `
            <div class="project-cardbox">
                    <div class="project-content1">
                        <div class="project-content-header">
                            <span class="project-sub-text1">${obj.categoryNumber == 1 ? '사이드 프로젝트' : '스터디 / 모임'}</span>

                        </div>
                        <br/>
                        <div class="project-text-wrap">
                            <div class="project-sub-text2" style="${obj.studyStatus == '1' ? 'color : green' : 'color : gray'}">${obj.studyStatus == '1' ? '모집 중' : '모집 완료'}</div>
                            <div class="vertical">&nbsp;|&nbsp;</div>
                            <div class="project-sub-text3">
                                <a href="${'/project/read?studyNumber=' + obj.studyNumber}" style="color: black;}">${obj.studyTitle}</a></div>`

        if(obj.isNew == 'T'){
            tagList += `<div class="new-text">&nbsp;NEW</div>`
        }


            tagList += `</div>
                    </div>
                    <br/>
                    <div class="project-content2">
                        <span class="project-sub-text4">
                        <a href="${'/project/read?studyNumber=' + obj.studyNumber}" style="color: black;}">${obj.studySummaryContent}</span></a>
                    </div>
                    <br/>
                    <div class="project-content3">
                        <span class="project-sub-text4">${obj.purposeName}</span>
                        <p class="project-sub-text5">좋아요
                            <span class="project-sub-text6">${obj.likeCnt}</span>
                        </p>
                    </div>
                </div>
        `;

    });

    $('.project').append(tagList);
}

//박스 누르면 진입 하기
$('.topten-cardbox').on('click', function (){
    let titleNumber = $(this).closest('.topten-area').find('.projectTitle').val();
    window.location.href = '/project/read?studyNumber=' + titleNumber;
});
