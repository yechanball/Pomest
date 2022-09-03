var textBox = document.querySelector("#textbox");
var textBoxMessage = document.querySelector("#textbox-message");
var submitBtn = document.querySelector("#btn-submit");

// textbox 입력 처리
$('input').keyup(function(e) {
    if (e.keyCode == 13) { // enter를 입력받은 경우 닉네임 중복 체크 메서드를 실행
        checkNickname();
    }
    else{ // 다른 키가 입력된 경우
        submitBtn.classList.remove("button-elevated-default");
        submitBtn.classList.add("button-elevated-disabled");
        textBoxMessage.style.display = "none";
        textBox.classList.remove("textbox-success", "textbox-fail");
        textBox.classList.add("textbox-default");
    }
});
// $('input').keyup(function(e) {
//     if(e.keyCode == 13)  // enter를 입력받은 경우 닉네임 중복 체크 메서드를 실행
//         checkNickname();
//     else{
//         submitBtn.classList.remove("button-elevated-default");
//         submitBtn.classList.add("button-elevated-disabled");
//         textBoxMessage.style.display = "none";
//         textBox.classList.remove("textbox-success", "textbox-fail");
//         textBox.classList.add("textbox-default");
//     }
// });

// 닉네임 검증
function checkNickname(){
    var inputText = textBox.value; // 입력 받은 닉네임

    if(inputText != 0 && inputText.length <= 5 && checkKorNick(inputText) && checkOverlapNick(inputText)){
        // 닉네임이 한글 5자 이내이며 중복되지 않는 경우
        textBoxMessage.innerText = "사용 가능한 닉네임이에요";
        textBoxMessage.classList.remove("textbox-message-fail");
        textBoxMessage.classList.add("textbox-message-success");
        textBoxMessage.style.display = "block";
        textBox.classList.remove("textbox-default", "textbox-fail");
        textBox.classList.add("textbox-success");
        submitBtn.classList.remove("button-elevated-disabled");
        submitBtn.classList.add("button-elevated-default");
        return true;
    }else{
        if(inputText.length == 0 || inputText.length > 5 || !checkKorNick(inputText)){
            // 닉네임이 한글이 아니거나, 5자가 넘는 경우 
            textBoxMessage.innerText = "한글로 5자 이하의 닉네임만 사용할 수 있어요";
        }else{
            textBoxMessage.innerText = "이미 사용 중인 닉네임이에요";
        }
        textBoxMessage.classList.remove("textbox-message-success");
        textBoxMessage.classList.add("textbox-message-fail");
        textBoxMessage.style.display = "block";
        textBox.classList.remove("textbox-success", "textbox-default");
        textBox.classList.add("textbox-fail");
        submitBtn.classList.remove("button-elevated-default");
        submitBtn.classList.add("button-elevated-disabled");
        return false;
    }
}
// function checkNickname(){
//     var inputText = textBox.value; // 입력 받은 닉네임
//     var checkingoverlap = checkOverlapNick(inputText)
//     return checkingoverlap.then(function(ret)
//     {
//         if(inputText != 0 && inputText.length <= 5 && checkKorNick(inputText) && ret['status']){
//             // 닉네임이 한글 5자 이내이며 중복되지 않는 경우
//             textBoxMessage.innerText = "사용 가능한 닉네임이에요";
//             textBoxMessage.classList.remove("textbox-message-fail");
//             textBoxMessage.classList.add("textbox-message-success");
//             textBoxMessage.style.display = "block";
//             textBox.classList.remove("textbox-default", "textbox-fail");
//             textBox.classList.add("textbox-success");
//             submitBtn.classList.remove("button-elevated-disabled");
//             submitBtn.classList.add("button-elevated-default");
//             return true;
//         }else{
//             if(inputText.length == 0 || inputText.length > 5 || !checkKorNick(inputText)){
//                 // 닉네임이 한글이 아니거나, 5자가 넘는 경우 
//                 textBoxMessage.innerText = "한글로 5자 이하의 닉네임만 사용할 수 있어요";
//             }else{
//                 textBoxMessage.innerText = "이미 사용 중인 닉네임이에요";
//             }
//             textBoxMessage.classList.remove("textbox-message-success");
//             textBoxMessage.classList.add("textbox-message-fail");
//             textBoxMessage.style.display = "block";
//             textBox.classList.remove("textbox-success", "textbox-default");
//             textBox.classList.add("textbox-fail");
//             submitBtn.classList.remove("button-elevated-default");
//             submitBtn.classList.add("button-elevated-disabled");
//             return false;
//         }
//     })
// }

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


// // 닉네임 중복 체크
function checkOverlapNick(nickName){
    var tempNick = '닉네임'; // 임시 검증용 닉네임
    if(nickName == tempNick) return false;
    else return true;
}
// function checkOverlapNick(nickName){
//     let data = {"nickname": nickName};
//     var ret;

//     var getRet = async () => {
//         var retraw = await fetch("/nicknameoverlap", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json; charset=UTF-8",
//                     "Accept" : "application/json; charset=UTF-8"
//                 },
//                 body: JSON.stringify(data),
//         })

//         var retraw2 = await retraw.json()

//         return retraw2
//     }

//     return getRet();
// }

// // 페이지 이동 (쿼리로 닉네임 전달)
document.querySelector("#btn-submit").addEventListener("click", function() {
    if (checkNickname()) {
        var nick = textBox.value;
        location.href = './012_inputDefaultInfo.html?nick=' + nick;
    }
});
// document.querySelector("#btn-submit").addEventListener("click", function() {
//     if(checkNickname()){
//         var nick = textBox.value;
//         location.href='/nicknamesubmit?nickname='+nick;
//     }
// });
