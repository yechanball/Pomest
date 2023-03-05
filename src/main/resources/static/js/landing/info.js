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
  "피로감",
  "관절통",
  "의욕 저하",
  "불안함",
  "발한",
  "성욕 감소",
  "기억력 저하",
  "땀이 많이 남",
  "근골격계 질환",
  "배뇨통",
  "기타",
]; // 증상 태그 배열 -> 실제 서버에서 목록 가지고오기
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)
var radioboxList = []; // 라디오박스 리스트
var checkRadio; // 최종 체크한 라디오박스 값
var textBoxMom = document.querySelector("#birth-year-mom"); // 엄마 생년월일
var textBoxMy = document.querySelector("#birth-year-my"); // 나 생년월일

// progressbar
var bar = new ProgressBar.Line("#progress-bar-container", {
  easing: "easeInOut",
  duration: 500,
  color: "#4bb158",
  svgStyle: { width: "100%", height: "100%" },
});

// 페이지 로딩시 닉네임 쿼리 확인 및 증상 태그 생성
window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  nick = urlParams.get("nick");

  for (let symptom of symptoms) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" name="symptom" class="symptom-check" value="${symptom}"/><span>${symptom}</span>`;
    step1Div.appendChild(symptomLabel);
  }
  checkboxList = document.querySelectorAll("input[type=checkbox]");
  radioboxList = document.querySelectorAll("input[type=radio]");

  for (let year = 1990; year >= 1950; year--) {
    textBoxMom.innerHTML += `<option class="font-detail-kr02" value="${year}">${year}</option>`;
  }
  for (let year = 2014; year >= 1960; year--) {
    textBoxMy.innerHTML += `<option class="font-detail-kr02" value="${year}">${year}</option>`;
  }
};

// 체크박스 및 라디오박스 클릭 이벤트 체크
document.addEventListener(
  "input",
  function () {
    if (step == 1) {
      for (var checkbox of checkboxList) {
        checkbox.addEventListener("change", function (event) {
          if (event.target.checked) {
            // 체크된 경우 배열에 추가
            checkResult.add(event.target.value);
            event.target.parentElement.classList.add(
              "animate__animated",
              "animate__bounceIn",
              "animate_faster"
            );
          } else {
            // 체크가 풀리는 경우 배열에서 삭제
            checkResult.delete(event.target.value);
            event.target.parentElement.classList.remove(
              "animate__animated",
              "animate__bounceIn",
              "animate_faster"
            );
          }

          if (checkResult.size > 0) {
            // 선택한 항목이 있다면 버튼 활성화
            bar.animate(0.33);
            nextBtn.classList.remove("button-elevated-disabled");
            nextBtn.classList.add("button-elevated-default");
            isCheck = true;
          } else {
            // 선택한 항목이 없다면 버튼 비활성화
            bar.animate(0.0);
            nextBtn.classList.remove("button-elevated-default");
            nextBtn.classList.add("button-elevated-disabled");
            isCheck = false;
          }
        });
      }
    } else if (step == 2) {
      for (var radiobox of radioboxList) {
        radiobox.classList.remove(
          "animate__animated",
          "animate__bounceIn",
          "animate_faster"
        );
        radiobox.addEventListener("change", function (event) {
          if (event.target.checked) {
            // 체크한 라디오박스 값 저장
            checkRadio = event.target.value;
            event.target.classList.add(
              "animate__animated",
              "animate__bounceIn",
              "animate_faster"
            );
          }
          if (checkRadio) {
            // 선택한 항목이 있다면 버튼 활성화
            bar.animate(0.67);
            nextBtn.classList.remove("button-elevated-disabled");
            nextBtn.classList.add("button-elevated-default");
            isCheck = true;
          }
        });
      }
    }
  },
  false
);

// select 이벤트 체크
document.addEventListener(
  "change",
  function () {
    if (step == 3) {
      if (textBoxMom.value.length >= 4 && checkBirthMom()) {
        if (textBoxMy.value.length >= 4 && checkBirthMy()) {
          bar.animate(1.0);
          nextBtn.classList.remove("button-elevated-disabled");
          nextBtn.classList.add("button-elevated-default");
          isCheck = true;
        }
      } else {
        bar.animate(0.67);
        nextBtn.classList.remove("button-elevated-default");
        nextBtn.classList.add("button-elevated-disabled");
      }
    }
  },
  false
);

// 생년월일 확인
function checkBirthMom() {
  var inputText = textBoxMom.value; // 입력 받은 태어난년도

  if (inputText.length == 4 && inputText >= 1900 && inputText <= 2014) {
    // 4글자 숫자열, 1900년 이상 2014년 이하인 경우
    textBoxMom.classList.remove("textbox-fail");
    textBoxMom.classList.add("textbox-default");
    return true;
  } else {
    bar.animate(0.67);
    textBoxMom.classList.remove("textbox-default");
    textBoxMom.classList.add("textbox-fail");
    nextBtn.classList.remove("button-elevated-default");
    nextBtn.classList.add("button-elevated-disabled");
    isCheck = false;
    return false;
  }
}

function checkBirthMy() {
  var inputText = textBoxMy.value; // 입력 받은 태어난년도

  if (
    inputText.length == 4 &&
    inputText >= 1900 &&
    inputText <= 2014 &&
    textBoxMom.value < inputText
  ) {
    // 4글자 숫자열, 1900년 이상 2014년 이하인 경우
    textBoxMy.classList.remove("textbox-fail");
    textBoxMy.classList.add("textbox-default");
    return true;
  } else {
    bar.animate(0.67);
    textBoxMy.classList.remove("textbox-default");
    textBoxMy.classList.add("textbox-fail");
    nextBtn.classList.remove("button-elevated-default");
    nextBtn.classList.add("button-elevated-disabled");
    isCheck = false;
    return false;
  }
}

// 하단 버튼 클릭시 상황에 따른 작동
nextBtn.addEventListener("click", function () {
  if (isCheck) {
    if (step == 1) {
      // 1단계
      question.innerHTML = "엄마의 갱년기를 알게 된 지<br>얼마나 되었나요?";
      step1Div.style.display = "none";
      step2Div.style.display = "block";
      step2Div.classList.add(
        "animate__animated",
        "animate__fadeInRight",
        "animate__faster"
      );
      nextBtn.classList.remove("button-elevated-default");
      nextBtn.classList.add("button-elevated-disabled");
      isCheck = false;
      step++;
    } else if (step == 2) {
      // 2단계
      question.innerHTML = "엄마와 내가<br>태어난 연도는 언제인가요?";
      step2Div.style.display = "none";
      step3Div.style.display = "block";
      step3Div.classList.add(
        "animate__animated",
        "animate__fadeInRight",
        "animate__faster"
      );
      nextBtn.innerText = "포메스트 시작하기";
      nextBtn.classList.remove("button-elevated-default");
      nextBtn.classList.add("button-elevated-disabled");
      isCheck = false;
      step++;
    } else if (step == 3) {
      if (checkBirthMom() && checkBirthMy()) {
        // 3단계
        //////////////////////////////////////////////
        // 서버에 데이터 보내기
        // 닉네임 : nick
        // 증상태그 정보: checkResult
        // 기간 정보 : checkRadio
        // 생년월일 정보 : textBoxMom.value, textBoxMy.value
        // 기본정보 입력이 끝난 후 -> 2 포스트 페이지로 교체
        location.replace("../post/main.html");
        ///////////////////////////////////////////////
      }
    } else {
      // 1, 2, 3단계 외의 버튼 클릭인 경우
      alert("잘못된 접근입니다!!");
    }
  }
});
