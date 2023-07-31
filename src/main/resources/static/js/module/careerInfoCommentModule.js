// 댓글 작성하기
export function register(commentObj, callback){
    $.ajax({
       url : `/careerReplies/comment`,
       type : 'post',
       data : JSON.stringify(commentObj),
        contentType : 'application/json; charset=utf-8',
        success : function (){
           if (callback){
               callback();
           }
        },
        error : function (a,b,c){
            console.error(c);
        }
    });
}

// 댓글 리스트 무한스크롤
export function getList(obj, callback, error){
    $.ajax({
        url : `/careerReplies/list/${obj.careerInfoNumber}/${obj.page}`,
        type : 'get',
        contentType : 'json',
        success : function (result){
            console.log(result)
            if (callback){
            callback(result);
            }
        },
        error : error
    });
}

// 댓글번호로 조회하기
export function getView(commentNumber){
    $.ajax({
       url : `/careerReplies/${commentNumber}`,
       type : 'get',
       dataType : 'json',
       success : function (result){
           if(callback){
               callback(result);
           }
       } ,
        error : function (a,b,c){
           console.log(c);
        }
    });
}

// 댓글 수정하기
/**
 *
 * @param comment 자바스크립트 객체 {commentNumber, commentContent} 필요
 * @param callback
 * @param error
 */
export function modify(comment, callback, error){
    $.ajax({
       url : `/careerReplies/${comment.commentNumber}`,
        type : 'patch',
        data : JSON.stringify(comment),
        contentType : 'application/json; charset=utf-8',
        success : function (){
           if(callback){
               callback();
           }
        },
        error : function (a, b, c){
           // console.log(c);
        }
    });
}

// 댓글 삭제하기
export function remove(commnetNumber, callback, error){
    $.ajax({
       url : `/careerReplies/${commnetNumber}`,
        type : 'delete',
        success : function (){
            if (callback){
                callback();
            }
        },
        error : function (a, b, c){
            console.log(c);
        }
    });
}

// 댓글 몇 일전, 몇 분전, 몇 시간전, 몇 일전, 몇 달전, 몇 년전 띄워주기
export function timeForToday(value){
    // new Date() 현재 날짜와 시간
    const today = new Date();
    const timeValue = new Date(value);

    console.log(today);
    console.log(timeValue);

    // Math.floor()는 소수점을 내림 처리 해준다.
    // getTime()은 1970년 01/01 을 기준으로 지금까지 몇 ms가 지났는지 알려준다.
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

    console.log(betweenTime);

    if(betweenTime < 1) { return "방금 전"; }
    if(betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if(betweenTimeHour < 24){
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if(betweenTimeDay < 365){
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
}