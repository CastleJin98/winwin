// 커뮤니티 상태 변경
$(document).ready(function() {
    $("#changeStatusBtn").on("click", function() {
        changeStatus();
    });
});

// <button id="changeStatusBtn">변경</button>

function changeStatus() {
    let $checkedBox = $('.check-box:checked');
    let communityNumber = [];
    let currentStatus = [];

    for(let i=0; i<$checkedBox.length; i++){
        communityNumber.push( $checkedBox.eq(i).data('number'));
        currentStatus.push($checkedBox.closest('.user-table-category').find('.public-secret-select').val());
    }


    console.log(communityNumber)
    console.log('=============================')
    console.log(currentStatus)
    // var communityNumber = document.getElementById("communityNumber").value;
    // var currentStatus = document.getElementById("currentStatus").value; // 현재 상태 값을 가져옵니다.

    if (communityNumber === "") {
        alert("게시글 번호를 입력해주세요.");
        return false;
    }

    // var newStatus = currentStatus == "1" ? "0" : "1";

    $.ajax({
        type: "POST",
        url: "/status/update",
        contentType: "application/json; charset=utf-8",
        traditional : true,
        data: JSON.stringify({communityNumber: communityNumber, communityStatus: currentStatus}),
        success: function() {
            alert("변경이 완료되었습니다.");
        },
        error: function() {
            alert("변경에 실패하였습니다.");
        }
    });
}




