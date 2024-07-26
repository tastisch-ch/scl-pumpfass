// Place for some code bratan!

// on Weglot init
Weglot.on('initialized', () => {
    // get the current active language
    console.log("Weglot ready")
    const currentLang = Weglot.getCurrentLang();
    // if the current active language link exists
    if (document.querySelector('.wrapper-language-switch [lang=' + currentLang + ']')) {
        // click the link
        document.querySelector('.wrapper-language-switch [lang=' + currentLang + ']').click();
    }

});
// for each of the .wg-element-wrapper language links
document.querySelectorAll('.wrapper-language-switch [lang]').forEach((link) => {
    // add a click event listener
    link.addEventListener('click', function(e) {
        // prevent default
        e.preventDefault();
        // switch current active language after a setTimeout
        setTimeout(() => Weglot.switchTo(this.getAttribute('lang')), 160);
    });
});

// on Weglot init
Weglot.on('initialized', () => {
    // get the current active language
    const currentLang = Weglot.getCurrentLang();
    // if the current active language link exists
    if ($('.wrapper-language-switch [lang=' + currentLang + ']')) {
        // add is__active class
        $('.wrapper-language-switch [lang=' + currentLang + ']').addClass("is-active-language");
    }
});

// for each of the .wrapper__languages language links
document.querySelectorAll('.wrapper-language-switch [lang]').forEach((link) => {
    // add a click event listener
    link.addEventListener('click', function(e) {
        // prevent default
        e.preventDefault();
        // switch current active language after a setTimeout
        setTimeout(() => Weglot.switchTo(this.getAttribute('lang')), 160);
    });
});


$('.language-switch-btn').on('click', function() {
    $('.language-switch-btn').removeClass('is-active-language');
    $(this).toggleClass('is-active-language');
});