window.onload = function () {
  // 테스트 코드
  document.querySelector(".header-description").innerHTML = `
    <p class="font-body-kr03">
      옴따가랭이님의 따뜻한 노력이
      <br />엄마의 건강을 지키고 있어요 &#x2764;&#xFE0F;
    </p>`;
  makeRecordList("");

  /* // 닉네임 호출
  fetch("/mypage/getnickname")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".header-description").innerHTML = `
        <p class="font-body-kr03">
          ${data}님의 따뜻한 노력이
          <br />엄마의 건강을 지키고 있어요 &#x2764;&#xFE0F;
        </p>`;
    });

  // 기록 목록 호출
  fetch("")
    .then((response) => response.json())
    .then((data) => {
      makeRecordList(data);
    });*/
};

// 기록 목록 생성
function makeRecordList(data) {
  document.querySelector("#record-list").innerHTML = `
    <div class="record-item">
      <p class="font-title-kr03">6월</p>
      <p class="font-body-kr02">30일 중 13일 연락했어요</p>
    </div>
    <div class="record-item">
      <p class="font-title-kr03">7월</p>
      <p class="font-body-kr02">31일 중 26일 연락했어요</p>
    </div>
    <div class="record-item">
      <p class="font-title-kr03">8월</p>
      <p class="font-body-kr02">31일 중 14일 연락했어요</p>
    </div>
    <div class="record-item">
      <p class="font-title-kr03">9월</p>
      <p class="font-body-kr02">30일 중 17일 연락했어요</p>
    </div>
    <div class="record-item">
      <p class="font-title-kr03">10월</p>
      <p class="font-body-kr02">31일 중 19일 연락했어요</p>
    </div>
    <div class="record-item">
      <p class="font-title-kr03">11월</p>
      <p class="font-body-kr02">30일 중 15일 연락했어요</p>
    </div>
    <div class="record-item">
      <p class="font-title-kr03">12월</p>
      <p class="font-body-kr02">31일 중 11일 연락했어요</p>
    </div>`;
}

// 뒤로가기 버튼
document.querySelector("#btn-move-back").addEventListener("click", function () {
  location.href = "./main.html";
});
