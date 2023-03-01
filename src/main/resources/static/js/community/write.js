var symptoms = []; // 증상 태그 배열
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)
var selectSymptoms = document.querySelector("#select-symptoms");

// 텍스트 에디터 세팅
$(document).ready(function () {
  $("#input-content").summernote({
    placeholder: "이야기를 나누면서 마음이 가뿐해지시면 좋겠어요",
    tabsize: 2,
    width: 312,
    height: 400,
    toolbar: [
      // ["style", ["style"]],
      // ["font", ["bold", "underline", "clear"]],
      // ["color", ["color"]],
      // ["para", ["paragraph"]],
    ],
  });
});

// 페이지 로딩시 증상 태그 생성
window.onload = function () {
  // 증상 json 정보 받기
  fetch(
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/symptoms.json"
  )
    .then((response) => response.json())
    .then((data) => {
      makeSymtomList(data);
    });

  // fetch("/symptoms")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     makeSymtomList(data);
  //   });

  document.querySelector(".main-write").style.display = "none";
};

// 증상 배열 생성 및 생성
function makeSymtomList(data) {
  data.symptoms.forEach((symptom) => {
    symptoms.push(symptom);
  });
  for (let symptom of symptoms) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" name="symptom" id="symptom-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
    selectSymptoms.appendChild(symptomLabel);
  }
  checkboxList = document.querySelectorAll("input[type=checkbox]");
}

// 체크박스 및 라디오박스 클릭 이벤트 체크
document.addEventListener("input", function () {
  for (var checkbox of checkboxList) {
    checkbox.addEventListener("change", function (event) {
      if (event.target.checked) {
        // 체크된 경우 배열에 추가
        if (checkResult.size < 2) {
          // 최대 선택 2가지
          checkResult.add(event.target.value);
          // 선택 개수가 2개인 경우 다른 버튼 비활성화
          if (checkResult.size == 2) {
            for (var cb of checkboxList) {
              if (!cb.checked) {
                cb.disabled = true;
              }
            }
          }
        }
      } else {
        // 체크가 풀리는 경우 배열에서 삭제
        checkResult.delete(event.target.value);
        for (var cb of checkboxList) {
          cb.disabled = false;
        }
      }
    });
  }
});

// 본문 작성 입력 받기
document
  .querySelector("#input-content")
  .addEventListener("keyup", function (e) {
    let content = document.querySelector(".note-editable").innerHTML;
    if (content.length > 0) {
      document
        .querySelector("#btn-complete")
        .classList.replace("button-ghost-disabled", "button-ghost-default");
    } else {
      document
        .querySelector("#btn-complete")
        .classList.replace("button-ghost-default", "button-ghost-disabled");
    }
  });

document.querySelector(".popup").style.display = "none";
// 다음 버튼 클릭 시
document.querySelector("#btn-next").addEventListener("click", function () {
  document.querySelector(".main-write").style.display = "";
  document.querySelector(".main-select").style.display = "none";
  document.querySelector("#selected-symptoms").innerHTML = ``;
  for (let symptom of checkResult) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<span>${
      symptoms[symptom - 1].symptomName
    }</span>`;
    document.querySelector("#selected-symptoms").appendChild(symptomLabel);
  }
});

// 뒤로가기 버튼 클릭 시
document.querySelector("#btn-move-back").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "";
  document
    .querySelector(".popup-box")
    .classList.add(
      "animate__animated",
      "animate__slideInUp",
      "animate__faster"
    );
});

// 팝업 버튼
document
  .querySelector("#btn-popup-close")
  .addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
  });
document.querySelector("#btn-delete").addEventListener("click", function () {
  location.href = "./main.html";
});

// 글작성 완료 버튼 클릭 시
document.querySelector("#btn-complete").addEventListener("click", function () {
  let content = document.querySelector(".note-editable").innerHTML;
  if (content.length > 0) {
    let symptomArr = [];
    checkResult.forEach(function (symptomId) {
      symptomArr.push(symptomId * 1);
    });

    /////////////////////////////////////////
    // 서버 요청 부분
    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: content,
        symptomIds: symptomArr,
      }),
    };
    fetch("/community/posting", config)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 200) location.href = "./main.html";
        else alert("글 작성 중 에러가 발생하였습니다.");
      });
    /////////////////////////////////////////
  }
});
