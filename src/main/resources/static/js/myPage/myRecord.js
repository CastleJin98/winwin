// 다이어리 작성하기
let $plus = $('.plus-btn');
let $Diary = $('.diary');
let $cancleBtn = $('.cancle');

$plus.on('click', function(){
    $Diary.eq(0).show();
});

$cancleBtn.on('click', function(){
    $Diary.eq(0).hide();
});

// 작성 완료 버튼
let $submitBtn = $('.submit');
let $form = $('.diary-form');

$submitBtn.on('click', function(){
    $form.submit();
    $Diary.eq(0).hide();
});


// 이미 기록한 다이어리 보기
let $closeBtn = $('.closeBtn');
let $diaryContent = $('.diary-content');
let $diaryTitle = $('.diary-title');

$('.diary-list').on('click', '.diary-title' ,function(){
    $(this).next('.my-diary').find('.diary-content').show();
    console.log("보여진다")
    $(this).closest('.diary-main').find('.diary-title').hide();
    console.log("숨겨진다")
    $(this).closest('.diary-main').find('.my-diary').show();
    console.log("보여져라")
});

$closeBtn.on('click', function(){
    $(this).closest('.diary-content').hide();
    $(this).parents('.diary-main').find('.diary-title').show();
});


// 수정 버튼
let $editBtn = $('.editBtn');
let $Content = $('.list-content');

$editBtn.on('click', function(){
    $(this).closest('.diary-content').hide();
    $(this).parents('.my-diary').find('.diary2').show();
});

// 수정 완료 버튼
let $editSubmit = $('.edit-submit');
let $form2 = $('.diary-form2');

$editSubmit.on('click', function(){
    $form2.submit();
    $(this).parents('.my-diary').find('.diary2').hide();
    $(this).parents('.my-diary').find('.diary-content').show();
});


// 취소 버튼
let $editCancle = $('.edit-cancle');

$editCancle.on('click', function(){
    $(this).parents('.my-diary').find('.diary-content').show();
    $(this).parents('.my-diary').find('.diary2').hide();
});

$('.btn-fullscreen').remove();
$('.btn-codeview').remove();

//다이어리 리스트 띄우기
function diaryList(result) {
     let text = '';

    if (result.length == 0 && page == 1) {
        text = `
          <div class="community-main-box-size">
            <span>앗! 등록된 내 기록이 없어요.😿<br/>
            기록을 통해 기억하고 싶은 정보를 저장해 보아요.</span>
          </div>
        `;

        $('.diary-list').html(text);
    }else{

    result.forEach(r => {
       text += `
                <div class="list-btn">
                <input type="hidden" class="diarynumber" value="${r.diaryNumber}"/>
                        <div class="diary-main">
                            
                            <div class="diary-title">${r.diaryTitle}</div>

                            <div class="my-diary">
                                <input type="hidden" class="diarynumber" value="${r.diaryNumber}"/>
                                <div class="diary-content">
                                    <div class="title2">
                                   
                                        <div class="list-title">${r.diaryTitle}</div>
                                        <div class="list-date">${r.diaryDate}</div>
                                    </div>

                                    <div class="list-content">${r.diaryContent}</div>

                                    <div class="btn-box">
                                        <div class="edit-btn"><button class="editBtn" type="button" style="font-family: NanumSquareAcr;">수정</button></div>
                                        <div class="close-btn"><button class="closeBtn" type="button" style="font-family: NanumSquareAcr;">닫기</button></div>
                                    </div>
                                </div>
                            </div>
                        
                        <div class="diary2">
                        <input type="hidden" class="diary" value="${r.diaryNumber}"/>
                        </div>

                    </div> 
                    </div>
            `;
            });
            $('.diary-list').append(text);
    }
}

//다이어리 등록하기
$('.submit').on('click' , function (){
    let title = $('.title').val();
    let content = $('.summernote').val();
    console.log(title);
    console.log(content);

   $.ajax({
       url: '/diary/diary',
       type : 'post',
       data : {
           diaryTitle : title,
           diaryContent : content
       },
       success : function () {
           console.log("성공");
           document.location.reload();
       },
       error : function () {
           console.log("실패");
       }
   });

});

// $(function (){
//     let userNumber = $('.userNumber').val();
//     $.ajax({
//         url: '/diary/list',
//         type: 'get',
//         data: {userNumber: userNumber},
//         success: function (result) {
//             diaryList(result);
//         }
//     });
// });

$('.diary-sub').on('click','.editBtn' , function (){
    $(this).closest('.list-btn').find('.diary2').show();

    let $title = $(this).closest('.my-diary').find('.list-title');
    let $content = $(this).closest('.my-diary').find('.list-content');
    let text ='';
    text += `
            
            <div class="mypageDiary-title"><input type="text" class="title" placeholder="" style="font-family: NanumSquareAcr;" value="${$title.text()}"></div>
            <textarea class="summernote" name="diaryContent" style="font-family: NanumSquareAcr;">${$content.html()}</textarea>
            <div class="btn-box">
                <div class="cancle-btn"><button type="button" class="edit-cancle" style="font-family: NanumSquareAcr;">취소</button></div>
                <div class="submit-btn"><button type="submit" class="edit-submit" style="font-family: NanumSquareAcr;">수정 완료</button></div>
            </div>
    `;
    $(this).closest('.list-btn').find('.my-diary').hide();
    $(this).closest('.list-btn').find('.diary2').html(text);

    $('.summernote').summernote({
        height: 300,
        minHheight: 300,
        maxHeight: 300,
        disableResizeEditor: true,
        lang: "ko-KR",
        toolbar: [
            ['fontsize', ['fontsize']],
            ['style', ['style']],
            ['style', ['bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['color', ['color']],
            ['para', ['paragraph']],
            ['height', ['height']],
            ['Insert', ['table']],
            ['Insert', ['picture']],
            ['Insert', ['link']],
            ['misc', ['emoji']],
            ['insert',  ['map']],
            ['highlight', ['highlight']],
            ['code', ['fullscreen', 'codeview']]
        ]
    });
});

//다이어리 수정하기
$('.diary-sub').on('click', '.edit-submit', function (){
    let userNumber = $('.userNumber').val();
    let diaryNumber = $(this).closest('.list-btn').find('.diarynumber').val();
    let content = $(this).closest('.diary2').find('.summernote').val();
    let title = $(this).closest('.diary2').find('.title').val();
    console.log(diaryNumber);

    $.ajax({
        url : '/diary/update',
        type : 'patch',
        data : {
            diaryNumber : diaryNumber,
            diaryTitle : title,
            diaryContent : content
        },
        success : function (){
            console.log("성공");
        },
        error : function (){
            console.log("실패?");
        }
    });
    $(this).closest('.list-btn').find('.diary2').hide();
    $(this).closest('.list-btn').find('.my-diary').show();
    $(this).closest('.list-btn').find('.list-title').text(title);
    $(this).closest('.list-btn').find('.list-content').html(content);
});

$('.diary-sub').on('click', '.closeBtn' , function (){
    $(this).closest('.list-btn').find('.diary-title').show();
   $(this).closest('.list-btn').find('.diary-content').hide();
});

$('.diary-sub').on('click', '.edit-cancle' , function (){
    $(this).closest('.list-btn').find('.diary-title').show();
    $(this).closest('.list-btn').find('.diary2').hide();
});

// 무한 스크롤
let page = 1;
let userNumber = $('.userNumber').val();
console.log(userNumber);

getListPage({page : page}, diaryList, showError);

$(window).on('scroll', function(){
//    $(window).scrollTop() : 현재 브라우저 스크롤 위치를 반환함
    console.log(Math.ceil($(window).scrollTop()));
    //$(document).height() : 문서 전체의 높이를 의미함
    console.log(`document : ${$(document).height()}`);
    //$(window).height() : 브라우저 화면의 높이를 의미함
    console.log(`window : ${$(window).height()}`);

    if(Math.floor($(window).scrollTop()) == $(document).height() - $(window).height()){
        console.log(++page + '=======================================================');
        getListPage({page : page}, diaryList , showError);
    }
});

function getListPage(pageInfo, diaryList , error){
    $.ajax({
        url : `/diary/scroll/${pageInfo.page}`,
        type : 'get',
        dataType : 'json',
        success : function (result){
            if(diaryList) {
                diaryList(result.diaryList);
            }
        },
        error : error
    });
}
function showError(a, b, c) {
    console.error(c);
}


