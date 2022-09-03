// 페이지 로딩시 닉네임 호출
window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var nick =urlParams.get('nick');
    
    if (nick == null) { // 닉네임이 전달되지 않은 경우
        // 에러 처리하기
        alert("닉네임이 설정되지 않았습니다!!!");
        location.href='./011_inputNickname.html';
    } else {
        document.querySelector("#title-text").innerHTML = nick+"님께 필요한 정보를<br>꼼꼼히 모으기 위해<br>이런 것들을 알고 싶어요";
    }
};

// 다음에 할게요 버튼 클릭 -> 2 포스트 페이지로 이동
document.querySelector("#btn-do-next").addEventListener("click", function () {
    location.href = './200_post.html';
});

// 지금 입력할게요 버튼 클릭 -> 013 기본정보 입력 페이지로 이동
document.querySelector("#btn-do-now").addEventListener("click", function () {
    location.href = './013_inputInfoDetail.html';
});