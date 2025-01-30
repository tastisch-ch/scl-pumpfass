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
    $("footer-contact-form-wrapper").css("display", "flex");
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
        $('#ssv-steuerungsoptionen').closest('.konfigurator_input-wrapper').show();
    }
});




// Beautify the Summarize of Checkbox Groups --> NEED TO BE FIXED
// $(document).ready(function() {
//     var div = $('div[multiple-value="true"]');
//     var text = div.html();
//     var newText = text.replace(/,/g, '<br>');
//     div.html(newText);
// });


/*
   ____             __ _                       _                __                  _   _                 
  / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_ ___  _ __   / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
 | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __/ _ \| '__| | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |__| (_) | | | |  _| | (_| | |_| | | | (_| | || (_) | |    |  _| |_| | | | | (__| |_| | (_) | | | \__ \
  \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__\___/|_|    |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                         |___/                                                                            
*/
/*
function calculatePrice(){
    let arrPrices = []
    let sum = 0

    $('input[data-price]:checked').each(function(){
        arrPrices.push(parseFloat($(this).attr("data-price")))
    })

    for(let price of arrPrices){
        sum += parseFloat(price)
    }
    //Währung checken
    sum = checkWaehrung(sum)

    sumWithCommas = sum.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

    $('#konfigurator_total').text(sumWithCommas)
}
//Initial price calculation
calculatePrice()

function writeSummary(input){
    let input_name = $(input).attr("name")
    let price = parseFloat($(input).attr("data-price")).toFixed(2)
    let summaryElement = $('.summary_acc-value[sf-react="text($f.' + input_name + ')"')

    //wenn Checkbox dann zusmamenrechnen
    if($(input).attr("type") == "checkbox"){
        let checkboxSum = 0
        $('input[name="' + input_name + '"]:checked').each(function(){
            checkboxSum += parseFloat($(this).attr("data-price"))
        })
        price = checkboxSum.toFixed(2)
    }

    price = checkWaehrung(price)

    var priceWithCommas = price.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

    $(summaryElement).siblings('.is-price').text(priceWithCommas)
}


$('input[data-price]').change(function(){
    writeSummary(this)
    calculatePrice()
})

$('input[name="waehrung"], input[name="mwst"]').change(function(){
    calculatePrice()
})

// Währung checken und umrechnen
function checkWaehrung(sum){
    if(!$('input[name="waehrung"]').is(':checked')){
        // if EUR
        $('input[name="mwst"]').parents('.konfiguration_price-option').css({
            'opacity':'0',
            'pointer-events':'none'
        })
        sum = sum / 1.081 * 1.1
        $('.is-price').each(function(){
            $(this).addClass('eur')
        })
    } else {
        //if CHF
        $('input[name="mwst"]').parents('.konfiguration_price-option').css({
            'opacity':'100',
            'pointer-events':''
        })
        $('.is-price').removeClass('eur')
        if (!$('input[name="mwst"]').is(':checked')){
        sum = sum / 1.081
        }
    }
    return parseFloat(sum).toFixed(2)
}
*/

/* calculate total price */
function calculatePrice() {
    let arrPrices = []
    let sum = 0

    $('input[data-price]:checked').each(function() {
        arrPrices.push(parseFloat($(this).attr("data-price")))
    })

    for (let price of arrPrices) {
        sum += parseFloat(price)
    }

    //Währung checken
    sum = checkWaehrung(sum, false)

    let currency, locale
    if (!$('input[name="waehrung"]').is(':checked')) {
        currency = "EUR"
        locale = "de-DE"
    } else {
        currency = "CHF"
        locale = "de-CH"
    }
    sum = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(sum);

    $('#konfigurator_total').text(sum)
}
//Initial price calculation
calculatePrice()

/* write price in summary */
function writeSummary(input) {
    let input_name = $(input).attr("name")
    let price = parseFloat($(input).attr("data-price"))
    if ($(input).is(':hidden')) {
        price = 0
    }
    let summaryElement = $('.summary_acc-value[sf-react="text($f.' + input_name + ')"')

    //wenn Checkbox dann zusmamenrechnen
    if ($(input).attr("type") == "checkbox") {
        let checkboxSum = 0
        $('input[name="' + input_name + '"]:checked').each(function() {
            checkboxSum += parseFloat($(this).attr("data-price"))
        })
        price = checkboxSum
    }

    price = checkWaehrung(price, false)

    let currency, locale
    if (!$('input[name="waehrung"]').is(':checked')) {
        currency = "EUR"
        locale = "de-DE"
    } else {
        currency = "CHF"
        locale = "de-CH"
    }
    price = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(price);

    $(summaryElement).siblings('.is-price').text(price)
}

/* Währung checken und umrechnen */
function checkWaehrung(sum, eurToChf, mwstCheck) {
    let isChf = $('input[name="waehrung"]').is(':checked')
    let isMwst = $('input[name="mwst"]').is(':checked')

    if (isChf) {
        //if CHF
        if (eurToChf) {
            sum = sum / 1.1
        }
    } else if (!isChf) {
        //if EUR
        sum = sum * 1.1
    }

    if ((!isChf && isMwst) || (isChf && !isMwst && !eurToChf)) {
        sum = sum / 1.081
    } else if ((eurToChf && isMwst) || mwstCheck) {
        sum = sum * 1.081
    }
    return sum
}

$('input[data-price]').change(function() {
    writeSummary(this)
    calculatePrice()
})

$('input[name="mwst"]').change(function() {
    let mwstCheck = $(this).is(':checked')
    updateCurrency("CHF", mwstCheck)
    calculatePrice()
})

$('input[name="waehrung"]').change(function() {
    if (!$('input[name="waehrung"]').is(':checked')) {
        // if EUR
        $('input[name="mwst"]').parents('.konfiguration_price-option').css({
            'opacity': '0',
            'pointer-events': 'none'
        })
        $('#chf-label').css('opacity', '0.4')
        $('#eur-label').css('opacity', '')
        updateCurrency("EUR")
    } else {
        //if CHF
        $('input[name="mwst"]').parents('.konfiguration_price-option').css({
            'opacity': '100',
            'pointer-events': ''
        })
        $('#chf-label').css('opacity', '')
        $('#eur-label').css('opacity', '0.4')
        updateCurrency("CHF")
    }
    calculatePrice()
})

/* Update Value for currency*/
function updateCurrency(currency, mwstCheck) {
    let locale
    if (currency == "EUR") {
        locale = 'de-DE'
    } else {
        locale = 'de-CH'
    }

    $('.is-price').each(function() {
        var valueText = $(this).text()
        var priceValue = valueText.match(/[\d’.,]+/g).join('')

        if (valueText.match("€")) {
            var value = parseFloat(priceValue.replace('.', '').replace(',', '.'))
            var eurToChf = true
        } else {
            var value = parseFloat(priceValue.replace('’', '').replace(',', '').replace('.', '.'))
            var eurToChf = false
        }

        value = checkWaehrung(value, eurToChf, mwstCheck)

        this.textContent = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
    })
}

//initial update currency
updateCurrency("CHF")

//Summary open accordion based on step
window.SuperformAPI = window.SuperformAPI || [];
window.SuperformAPI.push(({ getForm, allForms }) => {
    const myForm = getForm("konfigurator");
    myForm.onStepChange((params) => {
        let stepCount = params.stepCount + 1
        let stepName = "step-" + stepCount
        let summaryHeader = $('.summary_acc-header[tab-name="' + stepName + '"]')

        if (summaryHeader.length > 0 && !summaryHeader.hasClass('is-active-accordion')) {
            summaryHeader.trigger('click')
        }
    })
})

//clear Inputs on radio button change + verteilungsart change
$('input[type="radio"]').change(function() {
    var changedInput = $(this)
    var step = $(this).closest('.konfigurator_step')
    var allInputs = step.find('input:checked')

    var startIndex = allInputs.index(changedInput) + 1;
    var slicedElements = allInputs.slice(startIndex);

    clearInputs(slicedElements)
})

$('input[name="verteilungsart"]').change(function() {
    $('input[name="verteilungsart"]:not(:checked)').each(function() {
        let inputs
        let data_value = $(this).attr("data-value")
        if (data_value == "Weitwurfdüse") {
            inputs = $('[sf-step="step-4"] input:checked, [sf-step="step-5"] input:checked')
        } else if (data_value == "Schleppschlauchverteilung") {
            inputs = $('[sf-step="step-3"] input:checked, [sf-step="step-5"] input:checked')
        } else if (data_value == "Flächenverteilung") {
            inputs = $('[sf-step="step-3"] input:checked, [sf-step="step-4"] input:checked')
        }

        clearInputs(inputs)
    })
})

function clearInputs(inputs) {
    inputs.each(function() {
        if (!$(this).is($('._1-col-input-wrapper.hide #verteilungsart'))) {
            $(this).prop('checked', false)
            $(this).parents('.is-active-inputactive').removeClass('is-active-inputactive')
            $(this).prev('.w--redirected-checked').removeClass('w--redirected-checked')

            writeSummary(this)
            calculatePrice()
        }
    });
}

document.getElementById('page-reload').addEventListener('click', function() {
    location.reload();
});




window.SuperformAPI = window.SuperformAPI || [];
window.SuperformAPI.push(({ getForm, allForms }) => {
    const myForm = getForm("konfigurator");

    // Call the getArtNrValues function and add the result to formData
    myForm.onFormSubmit(async(params) => {

        // Get all selected inputs and return art-nr into an array
        function getArtNrValues() {
            var artNrValues = [];

            // Select active radio buttons
            $('input[type=radio]:checked').each(function() {
                var artNr = $(this).attr('art-nr');
                if (artNr) {
                    artNrValues.push(artNr);
                }
            });

            // Select active checkboxes
            $('input[type=checkbox]:checked').each(function() {
                var artNr = $(this).attr('art-nr');
                if (artNr) {
                    artNrValues.push(artNr);
                }
            });

            // Select active select elements
            $('select').each(function() {
                var artNr = $(this).find('option:selected').attr('art-nr');
                if (artNr) {
                    artNrValues.push(artNr);
                }
            });

            // Log the array to the console
            console.log(artNrValues);

            return artNrValues;
        }

        // Add Artikelnummern to params.data
        params.data.Artikelnummern = getArtNrValues();

        // Get the total value
        var total = $('#konfigurator_total').text(); // Get the text
        total = total.replace(/CHF\s*/, ''); // Remove the "CHF" prefix and any following whitespace

        // Add total to params.data
        params.data.Total = total;

        console.log("form data:")
        console.log(params.data); // Returns form data

        // Sending data to the webhook
        const webhookUrl = "https://hook.eu1.make.com/mwy1d2pu5pv1n6ocpth13xsgmhsj1gtk";
        console.log("trigger webhook")
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        });

        // Waiting for a reply from the webhook
        const reply = await response.json();
        console.log(reply);

        // Check if the response was successful
        if (response.status === 200) {
            // Find the element with the class .w-form-done and set its display to flex
            const element = document.querySelector('.konfigurator_success-message');
            if (element) {
                element.style.display = 'flex';
            }
        }
    });
});