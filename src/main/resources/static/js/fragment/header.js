//헤더 서브카테고리 생기게
$(".header-li").hover(

    function () {
        $(this).css("border-bottom", "2px solid #1b5192");
        $(this).find(".h-font").css("color", "#1b5192");
        $(this).find(".sub").removeClass("none");
    },
    function () {
        $(this).css("border-bottom", "");
        $(this).find(".h-font").css("color", "#868686");
        $(this).find(".sub").addClass("none");
    }
);





//마이페이지 로그인 실패 시 모달 창 띄워주기
function showLoginModal(){
    if($('.login-interceptor').val()){
        console.log("come on")
        $(".login-move").trigger('click');
    }
};

// 모달창
$(function () {

$(".login-move").click(function () {
    $(".modal-container").fadeIn();
    // $('.modal-form')[0].reset();
});

showLoginModal();

  // $(".modal-container").fadeOut();
  //   $(this).reset();
  //   $('.form-reset')[0].reset();\

});

// 모달창이 나타났을 때 스크롤 제거
$(".login-move").on("click", function () {
  $(".modal-container").removeClass("none");

  $('body').css('overflow', 'hidden');
});

// 검은 화면 누르면 모달창 제거
$(".modal-container").on("click", function (e) {

  if ($(e.target).hasClass("modal-container")) {
      $(".modal-container").addClass("none");
      $('body').css('overflow', 'auto');

        modalSetUp2();
  }

});


// ==============================================
// 필수값 누락 시

// let $modalForm = $('#modal-form')
//
// $(function (){
//     $modalForm.validate({
//         message :
//     })
// })


function modalSetUp2(){
    $('.modal-wrap>div').addClass('none');
    $('.modal-wrap>button').addClass('none');
    $('.modal-wrap>div').removeClass('disappear');
    $('.login-box').removeClass('none');
    $('.login-end').removeClass('none');
    $('.login-box').removeClass('disappear');
    $current = $('.login-box');
    $next = null;
    $('.form-reset')[0].reset();
}









