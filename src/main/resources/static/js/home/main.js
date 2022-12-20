window.onload = function () {
  // 테스트 코드
  makeCalendar("");
  makePostList("");

  // 저장된 콘텐츠 목록 호출
  /*fetch("")
    .then((response) => response.json())
    .then((data) => {
      makePostList(data);
    });*/
};

const week = ["일", "월", "화", "수", "목", "금", "토", "일"];

function makeCalendar(data) {
  var recordCal = document.querySelector("#record-calendar");
  recordCal.innerHTML = ``;

  let today;
  for (let i = 1; i <= 7; i++) {
    if (week[new Date().getDay()] == week[i]) {
      today = i;
    }
  }

  for (let i = 1; i <= today; i++) {
    // 체크된 경우
    let calIcon = `
        <div class="calendar-item-icon checked" onclick="calendarCheck(this)">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="17.5"
              fill="white"
              stroke="#4BB158"
            />
            <path
              d="M11 28V26H17V22H15C13.6167 22 12.4377 21.5123 11.463 20.537C10.4877 19.5623 10 18.3833 10 17C10 16 10.275 15.079 10.825 14.237C11.375 13.3957 12.1167 12.7833 13.05 12.4C13.2 11.15 13.746 10.104 14.688 9.262C15.6293 8.42067 16.7333 8 18 8C19.2667 8 20.3707 8.42067 21.312 9.262C22.254 10.104 22.8 11.15 22.95 12.4C23.8833 12.7833 24.625 13.3957 25.175 14.237C25.725 15.079 26 16 26 17C26 18.3833 25.5127 19.5623 24.538 20.537C23.5627 21.5123 22.3833 22 21 22H19V26H25V28H11Z"
              fill="#4BB158"
            />
          </svg>
        </div>`;

    let todayIcon = ``;
    if (week[new Date().getDay()] == week[i]) {
      todayIcon = `
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="5" fill="#4BB158" />
            </svg>`;
    }

    recordCal.innerHTML += `
        <div class="calendar-item">
          <div class="calendar-item-top">${todayIcon}</div>
          ${calIcon}
          <div class="font-detail-kr01">${week[i]}</div>
        </div>`;
  }

  for (let i = today + 1; i <= 7; i++) {
    // 비활성화
    let calIcon = `
        <div class="calendar-item-icon-disable">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="17.5"
              fill="#E5E5E5"
              stroke="#4BB158"
            />
            <path
              d="M11 28V26H17V22H15C13.6167 22 12.4377 21.5123 11.463 20.537C10.4877 19.5623 10 18.3833 10 17C10 16 10.275 15.079 10.825 14.237C11.375 13.3957 12.1167 12.7833 13.05 12.4C13.2 11.15 13.746 10.104 14.688 9.262C15.6293 8.42067 16.7333 8 18 8C19.2667 8 20.3707 8.42067 21.312 9.262C22.254 10.104 22.8 11.15 22.95 12.4C23.8833 12.7833 24.625 13.3957 25.175 14.237C25.725 15.079 26 16 26 17C26 18.3833 25.5127 19.5623 24.538 20.537C23.5627 21.5123 22.3833 22 21 22H19V26H25V28H11ZM15 20H21C21.8333 20 22.5417 19.7083 23.125 19.125C23.7083 18.5417 24 17.8333 24 17C24 16.4 23.8293 15.85 23.488 15.35C23.146 14.85 22.7 14.4833 22.15 14.25L21.1 13.8L20.95 12.65C20.85 11.9 20.521 11.2707 19.963 10.762C19.4043 10.254 18.75 10 18 10C17.25 10 16.596 10.254 16.038 10.762C15.4793 11.2707 15.15 11.9 15.05 12.65L14.9 13.8L13.85 14.25C13.3 14.4833 12.8543 14.85 12.513 15.35C12.171 15.85 12 16.4 12 17C12 17.8333 12.2917 18.5417 12.875 19.125C13.4583 19.7083 14.1667 20 15 20Z"
              fill="#121212"
            />
          </svg>
        </div>`;

    recordCal.innerHTML += `
      <div class="calendar-item">
        <div class="calendar-item-top"></div>
        ${calIcon}
        <div class="font-detail-kr01">${week[i]}</div>
      </div>`;
  }
}

function calendarCheck(el) {
  if (el.classList.contains("checked")) {
    el.innerHTML = `
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="17.5"
              fill="white"
              stroke="#4BB158"
            />
            <path
              d="M11 28V26H17V22H15C13.6167 22 12.4377 21.5123 11.463 20.537C10.4877 19.5623 10 18.3833 10 17C10 16 10.275 15.079 10.825 14.237C11.375 13.3957 12.1167 12.7833 13.05 12.4C13.2 11.15 13.746 10.104 14.688 9.262C15.6293 8.42067 16.7333 8 18 8C19.2667 8 20.3707 8.42067 21.312 9.262C22.254 10.104 22.8 11.15 22.95 12.4C23.8833 12.7833 24.625 13.3957 25.175 14.237C25.725 15.079 26 16 26 17C26 18.3833 25.5127 19.5623 24.538 20.537C23.5627 21.5123 22.3833 22 21 22H19V26H25V28H11ZM15 20H21C21.8333 20 22.5417 19.7083 23.125 19.125C23.7083 18.5417 24 17.8333 24 17C24 16.4 23.8293 15.85 23.488 15.35C23.146 14.85 22.7 14.4833 22.15 14.25L21.1 13.8L20.95 12.65C20.85 11.9 20.521 11.2707 19.963 10.762C19.4043 10.254 18.75 10 18 10C17.25 10 16.596 10.254 16.038 10.762C15.4793 11.2707 15.15 11.9 15.05 12.65L14.9 13.8L13.85 14.25C13.3 14.4833 12.8543 14.85 12.513 15.35C12.171 15.85 12 16.4 12 17C12 17.8333 12.2917 18.5417 12.875 19.125C13.4583 19.7083 14.1667 20 15 20Z"
              fill="#121212"
            />
          </svg>`;
    el.classList.remove("checked");
  } else {
    el.innerHTML = `
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="17.5"
              fill="white"
              stroke="#4BB158"
            />
            <path
              d="M11 28V26H17V22H15C13.6167 22 12.4377 21.5123 11.463 20.537C10.4877 19.5623 10 18.3833 10 17C10 16 10.275 15.079 10.825 14.237C11.375 13.3957 12.1167 12.7833 13.05 12.4C13.2 11.15 13.746 10.104 14.688 9.262C15.6293 8.42067 16.7333 8 18 8C19.2667 8 20.3707 8.42067 21.312 9.262C22.254 10.104 22.8 11.15 22.95 12.4C23.8833 12.7833 24.625 13.3957 25.175 14.237C25.725 15.079 26 16 26 17C26 18.3833 25.5127 19.5623 24.538 20.537C23.5627 21.5123 22.3833 22 21 22H19V26H25V28H11Z"
              fill="#4BB158"
            />
          </svg>`;
    el.classList.add("checked");
  }
}

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

document.querySelector("#record-header").addEventListener("click", function () {
  console.log("요일 기록 더보기");
  // location.href = "./record.html";
});

document
  .querySelector("#article-header")
  .addEventListener("click", function () {
    location.href = "./article.html";
  });

document.querySelector("#post-header").addEventListener("click", function () {
  location.href = "./post.html";
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
