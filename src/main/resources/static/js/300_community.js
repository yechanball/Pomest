var symptoms = [
  "홍조",
  "우울감",
  "집중력 저하",
  "수면의 어려움",
  "관절통",
  "의욕 저하",
  "기억력 저하",
  "피로감",
  "성욕 감소",
  "불안함",
  "땀이 많이 남",
  "배뇨통",
  "근골격계 질환",
  "발한",
  "기타",
]; // 증상 태그 배열 -> 실제 서버에서 목록 가지고오기
var selectSymptoms = document.querySelector("#select-symptoms");
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)

// 페이지 로딩시 증상 태그 생성
window.onload = function () {
  for (let symptom of symptoms) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" name="symptom" id="symptom-check" value="${symptom}"/><span>${symptom}</span>`;
    selectSymptoms.appendChild(symptomLabel);
  }
  checkboxList = document.querySelectorAll("input[type=checkbox]");
};

// 체크박스 및 라디오박스 클릭 이벤트 체크
document.addEventListener("input", function () {
  for (var checkbox of checkboxList) {
    checkbox.addEventListener("change", function (event) {
      if (event.target.checked) {
        // 체크된 경우 배열에 추가
        checkResult.add(event.target.value);
      } else {
        // 체크가 풀리는 경우 배열에서 삭제
        checkResult.delete(event.target.value);
      }

      if (checkResult.size > 0) {
        // TODO 선택한 항목이 있다면 검색 실행
      } else {
        // TODO 선택한 항목이 없다면 초기 상태로 초기화
      }
    });
  }
});

// 검색 버튼 클릭시 이벤트 체크
document.querySelector(".btn-search").addEventListener("click", function () {
  alert("검색 버튼 클릭!!!");
});

// 게시글 클릭시 이벤트 체크
var feedItems = document.querySelectorAll(".feed-item");
feedItems.forEach((feedItem) => {
  feedItem.addEventListener("click", function () {
    // TODO 게시글 클릭시 게시글 상세페이지로 이동
    alert(feedItem.getAttribute("value") + "번 게시글 클릭");
  });
});

// 작성하기 버튼 클릭시 이벤트 체크
document
  .querySelector("#btn-move-wirte")
  .addEventListener("click", function () {
    // TODO 작성하기 버튼 클릭시 글 작성 페이지로 이동
    alert("작성하기 버튼 클릭!!");
  });

// 하단 메뉴 클릭시 이벤트 체크
var bottomMenus = document.querySelectorAll(".bottom-menu-item");
bottomMenus.forEach((bottomMenu) => {
  bottomMenu.addEventListener("click", function () {
    // TODO 하단 메뉴 클릭시 해당 메뉴 페이지로 이동
    alert(bottomMenu.getAttribute("value") + " 메뉴 선택");
  });
});
