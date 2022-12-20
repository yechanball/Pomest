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

// 증상 배열 생성 및 생성
function makeSymptomList(data) {
  // 테스트 코드
  data.forEach((symptom) => {
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
  makePostList("");

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

function makePostList(data) {
  /*data.articles.forEach((article) => {
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
  });*/

  // 테스트 코드
  document.querySelector("#post-list").innerHTML += `
      <div class="post-item">
      <div onclick="viewPost(1)">
        <img src="../../static/img/post_img_1.png" alt="post img" />
        <span class="symptom_tag_span">인터뷰</span>
        <p class="font-body-kr02">딸에게 미안한 마음이에요</p>
      </div>
      <span class="post-save-btn saved" onclick="savePost(this, 1)">
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
      <div onclick="viewPost(2)">
        <img src="../../static/img/post_img_2.png" alt="post img" />
        <span class="symptom_tag_span">홍조</span>
        <p class="font-body-kr02">자기 전 5분 꿀팁</p>
      </div>
      <span class="post-save-btn saved" onclick="savePost(this, 2)">
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
      <div onclick="viewPost(3)">
        <img src="../../static/img/post_img_3.png" alt="post img" />
        <span class="symptom_tag_span">체중 증가</span>
        <p class="font-body-kr02">좋은 영양제 찾는 방법</p>
      </div>
      <span class="post-save-btn saved" onclick="savePost(this, 3)">
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
      <div onclick="viewPost(4)">
        <img src="../../static/img/post_img_4.png" alt="post img" />
        <span class="symptom_tag_span">우울감</span>
        <p class="font-body-kr02">엄마의 감정을 이끌어내요</p>
      </div>
      <span class="post-save-btn saved" onclick="savePost(this, 4)">
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
      <div onclick="viewPost(5)">
        <img src="../../static/img/post_img_1.png" alt="post img" />
        <span class="symptom_tag_span">태그명</span>
        <p class="font-body-kr02">포스트 제목</p>
      </div>
      <span class="post-save-btn saved" onclick="savePost(this, 5)">
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
      <span class="post-save-btn saved" onclick="savePost(this, 6)">
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
      <div onclick="viewPost(7)">
        <img src="../../static/img/post_img_3.png" alt="post img" />
        <span class="symptom_tag_span">태그명</span>
        <p class="font-body-kr02">포스트 제목</p>
      </div>
      <span class="post-save-btn saved" onclick="savePost(this, 7)">
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

// 포스트 저장 버튼
function savePost(el, postId) {
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
    document.querySelector("#post-list").removeChild(el.parentElement);
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

  /*
  if (el.classList.contains("saved")) {
    fetch(`/post/unmark?articleid=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.code == 200) {
          el.classList.remove("saved");
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
          el.classList.add("saved");
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
  */
}

// 포스트 보기 버튼
function viewPost(postId) {
  console.log(postId + "번 포스트 보기!!");
  location.href = "../post/view.html?postid=" + postId;
}

// 뒤로가기 버튼
document.querySelector("#btn-move-back").addEventListener("click", function () {
  location.href = "./main.html";
});
