// enter 입력 이벤트
$('input').keyup(function(e) {
    if(e.keyCode == 13)  // enter를 입력받은 경우 닉네임 중복 체크 메서드를 실행
        checkNickname();
    else{
        document.all.submitBtn.disabled = true;
        document.all.alertOverlap.style.visibility = "hidden";
    }
});

// 닉네임 검증
function checkNickname(){
    var inputNick = $('#inputNickname').val(); // 입력 받은 닉네임

    if(inputNick.length <= 5 && checkKorNick(inputNick) && checkOverlapNick(inputNick)){
        // 닉네임이 한글 5자 이내이며 중복되지 않는 경우
        document.all.alertOverlap.innerText = "사용 가능한 닉네임이에요";
        document.all.alertOverlap.style.color = "green";
        document.all.alertOverlap.style.visibility = "visible";
        document.all.submitBtn.disabled = false;
        return true;
    }else{
        if(inputNick.length > 5 || !checkKorNick(inputNick)){
            // 닉네임이 한글이 아니거나, 5자가 넘는 경우 
            document.all.alertOverlap.innerText = "한글로 5자 이하의 닉네임만 사용할 수 있어요";
        }else{
            document.all.alertOverlap.innerText = "이미 사용 중인 닉네임이에요";
        }
        document.all.alertOverlap.style.color = "red";
        document.all.alertOverlap.style.visibility = "visible";
        document.all.submitBtn.disabled = true;
        return false;
    }
}

// 닉네임 한글 체크
function checkKorNick(nickName){
    let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    for(let i = 0; i < nickName.length; i++){
        if(!checkKor.test(nickName.charAt(i))){
            return false;
        }
    }
    return true;
}

// 닉네임 중복 체크
function checkOverlapNick(nickName){
    var tempNick = '닉네임'; // 임시 검증용 닉네임
    if(nickName == tempNick) return false;
    else return true;
}

// 페이지 이동 (쿼리로 닉네임 전달)
function changePage(){
    if(checkNickname()){
        var nick = $('#inputNickname').val();
        /////////////////////////////////////////////////////////
        location.href='./012_inputDefaultInfo.html?nick='+nick;
        /////////////////////////////////////////////////////////
    }
}

