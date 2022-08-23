window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var nick =urlParams.get('nick');

    document.all.titleText.innerHTML = nick+"님께 필요한 정보를<br>꼼꼼히 모으기 위해<br>이런 것들을 알고 싶어요";
};