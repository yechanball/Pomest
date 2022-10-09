var postId;

// 페이지 로딩시 증상 태그 생성
window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  postId = urlParams.get("postid");

  // 게시글 json 정보 받기
  var requestPostURL =
    "https://yechanball.github.io/Pomest/src/main/resources/static/data/posts.json";
  var requestPost = new XMLHttpRequest();
  requestPost.open("GET", requestPostURL);
  requestPost.responseType = "json";
  requestPost.send();

  requestPost.onload = function () {
    data = requestPost.response;
    makeFeedList(data, postId);
  };
};

function makeFeedList(data, postId) {
  data.posts.forEach((feed) => {
    if (postId == feed.postId) {
      let feedItem = document.createElement("div");
      feedItem.classList.add("feed-item");
      feedItem.setAttribute("postid", feed.postId);
      feedItem.setAttribute("symtomid", feed.symptoms.id);
      feedItem.setAttribute("onclick", "clickFeed(" + feed.postId + ")");
      let likeBtn;
      if (feed.isUserLike) {
        likeBtn = `<span class="feed-item-like" value="like">
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
        likeBtn = `<span class="feed-item-like" value="unlike">
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

      feedItem.innerHTML = `<div class="feed-item-top">
                <span class="symptom_tag_span">${feed.symptoms.symptomName}</span>
                <span class="font-detail-kr01"
                  >${feed.userNickname}&emsp;${feed.postDate}</span
                >
              </div>
              <div class="feed-item-content">
                <p class="font-body-kr03">${feed.content}</p>
              </div>
              <div class="feed-item-bottom">
                ${likeBtn}
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
      document.querySelector("#main-content").appendChild(feedItem);
    }
  });
}

document.querySelector("#btn-move-back").addEventListener("click", function () {
  location.href = "./main.html";
});
