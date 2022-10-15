var symptoms = []; // 증상 태그 배열
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)
var selectSymptoms = document.querySelector("#select-symptoms");

// 페이지 로딩시 증상 태그 생성
window.onload = function () {
  // 증상 json 정보 받기
  var requestSymtomURL =
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/symptoms.json";
  var requestSymtom = new XMLHttpRequest();
  requestSymtom.open("GET", requestSymtomURL);
  requestSymtom.responseType = "json";
  requestSymtom.send();

  requestSymtom.onload = function () {
    data = requestSymtom.response;
    console.log(data);
    makeSymtomList(data);
  };

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
    let content = document.querySelector("#input-content").value;
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
  if (document.querySelector("#input-content").value.length > 0) {
    alert(document.querySelector("#input-content").value + " 내용으로 글쓰기!");
    location.href = "./main.html";
  }
});
