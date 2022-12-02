var postId;

// 페이지 로딩 시 포스트 요청
window.onload = function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  postId = urlParams.get("postid");

  // fetch(`/post/post?postId=${postId}`)
  //   .then((response) => response.json())
  //   .then((data) => showFeed(data));

  if (typeof navigator.share === "undefined") {
    // 공유하기 버튼을 지원하지 않는 경우에 대한 폴백 처리
    document.querySelector(".post-share-btn").style.display = "none";
  }
};

// 포스트 화면 구성
// function showFeed(data) {
//   document.querySelector(".post-item").innerHTML = `
//   <div class="post-header">
//     <h2 class="font-title-kr02">${data.title}</h2>
//     <span class="post-save-btn" onclick="savePost(this, ${data.postId})">
//       <svg
//         width="14"
//         height="18"
//         viewBox="0 0 14 18"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H12C12.55 0 13.021 0.195667 13.413 0.587C13.8043 0.979 14 1.45 14 2V18L7 15L0 18ZM2 14.95L7 12.8L12 14.95V2H2V14.95Z"
//           fill="#121212"
//         />
//       </svg>
//     </span>
//     <span class="post-share-btn" onclick="sharePost()">
//       <svg
//         width="16"
//         height="22"
//         viewBox="0 0 16 22"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M2 22C1.45 22 0.979333 21.8043 0.588 21.413C0.196 21.021 0 20.55 0 20V9C0 8.45 0.196 7.979 0.588 7.587C0.979333 7.19567 1.45 7 2 7H5V9H2V20H14V9H11V7H14C14.55 7 15.021 7.19567 15.413 7.587C15.8043 7.979 16 8.45 16 9V20C16 20.55 15.8043 21.021 15.413 21.413C15.021 21.8043 14.55 22 14 22H2ZM7 15V3.825L5.4 5.425L4 4L8 0L12 4L10.6 5.425L9 3.825V15H7Z"
//           fill="#121212"
//         />
//       </svg>
//     </span>
//   </div>
//   <div class="post-body">
//     <img src="${data.image}" alt="post img" />
//     <p class="font-body-kr03">${data.content}</p>
//   </div>`;
// }

// 뒤로가기 버튼 클릭
document.querySelector("#btn-move-back").addEventListener("click", function () {
  location.href = "./main.html";
});

// 포스트 저장 버튼
function savePost(el, postId) {
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

  /////////////////////////
  // 포스트 저장 API 호출 //
  /////////////////////////
}

// 포스트 공유버튼
document
  .querySelector(".post-share-btn")
  .addEventListener("click", async () => {
    try {
      await navigator.share({
        title: "[포메스트] 자기 전 5분 꿀팁",
        text: "저작자·발명가·과학기술자와 예술가의 권리는 법률로써...",
        url: "https://yechanball.github.io/Pomest/src/main/resources/templates/post/view.html",
      });
      console.log("공유 성공");
    } catch (e) {
      console.log("공유 실패");
    }
  });
