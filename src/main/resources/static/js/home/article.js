window.onload = function () {
  // 테스트 코드
  fetch(
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/symptoms.json"
  )
    .then((response) => response.json())
    .then((data) => {
      makeSymptomList(data.symptoms);
    });
};

var symptomList = [];
var symptoms;
var checkResult = new Set();
let symptomIds = [];

// 증상 배열 생성 및 생성
function makeSymptomList(data) {
  // 테스트 코드
  data.forEach((symptom) => {
    symptomList.push(symptom);

    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" class="symptom-item" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
    document.querySelector(".symptom-list").appendChild(symptomLabel);
  });
  symptoms = document.querySelectorAll(".symptom-item");

  /*
  data.forEach((symptom) => {
    let symptomLabel = document.createElement("label");
    symptomLabel.classList.add("symptom_tag_medium");
    symptomLabel.innerHTML = `<input type="checkbox" class="${elId}-check" value="${symptom.id}"/><span>${symptom.symptomName}</span>`;
    document.querySelector(`#${elId}`).appendChild(symptomLabel);
  });
  symptoms = document.querySelectorAll(`.${elId}-check`);
*/
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

  // 테스트 코드
  fetch(
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/posts" +
      (pageNum + 1) +
      ".json"
  )
    .then((response) => response.json())
    .then((data) => {
      makeArticleList(data);
    });

  // 서버 요청 부분
  /*let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      symptoms: symptomIds,
      pageNum: pageNum,
    }),
  };
  fetch("", config)
    .then((response) => response.json())
    .then((data) => {
      makeArticleList(data);
    });
    */
});
// start observing
intersectionObserver.observe(document.querySelector("#scrollerFooter"));

var articleList = []; // 게시글 배열
function makeArticleList(data) {
  if (data.isNextPage) {
    isNextPage = true;
  } else {
    isNextPage = false;
  }

  data.posts.forEach((article) => {
    articleList.push(article);

    let articleItem = document.createElement("div");
    articleItem.classList.add("article-item");
    articleItem.setAttribute("postid", article.postId);
    articleItem.setAttribute("onclick", "clickArticle(" + article.postId + ")");
    let showDate = calcDate(article.postDate);

    let likeBtn;
    if (article.isUserLike) {
      likeBtn = `<span class="article-item-like" value="like">
            <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M6.665 12.2303L5.69857 11.3638C4.57663 10.353 3.64909 9.48096 2.91594 8.74781C2.18279 8.01466 1.5996 7.35638 1.16637 6.77297C0.73315 6.19001 0.430559 5.65414 0.258602 5.16537C0.0862007 4.67661 0 4.17673 0 3.66575C0 2.62157 0.349913 1.74956 1.04974 1.04974C1.74956 0.349912 2.62157 0 3.66575 0C4.24338 0 4.79325 0.122192 5.31534 0.366575C5.83743 0.610958 6.28732 0.955317 6.665 1.39965C7.04268 0.955317 7.49257 0.610958 8.01466 0.366575C8.53675 0.122192 9.08662 0 9.66425 0C10.7084 0 11.5804 0.349912 12.2803 1.04974C12.9801 1.74956 13.33 2.62157 13.33 3.66575C13.33 4.17673 13.244 4.67661 13.0721 5.16537C12.8997 5.65414 12.5968 6.19001 12.1636 6.77297C11.7304 7.35638 11.1472 8.01466 10.4141 8.74781C9.68091 9.48096 8.75337 10.353 7.63142 11.3638L6.665 12.2303Z"
            fill="#4BB158"
            />
            </svg>
            </span>`;
    } else {
      likeBtn = `<span class="article-item-like" value="unlike">
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
            </span>`;
    }

    let postSymptomTag = ``;
    for (let symptom of article.symptoms) {
      postSymptomTag += `<span class="symptom_tag_span">${symptom.symptomName}</span>`;
    }
    articleItem.innerHTML = `<div class="article-item-top">
        ${postSymptomTag}
        <span class="font-detail-kr01"
        >${"옴따가랭이"}&emsp;${showDate}</span
        >
        </div>
        <div class="article-item-content">
        <p class="font-body-kr03">${article.content}</p>
        </div>
        <div class="article-item-bottom">
        ${likeBtn}
        <span>${article.numLike}&nbsp;</span>
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
        <span>${article.numComment}</span>
        </div>
        <div class="article-item-bottom-line"></div>`;
    document.querySelector("#article-list").appendChild(articleItem);
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

  var dateSplit = postDate.split(" ");
  var dateSplitSub1 = dateSplit[0].split(".");
  var dateSplitSub2 = dateSplit[1].split(":");
  var postYear = dateSplitSub1[0];
  var postMonth = dateSplitSub1[1];
  var postDay = dateSplitSub1[2];
  var postHours = dateSplitSub2[0];
  var postMinutes = dateSplitSub2[1];

  if (postYear == year && postMonth == month && postDay == day) {
    let diff =
      parseInt(hours * 60) +
      parseInt(minutes) -
      (parseInt(postHours * 60) + parseInt(postMinutes));
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

// 증상 필터
document.addEventListener("input", function () {
  for (var symptom of symptoms) {
    symptom.addEventListener("change", function (event) {
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
});

// 게시글 검색 (키워드, 태그)
function selectTag() {
  console.log("검색 태그 [" + checkResult.size + "]");
  console.log(checkResult);

  symptomIds = [];
  checkResult.forEach(function (symptomId) {
    symptomIds.push(symptomId * 1);
  });

  let articleSize = 0; // 검색된 게시글 개수
  document.querySelector("#article-list").innerHTML = ``; // 새로 검색할 때 보여지는 목록 초기회
  isNextPage = false;

  articleList.forEach((article) => {
    // 검색 키워드 / 태그가 있다면 태그와 함께 게시글 내용에 포함되어 있는 경우
    let hasSymptom = false;

    for (let symptom of article.symptoms) {
      for (let searchSymptom of symptomIds) {
        if (searchSymptom == symptom.id) {
          hasSymptom = true;
          break;
        }
      }
    }

    if (hasSymptom) {
      articleSize++;

      let articleItem = document.createElement("div");
      articleItem.classList.add("article-item");
      articleItem.setAttribute("postid", article.postId);
      articleItem.setAttribute(
        "onclick",
        "clickArticle(" + article.postId + ")"
      );
      let showDate = calcDate(article.postDate);

      let postSymptomTag = ``;
      for (let symptom of article.symptoms) {
        postSymptomTag += `<span class="symptom_tag_span">${symptom.symptomName}</span>`;
      }
      articleItem.innerHTML = `<div class="article-item-top">
      ${postSymptomTag}
      <span class="font-detail-kr01"
      >${"옴따가랭이"}&emsp;${showDate}</span
      >
                  </div>
                  <div class="article-item-content">
                  <p class="font-body-kr03">${article.content}</p>
                  </div>
                  <div class="article-item-bottom">
                  <span class="article-item-like" value="unlike">
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
                  <span>${article.numLike}&nbsp;</span>
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
                  <span>${article.numComment}</span>
              </div>
              <div class="article-item-bottom-line"></div>`;
      document.querySelector("#article-list").appendChild(articleItem);
    }
  });

  if (checkResult.size == 0) {
    articleList.forEach((article) => {
      let articleItem = document.createElement("div");
      articleItem.classList.add("article-item");
      articleItem.setAttribute("postid", article.postId);
      articleItem.setAttribute(
        "onclick",
        "clickArticle(" + article.postId + ")"
      );
      let showDate = calcDate(article.postDate);

      let postSymptomTag = ``;
      for (let symptom of article.symptoms) {
        postSymptomTag += `<span class="symptom_tag_span">${symptom.symptomName}</span>`;
      }
      articleItem.innerHTML = `<div class="article-item-top">
        ${postSymptomTag}
        <span class="font-detail-kr01"
        >${"옴따가랭이"}&emsp;${showDate}</span
        >
                    </div>
                    <div class="article-item-content">
                    <p class="font-body-kr03">${article.content}</p>
                    </div>
                    <div class="article-item-bottom">
                    <span class="article-item-like" value="unlike">
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
                    <span>${article.numLike}&nbsp;</span>
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
                    <span>${article.numComment}</span>
                </div>
                <div class="article-item-bottom-line"></div>`;
      document.querySelector("#article-list").appendChild(articleItem);
    });
  }
}

// 댓글 쓴 글 보기 토글 버튼
document.querySelector("#toggle").addEventListener("click", function () {
  console.log("토글 클릭!");
});

// 게시글 클릭시 이벤트 체크
function clickArticle(postId) {
  // TODO 게시글 클릭시 게시글 상세페이지로 이동
  location.href = "../community/view.html?postid=" + postId;
}

// 뒤로가기 버튼
document.querySelector("#btn-move-back").addEventListener("click", function () {
  location.href = "./main.html";
});
