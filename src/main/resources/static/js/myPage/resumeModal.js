// html2canvas 라이브러리로 특정요소를 img로 변환
// 변환한 이미지를 jsPDF라이브러리로 pdf파일로 저장
$(".save-btn").on("click", function () {
  html2canvas($(".modal-box")[0], {
    allowTaint: true,
  }).then(function (canvas) {
    let img = canvas.toDataURL("image/png");

    let margin = 0; //출력 페이지 margin (0이면 pdf파일 최상단에 딱 붙어서 출력됨)

    // 아래 크기는 A4를 기준으로 만든 식
    let imgWidth = 200; //  컨텐트 너비(mm)
    let pageHeight = imgWidth * 1.414; // 출력 페이지의 세로 길이
    let imgHeight = (canvas.height * imgWidth) / canvas.width; // 이미지 높이
    let heightLeft = imgHeight;
    let doc = new jsPDF("p", "mm", "a4");
    let position = margin;

    // 첫 페이지
    doc.addImage(img, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    console.log(`imgHeight : ${imgHeight}`);
    console.log(`pageHeight : ${pageHeight}`);
    console.log(`heightLeft : ${heightLeft}`);
    // 내용이 많아 여러 페이지가 나오는 경우 반복처리
    while (heightLeft >= 20) {
      doc.addPage();
      position = heightLeft - imgHeight;
      doc.addImage(img, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 파일 저장

    setTimeout(function () {
      doc.save("sample.pdf");
    }, 1000);
  });
});

$('.resume-box').on('click', function () {
  $('.resumeModal').removeClass("none");
  $('.modal-wrap').css({
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  });

  let resumeNumber = $(this).closest('.resume-box').find('input').val();
  $.ajax({
    url : "/myPages/resume",
    type : 'get',
    data : {resumeNumber, resumeNumber},
    success : function(resumeVo){
      fillResume(resumeVo);
    },
    error : function(a, b, c){
      console.log(c);
    }
  });
});

$('.modal-wrap').on('click', function (e) {
  if ($(e.target).hasClass("modal-wrap")) {
    $('.resumeModal').addClass("none");
  }
});

function fillResume(resumeVo){
  //초기화 하고
  $('.rm-name').text('');
  $('.rm-phone').text('');
  $('.rm-address').text('');
  $('.rm-email').text('');
  $('.rm-website').text('');
  $('.rm-school1').text('');
  $('.rm-school2').text('');
  $('.rm-school-start1').text('');
  $('.rm-school-start2').text('');
  $('.rm-school-end1').text('');
  $('.rm-school-end2').text('');
  $('.rm-career1').text('');
  $('.rm-career2').text('');
  $('.rm-career3').text('');
  $('.rm-career-start1').text('');
  $('.rm-career-start2').text('');
  $('.rm-career-start3').text('');
  $('.rm-career-end1').text('');
  $('.rm-career-end2').text('');
  $('.rm-career-end3').text('');
  $('.certificate-name').find('.certi-title').text('자격명칭');
  $('.certificate-grade').find('.certi-title').text('등급');
  $('.certificate-inst').find('.certi-title').text('증빙기관');
  $('.rm-certi-name1').text('');
  $('.rm-certi-name2').text('');
  $('.rm-certi-name3').text('');
  $('.rm-certi-name4').text('');
  $('.rm-certi-name5').text('');
  $('.rm-certi-grade1').text('');
  $('.rm-certi-grade2').text('');
  $('.rm-certi-grade3').text('');
  $('.rm-certi-grade4').text('');
  $('.rm-certi-grade5').text('');
  $('.rm-certi-noto1').text('');
  $('.rm-certi-noto2').text('');
  $('.rm-certi-noto3').text('');
  $('.rm-certi-noto4').text('');
  $('.rm-certi-noto5').text('');

  //해당 이력서 정보 꽂아주기
  $('.rm-name').text(resumeVo.resumeDto.resumeName);
  $('.rm-phone').text(resumeVo.userPhoneNumber);
  $('.rm-address').text(resumeVo.resumeDto.resumeAddress);
  $('.rm-email').text(resumeVo.resumeDto.resumeEmail);
  $('.rm-website').text(resumeVo.resumeDto.resumeWebsite);
  $('.rm-website').prop('href', 'http://' + resumeVo.resumeDto.resumeWebsite);
  if(!resumeVo.resumeFileDto) {
    $('.modal-img').css('background-image', 'url()');
  }else{
    $('.modal-img').css('background-image', 'url(/profile/' + resumeVo.resumeFileDto.fileUuid + '_' + resumeVo.resumeFileDto.fileSystemName + ')');
  }
  $('.rm-school1').text(resumeVo.resumeDto.resumeSchool1);
  $('.rm-school2').text(resumeVo.resumeDto.resumeSchool2);
  $('.rm-school-start1').text(resumeVo.resumeDto.schoolStartDate1);
  $('.rm-school-start2').text(resumeVo.resumeDto.schoolStartDate2);
  if(resumeVo.resumeDto.schoolEndDate1 != ""){
    $('.rm-school-end1').text(' ~ ' + resumeVo.resumeDto.schoolEndDate1);
  }
  if(resumeVo.resumeDto.schoolEndDate2 != ""){
    $('.rm-school-end2').text(' ~ ' + resumeVo.resumeDto.schoolEndDate2);
  }
  if(resumeVo.resumeDto.resumeCareer1 == "" || resumeVo.resumeDto.resumeCareer1 == null){
    $('.rm-career-start1').text('없음');
  }else{
    $('.rm-career1').text(resumeVo.resumeDto.resumeCareer1);
    $('.rm-career2').text(resumeVo.resumeDto.resumeCareer2);
    $('.rm-career3').text(resumeVo.resumeDto.resumeCareer3);
    $('.rm-career-start1').text(resumeVo.resumeDto.careerStartDate1);
    $('.rm-career-start2').text(resumeVo.resumeDto.careerStartDate2);
    $('.rm-career-start3').text(resumeVo.resumeDto.careerStartDate3);
  }
  if(resumeVo.resumeDto.careerEndDate1 != "" && resumeVo.resumeDto.careerEndDate1 != null){
    $('.rm-career-end1').text(' ~ ' + resumeVo.resumeDto.careerEndDate1);
  }
  if(resumeVo.resumeDto.careerEndDate2 != "" && resumeVo.resumeDto.careerEndDate2 != null){
    $('.rm-career-end2').text(' ~ ' + resumeVo.resumeDto.careerEndDate2);
  }
  if(resumeVo.resumeDto.careerEndDate3 != "" && resumeVo.resumeDto.careerEndDate3 != null){
    $('.rm-career-end3').text(' ~ ' + resumeVo.resumeDto.careerEndDate3);
  }
  if(resumeVo.resumeDto.resumeCertiName1 == "" || resumeVo.resumeDto.resumeCertiName1 == null){
    $('.certificate-name').find('.certi-title').text('');
    $('.certificate-grade').find('.certi-title').text('없음');
    $('.certificate-inst').find('.certi-title').text('');
  }else{
    $('.certificate-name').find('.certi-title').text('자격명칭');
    $('.certificate-grade').find('.certi-title').text('등급');
    $('.certificate-inst').find('.certi-title').text('증빙기관');
    $('.rm-certi-name1').text(resumeVo.resumeDto.resumeCertiName1);
    $('.rm-certi-name2').text(resumeVo.resumeDto.resumeCertiName2);
    $('.rm-certi-name3').text(resumeVo.resumeDto.resumeCertiName3);
    $('.rm-certi-name4').text(resumeVo.resumeDto.resumeCertiName4);
    $('.rm-certi-name5').text(resumeVo.resumeDto.resumeCertiName5);
    $('.rm-certi-grade1').text(resumeVo.resumeDto.resumeCertiGrade1);
    $('.rm-certi-grade2').text(resumeVo.resumeDto.resumeCertiGrade2);
    $('.rm-certi-grade3').text(resumeVo.resumeDto.resumeCertiGrade3);
    $('.rm-certi-grade4').text(resumeVo.resumeDto.resumeCertiGrade4);
    $('.rm-certi-grade5').text(resumeVo.resumeDto.resumeCertiGrade5);
    $('.rm-certi-noto1').text(resumeVo.resumeDto.resumeCertiNoto1);
    $('.rm-certi-noto2').text(resumeVo.resumeDto.resumeCertiNoto2);
    $('.rm-certi-noto3').text(resumeVo.resumeDto.resumeCertiNoto3);
    $('.rm-certi-noto4').text(resumeVo.resumeDto.resumeCertiNoto4);
    $('.rm-certi-noto5').text(resumeVo.resumeDto.resumeCertiNoto5);
  }
}