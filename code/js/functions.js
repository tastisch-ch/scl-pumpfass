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

/* Set Tausendertrennzeichen */
$('div[class*="price"] p').each(function() {
    var price = $(this).text();
    price = parseFloat(price.replace(/,/g, '')).toFixed(2);
    var priceWithCommas = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    $(this).text(priceWithCommas);
});


// Function to show the overlay
function showRequestForm() {
    $(".occasionen-contact-form").css("display", "flex");
    $(".occasionen-contact-form").animate({ opacity: 1 }, 340);
}

// Function to hide the overlay
function hideRequestForm() {
    $(".occasionen-contact-form").animate({ opacity: 0 }, 340, function() {
        $(this).css("display", "none");
    });
}

// Bind the show function to click event on elements with special-function="open-form"
$(".is-occasion-form-opener").on("click", function() {
    showRequestForm();
});

// Bind the hide function to click event on .form-button-close
$(".form-close-button").on("click", function() {
    hideRequestForm();
});

var Marke = $('#marke').text();

// Find the input field with data-name "Marke" and set its value to the content
$('input[data-name="Marke"]').val(Marke);

// Disable the input field
$('input[data-name="Marke"]').prop('disabled', true);