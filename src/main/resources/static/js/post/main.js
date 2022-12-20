window.onload = function () {
  //////////////////////////////////////////////
  // 테스트 코드
  makeSymptomPostList("");
  makeMostPostList("");
  fetch(
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/symptoms.json"
  )
    .then((response) => response.json())
    .then((data) => {
      makeSymtomList(data, "select-symptoms"); // 검색 키워드에 맞는 증상 태그 생성
      makeSymtomList(data, "search-symptoms"); // 검색시 추천 증상 태그 생성
    });
  //////////////////////////////////////////////

  /* 
  // 많이 찾은 포스트 목록 호출
  fetch("/post/recommendarticles")
    .then((response) => response.json())
    .then((data) => {
      makeMostPostList(data);
    });

  // 증상 목록 호출
  fetch("/symptoms")
    .then((response) => response.json())
    .then((data) => {
      makeSymptomPostList(data);
    });

  // 검색시 추천 증상 태그 호출
  fetch("/symptoms")
    .then((response) => response.json())
    .then((data) => {
      makeSymtomList(data, "search-symptoms"); // 검색시 추천 증상 태그 생성
    });
    */
};

// 스크롤 조정
// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   var div = document.querySelector(".blank-middle");
//   var divTop = div.getBoundingClientRect().top;
//   console.log("중간여백 높이:" + divTop);
// });

// most view 포스트 생성
function makeMostPostList(data) {
  //////////////////////////////////////////////
  // 테스트 코드
  for (let i = 1; i <= 10; i++) {
    let symptomTagName = "";
    let postTitle = "";
    let isSaved = "";
    let saveIcon = "";
    if (i % 2 == 1) {
      symptomTagName = `인터뷰`;
      postTitle = `딸에게 미안한 마음이에요`;
      isSaved = ``;
      saveIcon = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
                      fill="#121212"
                    />
                  </svg>`;
    } else {
      symptomTagName = `홍조`;
      postTitle = `자기 전 5분 꿀팁`;
      isSaved = `saved`;
      saveIcon = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
                      fill="#4BB158"
                    />
                  </svg>`;
    }
    document.querySelector(
      "#most-post-body"
    ).innerHTML += `<div class="most-post-item">
                      <div onclick="viewPost(${i})">
                        <span class="symptom_tag_span">${symptomTagName}</span>
                        <p class="most-post-text font-body-kr02">${postTitle}</p>
                      </div>
                      <span class="post-save-btn ${isSaved}" onclick="savePost(this, ${i})">
                        ${saveIcon}
                      </span>
                    </div>`;
  }
  //////////////////////////////////////////////

  /*
  data.articles.forEach((article) => {
    let symptomTagName = article.symptomNames[0];
    let postTitle = article.title;
    let isSaved = "";
    let saveIcon = "";

    if (article.isBookmark) {
      isSaved = `saved`;
      saveIcon = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
                      fill="#4BB158"
                    />
                  </svg>`;
    } else {
      isSaved = ``;
      saveIcon = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
                      fill="#121212"
                    />
                  </svg>`;
    }

    document.querySelector(
      "#most-post-body"
    ).innerHTML += `<div class="most-post-item" style="background-image: url(/post/articlevertthumbnail/${article.articleId});">
                      <div onclick="viewPost(${article.articleId})">
                        <span class="symptom_tag_span">${symptomTagName}</span>
                        <p class="most-post-text font-body-kr02">${postTitle}</p>
                      </div>
                      <span class="post-save-btn ${isSaved}" onclick="savePost(this, ${article.articleId})">
                        ${saveIcon}
                      </span>
                    </div>`;
  });
  */
}

// 증상별 포스트 생성
function makeSymptomPostList(data) {
  //////////////////////////////////////////////
  // 테스트 코드
  for (let i = 1; i <= 10; i++) {
    document.querySelector(
      "#symptom-post-body"
    ).innerHTML += `<div class="symptom-post-item" onclick="searchSymptomPost(${i})">
                      <p class="font-body-kr03">엄마의 얼굴이 붉어졌어요</p>
                      <p class="font-header-kr03">홍조</p>
                      <svg
                      width="10"
                        height="17"
                        viewBox="0 0 10 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                        d="M1.50743 17L0 15.4913L6.98514 8.5L0 1.50875L1.50743 0L10 8.5L1.50743 17Z"
                        fill="white"
                        />
                      </svg>
                    </div>`;
  }
  //////////////////////////////////////////////

  /*
  data.forEach((symptom) => {
    document.querySelector(
      "#symptom-post-body"
    ).innerHTML += `<div class="symptom-post-item" onclick="searchSymptomPost(${symptom.id})">
                      <p class="font-body-kr03">${symptom.description}</p>
                      <p class="font-header-kr03">${symptom.symptomName}</p>
                      <svg
                      width="10"
                        height="17"
                        viewBox="0 0 10 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                        d="M1.50743 17L0 15.4913L6.98514 8.5L0 1.50875L1.50743 0L10 8.5L1.50743 17Z"
                        fill="white"
                        />
                      </svg>
                    </div>`;
  });
  */
}

// 검색 아이콘 버튼
document.querySelector(".btn-search").addEventListener("click", function () {
  document.querySelector(".bottom-menu").style.display = "none";
  document.querySelector("#post-main").style.display = "none";
  document.querySelector("#post-search").style.display = "";
});

// 검색 입력 삭제 버튼
function removeInput() {
  document.querySelector("#input-search").value = "";
}
document
  .querySelector("#btn-search-remove")
  .addEventListener("click", removeInput);

// 검색 값 입력 이벤트 체크
document.querySelector("#input-search").addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    console.log(document.querySelector("#input-search").value + " 검색!!");
    document.querySelector("#select-symptoms").style.display = "";
    document.querySelector(
      "#post-list"
    ).innerHTML = `<div style="height: 130px" id="top_blank"></div>`; // 새로 검색할 때 보여지는 목록 초기화
    searchPost(document.querySelector("#input-search").value, checkResult);
  }
});

// 뒤로가기 버튼
document
  .querySelector("#btn-move-back")
  .addEventListener("click", returnToMain);
document
  .querySelector("#btn-move-back-sub")
  .addEventListener("click", returnToMain);

// 메인화면 초기화
function returnToMain() {
  removeInput(); // 검색 입력 삭제
  checkResult.clear(); // 선택된 태그 제거
  document.querySelector("#post-list").innerHTML = ``; // 포스트 목록 초기화
  document.querySelector("#post-list").style.display = "none";

  document.querySelector(".bottom-menu").style.display = "";
  document.querySelector("#post-main").style.display = "";
  document.querySelector("#post-search").style.display = "none";
  document.querySelector("#search-header").style.display = "";
  document.querySelector("#search-header-sub").style.display = "none";
  document.querySelector("#search-title").innerHTML = "";
  document.querySelector(".search-body").style.display = "";
  document.querySelector("#select-symptoms").style.display = "none";
}

// 메인 화면에서 검색된 화면으로 전환
function changeToSearch() {
  document.querySelector(".bottom-menu").style.display = "none";
  document.querySelector("#post-main").style.display = "none";
  document.querySelector("#post-search").style.display = "";
  document.querySelector("#search-header").style.display = "none";
  document.querySelector("#search-header-sub").style.display = "";
  document.querySelector(".search-body").style.display = "none";
  document.querySelector("#select-symptoms").style.display = "none";
}

// 포스트 더보기 버튼
document
  .querySelector("#most-post-header")
  .addEventListener("click", function () {
    console.log("포스트 더보기 클릭!!");
    searchSymptomPost(-1);
  });

// 포스트 보기 버튼
function viewPost(postId) {
  console.log(postId + "번 포스트 보기!!");
  location.href = "./view.html?postid=" + postId;
}

// 포스트 저장 버튼
function savePost(el, postId) {
  //////////////////////////////////////////////
  // 테스트 코드
  if (el.classList.contains("saved")) {
    console.log(postId + "번 포스트 저장 취소");
    el.innerHTML = `<svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
                        fill="#121212"
                      />
                      </svg>`;
  } else {
    console.log(postId + "번 포스트 저장");
    el.innerHTML = `<svg
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                    d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
                    fill="#4BB158"
                    />
                    </svg>`;
  }
  el.classList.toggle("saved");
  //////////////////////////////////////////////

  /*
  let isSuccess = false;
  if (el.classList.contains("saved")) {
    fetch(`/post/unmark?articleid=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 200) {
          isSuccess = true;
          el.innerHTML = `<svg
          width="14"
                      height="18"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      >
                      <path
                        d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
                        fill="#121212"
                        />
                    </svg>`;
        } else {
          alert("북마크 해제 실패하였습니다.");
        }
      });
  } else {
    fetch(`/post/bookmark?articleid=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 200) {
          isSuccess = true;
          el.innerHTML = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
                        fill="#4BB158"
                      />
                    </svg>`;
        } else {
          alert("북마크 설정 실패하였습니다.");
        }
      });
  }
  if (isSuccess) {
    el.classList.toggle("saved");
  }
  */
}

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

/* 증상 태그 관련 */
var symptoms = []; // 증상 태그 배열
var searchSymptoms = []; // 자주 검색하는 증상 태그 배열
var checkResult = new Set(); // 최종 체크한 결과 목록 (중복 허용 X)
var symptomIds = []; // 서버에 요청할 태그 리스트

// 증상 배열 생성 및 생성
function makeSymtomList(data, elId) {
  //////////////////////////////////////////////
  // 테스트 코드
  if (elId == "select-symptoms") {
    data.symptoms.forEach((symptom) => {
      let symptomLabel = document.createElement("label");
      symptomLabel.classList.add("symptom_tag_medium");
      symptomLabel.innerHTML = `<input type="checkbox" class="${elId}-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
      document.querySelector(`#${elId}`).appendChild(symptomLabel);
    });
    symptoms = document.querySelectorAll(`.${elId}-check`);
  } else if (elId == "search-symptoms") {
    data.symptoms.forEach((symptom) => {
      if (symptom.id > 8) {
        return false;
      }
      let symptomLabel = document.createElement("label");
      symptomLabel.classList.add("symptom_tag_medium");
      symptomLabel.innerHTML = `<input type="checkbox" class="${elId}-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
      document.querySelector(`#${elId}`).appendChild(symptomLabel);
    });
    searchSymptoms = document.querySelectorAll(`.${elId}-check`);
  }
  //////////////////////////////////////////////

  /*
  data.forEach((symptom) => {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" class="${elId}-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
    document.querySelector(`#${elId}`).appendChild(symptomLabel);
  });
  if (elId == "select-symptoms") {
    symptoms = document.querySelectorAll(`.${elId}-check`);
  } else if (elId == "search-symptoms") {
    searchSymptoms = document.querySelectorAll(`.${elId}-check`);
  }
*/
}

// 증상태그 체크 이벤트
document.addEventListener("input", function () {
  for (var checkSymptom of symptoms) {
    checkSymptom.addEventListener("change", function (event) {
      if (event.target.checked) {
        // 체크된 경우 배열에 추가
        checkResult.add(event.target.value);
      } else {
        // 체크가 풀리는 경우 배열에서 삭제
        checkResult.delete(event.target.value);
      }
      selectTag();
    });
  }
  for (var searchSymptom of searchSymptoms) {
    searchSymptom.addEventListener("change", function (event) {
      if (event.target.checked) {
        // 체크된 경우 배열에 추가
        checkResult.clear();
        checkResult.add(event.target.value);
      } else {
        // 체크가 풀리는 경우 배열에서 삭제
        checkResult.delete(event.target.value);
      }
      searchSymptomPost(event.target.value);
      event.target.checked = false;
    });
  }
});

// 증상 태그 옵션 선택
function selectTag() {
  document.querySelector(
    "#post-list"
  ).innerHTML = `<div style="height: 130px" id="top_blank"></div>`; // 새로 검색할 때 보여지는 목록 초기화
  if (checkResult.size > 0) {
    // 선택한 항목이 있다면 검색 실행
    searchPost(document.querySelector("#input-search").value, checkResult);
  } else {
    // 선택한 항목이 없다면 초기 상태로 초기화
    searchPost(document.querySelector("#input-search").value, checkResult); // 필터링된 게시글 초기화
  }
}

// 증상별 포스트 검색
function searchSymptomPost(symptomId) {
  console.log(symptomId + "번 증상 포스트 검색!!");
  let tagName = "";
  if (checkResult.size == 0 && symptomId == -1) {
    // 추천 포스트 더보기
    tagName = "추천 포스트";
    checkResult.add(-1);
  } else {
    //////////////////////
    // 테스트 코드
    tagName = "홍조";
    //////////////////////

    /* fetch("/symptoms")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((symptom) => {
          if (symptom.id == symptomId) {
            tagName = symptom.symptomName;
          }
        });
      });
      */
  }
  changeToSearch();
  document.querySelector("#search-title").innerHTML = tagName;
  document.querySelector(
    "#post-list"
  ).innerHTML = `<div style="height: 70px" id="top_blank"></div>`; // 새로 검색할 때 보여지는 목록 초기화
  searchPost(document.querySelector("#input-search").value, checkResult);
}

// 무한스크롤에서 사용할 변수
var pageNum = -1;
var isNextPage = true;

// 무한 스크롤
var intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries[0].intersectionRatio <= 0) return;

  console.log("다음 페이지 존재 여부 : " + isNextPage);
  if (!isNextPage) {
    console.log("더 이상 불러올 페이지가 없습니다!");
    return;
  }

  // 다음 페이지가 존재하는 경우만 추가
  pageNum++;
  console.log("Loaded new content -> pageNum : " + pageNum);

  // 서버 요청 부분
  /*let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keyword: keyword,
      symptoms: symptomIds,
      pageNum: pageNum,
    }),
  };
  fetch("/post/searchedarticles", config)
    .then((response) => response.json())
    .then((data) => {
      makePostList(data);
    });
    */
});
// start observing
intersectionObserver.observe(document.querySelector("#scrollerFooter"));

// 포스트 검색 (키워드, 태그)
function searchPost(searchValue, selectedSymptoms) {
  /* pageNum = 0;
  symptomIds = [];
  searchSymptoms.forEach(function (symptomId) {
    symptomIds.push(symptomId * 1);
  });
  keyword = searchValue;

  console.log("검색 키워드 : " + searchValue);
  console.log("검색 태그 : ");
  console.log(selectedSymptoms);

  // 추천 포스트 더보기
  if (selectedSymptoms.has(-1)) {
    fetch("/post/recommendarticles")
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#post-list").innerHTML = ``; // 새로 검색할 때 보여지는 목록 초기회
        makePostList(data);
      });
  } else {
    // 검색 키워드에 맞는 증상 태그 호출
    fetch(`/post/searchedsymptom?keyword=${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        makeSymtomList(data, "select-symptoms"); // 검색 키워드에 맞는 증상 태그 생성
      });
    // 포스트 검색 호출
    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword: keyword,
        symptoms: symptomIds,
        pageNum: pageNum,
      }),
    };
    fetch("/post/searchedarticles", config)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#post-list").innerHTML = ``; // 새로 검색할 때 보여지는 목록 초기회
        makePostList(data);
      });
  }
  document.querySelector(".search-body").style.display = "none";
  document.querySelector("#post-list").style.display = "";
  */

  /////////////////////////////////////////////////////////////
  // 테스트 코드
  let searchPostSize = 0; // 검색된 피드 개수
  document.querySelector(".search-body").style.display = "none";
  if (
    searchValue == "검색" ||
    searchValue == "테스트" ||
    checkResult.size == 1
  ) {
    searchPostSize++;
  }
  // 검색 키워드 / 태그가 있다면 태그와 함께 포스트 제목/내용에 포함되어 있는 경우
  if (searchPostSize > 0) {
    document.querySelector("#post-list").innerHTML += `
      <div class="post-item">
      <div onclick="viewPost(1)">
        <img src="../../static/img/post_img_1.png" alt="post img" />
        <span class="symptom_tag_span">인터뷰</span>
        <p class="font-body-kr02">딸에게 미안한 마음이에요</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 1)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
    <div class="post-item">
      <div onclick="viewPost(2)">
        <img src="../../static/img/post_img_2.png" alt="post img" />
        <span class="symptom_tag_span">홍조</span>
        <p class="font-body-kr02">자기 전 5분 꿀팁</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 2)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
    <div class="post-item">
      <div onclick="viewPost(3)">
        <img src="../../static/img/post_img_3.png" alt="post img" />
        <span class="symptom_tag_span">체중 증가</span>
        <p class="font-body-kr02">좋은 영양제 찾는 방법</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 3)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
    <div class="post-item">
      <div onclick="viewPost(4)">
        <img src="../../static/img/post_img_4.png" alt="post img" />
        <span class="symptom_tag_span">우울감</span>
        <p class="font-body-kr02">엄마의 감정을 이끌어내요</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 4)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
    <div class="post-item">
      <div onclick="viewPost(5)">
        <img src="../../static/img/post_img_1.png" alt="post img" />
        <span class="symptom_tag_span">태그명</span>
        <p class="font-body-kr02">포스트 제목</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 5)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
            fill="#4BB158"
          />
        </svg>
      </span>
    </div>
    <div class="post-item">
      <div onclick="viewPost(6)">
        <img src="../../static/img/post_img_2.png" alt="post img" />
        <span class="symptom_tag_span">태그명</span>
        <p class="font-body-kr02">포스트 제목</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 6)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
            fill="#121212"
          />
        </svg>
      </span>
    </div>
    <div class="post-item">
      <div onclick="viewPost(7)">
        <img src="../../static/img/post_img_3.png" alt="post img" />
        <span class="symptom_tag_span">태그명</span>
        <p class="font-body-kr02">포스트 제목</p>
      </div>
      <span class="post-save-btn" onclick="savePost(this, 7)">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
            fill="#4BB158"
          />
        </svg>
      </span>
    </div>`;
  }
  // 검색된 포스트가 없는 경우
  else if (searchPostSize == 0) {
    document.querySelector("#select-symptoms").style.display = "none";
    document.querySelector(
      "#post-list"
    ).innerHTML = `<div class="search-body" style="position: absolute;top: 74px;left: 24px;text-align:left">
                    <p class="font-body-kr01">지금은 포스트가 준비되어 있지 않아요 🥲 
                                              <br>제안을 보내주시면 얼른 준비할게요</p>
                  </div>
                  <button class="button-ghost-default" onclick="moveSuggestion()" style="position:absolute; top:175px; left:132px; padding: 7px 15px 9px; border-radius: 15px;">주제 제안하기</button>`;
  }
  document.querySelector("#post-list").style.display = "";
  /////////////////////////////////////////////////////////////////
}

// 받은 data를 가지고 포스트 리스트 생성
function makePostList(data) {
  if (data.isNextPage) {
    isNextPage = true;
  } else {
    isNextPage = false;
  }

  // 검색된 글이 없는 경우
  if (data.articles.length == 0) {
    document.querySelector("#select-symptoms").style.display = "none";
    document.querySelector(
      "#post-list"
    ).innerHTML = `<div class="search-body" style="position: absolute;top: 74px;left: 24px;text-align:left">
                    <p class="font-body-kr01">지금은 포스트가 준비되어 있지 않아요 🥲 
                                              <br>제안을 보내주시면 얼른 준비할게요</p>
                  </div>
                  <button class="button-ghost-default" onclick="moveSuggestion()" style="position:absolute; top:175px; left:132px; padding: 7px 15px 9px; border-radius: 15px;">주제 제안하기</button>`;
  } else {
    // 게시글이 있는 경우
    data.articles.forEach((article) => {
      let postSymptomTag = ``;
      for (let symptom of article.symptomNames) {
        postSymptomTag += `<span class="symptom_tag_span">${symptom}</span>`;
      }

      let isSaved = "";
      let saveIcon = "";
      if (article.isBookmark) {
        isSaved = `saved`;
        saveIcon = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18Z"
                      fill="#4BB158"
                    />
                  </svg>`;
      } else {
        isSaved = ``;
        saveIcon = `<svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
                      fill="#121212"
                    />
                  </svg>`;
      }

      document.querySelector("#post-list").innerHTML += `
        <div class="post-item">
          <div onclick="viewPost(${article.articleId})">
            <img src="/post/articlesquarethumbnail/${article.articleId}" alt="post img" />
            ${postSymptomTag}
            <p class="font-body-kr02">${article.title}</p>
          </div>
          <span class="post-save-btn ${isSaved}" onclick="savePost(this, ${article.articleId})">
            ${saveIcon}
          </span>
        </div>`;
    });
  }
}

// 포스트 주제 제안하기 버튼
function moveSuggestion() {
  console.log("주제 제안하러 가기!!");
  location.href = "./suggest.html";
}
