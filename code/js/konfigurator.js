/*
   ____             __ _                       _                __                  _   _                 
  / ___|___  _ __  / _(_) __ _ _   _ _ __ __ _| |_ ___  _ __   / _|_   _ _ __   ___| |_(_) ___  _ __  ___ 
 | |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __/ _ \| '__| | |_| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |__| (_) | | | |  _| | (_| | |_| | | | (_| | || (_) | |    |  _| |_| | | | | (__| |_| | (_) | | | \__ \
  \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__\___/|_|    |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                         |___/                                                                            
*/

/* calculate total price */
function calculatePrice() {
    let arrPrices = []
    let sum = 0

    $('input[data-price]:checked').each(function () {
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
        $('input[name="' + input_name + '"]:checked').each(function () {
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
/* Basis: data-price = CHF inkl. 8.1% MWST | Fixkurs: 1 EUR = 1.08 CHF */
function checkWaehrung(sum, eurToChf, mwstCheck) {
    const MWST_FACTOR = 1.081;
    const CHF_PER_EUR = 1.08;

    let value = Number(sum);
    if (!Number.isFinite(value)) {
        return 0;
    }

    const isChf = $('input[name="waehrung"]').is(':checked');
    const isMwst = $('input[name="mwst"]').is(':checked');

    if (isChf) {
        // CHF exkl. MWST
        if (!isMwst) {
            value = value / MWST_FACTOR;
        }
        // CHF inkl. MWST → unverändert
    } else {
        // EUR immer exkl. MWST
        value = value / MWST_FACTOR / CHF_PER_EUR;
    }

    return value;
}

$('input[data-price]').change(function () {
    writeSummary(this)
    calculatePrice()
})

$('input[name="mwst"]').change(function () {
    let mwstCheck = $(this).is(':checked')
    updateCurrency("CHF", mwstCheck)
    calculatePrice()
})

$('input[name="waehrung"]').change(function () {
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
window.updateCurrency = function (currency, mwstCheck) {
    const isChf = $('input[name="waehrung"]').is(':checked');
    const locale = isChf ? 'de-CH' : 'de-DE';
    const curr = isChf ? 'CHF' : 'EUR';

    // Total-Label anpassen
    const isMwst = $('input[name="mwst"]').is(':checked');
    $('.summary-total-wrapper .heading-style-h3:first').text(
        (isChf && isMwst) ? 'Total inkl. MWST' : 'Total exkl. MWST'
    );

    // 1. .is-price direkt bei Radio-Buttons aktualisieren
    $('input[data-price]').each(function () {
        const $input = $(this);
        const price = parseFloat($input.attr('data-price')) || 0;
        const $priceEl = $input.siblings('.is-price');
        if (!$priceEl.length) return;
        const converted = checkWaehrung(price, false);
        $priceEl.text(
            new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(converted)
        );
    });

    // 2. .is-price in der Summary aktualisieren
    $('.summary_acc-value-wrapper').each(function () {
        const $wrapper = $(this);
        const $valueEl = $wrapper.find('[sf-react]');
        const $priceEl = $wrapper.find('.is-price');
        if (!$valueEl.length || !$priceEl.length) return;

        const sfReact = $valueEl.attr('sf-react') || '';
        const match = sfReact.match(/\$f\.([a-zA-Z0-9_-]+)/);
        if (!match) return;

        const name = match[1];
        const $checked = $('input[data-price][name="' + name + '"]:checked');

        if (!$checked.length) {
            $priceEl.text('');
            return;
        }

        let total = 0;
        $checked.each(function () {
            total += parseFloat($(this).attr('data-price')) || 0;
        });

        const converted = checkWaehrung(total, false);
        $priceEl.text(
            new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(converted)
        );
    });

    // 3. .is-price innerhalb von .is-pricewrapper aktualisieren
    $('.is-pricewrapper .is-price').each(function () {
        const $priceEl = $(this);
        const $input = $priceEl.closest('label').find('input[data-price]');
        if (!$input.length) return;
        const price = parseFloat($input.attr('data-price')) || 0;
        const converted = checkWaehrung(price, false);
        $priceEl.text(
            new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(converted)
        );
    });
};

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

console.log("Parat well vom Land")

//clear Inputs on radio button change + verteilungsart change
$('input[type="radio"]').change(function () {
    var changedInput = $(this)
    var step = $(this).closest('.konfigurator_step')
    var allInputs = step.find('input:checked')

    var startIndex = allInputs.index(changedInput) + 1;
    var slicedElements = allInputs.slice(startIndex);

    clearInputs(slicedElements)
})

$('input[name="verteilungsart"]').change(function () {
    $('input[name="verteilungsart"]:not(:checked)').each(function () {
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
    inputs.each(function () {
        if (!$(this).is($('._1-col-input-wrapper.hide #verteilungsart'))) {
            $(this).prop('checked', false)
            $(this).parents('.is-active-inputactive').removeClass('is-active-inputactive')
            $(this).prev('.w--redirected-checked').removeClass('w--redirected-checked')

            writeSummary(this)
            calculatePrice()
        }
    });
}

// Change text in grand total in Konfigurator
$('input[name="mwst"]').change(function () {
    const isChf = $('input[name="waehrung"]').is(':checked');
    let mwstCheck = $(this).is(':checked');
    if (!mwstCheck || !isChf) {
        $('.summary-total-wrapper .heading-style-h3:first').text('Total exkl. MWST');
    } else {
        $('.summary-total-wrapper .heading-style-h3:first').text('Total inkl. MWST');
    }
});

window.SuperformAPI = window.SuperformAPI || [];
window.SuperformAPI.push(({ getForm, allForms }) => {
    const myForm = getForm("konfigurator");

    myForm.onFormSubmit(async (params) => {

        function getArtNrValues() {
            var artNrValues = [];

            $('input[type=radio]:checked').each(function () {
                var artNr = $(this).attr('art-nr');
                if (artNr) {
                    artNrValues.push(artNr);
                }
            });

            $('input[type=checkbox]:checked').each(function () {
                var artNr = $(this).attr('art-nr');
                if (artNr) {
                    artNrValues.push(artNr);
                }
            });

            $('select').each(function () {
                var artNr = $(this).find('option:selected').attr('art-nr');
                if (artNr) {
                    artNrValues.push(artNr);
                }
            });

            console.log(artNrValues);
            return artNrValues;
        }

        function getWaehrungValue() {
            return $('input[name="waehrung"]').is(':checked') ? 'CHF' : 'EUR';
        }

        function getMwstValue() {
            return $('input[name="mwst"]').is(':checked') ? 'inkl' : 'exkl';
        }

        params.data.Artikelnummern = getArtNrValues();
        params.data.Waehrung = getWaehrungValue();
        params.data.Mwst = getMwstValue();
        params.data.Language = Weglot.getCurrentLang();

        var total = $('#konfigurator_total').text();
        total = total.replace(/CHF\s*/, '');
        params.data.Total = total;

        console.log("form data:")
        console.log(params.data);

        const webhookUrl = "https://hook.eu1.make.com/mwy1d2pu5pv1n6ocpth13xsgmhsj1gtk";
        console.log("trigger webhook")
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.data)
        });

        const reply = await response.json();
        console.log(reply);

        if (response.status === 200) {
            const element = document.querySelector('.konfigurator_success-message');
            if (element) {
                element.style.display = 'flex';
            }
        }
    });
});