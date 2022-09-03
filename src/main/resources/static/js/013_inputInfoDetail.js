var progress = document.querySelector("#progress-bar");
var question = document.querySelector("#question");
var step1Div = document.querySelector("#select-symptoms");
var step2Div = document.querySelector("#select-date");
var step3Div = document.querySelector("#input-date");
var nextBtn = document.querySelector("#btn-next");
var step = 1; // 단계를 나타내는 변수
var isCheck = false; // 답변에 입력했는지 체크 변수
var nick; // 닉네임 변수
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
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)

// 페이지 로딩시 닉네임 쿼리 확인 및 증상 태그 생성
window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  nick = urlParams.get("nick");

  for (let symptom of symptoms) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" name="symptom" id="symptom-check" value="${symptom}"/><span>${symptom}</span>`;
    step1Div.appendChild(symptomLabel);
  }
  checkboxList = document.querySelectorAll("input[type=checkbox]");
  console.log(checkboxList);
};

// 체크박스 클릭 이벤트 체크
document.addEventListener(
  "input",
  function () {
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
          // 선택한 항목이 있다면 버튼 활성화
          nextBtn.classList.remove("button-elevated-disabled");
          nextBtn.classList.add("button-elevated-default");
          isCheck = true;
        } else {
          // 선택한 항목이 없다면 버튼 비활성화
          nextBtn.classList.remove("button-elevated-default");
          nextBtn.classList.add("button-elevated-disabled");
          isCheck = false;
        }
      });
    }
  },
  false
);

// 하단 버튼 클릭시 상황에 따른 작동
nextBtn.addEventListener("click", function () {
  if (isCheck) {
    if (step == 1) {
      // 1단계
      question.innerHTML = "엄마의 갱년기를 알게 된 지<br>얼마나 되었나요?";
      step1Div.style.display = "none";
      step2Div.style.display = "block";
      nextBtn.classList.remove("button-elevated-default");
      nextBtn.classList.add("button-elevated-disabled");
      isCheck = false;
      step++;
      console.log(checkResult);
    } else if (step == 2) {
      // 2단계
      question.innerHTML = "엄마와 내가<br>태어난 연도는 언제인가요?";
      step2Div.style.display = "none";
      step3Div.style.display = "block";
      nextBtn.innerText = "포메스트 시작하기";
      nextBtn.classList.remove("button-elevated-default");
      nextBtn.classList.add("button-elevated-disabled");
      isCheck = false;
      step++;
    } else if (step == 3) {
      // 3단계
      //////////////////////////////////////////////
      // 서버에 데이터 보내기
      // 기본정보 입력이 끝난 후 -> 2 포스트 페이지로 교체
      location.replace("./200_post.html");
      ///////////////////////////////////////////////
    } else {
      // 1, 2, 3단계 외의 버튼 클릭인 경우
      alert("잘못된 접근입니다!!");
    }
  }
});