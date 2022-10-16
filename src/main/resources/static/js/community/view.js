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
    showFeed(data, postId);
  };
};

function showFeed(data, postId) {
  data.posts.forEach((feed) => {
    if (postId == feed.postId) {
      let feedItem = document.createElement("div");
      feedItem.classList.add("feed-item");
      feedItem.setAttribute("postid", feed.postId);

      let likeBtn = document.createElement("span");
      likeBtn.setAttribute("class", "feed-item-like");
      if (feed.isUserLike) {
        likeBtn.setAttribute("value", "like");
        likeBtn.innerHTML = `<svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.129333 7.66666 0 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.871 7.66666 19.613 8.39999C19.3543 9.13333 18.9 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19Z"
                        fill="#4BB158"
                      />
                    </svg>`;
      } else {
        likeBtn.setAttribute("value", "unlike");
        likeBtn.innerHTML = `<svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.129333 7.66666 0 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.871 7.66666 19.613 8.39999C19.3543 9.13333 18.9 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19ZM10 16.3C11.6 14.8667 12.9167 13.6373 13.95 12.612C14.9833 11.5873 15.8 10.696 16.4 9.93799C17 9.17933 17.4167 8.50399 17.65 7.91199C17.8833 7.32066 18 6.73333 18 6.14999C18 5.14999 17.6667 4.31666 17 3.64999C16.3333 2.98333 15.5 2.64999 14.5 2.64999C13.7167 2.64999 12.9917 2.87066 12.325 3.31199C11.6583 3.75399 11.2 4.31666 10.95 4.99999H9.05C8.8 4.31666 8.34167 3.75399 7.675 3.31199C7.00833 2.87066 6.28333 2.64999 5.5 2.64999C4.5 2.64999 3.66667 2.98333 3 3.64999C2.33333 4.31666 2 5.14999 2 6.14999C2 6.73333 2.11667 7.32066 2.35 7.91199C2.58333 8.50399 3 9.17933 3.6 9.93799C4.2 10.696 5.01667 11.5873 6.05 12.612C7.08333 13.6373 8.4 14.8667 10 16.3Z"
                        fill="#121212"
                      />
                    </svg>`;
      }

      let postSymptomTag = ``;
      for (let symptom of feed.symptoms) {
        postSymptomTag += `<span class="symptom_tag_span">${symptom.symptomName}</span>`;
      }
      feedItem.innerHTML = `<div class="feed-item-top">
                ${postSymptomTag}
                <span class="font-body-kr01" id="feed-menu">
                  &bull;&bull;&bull;
                  </span>
              </div>
              <div class="feed-item-content">
                <p class="font-detail-kr01">
                  ${feed.userNickname}&emsp;${feed.postDate}
                </p>
                <p class="font-body-kr03">${feed.content}</p>
              </div>`;
      let feedItemBottom = document.createElement("div");
      feedItemBottom.setAttribute("class", "feed-item-bottom");
      let likeNum = document.createElement("span");
      likeNum.setAttribute("class", "font-body-en02");
      likeNum.innerHTML = `${feed.numLike}`;
      feedItemBottom.appendChild(likeBtn);
      feedItemBottom.appendChild(likeNum);
      feedItem.appendChild(feedItemBottom);

      let feedItemBottomLine = document.createElement("div");
      feedItemBottomLine.setAttribute("class", "feed-item-bottom-line");
      feedItem.appendChild(feedItemBottomLine);

      document.querySelector(".main-content").appendChild(feedItem);

      likeBtn.addEventListener("click", function () {
        console.log(likeBtn.getAttribute("value"));
        if (likeBtn.getAttribute("value") == "unlike") {
          console.log("좋아요 이벤트 감지인식 테스트");
          // 좋아요 추가하기
          likeBtn.innerHTML = `<svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.129333 7.66666 0 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.871 7.66666 19.613 8.39999C19.3543 9.13333 18.9 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19Z"
                              fill="#4BB158"
                            />
                          </svg>`;
          likeBtn.setAttribute("value", "like");
        }
        if (likeBtn.getAttribute("value") == "like") {
          // 좋아요 취소하기
          likeBtn.innerHTML = `<svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 19L8.55 17.7C6.86667 16.1833 5.475 14.875 4.375 13.775C3.275 12.675 2.4 11.6873 1.75 10.812C1.1 9.93733 0.646 9.13333 0.388 8.39999C0.129333 7.66666 0 6.91666 0 6.14999C0 4.58333 0.525 3.27499 1.575 2.22499C2.625 1.17499 3.93333 0.649994 5.5 0.649994C6.36667 0.649994 7.19167 0.833327 7.975 1.19999C8.75833 1.56666 9.43333 2.08333 10 2.74999C10.5667 2.08333 11.2417 1.56666 12.025 1.19999C12.8083 0.833327 13.6333 0.649994 14.5 0.649994C16.0667 0.649994 17.375 1.17499 18.425 2.22499C19.475 3.27499 20 4.58333 20 6.14999C20 6.91666 19.871 7.66666 19.613 8.39999C19.3543 9.13333 18.9 9.93733 18.25 10.812C17.6 11.6873 16.725 12.675 15.625 13.775C14.525 14.875 13.1333 16.1833 11.45 17.7L10 19ZM10 16.3C11.6 14.8667 12.9167 13.6373 13.95 12.612C14.9833 11.5873 15.8 10.696 16.4 9.93799C17 9.17933 17.4167 8.50399 17.65 7.91199C17.8833 7.32066 18 6.73333 18 6.14999C18 5.14999 17.6667 4.31666 17 3.64999C16.3333 2.98333 15.5 2.64999 14.5 2.64999C13.7167 2.64999 12.9917 2.87066 12.325 3.31199C11.6583 3.75399 11.2 4.31666 10.95 4.99999H9.05C8.8 4.31666 8.34167 3.75399 7.675 3.31199C7.00833 2.87066 6.28333 2.64999 5.5 2.64999C4.5 2.64999 3.66667 2.98333 3 3.64999C2.33333 4.31666 2 5.14999 2 6.14999C2 6.73333 2.11667 7.32066 2.35 7.91199C2.58333 8.50399 3 9.17933 3.6 9.93799C4.2 10.696 5.01667 11.5873 6.05 12.612C7.08333 13.6373 8.4 14.8667 10 16.3Z"
                              fill="#121212"
                            />
                          </svg>`;
          likeBtn.setAttribute("value", "unlike");
        }
      });
    }
  });
}

document.querySelector("#btn-move-back").addEventListener("click", function () {
  location.href = "./main.html";
});

// 댓글 입력 버튼
document.querySelector("#btn-add").style.display = "none";
document
  .querySelector("#input-comment")
  .addEventListener("keyup", function (e) {
    if (document.querySelector("#input-comment").value.length > 0) {
      document.querySelector("#btn-add").style.display = "";
    } else {
      document.querySelector("#btn-add").style.display = "none";
    }
  });

// 댓글 생성하기
document.querySelector("#btn-add").addEventListener("click", function () {
  let listDiv = document.querySelector(".comment-list");

  let commentDiv = document.createElement("div");
  commentDiv.setAttribute("class", "comment-item");

  let commentTopDiv = document.createElement("div");
  commentTopDiv.setAttribute("class", "comment-item-top");

  let commentTopDivEl1 = document.createElement("span");
  commentTopDivEl1.setAttribute("class", "font-detail-kr01");
  commentTopDivEl1.innerHTML = `닉네임&emsp;N분 전`;

  let commentTopDivEl2 = document.createElement("span");
  commentTopDivEl2.setAttribute("class", "comment-menu font-body-kr01");
  commentTopDivEl2.innerHTML = `&bull;&bull;&bull;`;
  commentTopDivEl2.addEventListener("click", function () {
    let parentEl = this.parentElement.parentElement;
    listDiv.removeChild(parentEl);
  });

  let commentTopDivEl3 = document.createElement("span");
  commentTopDivEl3.innerHTML = `<svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.16667 17.7497C1.70833 17.7497 1.31583 17.5863 0.989167 17.2597C0.663055 16.9336 0.5 16.5413 0.5 16.083V4.41634C0.5 3.95801 0.663055 3.56551 0.989167 3.23884C1.31583 2.91273 1.70833 2.74967 2.16667 2.74967H9.60417L7.9375 4.41634H2.16667V16.083H13.8333V10.2913L15.5 8.62467V16.083C15.5 16.5413 15.3369 16.9336 15.0108 17.2597C14.6842 17.5863 14.2917 17.7497 13.8333 17.7497H2.16667ZM11.4792 3.22884L12.6667 4.39551L7.16667 9.89551V11.083H8.33333L13.8542 5.56217L15.0417 6.72884L9.04167 12.7497H5.5V9.20801L11.4792 3.22884ZM15.0417 6.72884L11.4792 3.22884L13.5625 1.14551C13.8958 0.812175 14.2953 0.645508 14.7608 0.645508C15.2258 0.645508 15.6181 0.812175 15.9375 1.14551L17.1042 2.33301C17.4236 2.65245 17.5833 3.04134 17.5833 3.49967C17.5833 3.95801 17.4236 4.3469 17.1042 4.66634L15.0417 6.72884Z"
                                    fill="#121212"
                                  />
                                </svg>`;
  commentTopDivEl3.addEventListener("click", function () {
    alert("수정하기 버튼 클릭");
  });

  commentTopDiv.appendChild(commentTopDivEl1);
  commentTopDiv.appendChild(commentTopDivEl2);
  commentTopDiv.appendChild(commentTopDivEl3);

  let inputComment = document.querySelector("#input-comment").value;
  let commentContent = document.createElement("div");
  commentContent.setAttribute("class", "comment-item-content");
  commentContent.innerHTML = `<p class="font-body-kr03">
                                ${inputComment}</p>`;

  commentDiv.appendChild(commentTopDiv);
  commentDiv.appendChild(commentContent);

  listDiv.appendChild(commentDiv);

  document.querySelector("#input-comment").value = "";
});
