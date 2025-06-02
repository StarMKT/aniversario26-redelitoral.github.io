window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    var content = document.querySelector('.content');
    if (window.pageYOffset > 100) { // change 100 to the height of your header
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        // content.style.paddingTop = '50px'; // change 50px to the height of your navbar
    } else {
        navbar.style.position = 'relative';
        content.style.paddingTop = '0';
    }
});