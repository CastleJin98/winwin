//회원탈퇴 확인창
$('.delete-btn').on('click', 'button', function(e){
    if(confirm("정말 탈퇴하시겠습니까?")){
        if(!confirm("정말요?")){
            e.preventDefault();
        }
    }else{
        e.preventDefault();
    }
})