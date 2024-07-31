// Place for some code bratan!


// Translating Months
const data = {
    months: {
        en: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ],
        local: [],
    },

};
const allDates = $('.is-date');

const shortenDaysMonths = daymonth => daymonth.substring(0, 3);
const convertToLocal = (daydate, whatToConvert) => {
    whatToConvert.each(function() {
        const theObject = $(this);
        let text = theObject.text();

        if (daydate === 'm' || daydate === 'month' || daydate === 'months') {
            for (let i = 0; i < data.months.en.length; i++) {
                text = text.replace(data.months.en[i], data.months.local[i])
                text = text.replace(shortenDaysMonths(data.months.en[i]), shortenDaysMonths(data
                    .months.local[i]))
                theObject.text(text)
            }
        }
    })
};
data.months.local = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

convertToLocal('m', allDates);


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


// Function to show the occasion contact form
function showRequestForm() {
    $(".occasionen-contact-form").css("display", "flex");
    $(".occasionen-contact-form").animate({ opacity: 1 }, 340);
}

function hideRequestForm() {
    $(".occasionen-contact-form").animate({ opacity: 0 }, 340, function() {
        $(this).css("display", "none");
    });
}
$(".is-occasion-form-opener").on("click", function() {
    showRequestForm();
});
$(".form-close-button").on("click", function() {
    hideRequestForm();
});


// Function to show the footer contact form
function showContactForm() {
    $("footer-contact-form-wrapper").css("display", "flex");
    $(".footer-contact-form-wrapper").animate({ opacity: 1 }, 340);
}

function hideContactForm() {
    $(".footer-contact-form-wrapper").animate({ opacity: 0 }, 340, function() {
        $(this).css("display", "none");
    });
}
$("#footer-open-contactform").on("click", function() {
    showRequestForm();
});
$(".contactform-close-button").on("click", function() {
    hideRequestForm();
});

// Prefill Occasions Contact Fields

var Marke = $('#marke').text();
$('input[data-name="Marke"]').val(Marke);
$('input[data-name="Marke"]').prop('disabled', true);

var Typ = $('#model').text();
$('input[data-name="Typ"]').val(Typ);
$('input[data-name="Typ"]').prop('disabled', true);