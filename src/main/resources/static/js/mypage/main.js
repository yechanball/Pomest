window.onload = function () {
  // 닉네임 호출
  document.querySelector("#textbox").value = "옴따가랭이";
  document.querySelector("#textbox").readOnly = true;

  // 관심 있는 증상 목록 호출
  fetch(
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/symptoms.json"
  )
    .then((response) => response.json())
    .then((data) => {
      makeSymptomList(data.symptoms.slice(0, 8));
      makeSymptomListAll(data.symptoms);
    });
};

// 관심 있는 증상 목록 생성
function makeSymptomList(data) {
  document.querySelector("#selected-symptoms").innerHTML = ``;
  if (data.length > 0) {
    data.forEach((symptom) => {
      let symptomLabel = document.createElement("label");
      symptomLabel.classList.add("symptom_tag_medium");
      symptomLabel.innerHTML = `<span>${symptom.symptomName}</span>`;
      document.querySelector("#selected-symptoms").appendChild(symptomLabel);
    });
  } else {
    document.querySelector("#selected-symptoms").innerHTML = `
      <p class="font-detail-kr02" style="text-align: left; color: #8a8a8a">
        편집 버튼을 클릭해 관심 증상을 추가해보세요.
        <br />증상에 맞춰 꼭 필요한 정보 위주로 추천해드려요 :)
      </p>`;
  }
}

var symptoms = []; // 증상 태그 배열
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)

// 증상 목록 생성
function makeSymptomListAll(data) {
  document.querySelector("#symptom-list").innerHTML = ``;
  // data.forEach((symptom) => {
  //   symptoms.push(symptom);
  //   let symptomLabel = document.createElement("label");
  //   symptomLabel.classList.add("symptom_tag_medium");
  //   symptomLabel.innerHTML = `<input type="checkbox" name="symptom" id="symptom-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
  //   document.querySelector("#symptom-list").appendChild(symptomLabel);
  // });
  // checkboxList = document.querySelectorAll("input[type=checkbox]");

  // 테스트 코드
  let idx = 0;
  data.forEach((symptom) => {
    symptoms.push(symptom);
    if (idx < 8) {
      let symptomLabel = document.createElement("label");
      symptomLabel.classList.add("symptom_tag_medium");
      symptomLabel.innerHTML = `<input type="checkbox" name="symptom" id="symptom-check" value="${symptom.id}" checked/><span>${symptom.symptomName}</span>`;
      document.querySelector("#symptom-list").appendChild(symptomLabel);
      checkResult.add(symptom.id);
    } else {
      let symptomLabel = document.createElement("label");
      symptomLabel.classList.add("symptom_tag_medium");
      symptomLabel.innerHTML = `<input type="checkbox" name="symptom" id="symptom-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
      document.querySelector("#symptom-list").appendChild(symptomLabel);
    }
    idx++;
  });
  checkboxList = document.querySelectorAll("input[type=checkbox]");
}

// 체크박스 및 라디오박스 클릭 이벤트 체크
document.addEventListener("input", function () {
  for (var checkbox of checkboxList) {
    checkbox.addEventListener("change", function (event) {
      if (event.target.checked) {
        checkResult.add(event.target.value);
      } else {
        checkResult.delete(event.target.value);
      }
    });
  }
});

// 적용하기 버튼
document
  .querySelector("#btn-symptom-submit")
  .addEventListener("click", function () {
    document.querySelector("#selected-symptoms").innerHTML = ``;
    console.log(checkResult);
    if (checkResult.size > 0) {
      for (let symptom of checkResult) {
        let symptomLabel = document.createElement("label");
        symptomLabel.classList.add("symptom_tag_medium");
        symptomLabel.innerHTML = `<span>${
          symptoms[symptom - 1].symptomName
        }</span>`;
        document.querySelector("#selected-symptoms").appendChild(symptomLabel);
      }
    } else {
      document.querySelector("#selected-symptoms").innerHTML = `
        <p class="font-detail-kr02" style="text-align: left; color: #8a8a8a">
          편집 버튼을 클릭해 관심 증상을 추가해보세요.
          <br />증상에 맞춰 꼭 필요한 정보 위주로 추천해드려요 :)
        </p>`;
    }

    let symptomArr = [];
    checkResult.forEach(function (symptomId) {
      symptomArr.push(symptomId * 1);
    });
    // let config = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     symptomIds: symptomArr,
    //   }),
    // };
    // fetch("/mypage/modifymothersymptoms", config)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.code == 200) {
    //       document.querySelector(".symptom-wrap").style.display = "none";
    //       document.querySelector(".main-wrap").style.display = "";
    //     } else alert("증상 편집 중 에러가 발생하였습니다.");
    //   });
    document.querySelector(".symptom-wrap").style.display = "none";
    document.querySelector(".main-wrap").style.display = "";
  });

// 증상 편집 화면 전환
document.querySelector(".btn-symptom").addEventListener("click", () => {
  document.querySelector(".symptom-wrap").style.display = "";
  document.querySelector(".main-wrap").style.display = "none";
});
document.querySelector(".btn-move-back-2").addEventListener("click", () => {
  document.querySelector(".symptom-wrap").style.display = "none";
  document.querySelector(".main-wrap").style.display = "";
});

// 닉네임 수정
var textBox = document.querySelector("#textbox");
var textBoxMessage = document.querySelector("#textbox-message");
var submitBtn = document.querySelector("#btn-submit");

document.querySelector(".btn-nickname").addEventListener("click", () => {
  document.querySelector(".btn-nickname").style.display = "none";
  submitBtn.style.display = "";
  textBox.readOnly = false;
});

// textbox 입력 처리
textBox.addEventListener("keyup", function (e) {
  if (!textBox.readOnly) {
    if (e.keyCode == 13) {
      // enter를 입력받은 경우 닉네임 중복 체크 메서드를 실행
      checkOverlapNick(textBox.value);
    } else {
      // 다른 키가 입력된 경우
      submitBtn.classList.remove("button-ghost-default");
      submitBtn.classList.add("button-ghost-disabled");
      textBoxMessage.style.display = "none";
      textBox.classList.remove("textbox-success", "textbox-fail");
      textBox.classList.add("textbox-default");
    }
  }
});

// 닉네임 검증
function checkNickname(nickName, checkingOverlap) {
  if (
    nickName != 0 &&
    nickName.length <= 5 &&
    checkingOverlap &&
    checkKorNick(nickName)
  ) {
    // 닉네임이 한글 5자 이내이며 중복되지 않는 경우
    textBoxMessage.innerText = "사용 가능한 닉네임이에요";
    textBoxMessage.classList.remove("textbox-message-fail");
    textBoxMessage.classList.add("textbox-message-success");
    textBoxMessage.style.display = "";
    textBox.classList.remove("textbox-default", "textbox-fail");
    textBox.classList.add("textbox-success");
    submitBtn.classList.remove("button-ghost-disabled");
    submitBtn.classList.add("button-ghost-default");
    return true;
  } else {
    if (
      nickName.length == 0 ||
      nickName.length > 5 ||
      !checkKorNick(nickName)
    ) {
      // 닉네임이 한글이 아니거나, 5자가 넘는 경우
      textBoxMessage.innerText = "한글로 5자 이하의 닉네임만 사용할 수 있어요";
    } else {
      textBoxMessage.innerText = "이미 사용 중인 닉네임이에요";
    }
    textBoxMessage.classList.remove("textbox-message-success");
    textBoxMessage.classList.add("textbox-message-fail");
    textBoxMessage.style.display = "";
    textBox.classList.remove("textbox-success", "textbox-default");
    textBox.classList.add("textbox-fail");
    submitBtn.classList.remove("button-ghost-default");
    submitBtn.classList.add("button-ghost-disabled");
    return false;
  }
}

// 닉네임 중복 체크
function checkOverlapNick(nickName) {
  /*let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nickname: nickName,
    }),
  };
  fetch("/nicknameoverlap", config)
    .then((response) => response.json())
    .then((data) => {
      checkNickname(nickName, data.status);
    });*/

  // 테스트 코드
  var tempNick = "옴따가랭이"; // 임시 검증용 닉네임
  if (nickName == tempNick) return checkNickname(nickName, false);
  else return checkNickname(nickName, true);
}

// 닉네임 한글 체크
function checkKorNick(nickName) {
  let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  for (let i = 0; i < nickName.length; i++) {
    if (!checkKor.test(nickName.charAt(i))) {
      return false;
    }
  }
  return true;
}

// 닉네임 변경 버튼
document.querySelector("#btn-submit").addEventListener("click", function () {
  var nickName = textBox.value;
  if (checkOverlapNick(nickName)) {
    /*let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        changenick: nickName,
      }),
    };
    fetch("/mypage/modifynickname", config)
      .then((response) => response.json())
      .then((data) => {
        if ((data.code == 200)) {
          submitBtn.classList.remove("button-ghost-default");
          submitBtn.classList.add("button-ghost-disabled");
          textBoxMessage.style.display = "none";
          textBox.classList.remove("textbox-success", "textbox-fail");
          textBox.classList.add("textbox-default");

          document.querySelector(".btn-nickname").style.display = "";
          submitBtn.style.display = "none";
          textBox.readOnly = true;
        } else {
          alert("닉네임 변경 실패하였습니다.");
        }
      });*/

    // 테스트 코드
    submitBtn.classList.remove("button-ghost-default");
    submitBtn.classList.add("button-ghost-disabled");
    textBoxMessage.style.display = "none";
    textBox.classList.remove("textbox-success", "textbox-fail");
    textBox.classList.add("textbox-default");
    document.querySelector(".btn-nickname").style.display = "";
    submitBtn.style.display = "none";
    textBox.readOnly = true;
  }
});

// 설정 메뉴 전환
document.querySelector(".btn-setting").addEventListener("click", () => {
  document.querySelector(".setting-wrap").style.display = "";
  document.querySelector(".main-wrap").style.display = "none";
});
document.querySelector(".btn-move-back").addEventListener("click", () => {
  document.querySelector(".setting-wrap").style.display = "none";
  document.querySelector(".main-wrap").style.display = "";
});

// 설정 메뉴 클릭
document.querySelector(".btn-suggest").addEventListener("click", () => {
  // 외부 커피챗 링크로 이동
  window.open("https://forms.gle/ABp69hVa1LfUBTPG7", "_blank");
});
document.querySelector(".btn-tos").addEventListener("click", () => {
  console.log("서비스 이용약관 클릭");
});
document.querySelector(".btn-policy").addEventListener("click", () => {
  console.log("개인정보 처리방침 클릭");
});
document.querySelector(".btn-alarm").addEventListener("click", () => {
  console.log("알림 설정 클릭");
});
document.querySelector(".btn-logout").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "";
  document.querySelector("#popup-logout").style.display = "";
  document
    .querySelector("#popup-logout")
    .classList.add(
      "animate__animated",
      "animate__slideInUp",
      "animate__faster"
    );
});
document.querySelector(".btn-withdraw").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "";
  document.querySelector("#popup-withdraw").style.display = "";
  document
    .querySelector("#popup-withdraw")
    .classList.add(
      "animate__animated",
      "animate__slideInUp",
      "animate__faster"
    );
});

// 팝업 버튼
document
  .querySelector("#btn-popup-logout-close")
  .addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
    document.querySelector("#popup-logout").style.display = "none";
  });
document
  .querySelector("#btn-popup-withdraw-close")
  .addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
    document.querySelector("#popup-withdraw").style.display = "none";
  });
document
  .querySelector("#btn-logout-submit")
  .addEventListener("click", function () {
    location.href = "../landing/login.html";
  });
document
  .querySelector("#btn-withdraw-submit")
  .addEventListener("click", function () {
    location.href = "../mypage/withdraw.html";
  });

// 하단 메뉴 클릭시 이벤트 체크
var bottomMenus = document.querySelectorAll(".bottom-menu-item");
bottomMenus.forEach((bottomMenu) => {
  bottomMenu.addEventListener("click", function () {
    // TODO 하단 메뉴 클릭시 해당 메뉴 페이지로 이동
    let menuName = bottomMenu.getAttribute("value");
    if (menuName == "home") {
      location.href = "../home/main.html";
    } else if (menuName == "post") {
      location.href = "../post/main.html";
    } else if (menuName == "community") {
      location.href = "../community/main.html";
    } else if (menuName == "my") {
      location.href = "../mypage/main.html";
    }
  });
});
