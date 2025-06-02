function centerDiv(clickedDiv) {
    setTimeout(function () {
        var rect = clickedDiv.getBoundingClientRect();
        var screenHeight = window.innerHeight;
        var scrollHeight = rect.top - (screenHeight / 2);
        window.scrollBy(0, scrollHeight);
    }, 100);
}
