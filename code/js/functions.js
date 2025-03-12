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

/* Set Tausendertrennzeichen 
$('div[class*="price"] p, .is-price').each(function() {
    var price = $(this).text();
    price = parseFloat(price.replace(/,/g, '')).toFixed(2);
    var priceWithCommas = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    $(this).text(priceWithCommas);
});
*/

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
    $(".footer-contact-form-wrapper").css("display", "flex");
    $(".footer-contact-form-wrapper").animate({ opacity: 1 }, 340);
}

function hideContactForm() {
    $(".footer-contact-form-wrapper").animate({ opacity: 0 }, 340, function() {
        $(this).css("display", "none");
    });
}
$("#footer-open-contactform").on("click", function() {
    showContactForm();
});
$(".contactform-close-button").on("click", function() {
    hideContactForm();
});

// Prefill Occasions Contact Fields

var Marke = $('#marke').text();
$('input[data-name="Marke"]').val(Marke);
$('input[data-name="Marke"]').prop('disabled', true);

var Typ = $('#model').text();
$('input[data-name="Typ"]').val(Typ);
$('input[data-name="Typ"]').prop('disabled', true);


// Reorder Title Tags in Privacy Bee
setTimeout(function() {
    var widget = $('privacybee-widget');

    if (widget.length) {
        var h1Elements = widget.find('h1').toArray();
        var h2Elements = widget.find('h2').toArray();
        var h3Elements = widget.find('h3').toArray();
        var h4Elements = widget.find('h4').toArray();

        h1Elements.forEach(function(element) {
            var newElement = $('<h2>' + $(element).html() + '</h2>');
            newElement.addClass('heading-style-h3 text-color-primary');
            $(element).replaceWith(newElement);
        });

        h2Elements.forEach(function(element) {
            var newElement = $('<h3>' + $(element).html() + '</h3>');
            newElement.addClass('heading-style-h3 text-color-primary');
            $(element).replaceWith(newElement);

        });


    }
}, 1000); // Delay of 1 second


// Functions Konfigurator

// Scroll up function on next step


$('.btn-primary.is-konfigurator').click(function(e) {
    e.preventDefault(); // prevent the default action
    var navHeight = $('.navigation').outerHeight(); // get the height of the navigation bar
    $('html, body').animate({
        scrollTop: $("#konfigurator").offset().top - navHeight
    }, 500); // 500 is the new duration of the animation in milliseconds
});



$('input[data-value]').each(function() {
    var dataValue = $(this).attr('data-value');
    $(this).val(dataValue);
});

// Filter Pumpenart
$('input[type=radio][name=Pumpenart]').on('change', function() {
    var value = $(this).val();

    $('#pumpentypen > .w-dyn-item').each(function() {
        var $this = $(this);
        if ($this.find('.hide:contains("' + value + '")').length === 0) {
            $this.hide();
        } else {
            $this.show();
        }
    });

    // Scroll to the top of the Konfigurator"
    $('html, body').animate({
        scrollTop: $('#konfigurator').offset().top
    }, 500); // 500 milliseconds for the animation duration
});


// Filter Fassgrössen

$('input[name="Radstand"]').change(filterFassgroessen);
$('input[name="Pumpenart"]').change(filterFassgroessen);

function filterFassgroessen() {
    var selectedRadstand = $('input[name="Radstand"]:checked').val();
    var selectedPumpenart = $('input[name="Pumpenart"]:checked').val();

    $('#pumpengroessen .w-dyn-item').each(function() {
        var $this = $(this);

        var listItemRadstand = $this.find('.hide').first().text();
        var listItemPumpenart = $this.find('.hide').last().text();

        if (listItemRadstand == selectedRadstand && listItemPumpenart == selectedPumpenart) {
            $this.show();
        } else {
            $this.hide();
        }
    });
}



// Filter Antriebsstränge

$('select[name="Transportermarke"]').change(filterAntriebsstrang);
$('input[name="Pumpenart"]').change(filterAntriebsstrang);

function filterAntriebsstrang() {
    var selectedTransportermarke = $('select[name="Transportermarke"]').val();
    var selectedPumpenart = $('input[name="Pumpenart"]:checked').val();

    $('#antriebsstrang .w-dyn-item').each(function() {
        var $this = $(this);

        var listItemTransportermarke = $this.find('.hide').last().text();
        var listItemPumpenart = $this.find('.hide').first().text();

        if (listItemTransportermarke == selectedTransportermarke && listItemPumpenart == selectedPumpenart) {
            $this.show();
        } else {
            $this.hide();
        }
    });
}




// Filter SSV Steuerungen und SSV Zubehöre
$('input[type=radio][name=ssvmodell]').on('change', function() {
    var value = $(this).val();
    console.log(value)

    $('#ssv-steuerungen > .w-dyn-item').each(function() {
        var $this = $(this);
        if ($this.find('.hide:contains("' + value + '")').length === 0) {
            $this.hide();
        } else {
            $this.show();
        }
    });
    $('#ssv-zubehoere > .w-dyn-item').each(function() {
        var $this = $(this);
        if ($this.find('.hide:contains("' + value + '")').length === 0) {
            $this.hide();
        } else {
            $this.show();
        }
    });
});

// Filter SSV Steuerungsoptionen
$('input[type=radio][name=ssvsteuerung]').on('change', function() {
    var value = $(this).val();
    var isMatchFound = false; // flag to check if a match was found

    $('#ssv-steuerungsoptionen > .w-dyn-item').each(function() {
        var $this = $(this);
        if ($this.find('.hide:contains("' + value + '")').length === 0) {
            $this.hide();
        } else {
            $this.show();
            isMatchFound = true; // set the flag to true because a match was found
        }
    });

    // if no match was found, hide the konfigurator_input-wrapper that contains #ssv-steuerungsoptionen
    if (!isMatchFound) {
        $('#ssv-steuerungsoptionen').closest('.konfigurator_input-wrapper').hide();
    } else {
        // if a match was found, ensure the konfigurator_input-wrapper that contains #ssv-steuerungsoptionen is visible
        $('#ssv-steuerungsoptionen').closest('.konfigurator_input-wrapper').css('display', 'flex');
    }
     // Scroll to the top of the Konfigurator"
     $('html, body').animate({
        scrollTop: $('#konfigurator').offset().top
    }, 500); // 500 milliseconds for the animation duration
    
});




// Beautify the Summarize of Checkbox Groups --> NEED TO BE FIXED
// $(document).ready(function() {
//     var div = $('div[multiple-value="true"]');
//     var text = div.html();
//     var newText = text.replace(/,/g, '<br>');
//     div.html(newText);
// });