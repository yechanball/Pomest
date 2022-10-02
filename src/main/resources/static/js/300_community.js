var feedList = []; // 게시글 배열
var symptoms = []; // 증상 태그 배열 -> 실제 서버에서 목록 가지고오기
var hotSymptoms = []; // 자주 검색하는 증상 태그 배열 -> 실제 서버에서 목록 가지고오기
var selectSymptoms = document.querySelector("#select-symptoms");
var checkboxList = []; // 체크박스 리스트
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)

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
    makeHotSymtomList(data);
  };

  // 게시글 json 정보 받기
  var requestPostURL =
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/posts.json";
  var requestPost = new XMLHttpRequest();
  requestPost.open("GET", requestPostURL);
  requestPost.responseType = "json";
  requestPost.send();

  requestPost.onload = function () {
    data = requestPost.response;
    console.log(data);
    makeFeedList(data);
  };
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

// 자주 검색하는 태그 배열 생성
function makeHotSymtomList(data) {
  data.symptoms.forEach((symptom) => {
    if (symptom.id > 8) {
      return false;
    }
    hotSymptoms.push(symptom);
  });
  for (let symptom of hotSymptoms) {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" name="searchsymptom" id="search-symptom-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
    document.querySelector("#search-symptoms").appendChild(symptomLabel);
  }
}

// 받은 data를 가지고 피드 리스트 생성
function makeFeedList(data) {
  data.posts.forEach((feed) => {
    feedList.push(feed);

    let feedItem = document.createElement("div");
    feedItem.classList.add("feed-item");
    feedItem.setAttribute("postid", feed.postId);
    feedItem.setAttribute("symtomid", feed.symptoms.id);
    feedItem.setAttribute("onclick", "clickFeed(" + feed.postId + ")");
    let showDate = calcDate(feed.postDate);

    feedItem.innerHTML = `<div class="feed-item-top">
              <span class="symptom_tag_span">${feed.symptoms.symptomName}</span>
              <span class="font-detail-kr01"
                >${feed.userNickname}&emsp;${showDate}</span
              >
            </div>
            <div class="feed-item-content">
              <p class="font-body-kr03">${feed.content}</p>
            </div>
            <div class="feed-item-bottom">
              <span class="feed-item-like" value="unlike">
                <svg
                  width="14"
                  height="13"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66667 12.2333L5.7 11.3667C4.57778 10.3556 3.65 9.48333 2.91667 8.75C2.18333 8.01667 1.6 7.35822 1.16667 6.77467C0.733333 6.19156 0.430667 5.65556 0.258667 5.16667C0.0862222 4.67778 0 4.17778 0 3.66667C0 2.62222 0.35 1.75 1.05 1.05C1.75 0.35 2.62222 0 3.66667 0C4.24444 0 4.79444 0.122222 5.31667 0.366667C5.83889 0.611111 6.28889 0.955556 6.66667 1.4C7.04444 0.955556 7.49444 0.611111 8.01667 0.366667C8.53889 0.122222 9.08889 0 9.66667 0C10.7111 0 11.5833 0.35 12.2833 1.05C12.9833 1.75 13.3333 2.62222 13.3333 3.66667C13.3333 4.17778 13.2473 4.67778 13.0753 5.16667C12.9029 5.65556 12.6 6.19156 12.1667 6.77467C11.7333 7.35822 11.15 8.01667 10.4167 8.75C9.68333 9.48333 8.75556 10.3556 7.63333 11.3667L6.66667 12.2333ZM6.66667 10.4333C7.73333 9.47778 8.61111 8.65822 9.3 7.97467C9.98889 7.29156 10.5333 6.69733 10.9333 6.192C11.3333 5.68622 11.6111 5.236 11.7667 4.84133C11.9222 4.44711 12 4.05556 12 3.66667C12 3 11.7778 2.44444 11.3333 2C10.8889 1.55556 10.3333 1.33333 9.66667 1.33333C9.14444 1.33333 8.66111 1.48044 8.21667 1.77467C7.77222 2.06933 7.46667 2.44444 7.3 2.9H6.03333C5.86667 2.44444 5.56111 2.06933 5.11667 1.77467C4.67222 1.48044 4.18889 1.33333 3.66667 1.33333C3 1.33333 2.44444 1.55556 2 2C1.55556 2.44444 1.33333 3 1.33333 3.66667C1.33333 4.05556 1.41111 4.44711 1.56667 4.84133C1.72222 5.236 2 5.68622 2.4 6.192C2.8 6.69733 3.34444 7.29156 4.03333 7.97467C4.72222 8.65822 5.6 9.47778 6.66667 10.4333Z"
                    fill="#121212"
                  />
                </svg>
              </span>
              <span>${feed.numLike}&nbsp;</span>
              <span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.333252 13.6663V1.66634C0.333252 1.29967 0.463919 0.985674 0.725252 0.724341C0.986141 0.463452 1.29992 0.333008 1.66659 0.333008H12.3333C12.6999 0.333008 13.0139 0.463452 13.2753 0.724341C13.5361 0.985674 13.6666 1.29967 13.6666 1.66634V9.66634C13.6666 10.033 13.5361 10.347 13.2753 10.6083C13.0139 10.8692 12.6999 10.9997 12.3333 10.9997H2.99992L0.333252 13.6663ZM1.66659 10.4497L2.44992 9.66634H12.3333V1.66634H1.66659V10.4497Z"
                    fill="#121212"
                  />
                </svg>
              </span>
              <span>${feed.numComment}</span>
            </div>
            <div class="feed-item-bottom-line"></div>`;
    document.querySelector(".feed-list").appendChild(feedItem);
  });
}

// 화면에 보여질 날짜 포맷 변환
function calcDate(postDate) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  var dateSplit = postDate.split(" ");
  var dateSplitSub1 = dateSplit[0].split(".");
  var dateSplitSub2 = dateSplit[1].split(":");
  var postYear = dateSplitSub1[0];
  var postMonth = dateSplitSub1[1];
  var postDay = dateSplitSub1[2];
  var postHours = dateSplitSub2[0];
  var postMinutes = dateSplitSub2[1];
  var postSeconds = dateSplitSub2[2];

  if (postYear == year && postMonth == month && postDay == day) {
    let diff =
      parseInt(hours * 60) +
      parseInt(minutes) -
      (parseInt(postHours * 60) + parseInt(postMinutes));
    console.log(diff);
    if (diff <= 1) {
      return "지금";
    } else if (diff < 60) {
      return diff + "분 전";
    } else {
      return dateSplit[0].substr(2);
    }
  } else {
    return dateSplit[0].substr(2);
  }
}

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
        console.log("검색 태그 선택");
        document.querySelector(".feed-list").innerHTML = "";
        checkResult.forEach((symtomId) => {
          searchFeedByTag(symtomId);
        });
      } else {
        // TODO 선택한 항목이 없다면 초기 상태로 초기화
        searchFeed(""); // 필터링된 게시글 초기화
      }
    });
  }
});

// 검색 버튼 클릭시 이벤트 체크 : 커뮤니티 메인 화면에서 검색 화면으로 전환
document.querySelector(".search-header").style.display = "none";
document.querySelector(".search-body").style.display = "none";

document.querySelector(".btn-search").addEventListener("click", function () {
  document.querySelector(".header-top").style.display = "none";
  document.querySelector(".header-menu").style.display = "none";
  document.querySelector(".feed-list").style.display = "none";
  document.querySelector(".bottom-menu").style.display = "none";
  document.querySelector(".btn-fixed").style.display = "none";
  document.querySelector(".search-header").style.display = "";
  document.querySelector(".search-body").style.display = "";
});
document.querySelector("#btn-move-back").addEventListener("click", function () {
  searchFeed(""); // 필터링된 게시글 초기화
  document.querySelector(".header-top").style.display = "";
  document.querySelector(".header-menu").style.display = "";
  document.querySelector(".feed-list").style.display = "";
  document.querySelector(".bottom-menu").style.display = "";
  document.querySelector(".btn-fixed").style.display = "";
  document.querySelector(".search-header").style.display = "none";
  document.querySelector(".search-body").style.display = "none";
});

// 검색 값 입력 이벤트 체크
document.querySelector("#input-search").addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    document.querySelector(".header-menu").style.display = "";
    document.querySelector(".bottom-menu").style.display = "";
    document.querySelector(".btn-fixed").style.display = "";
    document.querySelector(".search-body").style.display = "none";
    console.log(document.querySelector("#input-search").value + " 검색!!");
    searchFeed(document.querySelector("#input-search").value);
  }
});

document
  .querySelector("#btn-search-remove")
  .addEventListener("click", function () {
    document.querySelector("#input-search").value = "";
  });

// 게시글 검색 (키워드)
function searchFeed(searchValue) {
  document.querySelector(".feed-list").innerHTML = "";
  feedList.forEach((feed) => {
    // 검색 키워드가 게시글 내용에 포함되어 있는 경우
    if (feed.content.includes(searchValue)) {
      let feedItem = document.createElement("div");
      feedItem.classList.add("feed-item");
      feedItem.setAttribute("postid", feed.postId);
      feedItem.setAttribute("symtomid", feed.symptoms.id);
      feedItem.setAttribute("onclick", "clickFeed(" + feed.postId + ")");
      let showDate = calcDate(feed.postDate);

      feedItem.innerHTML = `<div class="feed-item-top">
                <span class="symptom_tag_span">${feed.symptoms.symptomName}</span>
                <span class="font-detail-kr01"
                  >${feed.userNickname}&emsp;${showDate}</span
                >
              </div>
              <div class="feed-item-content">
                <p class="font-body-kr03">${feed.content}</p>
              </div>
              <div class="feed-item-bottom">
                <span class="feed-item-like" value="unlike">
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66667 12.2333L5.7 11.3667C4.57778 10.3556 3.65 9.48333 2.91667 8.75C2.18333 8.01667 1.6 7.35822 1.16667 6.77467C0.733333 6.19156 0.430667 5.65556 0.258667 5.16667C0.0862222 4.67778 0 4.17778 0 3.66667C0 2.62222 0.35 1.75 1.05 1.05C1.75 0.35 2.62222 0 3.66667 0C4.24444 0 4.79444 0.122222 5.31667 0.366667C5.83889 0.611111 6.28889 0.955556 6.66667 1.4C7.04444 0.955556 7.49444 0.611111 8.01667 0.366667C8.53889 0.122222 9.08889 0 9.66667 0C10.7111 0 11.5833 0.35 12.2833 1.05C12.9833 1.75 13.3333 2.62222 13.3333 3.66667C13.3333 4.17778 13.2473 4.67778 13.0753 5.16667C12.9029 5.65556 12.6 6.19156 12.1667 6.77467C11.7333 7.35822 11.15 8.01667 10.4167 8.75C9.68333 9.48333 8.75556 10.3556 7.63333 11.3667L6.66667 12.2333ZM6.66667 10.4333C7.73333 9.47778 8.61111 8.65822 9.3 7.97467C9.98889 7.29156 10.5333 6.69733 10.9333 6.192C11.3333 5.68622 11.6111 5.236 11.7667 4.84133C11.9222 4.44711 12 4.05556 12 3.66667C12 3 11.7778 2.44444 11.3333 2C10.8889 1.55556 10.3333 1.33333 9.66667 1.33333C9.14444 1.33333 8.66111 1.48044 8.21667 1.77467C7.77222 2.06933 7.46667 2.44444 7.3 2.9H6.03333C5.86667 2.44444 5.56111 2.06933 5.11667 1.77467C4.67222 1.48044 4.18889 1.33333 3.66667 1.33333C3 1.33333 2.44444 1.55556 2 2C1.55556 2.44444 1.33333 3 1.33333 3.66667C1.33333 4.05556 1.41111 4.44711 1.56667 4.84133C1.72222 5.236 2 5.68622 2.4 6.192C2.8 6.69733 3.34444 7.29156 4.03333 7.97467C4.72222 8.65822 5.6 9.47778 6.66667 10.4333Z"
                      fill="#121212"
                    />
                  </svg>
                </span>
                <span>${feed.numLike}&nbsp;</span>
                <span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.333252 13.6663V1.66634C0.333252 1.29967 0.463919 0.985674 0.725252 0.724341C0.986141 0.463452 1.29992 0.333008 1.66659 0.333008H12.3333C12.6999 0.333008 13.0139 0.463452 13.2753 0.724341C13.5361 0.985674 13.6666 1.29967 13.6666 1.66634V9.66634C13.6666 10.033 13.5361 10.347 13.2753 10.6083C13.0139 10.8692 12.6999 10.9997 12.3333 10.9997H2.99992L0.333252 13.6663ZM1.66659 10.4497L2.44992 9.66634H12.3333V1.66634H1.66659V10.4497Z"
                      fill="#121212"
                    />
                  </svg>
                </span>
                <span>${feed.numComment}</span>
              </div>
              <div class="feed-item-bottom-line"></div>`;
      document.querySelector(".feed-list").appendChild(feedItem);
    }
  });
  document.querySelector(".feed-list").style.display = "";
}

// 게시글 검색 (태그)
function searchFeedByTag(searchSymptomId) {
  feedList.forEach((feed) => {
    // 검색 키워드가 게시글 내용에 포함되어 있는 경우
    if (feed.symptoms.id == searchSymptomId) {
      let feedItem = document.createElement("div");
      feedItem.classList.add("feed-item");
      feedItem.setAttribute("postid", feed.postId);
      feedItem.setAttribute("symtomid", feed.symptoms.id);
      feedItem.setAttribute("onclick", "clickFeed(" + feed.postId + ")");
      let showDate = calcDate(feed.postDate);

      feedItem.innerHTML = `<div class="feed-item-top">
                <span class="symptom_tag_span">${feed.symptoms.symptomName}</span>
                <span class="font-detail-kr01"
                  >${feed.userNickname}&emsp;${showDate}</span
                >
              </div>
              <div class="feed-item-content">
                <p class="font-body-kr03">${feed.content}</p>
              </div>
              <div class="feed-item-bottom">
                <span class="feed-item-like" value="unlike">
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66667 12.2333L5.7 11.3667C4.57778 10.3556 3.65 9.48333 2.91667 8.75C2.18333 8.01667 1.6 7.35822 1.16667 6.77467C0.733333 6.19156 0.430667 5.65556 0.258667 5.16667C0.0862222 4.67778 0 4.17778 0 3.66667C0 2.62222 0.35 1.75 1.05 1.05C1.75 0.35 2.62222 0 3.66667 0C4.24444 0 4.79444 0.122222 5.31667 0.366667C5.83889 0.611111 6.28889 0.955556 6.66667 1.4C7.04444 0.955556 7.49444 0.611111 8.01667 0.366667C8.53889 0.122222 9.08889 0 9.66667 0C10.7111 0 11.5833 0.35 12.2833 1.05C12.9833 1.75 13.3333 2.62222 13.3333 3.66667C13.3333 4.17778 13.2473 4.67778 13.0753 5.16667C12.9029 5.65556 12.6 6.19156 12.1667 6.77467C11.7333 7.35822 11.15 8.01667 10.4167 8.75C9.68333 9.48333 8.75556 10.3556 7.63333 11.3667L6.66667 12.2333ZM6.66667 10.4333C7.73333 9.47778 8.61111 8.65822 9.3 7.97467C9.98889 7.29156 10.5333 6.69733 10.9333 6.192C11.3333 5.68622 11.6111 5.236 11.7667 4.84133C11.9222 4.44711 12 4.05556 12 3.66667C12 3 11.7778 2.44444 11.3333 2C10.8889 1.55556 10.3333 1.33333 9.66667 1.33333C9.14444 1.33333 8.66111 1.48044 8.21667 1.77467C7.77222 2.06933 7.46667 2.44444 7.3 2.9H6.03333C5.86667 2.44444 5.56111 2.06933 5.11667 1.77467C4.67222 1.48044 4.18889 1.33333 3.66667 1.33333C3 1.33333 2.44444 1.55556 2 2C1.55556 2.44444 1.33333 3 1.33333 3.66667C1.33333 4.05556 1.41111 4.44711 1.56667 4.84133C1.72222 5.236 2 5.68622 2.4 6.192C2.8 6.69733 3.34444 7.29156 4.03333 7.97467C4.72222 8.65822 5.6 9.47778 6.66667 10.4333Z"
                      fill="#121212"
                    />
                  </svg>
                </span>
                <span>${feed.numLike}&nbsp;</span>
                <span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.333252 13.6663V1.66634C0.333252 1.29967 0.463919 0.985674 0.725252 0.724341C0.986141 0.463452 1.29992 0.333008 1.66659 0.333008H12.3333C12.6999 0.333008 13.0139 0.463452 13.2753 0.724341C13.5361 0.985674 13.6666 1.29967 13.6666 1.66634V9.66634C13.6666 10.033 13.5361 10.347 13.2753 10.6083C13.0139 10.8692 12.6999 10.9997 12.3333 10.9997H2.99992L0.333252 13.6663ZM1.66659 10.4497L2.44992 9.66634H12.3333V1.66634H1.66659V10.4497Z"
                      fill="#121212"
                    />
                  </svg>
                </span>
                <span>${feed.numComment}</span>
              </div>
              <div class="feed-item-bottom-line"></div>`;
      document.querySelector(".feed-list").appendChild(feedItem);
    }
  });
  document.querySelector(".feed-list").style.display = "";
}

// 게시글 클릭시 이벤트 체크
function clickFeed(postId) {
  // TODO 게시글 클릭시 게시글 상세페이지로 이동
  alert(postId + "번 게시글 클릭");
  console.log(postId + "번 게시글 클릭");
  return false;
}

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
