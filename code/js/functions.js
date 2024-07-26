// Place for some code bratan!

// on Weglot init
Weglot.on('initialized', () => {
    // get the current active language
    const currentLang = Weglot.getCurrentLang();
    // if the current active language link exists
    if (document.querySelector('.language-switch-btn [lang=' + currentLang + ']')) {
        // click the link
        document.querySelector('.language-switch-btn [lang=' + currentLang + ']').click();
    }
});

// for each of the .wg-element-wrapper language links
document.querySelectorAll('.language-switch-btn [lang]').forEach((link) => {
    // add a click event listener
    link.addEventListener('click', function(e) {
        // prevent default
        e.preventDefault();
        // switch current active language after a setTimeout
        setTimeout(() => Weglot.switchTo(this.getAttribute('lang')), 160);
    });
});