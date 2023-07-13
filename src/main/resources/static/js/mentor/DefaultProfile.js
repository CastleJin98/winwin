import * as review from '../mentor/module/review.js';

/* 건드리지 마시오 */
$("#star").click(function () {
    var animation_end = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".star-svg").toggleClass("favourite");
    $(".spark")
        .toggleClass("explode")
        .one(animation_end, function () {
            $(".spark").removeClass("explode");
        });
    $(".svg-star")
        .toggleClass("pop")
        .one(animation_end, function () {
            $(".svg-star").removeClass("pop");
        });
});
/* 건드리지 마시오 */

$(".changeView").html(makePro());

$(".pro").on("click", function () {
    $('.pro-bottom').show();
    $(".changeView2").show();
    $(".changeView").html(makePro());
    $('.career-bottom').hide();
    $(".li-bottom").css("width", "0");
    $(this).find(".li-bottom").css("width", "100%");
    $(".li-btn").css("color", "#cbd5e1");
    $(this).find("button").css("color", "black");
});

$(".career").on("click", function () {
    $('.pro-bottom').hide();
    $(".changeView").html(makeReview());
    $(".changeView2").hide();
    $(".li-bottom").css("width", "0");
    $(this).find(".li-bottom").css("width", "100%");
    $(".li-btn").css("color", "#cbd5e1");
    $(this).find("button").css("color", "black");
    showReview();
});

$(".board").on("click", function () {
    $('.pro-bottom').hide();
    $(".changeView2").hide();
    makeInfo();
    $(".li-bottom").css("width", "0");
    $(this).find(".li-bottom").css("width", "100%");
    $(".li-btn").css("color", "#cbd5e1");
    $(this).find("button").css("color", "black");
});

function makePro() {
    let text = '';
    // text +=
    //     `
    // <div class="changeView2">
    //     <div class="grid-flex">
    //         <div class="col-start">
    //             <div class="page-flex">
    //                 <div class="skill-page" aria-label="스킬">
    //                     <div class="skill-flex">
    //                         <p class="font-bold">스킬</p>
    //                     </div>
    //                     <div class="board-flex">`;
    //
    //                 map.forEach(skill => {
    //                     text +=
    //                         `<div class="boarder">
    //                         <h3 class="reader"> ${skill.skillName}</h3>
    //                         </div>`;
    //                 });
    //
    //              text +=
    //                         `
    //                     </div>
    //                 </div>
    //                 <hr color="#CBD5E1"/>
    //                 <div class="Career-page" aria-label="경력">
    //                     <div class="Carrer-page">
    //                         <p class="font-bold">경력 ・ 12년차</p>
    //                     </div>
    //                     <div class="BT-form">`;
    //
    //              map.forEach(career =>{
    //                  text += `
    //                  <div class="CR-flex">
    //                             <div class="Career-img">
    //                   <span>
    //                     <img src="./img/./kakao.webp" alt="" style="width: 24px"/>
    //                   </span>
    //                             </div>
    //                             <div class="kakao-flex">
    //                                 <a href="" target="_blank" rel="noreferrer">
    //                     <span style="color: black">
    //                       <span class="font-bold" style="color: black"/>
    //                       <span class="font-bold">${career.careerCompany}</span> <span class="careertitle">${career.careerTitle}</span>
    //                     </span>
    //                                 </a>
    //                                 <p className="font-base"><span>${career.careerStartDate}</span> ~ <span>${career.careerEndDate}</span></p>
    //                             </div>
    //                         </div>
    //                  `;
    //              })
    //                         text +=
    //                             `
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div> `;
    return text;
}


function makeInfo() {
    let mentorNumber= $('.mentor-num').val();

    $.ajax({
        url : `/career/info`,
        type : 'get',
        data : {mentorNumber : mentorNumber},
        success : function (info){
            let text ='';
            text += `
            <div class="inner-card-box-main">
            `;
            info.forEach(c => {
                text += `
                     <div class="inner-card-box">
                       <div class="title">
                        <h3>${c.careerInfoTitle}</h3>
                         <br/>
                       </div>
                         <div class="msg">
                           ${c.careerInfoContent}
                         </div>
                         <div class="profile-like-wrap">
                           <div class="profile">
                             <div class="pf">
                             ${c.pfpSystemName == null ? '<img class="img-box2" src="/img/profile-basic.png"/>' :
                                '<img class="img-box2" src=/profile/' + c.pfpUuid + '_' + c.pfpSystemName + '>' }
<!--                                 <img class="info-img" src=""></lmg></img>-->
                             </div>
                             <div class="info-text-box">
                               <span class="info-user-name">${c.userName}</span>
<!--                               <br/>-->
                               <span class="user-bottom">${c.userBelong} · 4년차</span>
                               <div class="info-content">
                                 <div class="sec1">
                                   <div><svg aria-label="좋아요" class="x1lliihq x1n2onr6" color="rgb(142, 142, 142)" fill="rgb(142, 142, 142)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></svg></div>
                                  <div class="number1">${c.careerInfoLike}</div>
                                 </div>
                                 <div class="sec2">
                                   <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                   </svg></div>
                                     <div class="number2"><span>${c.careerInfoCnt}</span></div>
                                   </div>
                             </div>
                             </div>
                           </div>
                         </div>
                     </div>
                `;
            });
            text += `</div>`;
            $('.changeView').html(text);
        },
        error : function (){
            console.log("에러 발생");
        }
    });

}

const rating_input = document.querySelector('.rating input');
const rating_star = document.querySelector('.rating_star');

$('.changeView').on('input', '.rating input' ,(e)=>{
    let star = $('.rating_star')[0];
    star.style.width = `${e.target.value * 10}%`;
})

function makeReview() {
    let text = '';
    let status = $('.umstatus').val();
    console.log(status);
    text += `
  <div class="reply-flex">
</div>
<div class="review-flex">`;

    if(status == 'Y') {
        text += `
        <div class="rating_box">
        <div class="rating">
          ★★★★★
          <span class="rating_star">★★★★★</span>
          <input type="range" class="star" value="1" step="1" min="0" max="10">
        </div>
        <div class="review-content">
          <input type="text" class="content" id="review-content" name="review-content" placeholder="한줄 평가를 입력하세요">
          <button type="submit" class="review-btn">등록</button>
        </div>
      </div> `;
    }

  text += `
    <div class="review-writer">
      </div>
    
    </div>`;

    return text;
}

function showReview() {
    let mentorNumber = $('.mentor-num').val();
    console.log(mentorNumber)

    $.ajax({
        url: '/review/list',
        type: 'get',
        data: {mentorNumber: mentorNumber},
        dataType: 'json',
        success: function (reviews) {
            console.log(reviews)
            let text = '';

            reviews.forEach(r => {
                text += `
                <div class="name-can">
                    <td class="review-review">
                        <p class="btn-view"><strong>${r.reviewContent}</strong></p>
                    </td>
                    <td><p class="reviewstar">${r.reviewStar}</p></td>
                    <td><p class="reviewstar">${r.userNickName}</p></td>
                </div>
        `;
            });
            $('.review-writer').html(text);
        },
        error: function (a, b, c) {
            console.log(c);
        }
    });
}

const mentorNumber = $('.mentor-num').val();

function showError(a, b, c){
    console.error(c);
}


//리뷰 작성 완료 처리
$('.changeView').on('click', '.review-btn', function (){
    let content = $('#review-content').val().trim();
    let star = $('.star').val();
    if(content == '' || star == 0){
        return;
    }

    console.log("1")
    let reviewObj = {
        reviewContent : content,
        reviewStar : star,
        mentorNumber : mentorNumber
    }
    review.register(reviewObj, showReview, showError());
    $('#review-content').val('');
});

$('.messageBox').on('click', function (){
    if($('.userNumber').val() == '' ){
        alert("로그인 해주세요");
    }

    if($('.umstatus').val() == 'N'){
        alert("멘토:멘티 관계가 아닙니다.");
    }

    if($('.userNumber').val() != null || $('.umstatus').val() == 'Y'){
        $(function () {
            $(".messageBox").click(function () {
                $(".input-wrap").fadeIn();
                let userNickname = $('.name-text').text();
                let num = $('.mentornumber').data('num');
                console.log(num);

                $('.chattingTo').text(userNickname);
                $('.chattingTo').data('num', num);
            });
        });

        $(".messageBox").on("click", function () {
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
    }
})




